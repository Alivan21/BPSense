"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Spinner from "@/components/ui/spinner";
import { IOfficer, useUpdateStatusOfficer } from "@/hooks/admin";
import { BaseResponse } from "@/utils/constant";
import { toast } from "react-hot-toast";

interface Props {
  status: number;
  id: number;
}

export default function ChangeStatus({ status, id }: Props) {
  const [submiting, setSubmiting] = useState(false);
  const [response, setResponse] = useState<BaseResponse<IOfficer>>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const updateStatusMutation = useUpdateStatusOfficer(id);

  const handleOpenChange = () => {
    setIsDialogOpen(true);
  };

  const onClick = async () => {
    setSubmiting(true);
    try {
      await updateStatusMutation.mutateAsync();
      toast.success("Berhasil mengubah status petugas");
    } catch (error: any) {
      if (error.response && error.response.data.code >= 400) {
        setResponse({
          code: error.response.status,
          message: error.response.data.message,
        });
      }
    }
    setSubmiting(false);
    setIsDialogOpen(false);
  };

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          {status === 1 ? (
            <Button
              className="text-base text-white font-bold p-2 rounded-md bg-green-600 hover:bg-green-700"
              onClick={handleOpenChange}
            >
              Online
            </Button>
          ) : (
            <Button
              className="text-base text-white font-bold p-2 rounded-md bg-slate-600 hover:bg-slate-700"
              onClick={handleOpenChange}
            >
              Offline
            </Button>
          )}
        </DialogTrigger>
        <DialogContent className="w-[92%]">
          <DialogHeader>
            <DialogTitle className="leading-normal w-[92%] font-normal">
              {response && response.data?.id + "-" + response.data?.status}
              Update Status Dari <span className="font-bold">
                {status === 1 ? "Online" : "Offline"}
              </span> Ke <span className="font-bold">{status === 1 ? "Offline" : "Online"}</span> ?
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
          <div className="flex flex-col gap-4">
            <Button
              type="button"
              className="text-base bg-blue-600 hover:bg-blue-700"
              onClick={onClick}
              disabled={submiting}
            >
              {submiting ? <Spinner /> : "Konfirmasi"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
