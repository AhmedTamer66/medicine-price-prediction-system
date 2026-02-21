# 🏥 Medicine Price Prediction System

A machine learning system to predict medicine prices and recommend cheaper alternatives based on historical data and drug characteristics.

---

## 📌 Project Overview

This project aims to build a machine learning–based system that predicts future medicine prices and recommends cheaper alternatives when price increases are expected.  
The system is designed to help patients—especially those with chronic illnesses—plan their purchases and reduce financial burden.

The project combines:
- Data collection and preprocessing  
- Machine learning prediction  
- Backend API  
- User interface (dashboard)  
- Visualization and analytics  
- Testing and documentation  

---

## 🎯 Problem Statement

Medicine prices fluctuate due to market conditions, supply issues, and economic factors.  
Patients often discover price increases only at the time of purchase, making it difficult to plan or choose alternatives.

There is a need for:
- Predictive price insight  
- Cheaper alternative recommendations  
- Clear visualization of trends  

---

## 💡 Proposed Solution

The system:
- Predicts medicine prices using historical price data  
- Detects potential price spikes  
- Recommends cheaper alternatives with similar category and active ingredient  
- Displays trends and alerts through a dashboard  

---

## 📊 Data

The dataset may include:
- Medicine name  
- Category (e.g., antibiotic, chronic)  
- Active ingredient  
- Historical price  
- Alternative medicines  

**Data sources:**
- Public medicine price datasets  
- Pharmacy websites (if allowed)  
- Manual collection (if needed)  

---

## 🤖 Machine Learning

**Possible models:**
- Linear Regression  
- Random Forest  
- XGBoost  

**Tasks:**
- Data cleaning  
- Feature engineering  
- Model training  
- Evaluation (MAE, RMSE, R²)  

**Outputs:**
- Predicted future price  
- Price spike indicator  
- Alternative medicine suggestions  

---

## 🧱 System Architecture
User → Frontend Dashboard → Backend API → ML Model → Database


---

## 👥 Team Roles

| Role                        | Responsibilities |
|-----------------------------|------------------|
| Data Engineer / ML Prep     | Data collection, cleaning, normalization, feature preparation |
| ML / Prediction Engineer    | Model training, validation, prediction logic |
| Backend Developer / API     | API development, database integration, security |
| Frontend Developer / UI     | User interface, interaction, responsiveness |
| Visualization / Analytics   | Charts, trends, insights, KPIs |
| Documentation / Testing / QA| Reports, testing, GitHub management, presentations |

---

## ⚙️ Technology Stack

**ML & Data:**  
- Python  
- Pandas, NumPy  
- Scikit-learn  

**Backend:**  
- FastAPI or Flask  

**Frontend:**  
- Streamlit or HTML + JS  

**Database:**  
- SQLite / PostgreSQL  

**Version Control:**  
- Git & GitHub  

---

## 📁 Project Structure (Planned)

medicine-price-prediction-system/
│
├── data/
│   ├── raw/          # Unprocessed datasets
│   └── processed/    # Cleaned and prepared datasets
│
├── ml/
│   ├── train.py      # Training script for ML models
│   └── model.pkl     # Saved trained model
│
├── backend/
│   └── app.py        # Backend API (Flask/FastAPI)
│
├── frontend/
│   └── app.py        # Frontend dashboard (Streamlit/HTML+JS)
│
├── docs/
│   ├── diagrams/     # UML, ER, DFD diagrams
│   └── reports/      # Documentation and reports
│
└── README.md         # Project documentation
---

## 🧪 Testing

- Functional testing (API, UI)  
- ML validation (accuracy, error metrics)  
- Edge case testing (rare medicines, missing data)  

---

## 📈 KPIs

- Prediction accuracy  
- System response time  
- Bug count  
- Data coverage  

---

## 🚀 Deployment

- Local deployment (Flask/FastAPI + Streamlit)  
- Optional cloud deployment  

---

## 📄 Documentation

The project includes:
- Technical documentation  
- User manual  
- UML diagrams  
- ER diagrams  
- DFDs  
- Final report  
- Presentation slides  

---

## 📜 License

MIT License

