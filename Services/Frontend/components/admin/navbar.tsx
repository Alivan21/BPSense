"use client";
import { useSignOut } from "@/hooks/auth";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

function Navbar() {
  const pathname = usePathname();
  const signOutMutation = useSignOut();

  const handleSignout = async () => {
    await signOutMutation.mutateAsync();
  };

  return (
    <nav className="flex items-center gap-8 px-24 py-6 text-gray-50 bg-blue-700">
      <Link href="/admin" className="p-1 bg-gray-50 rounded-md">
        <Image src="bpsense.svg" alt="BPSense Logo" className="w-12" width={0} height={0} priority />
      </Link>
      <ul className="flex gap-5 my-auto">
        <li>
          <Link
            href="/admin"
            className={
              pathname === "/admin"
                ? "font-semibold text-md"
                : "hover:font-semibold text-md text-gray-300 hover:text-white"
            }
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/admin/petugas"
            className={
              pathname === "/admin/petugas"
                ? "font-semibold text-md"
                : "hover:font-semibold text-md text-gray-300 hover:text-white"
            }
          >
            Petugas
          </Link>
        </li>
      </ul>
      <div className="flex gap-3 items-center ml-auto text-gray-700 px-4 py-1 rounded-lg">
        <Button className="font-semibold text-base bg-red-600 hover:bg-red-700" onClick={handleSignout}>
          <span className="font-medium mr-3">Keluar</span>
          <i className="fa-solid fa-power-off"></i>
        </Button>
      </div>
    </nav>
  );
}

export default Navbar;
