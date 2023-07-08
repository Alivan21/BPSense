import Card from "@/components/home/Card";
import InputCodeCard from "@/components/home/InputCodeCard";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <Navbar />
      <section className="flex flex-col items-center gap-5">
        <h1 className="text-xl font-bold text-gray-800 mx-auto">Menu</h1>
        <Link href="/face">
          <Card type="face" />
        </Link>
        <Link href="/qr">
          <Card type="qr" />
        </Link>
        <InputCodeCard />
        <Card type="kontak" />
      </section>
    </div>
  );
}
