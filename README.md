
# 🏡 HouseKassu – ML-Powered House Price Predictor

A full-stack machine learning web application that predicts house prices based on input parameters using a trained Linear Regression model. Built with **React (Vite)** for the frontend and **Flask (Python)** for the backend.

---

## 📌 Features

✅ Predict house prices based on:
- Area (in sq.ft)  
- Bedrooms  
- Bathrooms  
- Number of stories  
- Facilities: Main road, guestroom, basement, hot water heating, air conditioning  
- Parking spots  
- Preferred area  
- Furnishing status  

✅ Clean UI built with React + Axios  
✅ Flask API backend with trained ML model  
✅ `model.pkl` file included  
✅ Fully functional API integration  
✅ Hosted frontend + backend (deployment optional)

---

## 🔧 Tech Stack

| Layer        | Tech                           |
|--------------|--------------------------------|
| Frontend     | React + Vite + Axios           |
| Backend      | Flask + scikit-learn + joblib  |
| ML Model     | Linear Regression (`model.pkl`)|
| Deployment   | Vercel (Frontend), Render (Backend) |

---

## 🧪 Sample Prediction

### Input (JSON):
```json
{
  "area": 7420,
  "bedrooms": 4,
  "bathrooms": 3,
  "stories": 2,
  "mainroad": 1,
  "guestroom": 1,
  "basement": 1,
  "hotwaterheating": 0,
  "airconditioning": 1,
  "parking": 2,
  "prefarea": 0,
  "furnishingstatus": 1
}
````

### Output:

```json
{
  "predicted_price": 9045240.56
}
```

---

## 🚀 Running Locally

### 🔹 Backend (Flask)

```bash
cd backend
pip install -r requirements.txt  # or install flask, flask-cors, joblib, scikit-learn manually
python app.py
```

App will run on: `http://127.0.0.1:5000`

---

### 🔹 Frontend (React with Vite)

```bash
cd house-price-frontend
npm install
npm run dev
```

React app runs on: `http://localhost:5173`

---

## 🗃️ Folder Structure

```
house-price-frontend/
├── backend/
│   ├── app.py
│   └── model.pkl
├── src/
│   └── App.jsx (and other React files)
├── public/
├── package.json
└── README.md
```

---

## 🌐 Live Demo (Optional)

> 🔗 Frontend (Vercel): \[Coming Soon]
> 🔗 Backend (Render): \[Coming Soon]

---

## 🙌 Author

**Sharavana Ragav S**
👨‍💻 CSE Undergraduate
📫 [sharavana07](https://github.com/sharavana07)

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).
