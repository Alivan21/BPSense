import "@/styles/global.css";
import { montserrat } from "@/styles/font";
import QueryProvider from "@/utils/providers/QueryProvider";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/utils/providers/AuthProvider";

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
        <AuthProvider>
          <QueryProvider>
            {children}
            <Toaster position="top-center" />
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
