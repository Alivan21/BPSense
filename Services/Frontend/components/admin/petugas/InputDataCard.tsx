"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Spinner from "@/components/ui/spinner";
import { IOfficerStore, useCreateDataOfficer } from "@/hooks/admin";
import { BaseResponse } from "@/utils/constant";

export default function InputDataCard() {
  const [form, setForm] = useState<IOfficerStore>({
    name: "",
    nip: "",
    birth_date: "",
  });

  const [submiting, setSubmiting] = useState(false);
  const [response, setResponse] = useState<BaseResponse<any>>();

  const createDataMutation = useCreateDataOfficer(form);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setSubmiting(true);
    try {
      await createDataMutation.mutateAsync();
    } catch (error: any) {
      if (error.response.data.code === 422) {
        setResponse(error.response.data);
      }
    }
    setSubmiting(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 text-white font-medium text-base py-2 px-4 rounded-md shadow-md hover:bg-blue-700">
          Tambah Data
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[92%]">
        <DialogHeader>
          <DialogTitle className="leading-normal w-[92%]">Tambah Data Petugas</DialogTitle>
        </DialogHeader>
        <Separator />
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="nip" className="text-gray-900 font-medium">
              Nama
            </label>
            <Input
              type="text"
              placeholder="Nama Petugas"
              name="name"
              id="name"
              value={form.name}
              onChange={handleChange}
              required
            />
            {response?.data.name && (
              <p className="text-sm text-red-400 font-medium">{response?.data.name[0]}</p>
            )}
          </div>
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
            {response?.data.nip && (
              <p className="text-sm text-red-400 font-medium">{response?.data.nip[0]}</p>
            )}
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
            {response?.data.birth_date && (
              <p className="text-sm text-red-400 font-medium">{response?.data.birth_date[0]}</p>
            )}
          </div>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={submiting}>
            {submiting ? <Spinner /> : "Tambah Data"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
