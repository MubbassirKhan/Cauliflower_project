FROM python:3.10-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Force legacy Keras (Keras 2) for model compatibility
ENV TF_USE_LEGACY_KERAS=1

# Install Python dependencies with EXACT versions for model compatibility
RUN pip install --no-cache-dir \
    numpy==1.23.5 \
    tensorflow==2.10.0 \
    keras==2.10.0 \
    fastapi==0.103.0 \
    uvicorn[standard]==0.23.2 \
    pillow==10.0.0 \
    python-multipart==0.0.6 \
    h5py==3.7.0

# Create models directory
RUN mkdir -p models

# Copy only the necessary files (single model)
COPY main_single.py ./main.py
COPY models/01Efficient5050.h5 ./models/

# Port configuration (HuggingFace uses 7860)
ENV PORT=7860
EXPOSE 7860

# Run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]
