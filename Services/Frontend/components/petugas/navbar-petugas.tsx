"use client";
import { useSignOut } from "@/hooks/auth";
import Image from "next/image";
import { Button } from "../ui/button";
import { useState } from "react";

function NavbarPetugas() {
  const signOutMutation = useSignOut();
  const [submiting, setSubmiting] = useState(false);
  async function handleSignOut() {
    setSubmiting(true);
    await signOutMutation.mutateAsync();
  }
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
        <span className="text-blue-600 font-bold text-xl">BPSense</span>
      </div>
      <div>
        <Button
          className="text-lg font-semibold bg-red-600 hover:bg-red-700"
          size="sm"
          onClick={handleSignOut}
          disabled={submiting}
        >
          Keluar
        </Button>
      </div>
    </nav>
  );
}

export default NavbarPetugas;