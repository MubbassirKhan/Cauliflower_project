from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os
import io
import numpy as np
from PIL import Image

import tensorflow as tf
from tensorflow.keras.preprocessing import image as keras_image
from tensorflow.keras.applications.efficientnet_v2 import preprocess_input as eff_preprocess
from tensorflow.keras.applications.resnet50 import preprocess_input as res_preprocess
from tensorflow.keras.applications.densenet import preprocess_input as dense_preprocess
from tensorflow.keras.applications.inception_v3 import preprocess_input as inc_preprocess
from tensorflow.keras.applications.xception import preprocess_input as xcp_preprocess

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
# Model Configurations
# ───────────────────────────────────────────────
MODELS_DIR = os.path.join(os.path.dirname(__file__), "models")

MODEL_CONFIG = {
    "EfficientNet": {
        "file": os.path.join(MODELS_DIR, "01Efficient5050.h5"),
        "size": (224, 224),
        "preproc": eff_preprocess
    },
    "ResNet50": {
        "file": os.path.join(MODELS_DIR, "5050resnet50.h5"),
        "size": (224, 224),
        "preproc": res_preprocess
    },
    "DenseNet201": {
        "file": os.path.join(MODELS_DIR, "densenet5050.h5"),
        "size": (224, 224),
        "preproc": dense_preprocess
    },
    "DenseNet169": {
        "file": os.path.join(MODELS_DIR, "5050densenet169.h5"),
        "size": (224, 224),
        "preproc": dense_preprocess
    },
    "InceptionV3": {
        "file": os.path.join(MODELS_DIR, "inception8020.h5"),
        "size": (299, 299),
        "preproc": inc_preprocess
    },
    "XceptionNet": {
        "file": os.path.join(MODELS_DIR, "xception5050 (1).h5"),
        "size": (224, 224),
        "preproc": eff_preprocess  # using EfficientNet preprocessing
    }
}

# ───────────────────────────────────────────────
# Load all models once
# ───────────────────────────────────────────────
models = {}
print("\n🔄 Loading models...")

for nickname, cfg in MODEL_CONFIG.items():
    if not os.path.exists(cfg["file"]):
        raise RuntimeError(f"❌ Missing model file: {cfg['file']}")
    print(f"✅ Loading {nickname} from {cfg['file']}...")
    models[nickname] = tf.keras.models.load_model(cfg["file"], compile=False)
    print(f"✅ {nickname} loaded successfully.")

# Pick the same EfficientNet model for `/predict`
SINGLE_MODEL = models["EfficientNet"]
SINGLE_MODEL_SIZE = MODEL_CONFIG["EfficientNet"]["size"]
SINGLE_MODEL_PREPROC = MODEL_CONFIG["EfficientNet"]["preproc"]

print("\n✅ All models loaded successfully!\n")

# ───────────────────────────────────────────────
# FastAPI Setup
# ───────────────────────────────────────────────
app = FastAPI(title="CauliCare Multi-Model API", version="6.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://cauliflower-plum.vercel.app",
        "https://*.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ───────────────────────────────────────────────
# Helper: Validate and load image
# ───────────────────────────────────────────────
def load_image_from_upload(uploaded: UploadFile, target_size):
    if uploaded.size and uploaded.size > MAX_MB * 1024 * 1024:
        raise HTTPException(status_code=413, detail="File too large (>5 MB)")

    img_bytes = uploaded.file.read()
    uploaded.file.close()
    img = Image.open(io.BytesIO(img_bytes)).convert("RGB")
    img = img.resize(target_size)
    return keras_image.img_to_array(img)

# ───────────────────────────────────────────────
# Endpoint: Predict with all models
# ───────────────────────────────────────────────
@app.post("/predict_all")
async def predict_all(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(415, "Only image files are supported")

    try:
        img_bytes = await file.read()
        pil_img = Image.open(io.BytesIO(img_bytes)).convert("RGB")
        print(f"\n📸 Uploaded image size = {pil_img.size}")

        results = {}
        for nickname, cfg in MODEL_CONFIG.items():
            print(f"\n🔄 Running model: {nickname} → target size {cfg['size']}")
            
            # Resize + preprocess
            resized = pil_img.resize(cfg["size"])
            arr = keras_image.img_to_array(resized)
            arr = cfg["preproc"](arr)
            arr = np.expand_dims(arr, axis=0)

            # Predict
            preds = models[nickname].predict(arr, verbose=0)
            idx = int(np.argmax(preds))
            conf = float(np.max(preds))
            print(f"✅ {nickname} → {CLASS_NAMES[idx]} ({conf:.4f})")

            results[nickname] = {"label": CLASS_NAMES[idx], "confidence": conf}

        return results

    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Inference error: {e}")

# ───────────────────────────────────────────────
# Endpoint: Predict only with EfficientNet
# ───────────────────────────────────────────────
@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=415, detail="Only image files are supported")

    try:
        # ✅ Preprocess uploaded image
        arr = load_image_from_upload(file, SINGLE_MODEL_SIZE)
        arr = SINGLE_MODEL_PREPROC(arr)
        arr = np.expand_dims(arr, axis=0)

        # ✅ Predict
        preds = SINGLE_MODEL.predict(arr, verbose=0)
        idx = int(np.argmax(preds))
        conf = float(np.max(preds))

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Inference error: {e}")

    # ✅ Confidence threshold check
    CONFIDENCE_THRESHOLD = 0.49  # adjust based on your model’s behavior
    if conf < CONFIDENCE_THRESHOLD:
        raise HTTPException(
            status_code=400,
            detail="This image does not appear to be a valid cauliflower leaf. Please upload a clear leaf image."
        )

    # ✅ Ensure class index is valid
    if idx >= NUM_CLASSES:
        raise HTTPException(500, f"Unknown class index {idx}")

    return {
        "label": CLASS_NAMES[idx],
        "confidence": round(conf, 4)
    }


@app.post("/predict_model")
async def predict_model(
    model_name: str,  # model selected from dropdown
    file: UploadFile = File(...)
):
    if model_name not in MODEL_CONFIG:
        raise HTTPException(400, f"Invalid model. Choose from: {list(MODEL_CONFIG.keys())}")

    if not file.content_type.startswith("image/"):
        raise HTTPException(415, detail="Only image files are supported")

    try:
        # Load config & model
        cfg = MODEL_CONFIG[model_name]
        model = models[model_name]

        # Preprocess image
        img_bytes = await file.read()
        pil_img = Image.open(io.BytesIO(img_bytes)).convert("RGB")
        resized = pil_img.resize(cfg["size"])
        arr = keras_image.img_to_array(resized)
        arr = cfg["preproc"](arr)
        arr = np.expand_dims(arr, axis=0)

        # Predict
        preds = model.predict(arr, verbose=0)
        idx = int(np.argmax(preds))
        conf = float(np.max(preds))

        return {
            "model": model_name,
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
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
