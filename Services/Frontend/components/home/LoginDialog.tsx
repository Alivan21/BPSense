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
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

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
        <Button className="text-base font-medium bg-blue-600 hover:bg-blue-700 flex items-center" size="sm">
          Masuk
          <i className="fa-solid fa-arrow-right-to-bracket fa-sm ml-2" style={{ color: "#ffffff" }}></i>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[92%]">
        <DialogHeader>
          <DialogTitle className="leading-normal w-[92%]">Masuk Sebagai Petugas/Admin</DialogTitle>
        </DialogHeader>
        <Separator />
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="identifier" className="text-gray-900 font-medium">
              NIP
            </label>
            <Input
              type="text"
              placeholder="123456789"
              name="identifier"
              id="identifier"
              value={form.identifier}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col gap-2 relative">
            <label htmlFor="password" className="text-gray-900 font-medium">
              Password
            </label>
            <Input
              type={showPassword ? "text" : "password"} // Toggle the type based on showPassword state
              placeholder={showPassword ? "Password" : "*********"}
              name="password"
              id="password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="absolute top-[73%] right-4 transform -translate-y-1/2 bg-transparent focus:outline-none"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i>}
            </button>
          </div>
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-sm font-medium"
            disabled={submiting}
          >
            {submiting ? <Spinner /> : "Masuk Sekarang"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default LoginDialog;
