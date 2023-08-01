import Image from "next/image";
import LoginDialog from "./home/LoginDialog";

export default function Navbar() {
  return (
    <nav className="flex gap-3 items-center justify-between">
      <div className="flex gap-3 items-center bg-blue-600 p-1.5 pr-2 rounded-md">
        <Image
          alt="logo"
          className="w-10"
          src="/bpsense.svg"
          width={0}
          height={0}
          blurDataURL="/bpsense.svg"
          placeholder="blur"
        />
        <span className="text-white font-bold text-lg">BPSense</span>
      </div>
      <div>
        <LoginDialog />
      </div>
    </nav>
  );
}
