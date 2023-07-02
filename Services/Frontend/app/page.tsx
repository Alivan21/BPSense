import Card from "@/components/home/Card";
import InputCode from "@/components/home/InputCode";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <Navbar />
      <section className="flex flex-col items-center gap-5">
        <h1 className="text-xl font-bold text-gray-800 mx-auto">Menu</h1>
        <Card type="face" />
        <Card type="qr" />
        <InputCode />
        <Card type="kontak" />
      </section>
    </div>
  );
}
