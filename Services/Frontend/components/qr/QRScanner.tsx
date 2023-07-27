"use client";
import { useState } from "react";
import { useSearchQR } from "@/hooks/search";
import Html5Qrcode from "../ui/html5-qrcode";
import ConfirmDialog, { TConfirmDialog } from "../confirm-dialog";
import "@/styles/qr-code.css";

export default function QRScanner() {
  const [qrkey, setQrkey] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const qrSearchMutation = useSearchQR(qrkey);

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const [confirmDialog, setConfirmDialog] = useState<TConfirmDialog>({
    open: isDialogOpen,
    data: { nip: "", name: "", birth_date: "" },
    isValid: false,
    onClose: handleCloseDialog,
  });

  const onNewScanResult = async (decodedText: string) => {
    setQrkey(decodedText);
    try {
      const res = await qrSearchMutation.mutateAsync();
      if (res.code == 200) {
        setIsDialogOpen(true);
        setConfirmDialog({ ...confirmDialog, data: res.data, isValid: true });
      }
    } catch (error) {
      setQrkey("");
    }
    setQrkey("");
  };

  return (
    <>
      <Html5Qrcode fps={7} qrCodeSuccessCallback={onNewScanResult} disableFlip={false} />
      <ConfirmDialog
        data={confirmDialog.data}
        isValid={confirmDialog.isValid}
        open={isDialogOpen}
        onClose={handleCloseDialog}
      />
    </>
  );
}
