"use client";
import NavbarPetugas from "@/components/petugas/navbar-petugas";
import ShowQR from "@/components/petugas/show-qr";
import Spinner from "@/components/ui/spinner";
import { withGuard } from "@/hoc/with-guard";
import { useGetOfficer } from "@/hooks/officer";
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
  if (isLoading) {
    return (
      <div className="min-h-full flex justify-center items-center">
        <Spinner />
      </div>
    );
  }
  return (
    <>
      <NavbarPetugas />
      <section className="flex flex-col items-center gap-5">
        <div className="text-xl flex flex-col gap-2">
          <p>
            Halo, <span className="font-semibold">{data?.name}</span>
          </p>
          <p>
            NIP anda adalah <span className="font-semibold">{data?.nip}</span>
          </p>
        </div>
        <ShowQR image={data?.qrcode} />
      </section>
    </>
  );
}

export default withGuard(PetugasPage);
