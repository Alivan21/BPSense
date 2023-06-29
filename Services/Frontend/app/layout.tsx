import "../styles/global.css";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });

const bodyClass = `flex min-h-screen flex-col items-center justify-between bg-gray-100 ${montserrat.className}`;

export const metadata = {
  title: "BPSense",
  description: "Aplikasi untuk men-verifikasi pegawai BPS",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={bodyClass}>{children}</body>
    </html>
  );
}
