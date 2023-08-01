import Image from "next/image";
import LoginDialog from "./home/LoginDialog";

export default function Navbar() {
  return (
    <nav className="flex gap-3 items-center justify-between">
      <div className="flex gap-3 items-center">
        <Image
          alt="logo"
          className="w-10"
          src="/bpsense.svg"
          width={0}
          height={0}
          blurDataURL="/bpsense.svg"
          placeholder="blur"
        />
        <span className="font-bold text-lg">BPSense</span>
      </div>
      <div>
        <LoginDialog />
      </div>
    </nav>
  );
}
