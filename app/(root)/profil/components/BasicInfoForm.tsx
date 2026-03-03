"use client";
import React, { useEffect, useRef, useState } from "react";
import EditIcon from "../../../../public/images/icons/edit_icon.svg";
import XIcon from "../../../../public/images/icons/x_icon.svg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userBasicInfoFormSchema } from "@/app/schema/schema";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
type Props = {
  user: any;
};

const BasicInfoForm = (props: Props) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof userBasicInfoFormSchema>>({
    resolver: zodResolver(userBasicInfoFormSchema),
    mode: "onChange",
  });
  const router = useRouter();
  const { user } = props;
  const formRef = useRef<HTMLFormElement>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [activeInput, setActiveInput] = useState<string>(
    "mobile-normal lg:desktop-normal text-[#878787] h-12 px-5 border-[0.12em] rounded-xl"
  );
  const [activeLabel, setActiveLabel] = useState<string>(
    "mobile-normal lg:desktop-normal text-[#272727]"
  );
  useEffect(() => {
    setActiveInput(
      editMode
        ? "mobile-normal lg:desktop-normal text-[#878787] h-12 px-5 border-[0.12em] rounded-xl"
        : "mobile-normal-bold lg:desktop-normal-bold text-[#878787] bg-transparent pointer-events-none"
    );
    setActiveLabel(
      editMode
        ? "mobile-normal lg:desktop-normal text-[#272727]"
        : "mobile-normal lg:desktop-normal text-[#878787]"
    );
  }, [editMode]);

  const resetData = () => {
    reset({
      name: user.data.name,
      surname: user.data.surname,
      email: user.data.email,
      phone: user.data.phoneNumber,
      companyName: user.data.companyName,
      nip: user.data.nip,
    });
  };

  useEffect(() => {
    resetData();
  }, []);

  const updateUserBasicInfoMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/Auth/updateBasicInfo`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.data.userId,
            companyName: data.companyName,
            email: user.data.email, // Zachowujemy oryginalny email, bez możliwości edycji
            name: data.name,
            nip: data.nip,
            phoneNumber: data.phone,
            surname: data.surname,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Nie udało się zaktualizować danych"
        );
      }

      return await response.json();
    },
    onSuccess: (data) => {
      router.refresh();
      setEditMode(false);
      toast.success("Pomyślnie zedytowano profil!");
    },
    onError: (error) => {
      toast.error("Wystąpił błąd podczas edycji profilu!");
    },
  });

  return (
    <article className="bg-[#FAFAFA] px-5 sm:px-10 py-8 flex rounded-[24px] mt-10 flex-col ">
      <div className="flex flex-col sm:flex-row w-full items-start sm:items-center gap-y-5">
        <h6
          className="mobile-h6 lg:desktop-h6 flex-grow w-full"
          style={{ fontFamily: "Inter" }}
        >
          Informacje podstawowe
        </h6>
        <div className="relative flex flex-row gap-3">
          {editMode && (
            <>
              <button
                className="aqua-btn mobile-small sm:mobile-normal-bold lg:desktop-normal-bold self-center flex gap-x-2 sm:min-w-[180px] !py-3 lg:!py-5 !rounded-lg"
                onClick={() => {
                  if (formRef.current) {
                    formRef.current.requestSubmit();
                  }
                }}
              >
                Zapisz zmiany
              </button>
              <button
                className="bg-[#EAEAEA] text-[#878787] mobile-normal-bold lg:desktop-normal-bold  gap-x-2 w-[40px] flex sm:block justify-center items-center sm:min-w-[180px] !py-3 lg:!py-5 !rounded-lg relative xl:absolute xl:top-20"
                onClick={() => {
                  setEditMode((prevState) => !prevState);
                  resetData();
                }}
              >
                <span className="sm:block hidden">Anuluj</span>
                <XIcon
                  width={22}
                  height={22}
                  fill="#878787"
                  className="sm:hidden block"
                />
              </button>
            </>
          )}
          {!editMode && (
            <button
              className="text-[#878787] bg-[#EAEAEA] mobile-normal-bold lg:desktop-normal-bold self-center flex gap-x-2 px-10  !py-3 lg:!py-5 rounded-lg"
              onClick={() => {
                setEditMode((prevState) => !prevState);
              }}
            >
              <EditIcon width={22} height={22} />
              Edytuj
            </button>
          )}
        </div>
      </div>

      <form
        ref={formRef}
        className="grid grid-cols-1 sm:grid-cols-2 max-w-[800px] gap-x-10 gap-y-10 mt-10"
        onSubmit={handleSubmit((data) =>
          updateUserBasicInfoMutation.mutate(data)
        )}
      >
        <div className="flex flex-col gap-y-2">
          <label htmlFor="name" className={activeLabel}>
            Imię
          </label>
          <input
            type="text"
            id="name"
            className={activeInput}
            {...register("name")}
          />
          {errors["name"] && (
            <span className="text-red-500 text-sm">
              {errors["name"]?.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-y-2">
          <label htmlFor="surname" className={activeLabel}>
            Nazwisko
          </label>
          <input
            type="text"
            id="surname"
            className={activeInput}
            {...register("surname")}
          />
          {errors["surname"] && (
            <span className="text-red-500 text-sm">
              {errors["surname"]?.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-y-2">
          <label htmlFor="email" className={activeLabel}>
            Adres e-mail
          </label>
          <input
            type="text"
            id="email"
            className={activeInput + " bg-gray-100"}
            value={user.data.email}
            disabled
          />
        </div>

        <div className="flex flex-col gap-y-2">
          <label htmlFor="phoneNumber" className={activeLabel}>
            Numer telefonu
          </label>
          <input
            type="text"
            id="phoneNumber"
            className={activeInput}
            {...register("phone")}
          />
          {errors["phone"] && (
            <span className="text-red-500 text-sm">
              {errors["phone"]?.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-y-2">
          <label htmlFor="companyName" className={activeLabel}>
            Nazwa firmy
          </label>
          <input
            type="text"
            id="companyName"
            className={activeInput}
            {...register("companyName")}
          />
          {errors["companyName"] && (
            <span className="text-red-500 text-sm">
              {errors["companyName"]?.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-y-2">
          <label htmlFor="nip" className={activeLabel}>
            NIP
          </label>
          <input
            type="text"
            id="nip"
            className={activeInput}
            {...register("nip")}
          />
          {errors["nip"] && (
            <span className="text-red-500 text-sm">
              {errors["nip"]?.message}
            </span>
          )}
        </div>
      </form>
    </article>
  );
};

export default BasicInfoForm;
