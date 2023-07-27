import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "../ui/separator";
import Card from "../home/card";

type ShowQRProps = {
  image: string | undefined;
};

function ShowQR(props: ShowQRProps) {
  return (
    <Dialog>
      <DialogTrigger className="text-start">
        <Card type="petugasQR" />
      </DialogTrigger>
      <DialogContent className="w-[92%]">
        <DialogHeader>
          <DialogTitle className="leading-normal text-center w-[92%]">Tunjukan QR</DialogTitle>
        </DialogHeader>
        <Separator />
        <div className="flex justify-center items-center">
          <img
            alt="logo"
            className="w-72"
            src={`https://is3.cloudhost.id/bpsense${props.image}`}
            width={0}
            height={0}
            placeholder="blur"
            loading="lazy"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ShowQR;
