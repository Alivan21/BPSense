"use client";
import { useRef, useCallback, useState, useEffect } from "react";
import Webcam from "react-webcam";

function WebcamCapture() {
  const [picture, setPicture] = useState("");
  const [deviceId, setDeviceId] = useState<any>({});
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
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
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);

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
    </>
  );
}

export default WebcamCapture;
