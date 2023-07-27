"use client";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ISignIn, useSignIn } from "@/hooks/auth";
import Spinner from "../ui/spinner";
import { useAuthContext } from "@/utils/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

function LoginDialog() {
  const { isLoggedIn, isAdmin } = useAuthContext();
  const { push } = useRouter();

  useEffect(() => {
    if (isLoggedIn && !isAdmin) return push("/petugas");
    else if (isLoggedIn && isAdmin) return push("/admin");
  }, [isLoggedIn, isAdmin]);

  const [form, setForm] = useState<ISignIn>({
    identifier: "",
    password: "",
  });
  const [submiting, setSubmiting] = useState(false);

  const signInMutation = useSignIn(form);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  async function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    setSubmiting(true);
    try {
      await signInMutation.mutateAsync();
    } catch (error) {
      setSubmiting(false);
      return toast.error("Username atau password salah");
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-lg font-semibold bg-blue-600 hover:bg-blue-700" size="sm">
          Login
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[92%]">
        <DialogHeader>
          <DialogTitle className="leading-normal w-[92%]">Login Petugas/Admin BPS</DialogTitle>
        </DialogHeader>
        <Separator />
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="identifier" className="text-gray-900 font-medium">
              Username
            </label>
            <Input
              type="text"
              placeholder="Username"
              name="identifier"
              id="identifier"
              value={form.identifier}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-gray-900 font-medium">
              Password
            </label>
            <Input
              type="password"
              placeholder="*********"
              name="password"
              id="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={submiting}>
            {submiting ? <Spinner /> : "Login Sekarang"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default LoginDialog;
