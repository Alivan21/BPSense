export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-col bg-white max-w-[580px] mx-auto min-h-screen rounded-sm shadow-md p-8">
      <section className="flex flex-col gap-8 mb-auto">{children}</section>
      <footer className="text-center mt-7 -mb-2">©2023 All rights reserved by Mother's Prayer</footer>
    </main>
  );
}
