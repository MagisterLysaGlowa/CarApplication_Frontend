"use client";
import { loginFormSchema } from "@/app/schema/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm, UseFormRegister } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-toastify";
import { loginUser } from "@/app/actions/loginUser";
import { useRouter, useSearchParams } from "next/navigation";
import { startConnection } from "@/lib/signalrClient";
import Link from "next/link";

const InputGroup = ({
  inputType,
  label,
  placeholder,
  name,
  register,
  error,
}: {
  inputType: string;
  label: string;
  error?: string;
  name: "username" | "password";
  placeholder: string;
  register: UseFormRegister<{
    username: string;
    password: string;
  }>;
}) => (
  <div className="flex flex-col">
    {name === "password" ? (
      <label className="w-full text-[#272727] lg:desktop-large-bold mb-2 flex gap-1 items-center">
        <span className="flex-grow">{label}</span>
        <Link
          className="mobile-normal desktop-normal text-[#272727]"
          href={"/zapomnialem-hasla"}
        >
          Nie pamiętam hasła
        </Link>
      </label>
    ) : (
      <label className="w-full text-[#272727] mobile-large-bold lg:desktop-large-bold mb-2">
        {label}
      </label>
    )}
    <input
      className="w-full h-14 border-[.1em] border-WHITE-500 rounded-[10px] desktop-normal px-5"
      type={inputType}
      {...register(name)}
      placeholder={placeholder}
    />
    {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
  </div>
);

const CredentialsForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    mode: "onChange",
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  // const callback = searchParams.get("callback") || "/chce-kupic";

  const loginMutation = useMutation({
    mutationFn: async (data: { username: string; password: string }) => {
      setLoading(true);
      const result = await loginUser(data?.username, data?.password);

      if (result?.error) throw new Error(result.error); // Throw error to handle it in `onError`
      return result;
    },
    onSuccess: async (data) => {
      const con = await startConnection();
      setLoading(false);
      router.push("/chce-kupic");
    },
    onError: () => {
      toast.warn("Nie udało się zalogować!");
      setLoading(false);
    },
  });

  return (
    <form
      className="flex flex-col gap-8 mt-6"
      onSubmit={handleSubmit((data) => loginMutation.mutate(data))}
    >
      <InputGroup
        inputType="text"
        label="Nazwa użytkownika lub email"
        placeholder="Wpisz login"
        name="username"
        register={register}
        error={errors.username?.message}
      />
      <InputGroup
        inputType="password"
        label="Hasło"
        placeholder="Hasło do konta"
        name="password"
        register={register}
        error={errors.password?.message}
      />
      <button className="aqua-btn !py-5 w-full" disabled={loading}>
        {loading ? "Logowanie..." : "Zaloguj się"}
      </button>
    </form>
  );
};

export default CredentialsForm;
