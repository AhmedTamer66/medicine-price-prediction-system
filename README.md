# 🏥 Medicine Price Prediction & AI Drug Assistant

A healthcare decision support system that predicts future medicine prices using Facebook Prophet and provides an AI-powered pharmaceutical assistant using Retrieval-Augmented Generation (RAG) with the Qwen 2.5 language model.

---

# 📌 Project Overview

The Medicine Price Prediction & AI Drug Assistant is designed to help patients, pharmacists, and healthcare professionals access medicine information, monitor historical price trends, forecast future prices, and receive AI-assisted answers to medicine and symptom-related questions.

The system integrates:

- Medicine search and filtering
- Historical price tracking
- Time-series price forecasting
- AI-powered pharmaceutical assistant
- External drug API integration
- Local SQLite caching
- Interactive Streamlit interface

---

# 🎯 Problem Statement

Medicine prices frequently change due to inflation, supply chain disruptions, market demand, and governmental pricing policies. Patients often lack visibility into future price trends, making budgeting difficult.

In addition, many users need quick and reliable pharmaceutical information without relying on unverified internet sources.

Traditional chatbots often generate inaccurate medical information because they depend solely on pre-trained knowledge.

---

# 💡 Proposed Solution

The proposed system combines traditional software engineering with artificial intelligence.

The system enables users to:

- Search medicines using multiple filters
- View complete medicine information
- Display historical price changes
- Predict future prices using Prophet forecasting
- Ask medicine and symptom-related questions through an AI chatbot
- Retrieve answers grounded in a custom pharmaceutical knowledge base using Retrieval-Augmented Generation (RAG)

---

# ⭐ Main Features

- 🔍 Medicine Search
- 💊 Drug Details
- 📈 Historical Price Visualization
- 🔮 Future Price Prediction
- 🤖 AI Drug Assistant
- 📚 Retrieval-Augmented Generation (RAG)
- 💾 SQLite Local Database
- 🌐 External Drug API Integration
- ⚡ FastAPI REST API
- 🖥 Interactive Streamlit Interface

---

# 📊 Dataset

The system stores medicine information including:

- Commercial Name
- Scientific Name
- Manufacturer
- Drug Class
- Route of Administration
- Current Price
- Historical Prices
- Price Recording Date

Historical price records are used for time-series forecasting.

---

# 🤖 Artificial Intelligence

## 1. Price Prediction

The forecasting module uses **Facebook Prophet**, a time-series forecasting model developed by Meta.

Features:

- Historical price analysis
- Future price forecasting
- Confidence intervals
- Individual forecasting model per medicine

Outputs:

- Predicted prices
- Confidence bounds
- Forecast charts

---

## 2. AI Pharmaceutical Assistant

The chatbot is built using:

- Qwen 2.5 3B-Instruct
- Retrieval-Augmented Generation (RAG)
- FAISS Vector Database
- Sentence Transformers
- Custom pharmaceutical knowledge base

Pipeline:

User Question

↓

Embedding Generation

↓

FAISS Similarity Search

↓

Top-3 Relevant Knowledge Chunks

↓

Qwen 2.5 LLM

↓

Grounded AI Response

The chatbot answers only using retrieved information from the knowledge base, reducing hallucinations and improving answer reliability.

---

# 🏗 System Architecture

```
                +----------------+
                |    Streamlit   |
                |    Frontend    |
                +--------+-------+
                         |
                         |
                    HTTP Requests
                         |
                         v
                +----------------+
                |    FastAPI     |
                |    Backend     |
                +--------+-------+
                         |
          +--------------+---------------+
          |                              |
          |                              |
          v                              v
     SQLite Database              External Drug API
          |
          |
          v
    Prophet Prediction

----------------------------------------------

User Question

↓

Streamlit

↓

LLM API

↓

FAISS Vector Search

↓

Knowledge Base

↓

Qwen 2.5

↓

Answer
```

---

# ⚙ Technology Stack

## Backend

- FastAPI
- SQLAlchemy
- Pydantic
- HTTPX

## Frontend

- Streamlit
- Plotly
- Pandas

## Database

- SQLite

## Machine Learning

- Prophet
- Pandas
- NumPy

## Artificial Intelligence

- Qwen 2.5 3B-Instruct
- Sentence Transformers
- FAISS
- HuggingFace Transformers

## Deployment

- Uvicorn
- Cloudflare Tunnel

## Version Control

- Git
- GitHub

---

# 📁 Project Structure

```text
medicine-price-prediction-system/

├── backend/
│   ├── app/
│   │   ├── core/
│   │   ├── models/
│   │   ├── repositories/
│   │   ├── routers/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── main.py
│   └── requirements.txt
│
├── frontend/
│   └── app.py
│
├── ml/
│   ├── preprocessing.py
│   ├── trainer.py
│   ├── predictor.py
│   ├── model_manager.py
│   ├── train_models.py
│   └── generate_fake_history.py
│
├── data/
│   ├── raw/
│   └── processed/
│
├── docs/
│   ├── diagrams/
│   └── reports/
│
├── README.md
├── LICENSE
└── .gitignore
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/<username>/medicine-price-prediction-system.git
```

---

## Install Backend Dependencies

```bash
cd backend
pip install -r requirements.txt
```

---

## Install Frontend Dependencies

```bash
pip install streamlit
```

---

## Run FastAPI

```bash
uvicorn app.main:app --reload --port 1000
```

---

## Run Streamlit

```bash
streamlit run frontend/app.py
```

---

## Run the Chatbot Server

```bash
python chatbot_server.py
```

---

# 📚 REST API

| Endpoint | Description |
|-----------|-------------|
| GET /drugs | Search medicines |
| GET /drugs/{id} | Drug details |
| GET /predictions/{id} | Price prediction |
| POST /chat | AI Assistant |

Swagger documentation:

```
http://localhost:1000/docs
```

ReDoc:

```
http://localhost:1000/redoc
```

---

# 🧪 Testing

The project was tested using:

- Backend API testing
- Manual UI testing
- Price prediction validation
- Chatbot response validation
- Error handling verification

---

# 📈 Future Improvements

- User authentication
- PostgreSQL support
- Docker deployment
- Continuous Integration (CI/CD)
- Larger pharmaceutical knowledge base
- Multi-language chatbot
- Real-time medicine price synchronization

---

# 👥 Team Responsibilities

| Role | Responsibilities |
|------|------------------|
| Machine Learning | Data preprocessing, Prophet forecasting |
| AI Engineer | RAG pipeline, Qwen chatbot |
| Backend Developer | FastAPI services, database, API integration |
| Frontend Developer | Streamlit interface |
| Documentation & QA | UML, testing, reports, user manual |

---

# 📄 Documentation

The project documentation includes:

- System Analysis & Design
- Software Architecture
- ER Diagram
- DFD
- UML Diagrams
- Database Design
- API Documentation
- Testing Report
- User Manual
- Technical Documentation
- Final Presentation

---

# 📜 License

This project is licensed under the MIT License.
