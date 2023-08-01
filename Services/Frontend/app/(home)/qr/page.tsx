import QRScanner from "@/components/qr/QRScanner";
import Link from "next/link";
import React from "react";

export default function QRPage() {
  return (
    <>
      <div className="flex gap-3 items-center w-full">
        <Link href="/" className="fa-solid fa-angle-left text-xl text-gray-800 hover:text-gray-900" />
        <h1 className="text-blue-600 font-semibold text-lg">Pindai Kode QR</h1>
      </div>
      <div className="flex flex-1 flex-col gap-10 w-full">
        <p className="text-base font-medium">Petunjuk : Arahkan Kamera ke Kode QR Petugas Sensus</p>
        <QRScanner />
      </div>
    </>
  );
}
