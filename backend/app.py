from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd
import logging

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS to allow requests from the frontend

# Load the trained ML model
model = joblib.load("svc_model.pkl")  # Update with correct path if needed

# List of symptoms
SYMPTOMS = [
    "itching", "skin_rash", "nodal_skin_eruptions", "continuous_sneezing", "shivering",
    "chills", "joint_pain", "stomach_pain", "acidity", "ulcers_on_tongue", "muscle_wasting",
    "vomiting", "burning_micturition", "spotting_ urination", "fatigue", "weight_gain",
    "anxiety", "cold_hands_and_feets", "mood_swings", "weight_loss", "restlessness",
    "lethargy", "patches_in_throat", "irregular_sugar_level", "cough", "high_fever",
    "sunken_eyes", "breathlessness", "sweating", "dehydration", "indigestion", "headache",
    "yellowish_skin", "dark_urine", "nausea", "loss_of_appetite", "pain_behind_the_eyes",
    "back_pain", "constipation", "abdominal_pain", "diarrhoea", "mild_fever", "yellow_urine",
    "yellowing_of_eyes", "acute_liver_failure", "fluid_overload", "swelling_of_stomach",
    "swelled_lymph_nodes", "malaise", "blurred_and_distorted_vision", "phlegm",
    "throat_irritation", "redness_of_eyes", "sinus_pressure", "runny_nose", "congestion",
    "chest_pain", "weakness_in_limbs", "fast_heart_rate", "pain_during_bowel_movements",
    "pain_in_anal_region", "bloody_stool", "irritation_in_anus", "neck_pain", "dizziness",
    "cramps", "bruising", "obesity", "swollen_legs", "swollen_blood_vessels",
    "puffy_face_and_eyes", "enlarged_thyroid", "brittle_nails", "swollen_extremeties",
    "excessive_hunger", "extra_marital_contacts", "drying_and_tingling_lips", "slurred_speech",
    "knee_pain", "hip_joint_pain", "muscle_weakness", "stiff_neck", "swelling_joints",
    "movement_stiffness", "spinning_movements", "loss_of_balance", "unsteadiness",
    "weakness_of_one_body_side", "loss_of_smell", "bladder_discomfort", "foul_smell_of urine",
    "continuous_feel_of_urine", "passage_of_gases", "internal_itching", "toxic_look_(typhos)",
    "depression", "irritability", "muscle_pain", "altered_sensorium", "red_spots_over_body",
    "belly_pain", "abnormal_menstruation", "dischromic _patches", "watering_from_eyes",
    "increased_appetite", "polyuria", "family_history", "mucoid_sputum", "rusty_sputum",
    "lack_of_concentration", "visual_disturbances", "receiving_blood_transfusion",
    "receiving_unsterile_injections", "coma", "stomach_bleeding", "distention_of_abdomen",
    "history_of_alcohol_consumption", "fluid_overload.1", "blood_in_sputum",
    "prominent_veins_on_calf", "palpitations", "painful_walking", "pus_filled_pimples",
    "blackheads", "scurring", "skin_peeling", "silver_like_dusting", "small_dents_in_nails",
    "inflammatory_nails", "blister", "red_sore_around_nose", "yellow_crust_ooze"
]

# Optional: If you want to map the prediction index to disease names:
# DISEASE_CLASSES = ['DiseaseA', 'DiseaseB', ...]  # Should match model output

# Generate symptom-to-index mapping
SYMPTOM_MAPPING = {symptom: index for index, symptom in enumerate(SYMPTOMS)}

# Configure logging
logging.basicConfig(level=logging.DEBUG)

@app.route("/predict", methods=["POST"])
def predict():
    try:
        # Log the incoming request data
        logging.debug("Received request data: %s", request.json)

        # Get the input symptoms
        data = request.json
        symptoms = data.get("symptoms", [])

        # Map symptoms to indices and mark them in the input vector
        symptom_indices = [SYMPTOM_MAPPING.get(symptom, 0) for symptom in symptoms]
        input_data = np.zeros(len(SYMPTOM_MAPPING))
        for index in symptom_indices:
            input_data[index] = 1

        logging.debug("Input data for model: %s", input_data)

        # Convert to DataFrame with correct column order
        input_df = pd.DataFrame([input_data], columns=SYMPTOMS)
        logging.debug("Input DataFrame for model: %s", input_df)

        # Get the prediction from the model
        prediction = model.predict(input_df)
        logging.debug("Prediction result: %s", prediction)

        # Convert to plain int and send response
        predicted_disease = int(prediction[0])

        return jsonify({"prediction": predicted_disease})

        # Or if you want to return disease name instead of index:
        # return jsonify({"prediction": DISEASE_CLASSES[predicted_disease]})

    except Exception as e:
        logging.error("Error occurred: %s", str(e))
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5001)
