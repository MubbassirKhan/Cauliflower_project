# 🥦 Cauliflower Disease Classification System

A Machine Learning-based web application that detects and classifies diseases in cauliflower leaves using image processing and deep learning techniques. The system helps farmers and agricultural professionals identify diseases early and take appropriate preventive measures.

## 📌 Project Overview

Cauliflower crops are susceptible to various diseases that can significantly reduce yield and quality. This project uses a trained deep learning model to classify cauliflower leaf images into different disease categories and provide instant predictions through a user-friendly web interface.

## 🚀 Features

- Upload cauliflower leaf images
- Automatic disease detection and classification
- Deep Learning-based prediction
- Fast and accurate results
- User-friendly web interface
- Real-time prediction system
- Supports multiple disease categories

## 🛠️ Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript
- Bootstrap

### Backend
- Python
- Flask / FastAPI

### Machine Learning
- TensorFlow
- Keras
- OpenCV
- NumPy
- Pandas
- Scikit-learn

### Database (Optional)
- MySQL

## 📂 Project Structure

```text
Cauliflower_project/
│
├── backend/
│   ├── app.py
│   ├── model/
│   ├── routes/
│   └── requirements.txt
│
├── cauliflower-disease-classifier/
│   ├── static/
│   ├── templates/
│   ├── uploads/
│   └── model/
│
├── dataset/
├── trained_model/
├── README.md
└── requirements.txt
```

## 🧠 Disease Categories

The model can classify cauliflower leaves into the following categories:

- Healthy
- Black Rot
- Downy Mildew
- Bacterial Soft Rot
- Alternaria Leaf Spot

> Note: Categories may vary depending on the dataset used for training.

## ⚙️ Installation

### Clone the Repository

```bash
git clone https://github.com/MubbassirKhan/Cauliflower_project.git
cd Cauliflower_project
```

### Create Virtual Environment

```bash
python -m venv venv
```

### Activate Virtual Environment

Windows:

```bash
venv\Scripts\activate
```

Linux/Mac:

```bash
source venv/bin/activate
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

## ▶️ Run the Application

For Flask:

```bash
python app.py
```

For FastAPI:

```bash
uvicorn main:app --reload
```

Open your browser and visit:

```text
http://localhost:8000
```

or

```text
http://localhost:5000
```

## 📊 Model Training

The model was trained using a labeled cauliflower disease dataset consisting of healthy and diseased leaf images.

### Training Pipeline

1. Data Collection
2. Data Preprocessing
3. Image Augmentation
4. Model Training
5. Validation & Testing
6. Deployment

## 📈 Results

- High classification accuracy
- Fast prediction time
- Easy deployment
- Suitable for agricultural disease monitoring

## Future Enhancements

- Mobile Application
- Multi-crop Disease Detection
- Treatment Recommendation System
- Cloud Deployment
- Farmer Dashboard

## 👨‍💻 Author

**Mubbassir Khan Jahagirdar**

- Full Stack Developer
- Backend Developer
- Python Developer

GitHub:
https://github.com/MubbassirKhan

LinkedIn:
(Add Your LinkedIn Profile)

## 📜 License

This project is developed for educational and research purposes.

---

⭐ If you found this project useful, please consider giving it a star on GitHub.
