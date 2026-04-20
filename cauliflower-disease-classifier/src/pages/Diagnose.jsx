import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../config";

/* Diagnose Page – CauliCare (pro) --------------------------------------
   • Two‑column layout:  ➜  Upload (left)  |  Result (right)
   • Square edges everywhere (no rounded corners)
   • Larger typography inside the modal
------------------------------------------------------------------------*/

// Normalise backend labels
const norm = (s) => s.toLowerCase().replace(/[^a-z]/g, "");

// Guidance (EN | HI | KN). Translations are concise; adjust as needed.
const G = (en, hi, kn) => ({ en, hi, kn });
const GUIDE = {
  [norm("Alternaria Leaf Spot")]: G(
    `• Remove infected leaves and destroy.
• Spray copper oxychloride (0.3 %) every 10–14 days in humid weather.
• Improve spacing for better airflow.`,
    `• संक्रमित पत्तों को तुरन्त हटाकर नष्ट करें।
• आर्द्र मौसम में 10–14 दिन के अन्तराल पर कॉपर ऑक्सीक्लोराइड (0.3 %) का छिड़काव करें।
• पौधों में पर्याप्त दूरी रखें ताकि वायु संचार बना रहे।`,
    `• ಸೋಂಕಿತ ಎಲೆಗಳನ್ನು ತೆಗೆದು ನಾಶಮಾಡಿ.
• ತೇವವಾದ ಹವಾಮಾನದಲ್ಲಿ ಪ್ರತೀ 10–14 ದಿನಗಳಿಗೆ ಕಾಪರ್ ಆಕ್ಸಿಕ್‌ಲೋರೈಡ್ (0.3 %) ಪೊಯ್‌ಗೊಳಿಸಿ.
• ಉತ್ತಮ ಗಾಳಿಚಲುವೆಗೆ 十ರ ಹಾಳು ಆಟಿಕೆ.`
  ),
  [norm("Bacterial Spot Rot")]: G(
    `• Use disease‑free seeds.
• Avoid overhead irrigation; prefer drip.
• Copper hydroxide + mancozeb mix can slow spread.`,
    `• रोग‑मुक्त बीज का प्रयोग करें।
• ऊपर से सिंचाई न करें, ड्रिप पद्धति अपनाएं।
• कॉपर हाइड्रॉक्साइड + मैंकोज़ेब मिश्रण रोग फैलाव कम करता है।`,
    `• ರೋಗರಹಿತ ಬೀಜಗಳನ್ನು ಉಪಯೋಗಿಸಿ.
• ಮೈದಳ ಸಿಂಪಿಗೆಯ ನೀರಾವರಿ ತಪ್ಪಿಸಿ, ಡ್ರಿಪ್ ಬಳಸಿ.
• ಕಾಪರ್ ಹೈಡ್ರಾಕ್ಸೈಡ್ + ಮ್ಯಾಂಕೊಜೆಬ್ ಮಿಶ್ರಣವು ರೋಗ ಹರಡುವಿಕೆ ತಗ್ಗಿಸುತ್ತದೆ.`
  ),
  [norm("Black Rot")]: G(
    `• Rogue out infected plants; deep‑bury residues.
• 3‑year rotation away from crucifers.
• Weekly copper sprays after first symptoms.`,
    `• संक्रमित पौधों को उखाड़कर गहराई में गाड़ें।
• क्रुसीफ़र फसलों से कम से कम 3 साल का फसल चक्र अपनाएं।
• लक्षण दिखते ही साप्ताहिक कॉपर स्प्रे करें।`,
    `• ಸೋಂಕಿತ ಸಸ್ಯಗಳನ್ನು ತೆಗಿದು ತಳಕ್ಕೂಳಿಗೆ ಹುರಿ.
• ಕ್ರುಸಿಫರ್ ಬೆಳೆಗಳಿಂದ 3 ವರ್ಷದ ಪರಿಸರ ಚಕ್ರ ಪಾಲಿಸು.
• ಮೊದಲ ಲಕ್ಷಣದ ನಂತರ ವಾರಕ್ಕೊಮ್ಮೆ ಕಾಪರ್ ಪಿಂಪಾಟ.`
  ),
  [norm("Cabbage Aphid Colony")]: G(
    `• Encourage predators (lady beetles, lacewings).
• Neem oil (2 ml/L) on colonies.
• Avoid excess nitrogen fertiliser.`,
    `• लाभदायक कीट (लेडी बर्ड, लेसविंग) को प्रोत्साहित करें।
• कॉलोनी पर नीम तेल (2 मि.ली./ली) छिड़कें।
• नाइट्रोजन की अधिक मात्रा न दें।`,
    `• ಉಪಯುಕ್ತ ಕೀಟಗಳನ್ನು (ಲೇಡಿ ಬೀಟಲ್, ಲೇಸ್‌ವಿಂಗ್) ಉತ್ತೇಜಿಸಿ.
• ವಳಪಿಡಿಗಳಿಗೆ ನೀಮ್ ಎಣ್ಣೆ (2 ಮಿಲಿ/ಲಿ) ರಸೆ ಮಾಡು.
• ಅತಿ ಹೆಚ್ಚಿನ ನೈಸರ್ಗಿಕ ತುಳಸಿಯುಕ್ತ ಅಂಶ ತಪ್ಪಿಸಿ.`
  ),
  [norm("Downy Mildew")]: G(
    `• Plant resistant varieties if available.
• Metalaxyl‑M + Mancozeb or Azoxystrobin every 7–10 days.
• Irrigate early so leaves dry before night.`,
    `• प्रतिरोधी किस्म लगाएं (यदि उपलब्ध हो)।
• 7–10 दिन पर मेटालाक्सिल‑एम + मैंकोज़ेब या एजॉक्सिस्ट्रोबिन का छिड़काव करें।
• पत्तों को रात से पहले सूखने दें।`,
    `• ನಿರೋಧಕ ಜಾತಿಗಳನ್ನು ನೆಡಿರಿ (ಲಭ್ಯವಿದ್ದರೆ).
• ಪ್ರತೀ 7–10 ದಿನಗಳಿಗೊಮ್ಮೆ ಮೆಟಲ್ಯಾಕ್ಸಿಲ್‑ಎಂ + ಮ್ಯಾಂಕೋಜೆಬ್ ಅಥವಾ ಅಜಾಕ್ಸಿಸ್ಟ್ರೋಬಿನ್ ಹನ್ನುವುದು.
• ಎಲೆಗಳು ರಾತ್ರಿ ಮುನ್ನ ಒಣಗುವಂತೆ ಬೆಳಿಗ್ಗೆ ನೀರಾವರಿ ಕಲ್ಪಿಸಿ.`
  ),
  [norm("Healthy")]: G(
    `• No disease detected — continue regular scouting.
• Keep canopy dry and practise crop rotation.`,
    `• कोई रोग नहीं मिला — नियमित निगरानी जारी रखें।
• छत्र को सूखा रखें व फसल चक्र अपनाएं।`,
    `• ರೋಗ ಪತ್ತೆಯಾಗಿಲ್ಲ — ನಿಯಮಿತ ಪರೀಕ್ಷೆ ಮುಂದುವರಿಸಿ.
• ಕೊಂಬೂರನ್ನು ಒಣಗಿಯಾಗಿ ಇಟ್ಟು, ಬೆಳೆ ಪರಿವರ್ತನೆ ಪಾಲಿಸಿ.`
  ),
  [norm("Club Root")]: G(
    `• Lime soil to pH ≥ 7.2.
• Improve drainage; avoid soil movement between fields.
• 3‑year rotation with non‑host crops.`,
    `• मिट्टी का pH ≥ 7.2 रखने के लिए चुना डालें।
• जल निकास सुधारें; खेतों के बीच मिट्टी का आवागमन रोकें।
• 3 साल तक गैर‑मेज़बान फसलों का चक्र अपनाएं।`,
    `• ಮಣ್ಣಿನ pH ಅನ್ನು ≥ 7.2ಕ್ಕೆ ತರುವುದು ಸ್ಮಾನದಿಂದ.
• ನೀರುಚರಟೆ ಸುಧಾರಿಸಿ; ಹೊಲಗಳ ನಡುವೆ ಮಣ್ಣು ಚಲಾವಣೆ ತಪ್ಪಿಸಿ.
• 3 ವರ್ಷಗಳವರೆಗೆ ಆತಿಥ್ಯವಿಲ್ಲದ ಬೆಳೆಗಳ ರೋಟೇಶನ್.`
  ),
  [norm("Ring Spot")]: G(
    `• Remove infected leaves.
• Chlorothalonil (0.2 %) every 10 days in wet spells.
• Ensure good airflow by wider spacing.`,
    `• संक्रमित पत्तों को हटाएं।
• नम मौसम में क्लोरोथैलॉनिल (0.2 %) का 10 दिन पर छिड़काव करें।
• चौड़ी कतार दूरी से वायु संचार बढ़ाएं।`,
    `• ಸೋಂಕಿತ ಎಲೆಗಳನ್ನು ತೆಗೆಯಿರಿ.
• ತೇವದ ಹವಾಮಾನದಲ್ಲಿ ಪ್ರತೀ 10 ದಿನಕ್ಕೆ ಕ್ಲೊರೊಥ್ಯಾಲೊನಿಲ್ (0.2 %) ಹಚ್ಚಿರಿ.
• ಅಗಲ ಹಂತ spacing ಮೂಲಕ ಉತ್ತಮ ಗಾಳಿಚಲನೆ ಪಡೆಯಿರಿ.`
  ),
};
// import { useState, useEffect } from "react";

export default function Diagnose() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);

  /* preview URL cleanup */
  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  /* call backend */
  const detect = async () => {
    if (!file) return;
    setLoading(true);
    setResult(null);
    setError("");

    try {
      const fd = new FormData();
      fd.append("file", file);

      const res = await fetch(`${API_URL}/predict`, {
        method: "POST",
        body: fd,
      });

      if (!res.ok) {
        // Try to parse error JSON
        let errMessage = "Unknown error occurred";
        try {
          const errJson = await res.json();
          errMessage = errJson.detail || errMessage;
        } catch {
          errMessage = await res.text(); // fallback
        }
        throw new Error(errMessage);
      }

      const d = await res.json();
      setResult({ label: d.label, confidence: +d.confidence });
    } catch (e) {
      // Display backend error (like "Not a valid cauliflower leaf")
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const guidance = result ? GUIDE[norm(result.label)] : null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-lime-50 to-green-100 flex flex-col items-center py-16 px-6 lg:px-12">
      {/* Header */}
      <header className="mb-12 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-green-900 mb-4">
          CauliCare Diagnosis
        </h1>
        <p className="text-lg text-gray-700">
          Upload a leaf photo and get instant disease guidance.
        </p>
      </header>

      {/* Two‑column area (upload | result) */}
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl">
        {/* Left: upload */}
        <section className="flex-1 bg-white/70 backdrop-blur shadow-xl p-8 border">
          <label className="flex flex-col items-center justify-center h-64 w-full border-2 border-dashed cursor-pointer hover:bg-green-50">
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
                  className="h-14 w-14 text-green-600"
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
                  Drag & drop or{" "}
                  <span className="font-semibold text-green-700">browse</span>
                </p>
                <p className="text-xs text-gray-500">PNG / JPG ≤ 5 MB</p>
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
              onClick={detect}
              disabled={loading}
              className="mt-6 w-full bg-green-700 py-3 text-lg font-semibold text-white hover:bg-green-800"
            >
              {loading ? "Detecting…" : "Detect Disease"}
            </button>
          )}
        </section>

        {/* Right: result / placeholder */}
        <section className="flex-1 bg-white/80 backdrop-blur p-8 shadow-lg border min-h-[18rem]">
          {/* 🔴 Show backend error if invalid image */}
          {error && (
            <p className="mb-4 rounded bg-red-100 border border-red-300 p-4 text-red-700 font-medium">
              ⚠️ {error}
            </p>
          )}

          {/* ✅ Valid result */}
          {result ? (
            <div>
              <h2 className="text-2xl font-bold text-green-900 mb-4">Result</h2>

              {/* Disease + confidence */}
              <p className="mb-1 text-lg text-gray-800">
                <span className="font-semibold">Disease:</span> {result.label}
              </p>
              <p className="text-lg text-gray-800">
                <span className="font-semibold">Confidence:</span>{" "}
                {(result.confidence * 100).toFixed(1)}%
              </p>

              {/* Confidence bar */}
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-1">Confidence Level</p>
                <div className="w-full bg-gray-200 h-3 rounded">
                  <div
                    className="h-3 rounded bg-green-600"
                    style={{
                      width: `${(result.confidence * 100).toFixed(1)}%`,
                    }}
                  />
                </div>
              </div>

              {/* One‑line advice tip */}
              {guidance && (
                <p className="mt-4 italic text-sm text-gray-600">
                  Tip: {guidance.en.split("\n")[0]}
                </p>
              )}

              {/* Protection‑guide modal button */}
              {guidance && (
                <button
                  onClick={() => setShow(true)}
                  className="mt-6 w-full bg-lime-500 py-3 font-semibold text-green-900 hover:bg-lime-400"
                >
                  How to protect
                </button>
              )}
            </div>
          ) : (
            // Placeholder when no result yet
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-500">
              <p className="text-lg">
                {loading
                  ? "Analyzing image…"
                  : "Awaiting image upload…"}
              </p>
            </div>
          )}
        </section>
      </div>

      {/* Modal: protection guide */}
      {show && guidance && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
          <div className="max-w-xl w-full bg-white p-8 shadow-2xl overflow-y-auto max-h-[90vh] border">
            <h3 className="text-3xl font-bold text-green-900">
              Protection Guide – {result.label}
            </h3>
            <h4 className="mt-6 text-xl font-semibold text-green-800">
              English
            </h4>
            <pre className="whitespace-pre-wrap text-lg leading-relaxed text-gray-800 mt-1">
              {guidance.en}
            </pre>
            <h4 className="mt-6 text-xl font-semibold text-green-800">हिंदी</h4>
            <pre className="whitespace-pre-wrap text-lg leading-relaxed text-gray-800 mt-1">
              {guidance.hi}
            </pre>
            <h4 className="mt-6 text-xl font-semibold text-green-800">ಕನ್ನಡ</h4>
            <pre className="whitespace-pre-wrap text-lg leading-relaxed text-gray-800 mt-1">
              {guidance.kn}
            </pre>
            <button
              onClick={() => setShow(false)}
              className="mt-8 w-full bg-green-700 py-3 text-lg font-semibold text-white hover:bg-green-800"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Bottom "Try with More Models" Section */}
      <div className="mt-16 flex justify-center w-full">
        <button
          onClick={() => (window.location.href = "/predict")}
          className="px-8 py-4 text-xl font-bold text-green-900 bg-lime-400 hover:bg-lime-500 transition-all border border-green-700"
        >
          🔄 Try with More Models
        </button>
      </div>
    </main>
  );
}
