"use client";
import Card from "@/components/home/card";
import NavbarPetugas from "@/components/petugas/navbar-petugas";
import ShowQR from "@/components/petugas/show-qr";
import Spinner from "@/components/ui/spinner";
import { withGuard } from "@/hoc/with-guard";
import { useGetOfficer } from "@/hooks/officer";
import { formatDateToIndonesian } from "@/utils/format-date";
import { useQuery } from "@tanstack/react-query";

function PetugasPage() {
  const OfficerMutation = useGetOfficer();
  const { data, isLoading } = useQuery({
    queryKey: ["officer-profile"],
    queryFn: async () => {
      const data = await OfficerMutation.mutateAsync();
      return data;
    },
  });
  const formatedDate = data ? formatDateToIndonesian(data.birth_date) : "";
  if (isLoading) {
    return (
      <div className="flex justify-center items-center my-auto h-screen">
        <Spinner />
      </div>
    );
  }
  return (
    <>
      <NavbarPetugas />
      <section className="flex flex-col items-center gap-5">
        <div className="text-base flex flex-col gap-2">
          <p>
            Halo, <span className="font-medium">{data?.name}</span>
          </p>
          <p>
            NIP anda adalah <span className="font-medium">{data?.nip}</span>
          </p>
          <p>
            Tanggal Lahir <span className="font-medium">{formatedDate}</span>
          </p>
        </div>
        <ShowQR image={data?.qrcode} />
      </section>
    </>
  );
}

export default withGuard(PetugasPage);
