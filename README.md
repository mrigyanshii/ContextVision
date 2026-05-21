# ContextVision 🎯

ContextVision is a real-time **Augmented Reality Object Detection System** that runs directly in the browser. It uses a trained YOLO-based model (exported to ONNX) to detect objects from a live webcam feed and applies interactive AR-based effects based on the detected context.

🌐 Live Demo: https://context-vision.vercel.app/

---

## 🚀 Features

### 🧠 Object Detection
- Real-time detection using webcam input
- YOLO-trained model exported to ONNX format
- Runs entirely in browser using ONNX Runtime Web

### ⚡ Dual AR Modes

#### 1. Productivity AR Mode
- Detects **person**
  - Cyberpunk HUD overlay
  - “Focus Mode Activated” UI
  - Floating productivity stats
- Detects **phone**
  - Red flash warning
  - “DISTRACTION DETECTED”
  - Sound alert (optional via Howler.js)

#### 2. Fun AR Filters
- Neon outline effect
- Aura glow around person
- Glowing eyes effect
- Floating labels on detected objects

---

## 🛠️ Tech Stack

- React + Vite
- Tailwind CSS
- ONNX Runtime Web
- YOLO (custom trained model)
- Framer Motion (UI animations)
- Howler.js (sound effects)
- Face-api.js (optional face-based effects)

---

## 📦 Project Structure
ContextVision/
│
├── client/ # Frontend (React + Vite app)
├── models/ # Trained ONNX model
├── dataset/ # Training dataset (YOLO format)
└── README.md

---

## ⚙️ How It Works

1. Webcam stream is captured in browser
2. Frame is passed to ONNX model
3. Model returns detected objects
4. UI overlays AR effects based on:
   - object class
   - selected mode (Productivity / Fun)

---

## 🧪 Running Locally

```bash
cd client
npm install
npm run dev


##🌍 Deployment

Deployed using Vercel

Frontend hosted as static site
Model loaded directly from /models

##📌 Future Improvements
Mobile AR optimization
More object categories
Advanced gesture-based interaction
Backend API for model versioning
