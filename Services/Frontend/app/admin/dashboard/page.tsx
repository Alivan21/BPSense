"use client";
import DashboardCard from "@/components/dashboard/dashboardCard";
import Spinner from "@/components/ui/spinner";
import { useGetDataDashboard } from "@/hooks/use-officer";

export default function DashboardPage() {
  const { data, isLoading } = useGetDataDashboard();
  return (
    <div className="flex flex-wrap -mx-3">
      {isLoading && (
        <div className="px-6 mb-6">
          <Spinner />
        </div>
      )}
      {data?.code !== 200 && !isLoading && (
        <div className="px-6 mb-6">
          <p className="font-semibold text-lg text-red-400">Error Fetch Api</p>
        </div>
      )}
      {data && data?.code === 200 && (
        <>
          <DashboardCard
            title="Jumlah Petugas"
            data={data.data["officers"]}
            icon="ni-money-coins"
          />
          <DashboardCard
            title="Petugas Sensus Aktif"
            data={data.data["officer_online"]}
            icon="ni-world"
          />
        </>
      )}
    </div>
  );
}
