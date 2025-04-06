import React, { useState } from "react";
import { axiosInstancerp } from "../lib/rpaxios";

const ReportAnalyzer = ({ userRole }) => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError(null);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    if (!file.name.endsWith(".pdf")) {
      setError("Please upload a PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const response = await axiosInstancerp.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      });
      setResult(response.data);
      setError(null);
    } catch (err) {
      console.error("Upload error:", err);
      setError(
        err.response?.data?.error ||
          "An error occurred while uploading the file. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (userRole !== "doctor") {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-500 text-lg font-semibold">
            You do not have permission to access this page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-600 p-6">
          <h1 className="text-2xl font-bold text-white">
            Medical Report Analyzer
          </h1>
          <p className="text-blue-100 text-sm mt-1">
            Upload a medical report PDF to extract and analyze key information
          </p>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Upload Medical Report
            </h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
              <input
                id="file-upload"
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="block w-full text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {file && (
                <div className="mt-3 text-green-600 text-sm">
                  Selected file: {file.name}
                </div>
              )}
            </div>

            <button
              onClick={handleUpload}
              disabled={loading || !file}
              className={`mt-4 w-full py-2 px-4 rounded-md font-medium text-white ${
                loading || !file
                  ? "bg-gray-400"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Processing..." : "Analyze Report"}
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {result && (
            <div className="mt-6 border border-gray-200 rounded-lg">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-800">
                  Analysis Results
                </h2>
              </div>

              <div className="p-4">
                <h3 className="text-md font-semibold text-blue-700 mb-2">
                  Patient Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {Object.entries(result.extracted_info)
                    .filter(([key]) =>
                      [
                        "Patient Name",
                        "Age",
                        "Diagnosis",
                        "Examination Date",
                      ].includes(key)
                    )
                    .map(([key, value]) => (
                      <div
                        key={key}
                        className="bg-gray-50 p-3 rounded border border-gray-200"
                      >
                        <p className="text-sm text-gray-500">{key}</p>
                        <p className="font-medium">{value}</p>
                      </div>
                    ))}
                </div>

                <h3 className="text-md font-semibold text-blue-700 mb-2">
                  Doctor Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {Object.entries(result.extracted_info)
                    .filter(([key]) =>
                      [
                        "Doctor Name",
                        "MCR No",
                        "Doctor-Patient Relationship",
                      ].includes(key)
                    )
                    .map(([key, value]) => (
                      <div
                        key={key}
                        className="bg-gray-50 p-3 rounded border border-gray-200"
                      >
                        <p className="text-sm text-gray-500">{key}</p>
                        <p className="font-medium">{value}</p>
                      </div>
                    ))}
                </div>

                <h3 className="text-md font-semibold text-blue-700 mb-2">
                  Report Summary
                </h3>
                <div className="bg-blue-50 p-4 rounded border border-blue-100">
                  <p>{result.generated_summary}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportAnalyzer;
