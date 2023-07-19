import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Card from "./Card";

export default function InputCodeCard() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card type="input" />
      </DialogTrigger>
      <DialogContent className="w-[92%]">
        <DialogHeader>
          <DialogTitle className="leading-normal w-[92%]">
            Verifikasi Petugas BPS Menggunakan Kode
          </DialogTitle>
        </DialogHeader>
        <Separator />
        <form action="" className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="code" className="text-gray-900 font-medium">
              Kode Petugas
            </label>
            <Input type="text" placeholder="Kode Petugas" name="code" id="code" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="date" className="text-gray-900 font-medium">
              Tanggal Lahir
            </label>
            <Input type="date" name="date" id="date" className="cursor-pointer" />
          </div>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            Cek Petugas
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
