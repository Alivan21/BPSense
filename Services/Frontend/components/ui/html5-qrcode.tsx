"use client";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "react";

type ConfigProps = {
  fps: number;
  qrbox?: number;
  aspectRatio?: number;
  disableFlip?: boolean;
};

type QRScannerProps = ConfigProps & {
  verbose?: boolean;
  qrCodeSuccessCallback: (decodedText: string, decodedResult: any) => void;
  qrCodeErrorCallback?: (errorMessage: string) => void;
};

const createConfig = (props: ConfigProps) => {
  const config: ConfigProps = {
    fps: 0,
  };
  if (props.fps) {
    config.fps = props.fps;
  }
  if (props.qrbox) {
    config.qrbox = props.qrbox;
  }
  if (props.aspectRatio) {
    config.aspectRatio = props.aspectRatio;
  }
  if (props.disableFlip !== undefined) {
    config.disableFlip = props.disableFlip;
  }
  return config;
};

const Html5Qrcode = (props: QRScannerProps) => {
  const qrcodeRegionId = "html5qr-code-full-region";

  useEffect(() => {
    // when component mounts
    const config = createConfig(props);
    const verbose = props.verbose === true;
    // Suceess callback is required.
    if (!props.qrCodeSuccessCallback) {
      throw "qrCodeSuccessCallback is required callback.";
    }
    const html5QrcodeScanner = new Html5QrcodeScanner(qrcodeRegionId, config, verbose);
    html5QrcodeScanner.render(props.qrCodeSuccessCallback, props.qrCodeErrorCallback);

    // cleanup function when component will unmount
    return () => {
      html5QrcodeScanner.clear().catch((error) => {
        console.error("Failed to clear html5QrcodeScanner. ", error);
      });
    };
  }, []);

  return (
    <div className="flex flex-col gap-5 items-center justify-center min-h-[30rem]" id={qrcodeRegionId} />
  );
};

export default Html5Qrcode;
