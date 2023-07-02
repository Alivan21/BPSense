import Image from "next/image";
import Link from "next/link";

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
    face: "Cek Petugas dengan Face Recognition",
    qr: "Cek Petugas dengan QR Code",
    input: "Cek Petugas dengan Input Kode",
    jadwal: "Lihat Jadwal Petugas",
    kontak: "Hubungi Kami",
  };

  return (
    <div className="md:w-[24rem] sm:w-[20rem] xs:w-[16rem] h-[7rem] p-4 border-2 border-blue-600 rounded-xl flex gap-5 items-center cursor-pointer hover:scale-105">
      <div className="border border-blue-600 rounded-lg">
        <Image
          src={URL_MAP[props.type]}
          alt={"test"}
          height={0}
          width={0}
          className="w-28 max-w-xs h-20"
          priority
          blurDataURL={URL_MAP[props.type]}
          placeholder="blur"
        />
      </div>
      <span className="text-lg font-semibold text-gray-800">{TITLE_MAP[props.type]}</span>
    </div>
  );
}
