"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ISearchCode, useSearchCode } from "@/hooks/search";
import Card from "./card";
import Spinner from "../ui/spinner";
import ConfirmDialog, { TConfirmDialog } from "../confirm-dialog";

export default function InputCodeCard() {
  const [form, setForm] = useState<ISearchCode>({
    nip: "",
    birth_date: "",
  });
  const [submiting, setSubmiting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Manage dialog state here

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const [confirmDialog, setConfirmDialog] = useState<TConfirmDialog>({
    open: isDialogOpen,
    data: { nip: "", name: "", birth_date: "" },
    isValid: false,
    onClose: handleCloseDialog,
  });

  const searchCodeMutation = useSearchCode(form);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setSubmiting(true);
    try {
      const res = await searchCodeMutation.mutateAsync();
      if (res.code == 200) {
        setIsDialogOpen(true);
        setConfirmDialog({ ...confirmDialog, data: res.data, isValid: true });
      }
    } catch (err) {
      setIsDialogOpen(true);
      setConfirmDialog({ ...confirmDialog, data: undefined, isValid: false });
    }
    setForm({ nip: "", birth_date: "" });
    setSubmiting(false);
  };

  return (
    <>
      {isDialogOpen ? null : (
        <Dialog>
          <DialogTrigger className="text-start">
            <Card type="input" />
          </DialogTrigger>
          <DialogContent className="w-[92%]">
            <DialogHeader>
              <DialogTitle className="leading-normal w-[92%]">
                Verifikasi Petugas BPS Menggunakan Kode
              </DialogTitle>
            </DialogHeader>
            <Separator />
            <form className="flex flex-col gap-4" onSubmit={onSubmit}>
              <div className="flex flex-col gap-2">
                <label htmlFor="nip" className="text-gray-900 font-medium">
                  NIP
                </label>
                <Input
                  type="text"
                  placeholder="Kode Petugas"
                  name="nip"
                  id="nip"
                  value={form.nip}
                  onChange={handleChange}
                  required
                  minLength={18}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="birth_date" className="text-gray-900 font-medium">
                  Tanggal Lahir
                </label>
                <Input
                  type="date"
                  name="birth_date"
                  id="birth_date"
                  className="cursor-pointer"
                  value={form.birth_date}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={submiting}>
                {submiting ? <Spinner /> : "Cek Petugas"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      )}
      <ConfirmDialog
        data={confirmDialog.data}
        isValid={confirmDialog.isValid}
        open={isDialogOpen}
        onClose={handleCloseDialog}
      />
    </>
  );
}
