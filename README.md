# Wellify

Wellify is a comprehensive healthcare management platform designed to assist patients and doctors in managing health-related tasks efficiently. It includes features like disease prediction, medical report analysis, appointment scheduling, and a chatbot assistant for health-related queries.

## Features

### 1. **Disease Prediction**
   - Users can select symptoms to predict potential diseases using a machine learning model.
   - Provides detailed information about the predicted disease, including precautions, medications, diet, and workout recommendations.

### 2. **Medical Report Analyzer**
   - Doctors can upload medical reports in PDF format.
   - Extracts key information like patient details, diagnosis, and generates a summary.

### 3. **Appointment Management**
   - Patients can book appointments with doctors.
   - Doctors can view and manage upcoming appointments.

### 4. **Wellness Tips**
   - Provides daily wellness tips categorized into nutrition, exercise, mental health, and sleep.

### 5. **Chatbot Assistant**
   - A chatbot to assist users with health-related queries.
   - Supports real-time conversation with a user-friendly interface.

### 6. **User Profiles**
   - Separate profiles for patients and doctors.
   - Doctors can manage their specializations, qualifications, and experience.

### 7. **Admin Features**
   - Admins can view all users and manage the platform.

---

## Tech Stack

### Frontend
- **React**: For building the user interface.
- **React Router**: For navigation and routing.
- **Tailwind CSS**: For styling.
- **DaisyUI**: For pre-designed UI components.
- **Axios**: For API requests.

### Backend
- **Flask**: For building the backend API.
- **MongoDB**: For storing user and appointment data.
- **PyMuPDF**: For extracting text from PDF files.
- **Scikit-learn**: For the machine learning model.

---

## Project Structure

### Frontend
Here is a README.md file for your project based on the provided context:

```markdown
# Wellify

Wellify is a comprehensive healthcare management platform designed to assist patients and doctors in managing health-related tasks efficiently. It includes features like disease prediction, medical report analysis, appointment scheduling, and a chatbot assistant for health-related queries.

## Features

### 1. Disease Prediction
   - Users can select symptoms to predict potential diseases using a machine learning model.
   - Provides detailed information about the predicted disease, including precautions, medications, diet, and workout recommendations.

### 2. Medical Report Analyzer
   - Doctors can upload medical reports in PDF format.
   - Extracts key information like patient details, diagnosis, and generates a summary.

### 3. Appointment Management
   - Patients can book appointments with doctors.
   - Doctors can view and manage upcoming appointments.

### 4. Wellness Tips
   - Provides daily wellness tips categorized into nutrition, exercise, mental health, and sleep.

### 5. Chatbot Assistant
   - A chatbot to assist users with health-related queries.
   - Supports real-time conversation with a user-friendly interface.

### 6. User Profiles
   - Separate profiles for patients and doctors.
   - Doctors can manage their specializations, qualifications, and experience.

### 7. Admin Features
   - Admins can view all users and manage the platform.

---

## Tech Stack

### Frontend
- React: For building the user interface.
- React Router: For navigation and routing.
- Tailwind CSS: For styling.
- DaisyUI: For pre-designed UI components.
- Axios: For API requests.

### Backend
- Flask: For building the backend API.
- MongoDB: For storing user and appointment data.
- PyMuPDF: For extracting text from PDF files.
- Scikit-learn: For the machine learning model.

---

### Project Structure
Wellify/
├── frontend/
│   ├── public/                     # Static assets
│   ├── src/
│   │   ├── components/            # Reusable React components
│   │   ├── pages/                 # Page-level components
│   │   ├── store/                 # Zustand state management
│   │   ├── constants/             # App-wide constants
│   │   ├── App.jsx                # Main app component
│   │   ├── main.jsx               # React entry point
│   │   └── index.css              # Global styles
│   ├── package.json               # Frontend dependencies
│   └── vite.config.js             # Vite configuration

├── backend/
│   ├── src/
│   │   ├── models/                # Mongoose models
│   │   ├── controllers/           # Express API controllers
│   │   ├── routes/                # API route handlers
│   │   ├── lib/                   # Utility/helper functions
│   │   └── server.js              # Express server entry point
│   ├── datasets/                  # CSVs for symptoms, medications, etc.
│   ├── svc_model.pkl              # Trained ML model for disease prediction
│   ├── app.py                     # Flask app for disease prediction
│   ├── Report.py                  # Flask app for report analysis
│   ├── package.json               # Backend dependencies (Node.js)
│   └── .env                       # Environment variables

└── README.md                      # Project documentation (optional but recommended)

```

---

## Installation

### Prerequisites
- Node.js
- Python 3.x
- MongoDB

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-repo/wellify.git
   cd wellify
   ```

2. **Setup Backend**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   python app.py  # Start the Flask server
   ```

3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev  # Start the development server
   ```

4. **Run MongoDB**
   Ensure MongoDB is running locally or update the connection string in the backend `.env` file.

---

## Usage

1. **Disease Prediction**
   - Navigate to the "Predict Disease" page.
   - Select symptoms and submit to get predictions.

2. **Medical Report Analyzer**
   - Doctors can upload PDF reports on the "Report Analyzer" page.

3. **Appointments**
   - Patients can book appointments, and doctors can manage them.

4. **Chatbot**
   - Click the chatbot icon to interact with the Wellify Assistant.

---

## API Endpoints

### Disease Prediction API
- GET `/api/symptoms`: Get a list of symptoms.
- POST `/api/predict`: Predict disease based on symptoms.

### Report Analyzer API
- POST `/upload`: Upload a PDF report for analysis.

---

## Contributing

1. Fork the repository.
2. Create a new branch.
3. Make your changes and commit them.
4. Push to your fork and submit a pull request.

---

## License

This project is licensed under the MIT License.

---

## Acknowledgments

- [React](https://reactjs.org/)
- [Flask](https://flask.palletsprojects.com/)
- [MongoDB](https://www.mongodb.com/)
- [Scikit-learn](https://scikit-learn.org/)
- [PyMuPDF](https://pymupdf.readthedocs.io/)



##  Glimpse of our WebPage:

![1w](https://github.com/user-attachments/assets/5908737a-b5c6-4069-884d-8af2c5d7c58e)
![2w](https://github.com/user-attachments/assets/c67429ff-fe6f-4a27-8e40-ae7daf1630b1)
![3w](https://github.com/user-attachments/assets/7ec89a19-6479-43ce-915e-19391661097c)
![4w](https://github.com/user-attachments/assets/3071dde2-a5c9-4899-a2d5-9429a9e83ed5)
![5w](https://github.com/user-attachments/assets/0d715b04-7dac-4cd3-9d71-46edf7af80dc)
![6w](https://github.com/user-attachments/assets/57c8dfcb-c5b7-48df-9d51-36591a3a52e2)
![WhatsApp Image 2025-04-06 at 10 00 47_df82cbc7](https://github.com/user-attachments/assets/9e8581aa-502a-4d0d-9710-7657c4c53931)








