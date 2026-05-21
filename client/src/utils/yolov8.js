import * as ort from 'onnxruntime-web';
import { preprocess } from './preprocess';
import { postprocess } from './postprocess';

// Ensure the WASM backend is used for performance
ort.env.wasm.wasmPaths = 'https://cdn.jsdelivr.net/npm/onnxruntime-web/dist/';

let session = null;

/**
 * Initializes the ONNX Runtime session with the YOLOv8 model
 * @param {string} modelPath Path to the ONNX model file
 */
export async function initModel(modelPath = '/models/best.onnx') {
  try {
    session = await ort.InferenceSession.create(modelPath, {
      executionProviders: ['wasm'],
      graphOptimizationLevel: 'all'
    });
    console.log("ONNX model loaded successfully");
    return true;
  } catch (e) {
    console.error("Failed to load ONNX model:", e);
    return false;
  }
}

/**
 * Runs inference on a given video frame
 * @param {HTMLVideoElement|HTMLCanvasElement} source Input source
 * @param {number} threshold Confidence threshold
 * @returns {Array} Array of detected objects
 */
export async function detectObjects(source, threshold = 0.5) {
  if (!session) {
    throw new Error("Model not initialized");
  }

  // Define YOLOv8 standard dimensions (can be dynamic if needed, but keeping standard for typical YOLOv8)
  const modelW = 640;
  const modelH = 640;

  // Get original source dimensions
  const originalW = source.videoWidth || source.width || source.clientWidth;
  const originalH = source.videoHeight || source.height || source.clientHeight;

  // 1. Preprocess the image
  const inputTensorData = preprocess(source, modelW, modelH);
  const tensor = new ort.Tensor('float32', inputTensorData, [1, 3, modelH, modelW]);

  // 2. Run Inference
  const feeds = {};
  feeds[session.inputNames[0]] = tensor;
  
  const outputData = await session.run(feeds);
  const outputTensor = outputData[session.outputNames[0]];

  // 3. Postprocess the output
  const detections = postprocess(outputTensor, threshold, 0.45, modelW, modelH, originalW, originalH);

  return detections;
}
