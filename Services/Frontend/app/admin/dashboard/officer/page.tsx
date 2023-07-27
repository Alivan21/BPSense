"use client";
import ChangeStatus from "@/components/dashboard/officer/changeStatus";
import InputDataCard from "@/components/dashboard/officer/inputDataCard";
import Spinner from "@/components/ui/spinner";
import { Officer, useGetDataOfficer } from "@/hooks/use-officer";
import Image from "next/image";
import Link from "next/link";

export default function Officer() {
  // const [response, setResponse] = useState<BaseResponse<any>>();

  // try {
  //   const { data } = useGetDataOfficer();
  //   if (data?.code == 200) {
  //     setResponse(data);
  //   }
  // } catch (error: any) {
  //   // console.log(error.response);
  // }

  const { data, isLoading } = useGetDataOfficer();
  return (
    <div className="flex flex-wrap -mx-3">
      <div className="flex-none w-full max-w-full px-3">
        <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border">
          <div className="p-6 pb-0 mb-6 bg-white border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
            <h6>Tabel Petugas</h6>
          </div>
          <div className="flex mb-6 px-6">
            <InputDataCard />
          </div>
          {isLoading && (
            <div className="px-6 mb-6">
              <Spinner />
            </div>
          )}
          {data?.code !== 200 && !isLoading && (
            <div className="px-6 mb-6">
              <p className="font-semibold text-lg text-red-400">
                Error Fetch Api
              </p>
            </div>
          )}
          {data && data?.code === 200 && (
            <div className="flex-auto px-0 pt-0 pb-2">
              <div className="p-0 overflow-x-auto">
                <table className="items-center w-full mb-0 align-top border-gray-200 text-slate-500">
                  <thead className="align-bottom">
                    <tr>
                      <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                        Petugas
                      </th>
                      <th className="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                        NIP
                      </th>
                      <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                        Status
                      </th>
                      <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                        Tanggal Lahir
                      </th>
                      <th className="px-6 py-3 font-semibold capitalize align-middle bg-transparent border-b border-gray-200 border-solid shadow-none tracking-none whitespace-nowrap text-slate-400 opacity-70"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.data.map((officer: Officer) => (
                      <tr key={officer.id}>
                        <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                          <div className="flex px-2 py-1">
                            <div>
                              <Image
                                src="/assets/img/team-3.jpg"
                                width={0}
                                height={0}
                                className="inline-flex items-center justify-center mr-4 text-sm text-white transition-all duration-200 ease-soft-in-out h-9 w-9 rounded-xl"
                                alt="user2"
                                blurDataURL="/assets/img/team-3.jpg"
                                placeholder="blur"
                              />
                            </div>
                            <div className="flex flex-col justify-center">
                              <h6 className="mb-0 text-sm leading-normal">
                                {officer.name}
                              </h6>
                              <p className="mb-0 text-xs leading-tight text-slate-400">
                                {officer.role === "officer" && "Petugas"}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                          <p className="mb-0 text-xs font-semibold leading-tight">
                            {officer.nip}
                          </p>
                        </td>
                        <td className="p-2 text-sm leading-normal text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                          <ChangeStatus
                            status={officer.status}
                            id={officer.id}
                          />
                        </td>
                        <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                          <span className="text-xs font-semibold leading-tight text-slate-400">
                            {officer.birth_date}
                          </span>
                        </td>
                        <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                          <Link
                            href={`/admin/dashboard/officer/${officer.id}`}
                            className="text-xs font-semibold leading-tight text-slate-400"
                          >
                            Detail
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
