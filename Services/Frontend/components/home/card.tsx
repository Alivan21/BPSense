import Image from "next/image";

type CardType = "face" | "qr" | "input" | "jadwal" | "kontak";

type CardProps = {
  type: CardType;
};

export default function Card(props: CardProps) {
  const URL_MAP: Record<CardType, string> = {
    face: "/face-scan.svg",
    qr: "/qr-code.svg",
    input: "/input-code.svg",
    jadwal: "/jadwal.svg",
    kontak: "/contact-us.svg",
  };

  const TITLE_MAP: Record<CardType, string> = {
    face: "Cek Petugas dengan Scan Wajah",
    qr: "Cek Petugas dengan Kode QR",
    input: "Cek Petugas dengan Kode Petugas",
    jadwal: "Lihat Jadwal Petugas",
    kontak: "Hubungi Kami",
  };

  return (
    <div className="w-[19.5rem] md:w-[24rem] h-[7rem] p-4 border-2 border-blue-600 rounded-xl flex gap-5 items-center cursor-pointer hover:scale-105">
      <div className="border border-blue-600 rounded-lg">
        <Image
          src={URL_MAP[props.type]}
          alt={"test"}
          height={0}
          width={0}
          className="min-w-[7rem] max-w-xs h-20"
          priority
          blurDataURL={URL_MAP[props.type]}
          placeholder="blur"
        />
      </div>
      <span className="text-lg font-semibold text-gray-800">{TITLE_MAP[props.type]}</span>
    </div>
  );
}
