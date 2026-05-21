import { cocoClasses } from './classes';

function iou(box1, box2) {
  const xA = Math.max(box1[0], box2[0]);
  const yA = Math.max(box1[1], box2[1]);
  const xB = Math.min(box1[2], box2[2]);
  const yB = Math.min(box1[3], box2[3]);

  const interArea = Math.max(0, xB - xA) * Math.max(0, yB - yA);
  const box1Area = (box1[2] - box1[0]) * (box1[3] - box1[1]);
  const box2Area = (box2[2] - box2[0]) * (box2[3] - box2[1]);

  return interArea / (box1Area + box2Area - interArea);
}

export function postprocess(outputTensor, threshold = 0.5, nmsThreshold = 0.45, modelW = 640, modelH = 640, originalW = 1280, originalH = 720) {
  const output = outputTensor.data;
  const dims = outputTensor.dims;
  
  // Dynamic shape detection
  // Usually dims is [1, 84, 8400] or [1, 8400, 84]
  let numElements, numClasses, isTransposed;
  
  if (dims[1] > dims[2]) {
    // [1, 8400, 84]
    numElements = dims[1]; // 8400
    numClasses = dims[2] - 4; // 80
    isTransposed = true;
  } else {
    // [1, 84, 8400]
    numClasses = dims[1] - 4; // 80
    numElements = dims[2]; // 8400
    isTransposed = false;
  }

  // Calculate un-letterbox scaling
  const scale = Math.min(modelW / originalW, modelH / originalH);
  const padX = (modelW - (originalW * scale)) / 2;
  const padY = (modelH - (originalH * scale)) / 2;
  
  const boxes = [];
  
  for (let i = 0; i < numElements; i++) {
    let maxProb = 0;
    let maxClass = -1;
    
    for (let c = 0; c < numClasses; c++) {
      let prob;
      if (isTransposed) {
        // [1, 8400, 84] -> index = i * 84 + (c + 4)
        prob = output[i * (numClasses + 4) + (c + 4)];
      } else {
        // [1, 84, 8400] -> index = (c + 4) * 8400 + i
        prob = output[(c + 4) * numElements + i];
      }
      
      if (prob > maxProb) {
        maxProb = prob;
        maxClass = c;
      }
    }
    
    if (maxProb > threshold) {
      let xc, yc, w, h;
      
      if (isTransposed) {
        xc = output[i * (numClasses + 4) + 0];
        yc = output[i * (numClasses + 4) + 1];
        w  = output[i * (numClasses + 4) + 2];
        h  = output[i * (numClasses + 4) + 3];
      } else {
        xc = output[0 * numElements + i];
        yc = output[1 * numElements + i];
        w  = output[2 * numElements + i];
        h  = output[3 * numElements + i];
      }
      
      // Un-letterbox back to original image coordinates
      const originalXc = (xc - padX) / scale;
      const originalYc = (yc - padY) / scale;
      const originalW_box = w / scale;
      const originalH_box = h / scale;

      const x1 = originalXc - originalW_box / 2;
      const y1 = originalYc - originalH_box / 2;
      const x2 = originalXc + originalW_box / 2;
      const y2 = originalYc + originalH_box / 2;
      
      const className = maxClass < cocoClasses.length ? cocoClasses[maxClass] : `class_${maxClass}`;
      
      boxes.push({
        box: [
          Math.max(0, x1), 
          Math.max(0, y1), 
          Math.min(originalW, x2), 
          Math.min(originalH, y2)
        ],
        score: maxProb,
        classId: maxClass,
        className: className
      });
    }
  }
  
  boxes.sort((a, b) => b.score - a.score);
  
  const result = [];
  const active = new Array(boxes.length).fill(true);
  
  for (let i = 0; i < boxes.length; i++) {
    if (!active[i]) continue;
    
    result.push(boxes[i]);
    
    for (let j = i + 1; j < boxes.length; j++) {
      if (active[j] && boxes[i].classId === boxes[j].classId) {
        const overlap = iou(boxes[i].box, boxes[j].box);
        if (overlap > nmsThreshold) {
          active[j] = false;
        }
      }
    }
  }
  
  return result;
}
