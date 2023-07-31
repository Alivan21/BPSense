"use client";
import { useRef, useCallback, useState, useEffect } from "react";
import Webcam from "react-webcam";
import ConfirmDialog, { TConfirmDialog } from "../confirm-dialog";
import Spinner from "./spinner";

let ml5: any;
const modelURL = "https://teachablemachine.withgoogle.com/models/Qb16rx5VJ/";
let classifier: {
  classify: (arg0: HTMLImageElement, arg1: (error: any, results: string | any[]) => void) => void;
};

function WebcamCapture() {
  const [picture, setPicture] = useState("");
  const [deviceId, setDeviceId] = useState<any>({});
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [selectedCamera, setSelectedCamera] = useState<string>("");

  const webcamRef = useRef(null);

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const getCameraType = (device: MediaDeviceInfo): string => {
    const { deviceId } = device;
    const track = (webcamRef.current as any)?.stream
      ?.getTracks()
      .find((t: MediaStreamTrack) => t.getSettings().deviceId === deviceId);
    if (track) {
      const facingMode = track.getSettings().facingMode;
      if (facingMode === "environment") {
        return "Kamera Belakang";
      } else if (facingMode === "user") {
        return "Kamera Depan";
      }
    }
    return `Camera ${devices.findIndex((device) => device.deviceId === deviceId) + 1}`;
  };

  const [confirmDialog, setConfirmDialog] = useState<TConfirmDialog>({
    open: isDialogOpen,
    isValid: false,
    onClose: handleCloseDialog,
    isFace: true,
  });
  const capture = useCallback(async () => {
    if (webcamRef.current) {
      setIsLoading(true); // Start loading state when capturing
      const imageSrc = (webcamRef.current as any).getScreenshot();
      setPicture(imageSrc);
    }
  }, [webcamRef]);

  const handleDevices = useCallback(
    (mediaDevices: MediaDeviceInfo[]) => setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
    [setDevices]
  );
  const handleSwitchCamera = useCallback(() => {
    // Find the next camera in the list and switch to it
    const currentIndex = devices.findIndex((device) => device.deviceId === deviceId);
    const nextIndex = (currentIndex + 1) % devices.length;
    setDeviceId(devices[nextIndex].deviceId);
    setSelectedCamera(devices[nextIndex].deviceId);
  }, [devices, deviceId]);

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
    setIsLoading(false); // Stop loading state when result is received
    let result = 0;
    for (let i = 0; i < results.length; i++) {
      if (results[0].label === "Kosong") {
        result = 0;
      } else {
        const classPrediction = Number(results[0].confidence.toFixed(2));
        result = classPrediction;
      }
    }
    setResult(result); // Store the result
    setIsDialogOpen(true);
    if (result < 0.5) {
      setConfirmDialog({
        ...confirmDialog,
        open: true,
        isValid: false,
      });
    } else {
      setConfirmDialog({
        ...confirmDialog,
        open: true,
        isValid: true,
      });
    }
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
      <button
        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-2"
        onClick={handleSwitchCamera}
        disabled={isLoading || devices.length <= 1}
        hidden={devices.length <= 1}
      >
        Ganti Kamera
      </button>
      {picture ? (
        <button
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
          onClick={(e) => {
            e.preventDefault();
            setPicture("");
            setResult(null); // Clear the previous result when capturing a new photo
          }}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex justify-center items-center">
              <Spinner />
            </div>
          ) : (
            "Ulang Foto"
          )}
        </button>
      ) : (
        <button
          className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-normal rounded-lg text-sm px-5 py-2.5"
          onClick={(e) => {
            e.preventDefault();
            capture();
          }}
          disabled={isLoading || result !== null} // Disable the button when capturing or if there's a result
        >
          {isLoading ? (
            <div className="flex justify-center items-center">
              <Spinner />
            </div>
          ) : (
            "Ambil Foto"
          )}
        </button>
      )}
      <ConfirmDialog
        data={confirmDialog.data}
        isValid={confirmDialog.isValid}
        open={isDialogOpen}
        onClose={handleCloseDialog}
        isFace={confirmDialog.isFace}
      />
    </>
  );
}

export default WebcamCapture;
