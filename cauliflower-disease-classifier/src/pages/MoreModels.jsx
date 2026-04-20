import { useState, useEffect } from "react";
import { API_URL } from "../config";

export default function MoreModels() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState({});
  const [error, setError] = useState("");

  // Preview cleanup
  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const runAllModels = async () => {
    if (!file) return;
    setLoading(true);
    setResults({});
    setError("");

    try {
      const fd = new FormData();
      fd.append("file", file);

      // ✅ Call only ONCE to /predict_all
      const res = await fetch(`${API_URL}/predict_all`, {
        method: "POST",
        body: fd,
      });

      if (!res.ok) throw new Error(await res.text());

      // ✅ Backend returns: { "EfficientNet": {label, confidence}, ... }
      const data = await res.json();
      console.log("✅ Results from backend:", data);
      setResults(data);
    } catch (err) {
      console.error(err);
      setError("Failed to run models: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Convert dict to array for easier table rendering
  const resultEntries = Object.entries(results); // [["EfficientNet", {label, confidence}], ...]

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-green-50 py-12 px-6 lg:px-12">
      {/* Header */}
      <header className="mb-12 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-green-900 mb-4">
          🔬 Try with Multiple Models
        </h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          Upload one image and evaluate it across multiple ML models. Compare
          predictions, confidence, and inference time easily.
        </p>
      </header>

      {/* Two-column Layout */}
      <div className="flex flex-col lg:flex-row gap-10 max-w-7xl mx-auto">
        {/* Left: Upload Section */}
        <section className="flex-1 bg-white shadow-md p-8 border border-green-200">
          <h2 className="text-2xl font-bold text-green-800 mb-4 text-center">
            Upload Leaf Image
          </h2>
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

          {file && (
            <button
              onClick={runAllModels}
              disabled={loading}
              className="mt-6 w-full bg-green-700 py-3 text-lg font-semibold text-white hover:bg-green-800 transition-all"
            >
              {loading ? "Running all models…" : "🚀 Run All Models"}
            </button>
          )}

          {error && (
            <p className="mt-4 rounded bg-red-100 p-4 text-red-700">{error}</p>
          )}
        </section>

        {/* Right: Results Comparison */}
        <section className="flex-1 bg-white shadow-md p-8 border border-green-200">
          <h2 className="text-2xl font-bold text-green-800 mb-4 text-center">
            Results Comparison
          </h2>

          {loading && (
            <p className="text-center text-lg text-gray-500">Processing…</p>
          )}

          {!loading && resultEntries.length === 0 && (
            <div className="text-center text-gray-500 mt-10">
              <p className="text-lg">Awaiting model results…</p>
            </div>
          )}

          {resultEntries.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-green-100 text-green-900 text-lg">
                    <th className="border p-3 text-left">Model</th>
                    <th className="border p-3 text-left">Predicted Disease</th>
                    <th className="border p-3 text-left">Confidence (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {resultEntries.map(([modelName, result], idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-green-50 transition-all text-gray-800 text-lg"
                    >
                      <td className="border p-3 font-semibold">{modelName}</td>
                      <td className="border p-3">{result.label}</td>
                      <td className="border p-3">
                        {(result.confidence * 100).toFixed(2)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>

      {/* Back button */}
      <div className="mt-16 flex justify-center">
        <button
          onClick={() => (window.location.href = "/diagnose")}
          className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 text-lg font-semibold transition-all"
        >
          ← Back to Single Model
        </button>
      </div>
    </main>
  );
}
