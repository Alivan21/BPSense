import { Suspense } from "react";

export const metadata = {
  title: "BPSense | Admin",
  description: "Aplikasi untuk Admin BPS",
};

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="p-10 h-screen">{children}</main>
      <footer className="text-center my-5">©2023 All rights reserved by Mother's Prayer</footer>
    </>
  );
}

export default RootLayout;
