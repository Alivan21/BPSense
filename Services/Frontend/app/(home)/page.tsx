import Card from "@/components/home/card";
import ForwardedInputCodeCard from "@/components/home/InputCodeCard";
import Navbar from "@/components/navbar";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar />
      <section className="flex flex-col items-center gap-5">
        <h1 className="text-lg font-semibold text-gray-800 mx-auto">Menu Pengguna</h1>
        <Link href="/face">
          <Card type="face" />
        </Link>
        <Link href="/qr">
          <Card type="qr" />
        </Link>
        <ForwardedInputCodeCard />
      </section>
    </>
  );
}
