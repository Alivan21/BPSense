"use client";
import Html5Qrcode from "../ui/html5-qrcode";
import "@/styles/qr-code.css";

export default function QRScanner() {
  const onNewScanResult = (decodedText: string, decodedResult: any) => {
    console.log(`Scan result = ${decodedText}`, decodedResult);
  };
  return <Html5Qrcode fps={7} qrCodeSuccessCallback={onNewScanResult} />;
}
