import Image from "next/image";

type CardType = "face" | "qr" | "input" | "jadwal" | "kontak" | "petugasFace" | "petugasQR";

type CardProps = {
  type: CardType;
};

export default function Card(props: CardProps) {
  const URL_MAP: Record<CardType, string> = {
    face: "/facerecognition.png",
    qr: "/qrcode.png",
    input: "/inputcode.png",
    jadwal: "/jadwal.svg",
    kontak: "/contact.png",
    petugasFace: "/petugas-face.svg",
    petugasQR: "/qrcode.png",
  };

  const TITLE_MAP: Record<CardType, string> = {
    face: "Cek Petugas dengan Scan Wajah",
    qr: "Cek Petugas dengan Kode QR",
    input: "Cek Petugas dengan Kode Petugas",
    jadwal: "Lihat Jadwal Petugas",
    kontak: "Hubungi Kami",
    petugasFace: "Tambahkan Wajah Petugas",
    petugasQR: "Tampilkan Kode QR Petugas",
  };

  return (
    <div className="w-[19.5rem] md:w-[24rem] h-[7rem] p-4 border-2 border-blue-600 rounded-xl flex gap-5 items-center cursor-pointer hover:scale-105">
      <div>
        <Image src={URL_MAP[props.type]} alt="card" height={100} width={100} priority />
      </div>
      <span className="text-base font-medium text-gray-800">{TITLE_MAP[props.type]}</span>
      <i className="fa-solid fa-angle-right font-semibold" style={{ color: "#2563eb" }}></i>
    </div>
  );
}
