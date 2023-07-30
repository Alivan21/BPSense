import WebcamCapture from "@/components/ui/webcam-capture";
import Link from "next/link";
import React from "react";

export default function QRPage() {
  return (
    <>
      <div className="flex gap-3 items-center w-full">
        <Link href="/" className="fa-solid fa-angle-left text-xl text-gray-800 hover:text-gray-900" />
        <h1 className="text-blue-600 font-bold text-xl">Cek Petugas dengan Face Recognition</h1>
      </div>
      <div className="flex flex-1 flex-col gap-5 w-full">
        <p className="font-semibold text-lg">Hint : Arahakan Kamera ke Wajah Petugas Sensus</p>
        <WebcamCapture />
      </div>
      <Link
        href="/"
        className="w-full px-5 py-2.5 text-white text-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm"
      >
        Kembali Ke Menu
      </Link>
    </>
  );
}