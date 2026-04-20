import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config";

export default function ModelPredictPage() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [selectedModel, setSelectedModel] = useState("EfficientNet");
  const [error, setError] = useState("");

  const models = [
    "EfficientNet",
    "ResNet50",
    "DenseNet201",
    "DenseNet169",
    "InceptionV3",
    "XceptionNet",
  ];

  // ✅ Preview image cleanup
  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const predictSingleModel = async () => {
    if (!file) {
      setError("Please select an image!");
      return;
    }
    setLoading(true);
    setResult(null);
    setError("");

    try {
      const fd = new FormData();
      fd.append("file", file);

      const res = await axios.post(
        `${API_URL}/predict_model?model_name=${selectedModel}`,
        fd,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setResult(res.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || "Prediction failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-green-50 py-12 px-6 lg:px-12">
      {/* Header */}
      <header className="mb-12 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-green-900 mb-4">
          🌱 Detect Disease with a Selected Model
        </h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          Choose a model, upload an image, and get an instant prediction for the plant disease.
        </p>
      </header>

      {/* Two-column Layout */}
      <div className="flex flex-col lg:flex-row gap-10 max-w-5xl mx-auto">
        {/* Left: Upload & Model Selection */}
        <section className="flex-1 bg-white shadow-md p-8 border border-green-200">
          <h2 className="text-2xl font-bold text-green-800 mb-4 text-center">
            Upload Leaf Image
          </h2>

          {/* File Upload */}
          <label className="flex flex-col items-center justify-center h-72 w-full border-2 border-dashed cursor-pointer hover:bg-green-50 transition-all">
            {preview ? (
              <img
                src={preview}
                alt="preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12V4m0 0l-3 3m3-3l3 3"
                  />
                </svg>
                <p className="mt-3 text-base text-gray-600">
                  Drag & Drop or{" "}
                  <span className="font-semibold text-green-700">
                    Browse Files
                  </span>
                </p>
                <p className="text-xs text-gray-500">PNG / JPG ≤ 5MB</p>
              </>
            )}
            <input
              hidden
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </label>

          {/* Dropdown for model selection */}
          <div className="mt-6">
            <label className="block mb-2 font-medium text-green-800">
              Select Model:
            </label>
            <select
              className="border rounded-md p-3 w-full text-lg"
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
            >
              {models.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          {file && (
            <button
              onClick={predictSingleModel}
              disabled={loading}
              className="mt-6 w-full bg-green-700 py-3 text-lg font-semibold text-white hover:bg-green-800 transition-all"
            >
              {loading ? "Predicting..." : "🚀 Detect Disease"}
            </button>
          )}

          {error && (
            <p className="mt-4 rounded bg-red-100 p-4 text-red-700">{error}</p>
          )}
        </section>

        {/* Right: Results */}
        <section className="flex-1 bg-white shadow-md p-8 border border-green-200 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">
            Prediction Result
          </h2>

          {loading && (
            <div className="flex flex-col items-center justify-center flex-1">
              <p className="text-center text-lg text-gray-500">Processing…</p>
            </div>
          )}

          {!loading && !result && (
            <div className="flex flex-col items-center justify-center flex-1">
              <p className="text-gray-500 text-lg">
                No prediction yet. Upload an image & choose a model.
              </p>
            </div>
          )}

          {result && (
            <div className="flex flex-col justify-center items-center flex-1 bg-green-50 border border-green-200 p-6 rounded-lg shadow-inner text-center">
              <p className="text-3xl font-bold text-green-900">
                ✅ {result.label}
              </p>
              <p className="text-lg text-gray-700 mt-4">
                <span className="font-semibold">Model:</span> {result.model}
              </p>
              <p className="text-lg text-gray-700 mt-2">
                <span className="font-semibold">Confidence:</span>{" "}
                {(result.confidence * 100).toFixed(2)}%
              </p>
            </div>
          )}
        </section>
      </div>

      {/* Bottom Navigation */}
      <div className="mt-16 flex justify-center">
        <button
          onClick={() => (window.location.href = "/more-models")}
          className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-6 py-3 text-lg font-semibold transition-all rounded-md shadow-md hover:shadow-lg"
        >
          Try with All Models
          {/* Right Arrow Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 transition-transform group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </main>
  );
}
