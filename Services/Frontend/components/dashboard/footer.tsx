import Link from "next/link";

export default function Footer() {
  return (
    <footer className="pt-4">
      <div className="w-full px-6 mx-auto">
        <div className="flex flex-wrap items-center -mx-3 lg:justify-between">
          <div className="w-full max-w-full px-3 mt-0 mb-6 shrink-0 lg:mb-0 lg:w-1/2 lg:flex-none">
            <div className="text-sm leading-normal text-center text-slate-500 lg:text-left">
              ©2023 All rights reserved by Mother's Prayer
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// GET
// http://localhost:3000/admin/dashboard/assets/img/small-logos/logo-spotify.svg

