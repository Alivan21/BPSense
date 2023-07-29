"use client";
import AdminCard from "@/components/admin/AdminCard";
import Spinner from "@/components/ui/spinner";
import { withGuardAdmin } from "@/hoc/with-guard-admin";
import { useGetDataDashboard } from "@/hooks/admin";

function AdminPage() {
  const { data, isLoading } = useGetDataDashboard();
  if (isLoading)
    return (
      <div className="min-h-screen flex justify-center items-center mx-auto my-auto">
        <Spinner />
      </div>
    );
  return (
    <section className="bg-white h-screen py-5 px-16 rounded-md">
      <h1 className="font-bold text-2xl">Dashboard</h1>
      <div className="flex gap-5 my-4">
        <AdminCard data={data?.data.officers_count} title="Petugas" desc="Total Petugas" />
        <AdminCard
          data={data?.data.officer_active_count}
          title="Petugas Active"
          desc="Total Petugas Active"
        />
      </div>
    </section>
  );
}

export default withGuardAdmin(AdminPage);
