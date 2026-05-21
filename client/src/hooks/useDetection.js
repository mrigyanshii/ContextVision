import { useState, useEffect, useRef, useCallback } from 'react';
import { initModel, detectObjects } from '../utils/yolov8';

export function useDetection(threshold = 0.5) {
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [stream, setStream] = useState(null);
  const [detections, setDetections] = useState([]);
  const [fps, setFps] = useState(0);
  const [isDetecting, setIsDetecting] = useState(false);
  const [error, setError] = useState(null);

  const videoRef = useRef(null);
  const requestRef = useRef(null);
  const lastTimeRef = useRef(performance.now());
  const framesRef = useRef(0);


  useEffect(() => {
    async function loadModel() {
      try {
        const success = await initModel('/models/best.onnx');
        if (success) {
          setIsModelLoaded(true);
        } else {
          setError("Failed to load model.");
        }
      } catch (err) {
        console.error("Error loading model:", err);
        setError("Error loading ONNX model. Check console.");
      }
    }
    loadModel();
  }, []);

  //init webcam
  useEffect(() => {
    async function setupCamera() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: false,
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play();
          };
        }
      } catch (err) {
        console.error("Webcam error:", err);
        setError("Failed to access webcam. Please grant permissions.");
      }
    }
    setupCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const detect = useCallback(async () => {
    if (!videoRef.current || !isModelLoaded || videoRef.current.readyState < 2) {
      if (isDetecting) requestRef.current = requestAnimationFrame(detect);
      return;
    }

    const startTime = performance.now();
    try {
      const results = await detectObjects(videoRef.current, threshold);
      setDetections(results);
    } catch (e) {
      console.error("Inference error:", e);
    }

    //calc Fps
    const now = performance.now();
    framesRef.current++;
    if (now - lastTimeRef.current >= 1000) {
      setFps(framesRef.current);
      framesRef.current = 0;
      lastTimeRef.current = now;
    }

    if (isDetecting) {
      requestRef.current = requestAnimationFrame(detect);
    }
  }, [isModelLoaded, threshold, isDetecting]);

  useEffect(() => {
    if (isDetecting) {
      requestRef.current = requestAnimationFrame(detect);
    } else {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isDetecting, detect]);

  const toggleDetection = () => setIsDetecting((prev) => !prev);

  return {
    videoRef,
    isModelLoaded,
    detections,
    fps,
    isDetecting,
    error,
    toggleDetection
  };
}
