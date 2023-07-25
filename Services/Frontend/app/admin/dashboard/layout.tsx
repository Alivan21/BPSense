import Head from "next/head";
import "@/public/assets/css/nucleo-icons.css";
import "@/public/assets/css/nucleo-svg.css";
import "@/public/assets/css/soft-ui-dashboard-tailwind.css";
// import "@/public/assets/js/plugins/chartjs.min.js";
// import "@/public/assets/js/plugins/perfect-scrollbar.min.js";
// import "@/public/assets/js/soft-ui-dashboard-tailwind.js";
import SideNav from "@/components/dashboard/sidenav";
import Footer from "@/components/dashboard/footer";
import Navbar from "@/components/dashboard/navbar";
import { Suspense } from "react";
import Spinner from "@/components/ui/spinner";
import Script from "next/script";

export const metadata = {
  title: "Dashboard Page",
  description: "Dashboard Page untuk mengolola data Admin",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <Spinner />
          </div>
        }
      >
        <Head>
          {/* <!-- Font Awesome Icons --> */}
          <script
            src="https://kit.fontawesome.com/42d5adcbca.js"
            crossOrigin="anonymous"
          ></script>
        </Head>
        {/* <!-- sidenav  --> */}
        <SideNav />
        {/* <!-- end sidenav --> */}
        <main className="ease-soft-in-out xl:ml-68.5 relative h-full max-h-screen rounded-xl transition-all duration-200">
          {/* <!-- Navbar --> */}
          <Navbar />
          {/* <!-- end Navbar --> */}
          <div className="w-full px-6 py-6 mx-auto">
            {children}
            <Footer />
          </div>
        </main>
        {/* <Script src="/assets/js/plugins/chartjs.min.js" async></Script>
        <Script
          src="/assets/js/plugins/perfect-scrollbar.min.js"
          async
        ></Script>
        <Script src="/assets/js/soft-ui-dashboard-tasilwind.js?v=1.0.5" async></Script> */}

        {/* <!-- github button --> */}
        <Script async defer src="https://buttons.github.io/buttons.js"></Script>

        {/* <!-- plugin for charts  --> */}
        {/* <script src="./assets/js/plugins/chartjs.min.js" async></script> */}
        {/* <!-- plugin for scrollbar  --> */}
        {/* <script
          src="./assets/js/plugins/perfect-scrollbar.min.js"
          async
        ></script> */}
        {/* <!-- main script file  --> */}
        {/* <script
          src="./assets/js/soft-ui-dashboard-tailwind.min.js"
          async
        ></script> */}
      </Suspense>
    </>
  );
}
