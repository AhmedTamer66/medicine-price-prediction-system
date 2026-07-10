import streamlit as st
import httpx
import pandas as pd
import plotly.graph_objects as go
from datetime import datetime

# ------------------------------
# Configuration – SEPARATE ENDPOINTS
# ------------------------------

# Your main FastAPI backend (drug search, details, predictions)
DRUG_API_BASE = "http://localhost:1000"

# Your LLM service (separate server, port, or path)
LLM_API_BASE = "https://lol-bunch-tech-bouquet.trycloudflare.com"

st.set_page_config(
    page_title="💊 Drug Dashboard + AI",
    page_icon="🧠",
    layout="wide",
    initial_sidebar_state="expanded",
)

# ------------------------------
# Cached API calls (Drug backend)
# ------------------------------

@st.cache_data(ttl=300)
def search_drugs(params: dict) -> list:
    try:
        resp = httpx.get(f"{DRUG_API_BASE}/drugs", params=params, timeout=10)
        resp.raise_for_status()
        return resp.json()
    except Exception as e:
        st.error(f"Search failed: {e}")
        return []

@st.cache_data(ttl=300)
def get_drug_details(drug_id: str) -> dict | None:
    try:
        resp = httpx.get(f"{DRUG_API_BASE}/drugs/{drug_id}", timeout=10)
        resp.raise_for_status()
        return resp.json()
    except Exception as e:
        st.error(f"Details failed: {e}")
        return None

@st.cache_data(ttl=60)
def get_prediction(drug_id: str, days: int) -> dict | None:
    try:
        resp = httpx.get(
            f"{DRUG_API_BASE}/predictions/{drug_id}",
            params={"days": days},
            timeout=10,
        )
        if resp.status_code == 404:
            st.warning("Model not trained yet.")
            return None
        resp.raise_for_status()
        return resp.json()
    except Exception as e:
        st.error(f"Prediction failed: {e}")
        return None

# ------------------------------
# Chat helper – uses LLM_API_BASE
# ------------------------------

def send_chat_message(prompt: str) -> str | None:
    """Send a prompt to your separate LLM /chat endpoint."""
    try:
        resp = httpx.post(
            f"{LLM_API_BASE}/chat",
            json={"prompt": prompt},
            timeout=30,
        )
        resp.raise_for_status()
        return resp.json().get("response", "No response field received.")
    except httpx.ConnectError:
        st.error(f"Could not connect to LLM server at {LLM_API_BASE}")
        return None
    except Exception as e:
        st.error(f"Chat error: {e}")
        return None

# ------------------------------
# Sidebar – common controls
# ------------------------------

st.sidebar.title("🔍 Filters")

search_term = st.sidebar.text_input("Search term", placeholder="e.g., aspirin")
manufacturer_filter = st.sidebar.text_input("Manufacturer", placeholder="e.g., HIKMA")
route_filter = st.sidebar.selectbox(
    "Route",
    ["All", "ORAL.SOLID", "ORAL.LIQUID", "TOPICAL", "INJECTABLE"],
)
page = st.sidebar.number_input("Page", min_value=1, value=1, step=1)
limit = st.sidebar.slider("Per page", min_value=5, max_value=50, value=20, step=5)

# Status checks – separately
try:
    drug_status = httpx.get(f"{DRUG_API_BASE}/", timeout=2).json()
    st.sidebar.success(f"✅ Drug API online")
except:
    st.sidebar.error("❌ Drug API unreachable")

try:
    llm_status = httpx.get(f"{LLM_API_BASE}/", timeout=2).json()
    st.sidebar.success(f"✅ LLM online – {llm_status.get('model', '')}")
except:
    st.sidebar.warning("⚠️ LLM service unreachable (chat may not work)")

# Build search params
params = {
    "search": search_term or None,
    "manufacturer": manufacturer_filter or None,
    "route": route_filter if route_filter != "All" else None,
    "page": page,
    "limit": limit,
}
params = {k: v for k, v in params.items() if v is not None}

# ------------------------------
# Main area with Tabs
# ------------------------------

tab1, tab2 = st.tabs(["💊 Drug Search", "🧠 AI Assistant"])

# -------- TAB 1: Drug Search --------
with tab1:
    st.header("Find and analyse medicines")

    if st.button("Search", use_container_width=True):
        st.session_state.search_triggered = True

    if "search_triggered" not in st.session_state:
        st.session_state.search_triggered = True

    if st.session_state.search_triggered:
        with st.spinner("Searching..."):
            drugs = search_drugs(params)
    else:
        drugs = []

    if not drugs:
        st.info("No drugs found. Adjust your filters and search again.")
    else:
        st.success(f"Found {len(drugs)} drugs")
        for drug in drugs:
            with st.container():
                cols = st.columns([3, 1, 1, 1])
                cols[0].markdown(
                    f"**{drug['commercial_name_en']}**  \n"
                    f"{drug['manufacturer']}  \n"
                    f"*{drug['route']}*"
                )
                cols[1].metric("Price", f"{drug['price_egp']:.2f} EGP")
                if cols[2].button("Details", key=f"detail_{drug['id']}"):
                    st.session_state.selected_drug = drug['id']
                    st.session_state.show_prediction = False
                if cols[3].button("Predict", key=f"predict_{drug['id']}"):
                    st.session_state.selected_drug = drug['id']
                    st.session_state.show_prediction = True
                st.divider()

    # Detail & Prediction area
    if "selected_drug" in st.session_state:
        drug_id = st.session_state.selected_drug
        detail = get_drug_details(drug_id)
        if detail:
            st.subheader(f"📋 {detail['commercial_name_en']}")
            col1, col2 = st.columns(2)
            with col1:
                st.markdown(f"**Scientific:** {detail['scientific_name']}")
                st.markdown(f"**Manufacturer:** {detail['manufacturer']}")
                st.markdown(f"**Class:** {detail['drug_class']}")
                st.markdown(f"**Route:** {detail['route']}")
                st.metric("Current Price", f"{detail['price_egp']:.2f} EGP")
            with col2:
                model_ok = detail['model_available']
                st.markdown(f"**Model ready:** {'✅' if model_ok else '❌'}")
                if not model_ok:
                    st.warning("Train the model first to enable predictions.")

            # Price history chart
            if detail['price_history']:
                df_hist = pd.DataFrame(detail['price_history'])
                df_hist['recorded_at'] = pd.to_datetime(df_hist['recorded_at'])
                fig = go.Figure()
                fig.add_trace(go.Scatter(
                    x=df_hist['recorded_at'],
                    y=df_hist['price_egp'],
                    mode='lines+markers',
                    name='Price',
                    line=dict(color='#1f77b4', width=2),
                ))
                fig.update_layout(height=300, template='plotly_white')
                st.plotly_chart(fig, use_container_width=True)
            else:
                st.info("No price history.")

            # Prediction block
            if st.session_state.get("show_prediction", False) and model_ok:
                days = st.slider("Forecast days", 7, 90, 30, 7)
                if st.button("Generate forecast"):
                    forecast = get_prediction(drug_id, days)
                    if forecast:
                        df_fore = pd.DataFrame(forecast['forecast'])
                        df_fore['date'] = pd.to_datetime(df_fore['date'])
                        fig2 = go.Figure()
                        fig2.add_trace(go.Scatter(
                            x=df_fore['date'],
                            y=df_fore['predicted_price'],
                            mode='lines+markers',
                            name='Predicted',
                            line=dict(color='#ff7f0e', width=2),
                        ))
                        fig2.add_trace(go.Scatter(
                            x=df_fore['date'],
                            y=df_fore['upper_bound'],
                            mode='lines',
                            line=dict(width=0),
                            showlegend=False,
                        ))
                        fig2.add_trace(go.Scatter(
                            x=df_fore['date'],
                            y=df_fore['lower_bound'],
                            mode='lines',
                            fill='tonexty',
                            fillcolor='rgba(255,127,14,0.2)',
                            line=dict(width=0),
                            name='Confidence interval',
                        ))
                        fig2.update_layout(height=350, template='plotly_white')
                        st.plotly_chart(fig2, use_container_width=True)
            else:
                if model_ok:
                    st.info("Click the **Predict** button on a drug card to start forecasting.")
        else:
            st.error("Could not load drug details.")

# -------- TAB 2: AI Assistant (Chat) --------
with tab2:
    st.header("Ask about drugs")

    # Initialize chat history in session state
    if "messages" not in st.session_state:
        st.session_state.messages = [
            {"role": "assistant", "content": "Hello! I'm your drug assistant. Ask me about medicines, or if you have any symptoms, let me know!"}
        ]

    # Display chat messages
    for msg in st.session_state.messages:
        with st.chat_message(msg["role"]):
            st.write(msg["content"])

    # Chat input
    if prompt := st.chat_input("Ask a question..."):
        # Append user message
        st.session_state.messages.append({"role": "user", "content": prompt})
        with st.chat_message("user"):
            st.write(prompt)

        # Get bot response
        with st.chat_message("assistant"):
            with st.spinner("Thinking..."):
                response = send_chat_message(prompt)
            if response:
                st.write(response)
                st.session_state.messages.append({"role": "assistant", "content": response})
            else:
                st.error("Sorry, I couldn't get a response. Please try again later.")

    # Optional clear button
    if st.button("Clear chat history"):
        st.session_state.messages = [{"role": "assistant", "content": "Chat cleared. How can I help you?"}]
        st.rerun()

# -------- Clear selection (global) --------
if st.sidebar.button("Clear selection"):
    st.session_state.pop("selected_drug", None)
    st.session_state.pop("show_prediction", None)
    st.rerun()
