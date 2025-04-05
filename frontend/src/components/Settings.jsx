import React, { useState } from 'react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    diseasePrediction: true,
    reportAnalyzer: true,
    chatbot: true,
    medicineRecommender: true,
    cancerDetection: true,
  });

  const toggleSetting = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  return (
    <div className="min-h-screen p-8 bg-base-200 text-base-content">
      <div className="max-w-3xl mx-auto bg-base-100 shadow-xl rounded-2xl p-6">
        <h1 className="text-3xl font-bold mb-6 text-primary">⚙️ Wellify Settings</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Disease Prediction */}
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Disease Prediction</span>
              <input type="checkbox" className="toggle toggle-primary"
                checked={settings.diseasePrediction}
                onChange={() => toggleSetting("diseasePrediction")}
              />
            </label>
          </div>

          {/* Report Analyzer */}
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Report Analyzer</span>
              <input type="checkbox" className="toggle toggle-info"
                checked={settings.reportAnalyzer}
                onChange={() => toggleSetting("reportAnalyzer")}
              />
            </label>
          </div>

          {/* Medical Chatbot */}
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Medical AI Chatbot</span>
              <input type="checkbox" className="toggle toggle-accent"
                checked={settings.chatbot}
                onChange={() => toggleSetting("chatbot")}
              />
            </label>
          </div>

          {/* Medicine Recommendation */}
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Medicine Recommender</span>
              <input type="checkbox" className="toggle toggle-success"
                checked={settings.medicineRecommender}
                onChange={() => toggleSetting("medicineRecommender")}
              />
            </label>
          </div>

          {/* Cancer Detection */}
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Cancer Detection Model</span>
              <input type="checkbox" className="toggle toggle-error"
                checked={settings.cancerDetection}
                onChange={() => toggleSetting("cancerDetection")}
              />
            </label>
          </div>
        </div>

        <div className="divider my-6" />

        {/* Profile & Theme Section */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-semibold">👤 User Role: <span className="badge badge-primary">Doctor / Patient</span></h2>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Dark Mode</span>
              <input type="checkbox" className="toggle theme-controller toggle-md" value="dark" />
            </label>
          </div>
        </div>

        <button className="btn btn-error w-full mt-4">🚪 Logout</button>
      </div>
    </div>
  );
}
