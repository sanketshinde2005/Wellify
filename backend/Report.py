from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import fitz  # PyMuPDF
import re
from werkzeug.utils import secure_filename

app = Flask(__name__)
# Fix #1: Configure CORS properly with the specific origin
CORS(app, origins=["http://localhost:5173"], supports_credentials=True)

app.config['UPLOAD_FOLDER'] = 'uploads'
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# --------- PDF Text Extraction ---------
def extract_text_from_pdf(file_path):
    doc = fitz.open(file_path)
    text = ""
    for page in doc:
        text += page.get_text()
    return text

# --------- Extract Info using Regex ---------
def extract_info(text):
    info = {}

    def match(regex):
        found = re.search(regex, text)
        return found.group(1).strip() if found else "Not found"

    info['Patient Name'] = match(r"Full name of patient:\s*(.*)")
    info['Age'] = match(r"Age of patient:\s*(.*)")
    info['Doctor Name'] = match(r"Full name of doctor:\s*(.*)")
    info['MCR No'] = match(r"MCR No:\s*(.*)")
    info['Diagnosis'] = match(r"Diagnosis:\s*(.*)")
    info['Examination Date'] = match(r"Date of physical examination:\s*(.*)")
    info['Doctor-Patient Relationship'] = match(r"relationship.*?:\s*(.*)")

    return info

# --------- Generate Simple Summary ---------
def generate_summary(info):
    return (
        f"{info['Patient Name']} is a {info['Age']} year old patient diagnosed with {info['Diagnosis']}. "
        f"The physical examination was done on {info['Examination Date']} by Dr. {info['Doctor Name']} "
        f"(MCR No: {info['MCR No']}). "
        f"The relationship between the doctor and patient is: {info['Doctor-Patient Relationship']}."
    )

# --------- Routes ---------
@app.route('/upload', methods=['POST', 'OPTIONS'])
def upload_pdf():
    # Fix #2: Handle preflight OPTIONS requests
    if request.method == 'OPTIONS':
        return '', 200
        
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400
    
    file = request.files['file']
    if not file.filename.endswith('.pdf'):
        return jsonify({'error': 'Only PDF files allowed'}), 400

    filename = secure_filename(file.filename)
    path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(path)

    # Process text
    text = extract_text_from_pdf(path)
    info = extract_info(text)
    summary = generate_summary(info)

    # Delete file
    os.remove(path)

    return jsonify({
        'status': 'success',
        'extracted_info': info,
        'generated_summary': summary
    })

@app.route('/', methods=['GET', 'OPTIONS'])
def home():
    # Fix #3: Handle preflight OPTIONS requests
    if request.method == 'OPTIONS':
        return '', 200
    return jsonify({"message": "Welcome to the Medical Report Analyzer API!"})

if __name__ == '__main__':
    app.run(debug=True, port=5002)