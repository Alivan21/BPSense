"use client";
import { useRef, useCallback, useState, useEffect } from "react";
import Webcam from "react-webcam";

let ml5: any;
const modelURL = "https://teachablemachine.withgoogle.com/models/Qb16rx5VJ/";
let classifier: {
  classify: (arg0: HTMLImageElement, arg1: (error: any, results: string | any[]) => void) => void;
};

function WebcamCapture() {
  const [picture, setPicture] = useState("");
  const [deviceId, setDeviceId] = useState<any>({});
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [predictionResult, setPredictionResult] = useState("");
  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = (webcamRef.current as any).getScreenshot();
      setPicture(imageSrc);
    }
  }, [webcamRef]);

  const handleDevices = useCallback(
    (mediaDevices: MediaDeviceInfo[]) => setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
    [setDevices]
  );

  useEffect(() => {
    ml5 = require("ml5");
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
    (async () => {
      classifier = await ml5.imageClassifier(modelURL + "model.json");
      if (picture) {
        const image = new Image();
        image.src = picture;
        image.onload = () => {
          predictImage(image);
        };
      }
    })();
  }, [handleDevices, picture]);

  // Function to predict using the image model
  function predictImage(image: HTMLImageElement) {
    // Load the Teachable Machine image model
    classifier.classify(image, gotResult);
  }

  const gotResult = async (error: any, results: string | any[]) => {
    let result = "";
    for (let i = 0; i < results.length; i++) {
      const classPrediction = results[i].label + ": " + results[i].confidence.toFixed(2);
      result += classPrediction + "\n";
    }
    setPredictionResult(result);
  };

  return (
    <>
      <Webcam
        audio={false}
        className="rounded-md"
        height={720}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={1280}
        videoConstraints={{ deviceId }}
      />
      <div className="text-center border-2 border-gray-900 rounded-md">
        {devices.map((device, key) => (
          <button key={device.deviceId} onClick={() => setDeviceId(device.deviceId)}>
            {device.label || `Device ${key + 1}`}
          </button>
        ))}
      </div>
      {picture ? (
        <>
          <img src={picture} alt="foto" />
          <button
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
            onClick={(e) => {
              e.preventDefault();
              setPicture("");
              setPredictionResult("");
            }}
          >
            Ulangi Foto
          </button>
        </>
      ) : (
        <button
          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5"
          onClick={(e) => {
            e.preventDefault();
            capture();
          }}
        >
          Ambil Foto
        </button>
      )}
      <p>{predictionResult}</p>
    </>
  );
}

export default WebcamCapture;
