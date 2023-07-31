import Navbar from "@/components/admin/navbar";

export const metadata = {
  title: "BPSense | Admin",
  description: "Aplikasi untuk Admin BPS",
};

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="px-20 py-5 mb-10 h-screen">{children}</main>
      <footer className="text-center my-5 text-sm font-normal">
        ©2023 All rights reserved by Mother's Prayer
      </footer>
    </>
  );
}

export default RootLayout;
