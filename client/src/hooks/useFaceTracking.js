import { useState, useEffect, useRef, useCallback } from 'react';
import * as faceapi from '@vladmandic/face-api';

const MODEL_URL = 'https://unpkg.com/@vladmandic/face-api/model/';

export function useFaceTracking(videoRef, isDetecting) {
  const [isModelsLoaded, setIsModelsLoaded] = useState(false);
  const [faces, setFaces] = useState([]);
  const requestRef = useRef(null);

  useEffect(() => {
    async function loadModels() {
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL)
        ]);
        setIsModelsLoaded(true);
      } catch (err) {
        console.error("Failed to load face-api models:", err);
      }
    }
    loadModels();
  }, []);

  const detectFaces = useCallback(async () => {
    if (!videoRef.current || !isModelsLoaded || videoRef.current.readyState < 2) {
      if (isDetecting) requestRef.current = requestAnimationFrame(detectFaces);
      return;
    }

    try {
      // Use smaller inputSize (160) for much better FPS and less lag
      const options = new faceapi.TinyFaceDetectorOptions({ inputSize: 160, scoreThreshold: 0.5 });
      const detections = await faceapi.detectAllFaces(videoRef.current, options).withFaceLandmarks();
      
      // Crucial Fix: Resize results to the ACTUAL display dimensions of the video on screen, not the raw video size
      const dims = { width: videoRef.current.clientWidth, height: videoRef.current.clientHeight };
      const resizedDetections = faceapi.resizeResults(detections, dims);
      
      setFaces(resizedDetections);
    } catch (err) {
      // Ignore frame errors
    }

    if (isDetecting) {
      requestRef.current = requestAnimationFrame(detectFaces);
    }
  }, [isModelsLoaded, isDetecting, videoRef]);

  useEffect(() => {
    if (isDetecting && isModelsLoaded) {
      requestRef.current = requestAnimationFrame(detectFaces);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isDetecting, isModelsLoaded, detectFaces]);

  return { isModelsLoaded, faces };
}
