import React, { useState } from "react";
import Select from "react-select";
import axios from "axios";

const PredictDisease = () => {
  const [formData, setFormData] = useState([]);
  const [predictionData, setPredictionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [symptomCount, setSymptomCount] = useState(0);

  const symptoms = [
    "itching", "skin_rash", "nodal_skin_eruptions", "continuous_sneezing", "shivering", "chills", "joint_pain",
    "stomach_pain", "acidity", "ulcers_on_tongue", "muscle_wasting", "vomiting", "burning_micturition",
    "spotting_urination", "fatigue", "weight_gain", "anxiety", "cold_hands_and_feets", "mood_swings", "weight_loss",
    "restlessness", "lethargy", "patches_in_throat", "irregular_sugar_level", "cough", "high_fever", "sunken_eyes",
    "breathlessness", "sweating", "dehydration", "indigestion", "headache", "yellowish_skin", "dark_urine", "nausea",
    "loss_of_appetite", "pain_behind_the_eyes", "back_pain", "constipation", "abdominal_pain", "diarrhoea", "mild_fever",
    "yellow_urine", "yellowing_of_eyes", "acute_liver_failure", "fluid_overload", "swelling_of_stomach",
    "swelled_lymph_nodes", "malaise", "blurred_and_distorted_vision", "phlegm", "throat_irritation", "redness_of_eyes",
    "sinus_pressure", "runny_nose", "congestion", "chest_pain", "weakness_in_limbs", "fast_heart_rate",
    "pain_during_bowel_movements", "pain_in_anal_region", "bloody_stool", "irritation_in_anus", "neck_pain",
    "dizziness", "cramps", "bruising", "obesity", "swollen_legs", "swollen_blood_vessels", "puffy_face_and_eyes",
    "enlarged_thyroid", "brittle_nails", "swollen_extremeties", "excessive_hunger", "extra_marital_contacts",
    "drying_and_tingling_lips", "slurred_speech", "knee_pain", "hip_joint_pain", "muscle_weakness", "stiff_neck",
    "swelling_joints", "movement_stiffness", "spinning_movements", "loss_of_balance", "unsteadiness",
    "weakness_of_one_body_side", "loss_of_smell", "bladder_discomfort", "foul_smell_of_urine",
    "continuous_feel_of_urine", "passage_of_gases", "internal_itching", "toxic_look_(typhos)", "depression",
    "irritability", "muscle_pain", "altered_sensorium", "red_spots_over_body", "belly_pain", "abnormal_menstruation",
    "dischromic_patches", "watering_from_eyes", "increased_appetite", "polyuria", "family_history", "mucoid_sputum",
    "rusty_sputum", "lack_of_concentration", "visual_disturbances", "receiving_blood_transfusion",
    "receiving_unsterile_injections", "coma", "stomach_bleeding", "distention_of_abdomen",
    "history_of_alcohol_consumption", "fluid_overload.1", "blood_in_sputum", "prominent_veins_on_calf", "palpitations",
    "painful_walking", "pus_filled_pimples", "blackheads", "scurring", "skin_peeling", "silver_like_dusting",
    "small_dents_in_nails", "inflammatory_nails", "blister", "red_sore_around_nose", "yellow_crust_ooze"
  ];

  // Group symptoms by body region for better organization
  const symptomCategories = {
    "Head & Neurological": ["headache", "dizziness", "loss_of_smell", "lack_of_concentration", "visual_disturbances", "slurred_speech"],
    "Respiratory": ["continuous_sneezing", "cough", "breathlessness", "phlegm", "mucoid_sputum", "rusty_sputum", "blood_in_sputum"],
    "Digestive": ["stomach_pain", "acidity", "vomiting", "nausea", "indigestion", "constipation", "abdominal_pain", "diarrhoea"],
    "Skin": ["itching", "skin_rash", "nodal_skin_eruptions", "yellowish_skin", "pus_filled_pimples", "blackheads", "skin_peeling"],
    "General": ["fatigue", "weight_gain", "weight_loss", "high_fever", "mild_fever", "sweating", "dehydration"],
    "Other": symptoms.filter(s => !["headache", "dizziness", "loss_of_smell", "lack_of_concentration", "visual_disturbances", 
      "slurred_speech", "continuous_sneezing", "cough", "breathlessness", "phlegm", "mucoid_sputum", "rusty_sputum", 
      "blood_in_sputum", "stomach_pain", "acidity", "vomiting", "nausea", "indigestion", "constipation", "abdominal_pain", 
      "diarrhoea", "itching", "skin_rash", "nodal_skin_eruptions", "yellowish_skin", "pus_filled_pimples", "blackheads", 
      "skin_peeling", "fatigue", "weight_gain", "weight_loss", "high_fever", "mild_fever", "sweating", "dehydration"].includes(s))
  };

  const symptomOptions = symptoms.map((symptom) => ({
    value: symptom.toLowerCase(),
    label: symptom.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
    category: Object.keys(symptomCategories).find(cat => 
      symptomCategories[cat].includes(symptom)) || "Other"
  }));

  // Group options by category
  const groupedOptions = Object.keys(symptomCategories).map(category => ({
    label: category,
    options: symptomOptions.filter(option => option.category === category)
  }));

  const handleInputChange = (selectedOptions) => {
    const selectedSymptoms = selectedOptions ? selectedOptions.map((option) => option.value) : [];
    setFormData(selectedSymptoms);
    setSymptomCount(selectedSymptoms.length);
    
    // Clear error if enough symptoms are selected
    if (selectedSymptoms.length >= 3) {
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.length < 3) {
      setError("Please select at least 3 symptoms for a more accurate prediction");
      return;
    }
    
    setLoading(true);
    setPredictionData(null);
    setError(null);

    try {
      console.log("Sending symptoms:", formData);
      const response = await axios.post("http://127.0.0.1:5001/api/predict", {
        symptoms: formData,
      });
      
      console.log("API Response:", response.data);
      setPredictionData(response.data);
    } catch (error) {
      console.error("Error during prediction:", error);
      setError(error.response?.data?.error || "Failed to predict. Please check your connection or try again.");
    } finally {
      setLoading(false);
    }
  };

  // Common symptoms for quick selection
  const quickSymptoms = [
    "headache", "fever", "cough", "fatigue", "joint_pain", "nausea", "dizziness", "stomach_pain"
  ];

  const handleQuickAdd = (symptom) => {
    // Check if symptom is already in the selection
    if (!formData.includes(symptom)) {
      const newSelection = [...formData, symptom];
      setFormData(newSelection);
      setSymptomCount(newSelection.length);
      
      // Find the corresponding select option
      const option = symptomOptions.find(opt => opt.value === symptom);
      // The Select component needs to be updated
      const selectComponent = document.querySelector('.basic-multi-select');
      if (selectComponent && selectComponent.__reactProps$) {
        // This is a hacky way and might not work; ideally use the Select ref
        const selectValue = selectComponent.__reactProps$.value || [];
        selectComponent.__reactProps$.onChange([...selectValue, option]);
      }
      
      if (newSelection.length >= 3) {
        setError(null);
      }
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-blue-700">Wellify Health Prediction</h1>
      <p className="text-gray-600 mb-6">Select at least 3 symptoms for an accurate health analysis</p>
      
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6 border-t-4 border-blue-600">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Select Your Symptoms
        </h2>

        {/* Quick add section */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quick add common symptoms:
          </label>
          <div className="flex flex-wrap gap-2">
            {quickSymptoms.map(symptom => (
              <button
                key={symptom}
                type="button"
                onClick={() => handleQuickAdd(symptom)}
                className={`px-3 py-1 rounded-full text-sm ${
                  formData.includes(symptom) 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {symptom.replace(/_/g, " ")}
                {formData.includes(symptom) && (
                  <span className="ml-1">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What symptoms are you experiencing? <span className="text-blue-600 font-semibold">({symptomCount}/3 minimum required)</span>
            </label>
            <Select
              isMulti
              options={groupedOptions}
              onChange={handleInputChange}
              className="basic-multi-select"
              classNamePrefix="select"
              placeholder="Type or select symptoms..."
              value={formData.map(value => {
                const option = symptomOptions.find(opt => opt.value === value);
                return option;
              })}
            />
            {error && (
              <div className="mt-2 p-2 bg-red-50 border-l-4 border-red-500 text-red-700">
                <p className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {error}
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center mt-6">
            <div className="flex-grow">
              {symptomCount > 0 && symptomCount < 3 && (
                <p className="text-amber-600 text-sm">
                  Please select {3 - symptomCount} more symptom(s)
                </p>
              )}
              {symptomCount >= 3 && (
                <p className="text-green-600 text-sm">
                  ✓ Ready to analyze
                </p>
              )}
            </div>
            <button
              type="submit"
              className={`px-6 py-3 rounded-md text-white font-medium flex items-center ${
                symptomCount >= 3 
                  ? 'bg-blue-600 hover:bg-blue-700' 
                  : 'bg-blue-300 cursor-not-allowed'
              }`}
              disabled={loading || symptomCount < 3}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing...
                </>
              ) : (
                <>
                  Analyze Symptoms
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {predictionData && (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 transition-all duration-300">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4">
            <h2 className="text-xl font-bold flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Analysis Results
            </h2>
          </div>
          
          <div className="p-6">
            {/* Disease Name */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Predicted Condition
              </h3>
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
                <p className="text-xl font-medium text-blue-800">{predictionData.disease}</p>
              </div>
            </div>
            
            {/* Description */}
            {predictionData.description && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Description
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="text-gray-700">{predictionData.description}</p>
                </div>
              </div>
            )}
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Precautions */}
              {predictionData.precautions && predictionData.precautions.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    Precautions
                  </h3>
                  <ul className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                    {predictionData.precautions.map((precaution, index) => (
                      <li key={index} className="mb-2 flex items-start">
                        <span className="mr-2 font-bold text-yellow-600">•</span>
                        <span>{precaution}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Medications */}
              {predictionData.medications && predictionData.medications.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    Medications
                  </h3>
                  <ul className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                    {predictionData.medications.map((medication, index) => (
                      <li key={index} className="mb-2 flex items-start">
                        <span className="mr-2 font-bold text-green-600">•</span>
                        <span>{medication}</span>
                      </li>
                    ))}
                    <li className="mt-4 text-sm text-gray-500 italic flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Please consult with a healthcare professional before taking any medication.
                    </li>
                  </ul>
                </div>
              )}
              
              {/* Diet */}
              {predictionData.diet && predictionData.diet.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Diet Recommendations
                  </h3>
                  <ul className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
                    {predictionData.diet.map((diet, index) => (
                      <li key={index} className="mb-2 flex items-start">
                        <span className="mr-2 font-bold text-red-600">•</span>
                        <span>{diet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Workout */}
              {predictionData.workout && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Exercise Recommendations
                  </h3>
                  <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
                    {Array.isArray(predictionData.workout) ? (
                      <ul>
                        {predictionData.workout.map((workout, index) => (
                          <li key={index} className="mb-2 flex items-start">
                            <span className="mr-2 font-bold text-purple-600">•</span>
                            <span>{workout}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>{predictionData.workout}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-500 flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>
                  <strong>Disclaimer:</strong> This prediction is based on machine learning algorithms and should not replace professional medical advice. Please consult with a healthcare professional for accurate diagnosis and treatment.
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PredictDisease;