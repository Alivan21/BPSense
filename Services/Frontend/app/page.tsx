import Card from "@/components/home/card";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <Navbar />
      <section className="flex flex-col items-center gap-5">
        <h1 className="text-xl font-bold text-gray-800 mx-auto">Menu</h1>
        <Card type="face" />
        <Card type="qr" />
        <Card type="input" />
        <Card type="jadwal" />
        <Card type="kontak" />
      </section>
    </div>
  );
}
