"use client";

import ChangeStatus from "@/components/admin/petugas/ChangeStatus";
import InputDataCard from "@/components/admin/petugas/InputDataCard";
import Spinner from "@/components/ui/spinner";
import { withGuardAdmin } from "@/hoc/with-guard-admin";
import { IOfficer, useGetDataOfficer } from "@/hooks/admin";
import { formatDateToIndonesian } from "@/utils/format-date";

function PetugasPage() {
  const { data, isLoading } = useGetDataOfficer();
  return (
    <section className="bg-white h-screen py-5 px-16 rounded-md flex flex-col gap-8">
      <h1 className="font-bold text-2xl">Tabel Petugas</h1>
      <div>
        <InputDataCard />
      </div>
      <div className="relative overflow-x-auto">
        {isLoading ? (
          <div className="flex justify-center items-center my-auto h-screen">
            <Spinner />
          </div>
        ) : (
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-gray-700 uppercase bg-gray-50 rounded-md">
              <tr>
                <th scope="col" className="pl-6 py-3">
                  #
                </th>
                <th scope="col" className="px-6 py-3">
                  Petugas
                </th>
                <th scope="col" className="px-6 py-3">
                  NIP
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Tanggal Lahir
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((officer: IOfficer, index: number) => (
                <tr key={officer.id} className="bg-white border-b">
                  <td className="pl-6 py-4">{index + 1}</td>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {officer.name}
                  </th>
                  <td className="px-6 py-4">{officer.nip}</td>
                  <td className="px-6 py-4">
                    <ChangeStatus status={officer.status} id={officer.id} />
                  </td>
                  <td className="px-6 py-4">{formatDateToIndonesian(officer.birth_date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}

export default withGuardAdmin(PetugasPage);
