import "@/styles/global.css";
import { montserrat } from "@/styles/font";

const bodyClass = `bg-gray-100 ${montserrat.className}`;

export const metadata = {
  title: "BPSense",
  description: "Aplikasi untuk men-verifikasi pegawai BPS",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className={bodyClass}>
        <main className="bg-white max-w-[580px] mx-auto max-h-screen h-screen rounded-sm shadow-md p-8">
          {children}
        </main>
        <footer className="bg-white max-w-[580px] mx-auto rounded-sm shadow-md text-center py-2">
          <span>©2023 All rights reserved by Mother's Prayer</span>
        </footer>
      </body>
    </html>
  );
}
