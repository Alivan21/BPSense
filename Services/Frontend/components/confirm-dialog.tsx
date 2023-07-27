import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formatDateToIndonesian } from "@/utils/format-date";

type TDataDialog = {
  nip: string;
  name: string;
  birth_date?: string;
};

export type TConfirmDialog = {
  data?: TDataDialog;
  isValid: boolean;
  open: boolean;
  onClose: () => void;
};

function ConfirmDialog(props: TConfirmDialog) {
  const backToMenu = () => {
    props.onClose();
  };
  if (props.data?.birth_date) {
    props.data.birth_date = formatDateToIndonesian(props.data.birth_date);
  }
  return (
    <Dialog open={props.open} onOpenChange={props.onClose}>
      <DialogContent className="w-[92%] flex flex-col justify-center items-center gap-5">
        <Image
          alt="phone"
          className="w-44"
          src="/verify.svg"
          width={0}
          height={0}
          blurDataURL="/verify.svg"
          placeholder="blur"
        />
        <div className="flex flex-col gap-6 w-full">
          {props.isValid ? (
            <h1 className="text-2xl font-bold text-green-500 text-center">Data Valid</h1>
          ) : (
            <h1 className="text-2xl font-bold text-red-500 text-center">Data Tidak Valid</h1>
          )}
          {props.data && (
            <div className="flex flex-col gap-2">
              <span>NIP : {props.data.nip}</span>
              <span>Nama : {props.data.name}</span>
              <span>Tanggal Lahir : {props.data.birth_date}</span>
            </div>
          )}
        </div>
        <Button type="button" className="w-full bg-blue-600 hover:bg-blue-700" onClick={backToMenu}>
          {props.data ? "Kembali ke Menu" : "Cek Ulang"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmDialog;
