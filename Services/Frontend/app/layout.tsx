import "@/styles/global.css";
import { montserrat } from "@/styles/font";
import QueryProvider from "@/utils/providers/QueryProvider";
import { AuthProvider } from "@/utils/providers/AuthProvider";
import { Toaster } from "react-hot-toast";

const bodyClass = `bg-gray-100 ${montserrat.className}`;

export const metadata = {
  title: "BPSense",
  description: "Aplikasi untuk men-verifikasi pegawai BPS",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className={bodyClass}>
        <AuthProvider>
          <QueryProvider>
            <main className="flex flex-col bg-white max-w-[580px] mx-auto min-h-screen rounded-sm shadow-md p-8">
              <section className="flex flex-col gap-8 mb-auto">{children}</section>
              <footer className="text-center mt-7 -mb-2">©2023 All rights reserved by Mother's Prayer</footer>
            </main>
            <Toaster position="top-center" />
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
