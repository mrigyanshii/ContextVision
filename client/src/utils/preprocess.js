/**
 * Preprocesses the image frame to be compatible with YOLOv8 ONNX model
 * Converts an HTMLVideoElement or HTMLCanvasElement to a Float32Array tensor.
 * Uses letterboxing to maintain aspect ratio.
 */
export function preprocess(source, modelWidth, modelHeight) {
  // Get original source dimensions
  const sourceW = source.videoWidth || source.width || source.clientWidth || modelWidth;
  const sourceH = source.videoHeight || source.height || source.clientHeight || modelHeight;
  
  // Calculate letterbox scaling and padding
  const scale = Math.min(modelWidth / sourceW, modelHeight / sourceH);
  const scaledW = Math.round(sourceW * scale);
  const scaledH = Math.round(sourceH * scale);
  const padX = (modelWidth - scaledW) / 2;
  const padY = (modelHeight - scaledH) / 2;

  // Create an offscreen canvas to resize the image
  const canvas = document.createElement("canvas");
  canvas.width = modelWidth;
  canvas.height = modelHeight;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  
  // Fill with gray padding (standard for YOLO)
  ctx.fillStyle = "rgb(114, 114, 114)";
  ctx.fillRect(0, 0, modelWidth, modelHeight);
  
  // Draw and scale the image into the center
  ctx.drawImage(source, padX, padY, scaledW, scaledH);
  
  // Get image data
  const imageData = ctx.getImageData(0, 0, modelWidth, modelHeight);
  const data = imageData.data; // RGBA array

  // Prepare tensor: [1, 3, 640, 640] - CHW format
  const red = new Float32Array(modelWidth * modelHeight);
  const green = new Float32Array(modelWidth * modelHeight);
  const blue = new Float32Array(modelWidth * modelHeight);

  // Extract RGB channels and normalize to [0, 1]
  for (let i = 0; i < data.length; i += 4) {
    const pixelIndex = i / 4;
    red[pixelIndex] = data[i] / 255.0;
    green[pixelIndex] = data[i + 1] / 255.0;
    blue[pixelIndex] = data[i + 2] / 255.0;
  }

  // Combine channels into a single contiguous array (CHW)
  const tensorData = new Float32Array(modelWidth * modelHeight * 3);
  tensorData.set(red, 0);
  tensorData.set(green, modelWidth * modelHeight);
  tensorData.set(blue, modelWidth * modelHeight * 2);

  return tensorData;
}
