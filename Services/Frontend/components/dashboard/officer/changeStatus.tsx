"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Spinner from "@/components/ui/spinner";
import { Officer, useUpdateStatusOfficer } from "@/hooks/use-officer";
import { BaseResponse } from "@/utils/constant";

interface Props {
  status: number;
  id: number;
}

export default function ChangeStatus({ status, id }: Props) {
  const [submiting, setSubmiting] = useState(false);
  const [response, setResponse] = useState<BaseResponse<Officer>>();

  const updateStatusMutation = useUpdateStatusOfficer(id);

  const onClick = async () => {
    setSubmiting(true);
    try {
      const res = await updateStatusMutation.mutateAsync();
      if (res.code == 200) {
        // setResponse(res);
        // redirect ke halaman "admin/dashboard/officer"
        window.location.href = "/admin/dashboard/officer";
      }
    } catch (error: any) {
      // console.log(error.response);
      if (error.response && error.response.data.code >= 400) {
        setResponse({
          code: error.response.status,
          message: error.response.data.message,
        });
      }
    }
    setSubmiting(false);
  };

  return (
    <>
      <Dialog>
        <DialogTrigger>
          {status === 1 ? (
            <span className="bg-gradient-to-tl from-green-600 to-lime-400 px-2.5 text-xs rounded-1.8 py-1.4 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-white hover:cursor-pointer hover:shadow-md hover:opacity-90">
              Online
            </span>
          ) : (
            <span className="bg-gradient-to-tl from-slate-600 to-slate-300 px-2.5 text-xs rounded-1.8 py-1.4 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-white hover:cursor-pointer hover:shadow-md hover:opacity-90">
              Offline
            </span>
          )}
        </DialogTrigger>
        <DialogContent className="w-[92%]">
          <DialogHeader>
            <DialogTitle className="leading-normal w-[92%]">
              {response && response.data?.id + "-" + response.data?.status}
              Update Status Dari{" "}
              <span className="font-bold underline">
                {status === 1 ? "Online" : "Offline"}
              </span>{" "}
              Ke{" "}
              <span className="font-bold underline">
                {status === 1 ? "Offline" : "Online"}
              </span>{" "}
              ?!?!
              {response && response?.code >= 400 && response.message && (
                <div className="mt-4">
                  <p className="font-semibold text-lg whitespace-normal text-red-400 m-0">
                    Error Fetch Api ({response.code} - {response.message[0]})
                  </p>
                </div>
              )}
            </DialogTitle>
          </DialogHeader>
          <Separator />
          {/* {response ? JSON.stringify(response.data) : "no data"} */}
          <div className="flex flex-col gap-4">
            <Button
              type="button"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={onClick}
            >
              {submiting ? <Spinner /> : "Konfirmasi"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
