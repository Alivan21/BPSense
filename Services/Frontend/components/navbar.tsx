import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="flex gap-3 items-center">
      <Image
        alt="logo"
        className="w-10"
        src="/bpsense.svg"
        width={0}
        height={0}
        blurDataURL="/bpsense.svg"
        placeholder="blur"
      />
      <span className="text-blue-600 font-bold text-xl">BPSense</span>
    </nav>
  );
}
