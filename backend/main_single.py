from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os
import io
import numpy as np
from PIL import Image

# Force TensorFlow to use legacy Keras
os.environ['TF_USE_LEGACY_KERAS'] = '1'

import tensorflow as tf
from tensorflow import keras
from tensorflow.keras.preprocessing import image as keras_image
from tensorflow.keras.applications.efficientnet_v2 import preprocess_input

# ───────────────────────────────────────────────
# Dataset Config
# ───────────────────────────────────────────────
CLASS_NAMES = [
    "Alternaria_Leaf_Spot",
    "Bacterial spot rot",
    "Black Rot",
    "Cabbage aphid colony",
    "Downy Mildew",
    "No disease",
    "club root",
    "ring spot"
]
NUM_CLASSES = len(CLASS_NAMES)
MAX_MB = 5  # Max upload size (MB)

# ───────────────────────────────────────────────
# Model Configuration (Single Model)
# ───────────────────────────────────────────────
MODELS_DIR = os.path.join(os.path.dirname(__file__), "models")
MODEL_PATH = os.path.join(MODELS_DIR, "01Efficient5050.h5")
MODEL_SIZE = (224, 224)

# ───────────────────────────────────────────────
# Load model once at startup
# ───────────────────────────────────────────────
print("\n🔄 Loading EfficientNet model...")
if not os.path.exists(MODEL_PATH):
    raise RuntimeError(f"❌ Missing model file: {MODEL_PATH}")

model = keras.models.load_model(MODEL_PATH, compile=False)
print("✅ EfficientNet model loaded successfully!\n")

# ───────────────────────────────────────────────
# FastAPI Setup
# ───────────────────────────────────────────────
app = FastAPI(title="CauliCare Disease Classifier API", version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for simplicity
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ───────────────────────────────────────────────
# Helper: Validate and load image
# ───────────────────────────────────────────────
def load_image_from_upload(uploaded: UploadFile):
    if uploaded.size and uploaded.size > MAX_MB * 1024 * 1024:
        raise HTTPException(status_code=413, detail="File too large (>5 MB)")

    img_bytes = uploaded.file.read()
    uploaded.file.close()
    img = Image.open(io.BytesIO(img_bytes)).convert("RGB")
    img = img.resize(MODEL_SIZE)
    return keras_image.img_to_array(img)

# ───────────────────────────────────────────────
# Health Check Endpoint
# ───────────────────────────────────────────────
@app.get("/")
async def root():
    return {"status": "healthy", "model": "EfficientNet", "classes": CLASS_NAMES}

@app.get("/health")
async def health():
    return {"status": "ok"}

# ───────────────────────────────────────────────
# Prediction Endpoint
# ───────────────────────────────────────────────
@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=415, detail="Only image files are supported")

    try:
        # Preprocess uploaded image
        arr = load_image_from_upload(file)
        arr = preprocess_input(arr)
        arr = np.expand_dims(arr, axis=0)

        # Predict
        preds = model.predict(arr, verbose=0)
        idx = int(np.argmax(preds))
        conf = float(np.max(preds))

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Inference error: {e}")

    # Confidence threshold check
    CONFIDENCE_THRESHOLD = 0.49
    if conf < CONFIDENCE_THRESHOLD:
        raise HTTPException(
            status_code=400,
            detail="This image does not appear to be a valid cauliflower leaf. Please upload a clear leaf image."
        )

    # Ensure class index is valid
    if idx >= NUM_CLASSES:
        raise HTTPException(500, f"Unknown class index {idx}")

    return {
        "label": CLASS_NAMES[idx],
        "confidence": round(conf, 4)
    }

# ───────────────────────────────────────────────
# Predict All (returns same result for compatibility)
# ───────────────────────────────────────────────
@app.post("/predict_all")
async def predict_all(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(415, "Only image files are supported")

    try:
        img_bytes = await file.read()
        pil_img = Image.open(io.BytesIO(img_bytes)).convert("RGB")
        
        # Resize + preprocess
        resized = pil_img.resize(MODEL_SIZE)
        arr = keras_image.img_to_array(resized)
        arr = preprocess_input(arr)
        arr = np.expand_dims(arr, axis=0)

        # Predict
        preds = model.predict(arr, verbose=0)
        idx = int(np.argmax(preds))
        conf = float(np.max(preds))

        return {
            "EfficientNet": {"label": CLASS_NAMES[idx], "confidence": conf}
        }

    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Inference error: {e}")

# ───────────────────────────────────────────────
# Predict with model selection (for compatibility)
# ───────────────────────────────────────────────
@app.post("/predict_model")
async def predict_model(
    model_name: str,
    file: UploadFile = File(...)
):
    # Only EfficientNet is available
    if model_name != "EfficientNet":
        raise HTTPException(400, f"Only EfficientNet model is available in this deployment")

    if not file.content_type.startswith("image/"):
        raise HTTPException(415, detail="Only image files are supported")

    try:
        img_bytes = await file.read()
        pil_img = Image.open(io.BytesIO(img_bytes)).convert("RGB")
        resized = pil_img.resize(MODEL_SIZE)
        arr = keras_image.img_to_array(resized)
        arr = preprocess_input(arr)
        arr = np.expand_dims(arr, axis=0)

        preds = model.predict(arr, verbose=0)
        idx = int(np.argmax(preds))
        conf = float(np.max(preds))

        return {
            "model": "EfficientNet",
            "label": CLASS_NAMES[idx],
            "confidence": conf
        }

    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Inference error: {e}")

# ───────────────────────────────────────────────
# Run backend
# ───────────────────────────────────────────────
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main_single:app", host="0.0.0.0", port=8000, reload=True)
