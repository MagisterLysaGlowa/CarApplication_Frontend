"use client";
import React, { useEffect, useRef, useState } from "react";
import EditIcon from "../../../../public/images/icons/edit_icon.svg";
import XIcon from "../../../../public/images/icons/x_icon.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { userAddressInfoFormSchema } from "@/app/schema/schema";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type Props = {
  user: any;
};

const AddressForm = (props: Props) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof userAddressInfoFormSchema>>({
    resolver: zodResolver(userAddressInfoFormSchema),
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
      city: user.data.city,
      street: user.data.street,
      buildingNumber: user.data.buildingNumber,
      zipCode: user.data.zipCode,
    });
  };

  useEffect(() => {
    resetData();
  }, []);

  const updateUserAddressInfoMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/Auth/updateAddressInfo`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.data.userId,
            city: data.city,
            zipCode: data.zipCode,
            buildingNumber: data.buildingNumber,
            street: data.street,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Nie udało się zaktualizować danych adresowych"
        );
      }

      return await response.json();
    },
    onSuccess: (data) => {
      router.refresh();
      setEditMode(false);
      toast.success("Pomyślnie zedytowano adres!");
    },
    onError: (error) => {
      toast.error("Wystąpił błąd podczas edycji adresu!");
    },
  });

  return (
    <article className="bg-[#FAFAFA] px-5 sm:px-10 py-8 flex rounded-[24px] mt-10 flex-col ">
      <div className="flex flex-col sm:flex-row w-full items-start sm:items-center gap-y-5">
        <h6
          className="mobile-h6 lg:desktop-h6 flex-grow w-full"
          style={{ fontFamily: "Inter" }}
        >
          Adres
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
                className="bg-[#EAEAEA] text-[#878787] mobile-normal-bold lg:desktop-normal-bold gap-x-2 w-[40px] flex sm:block justify-center items-center sm:min-w-[180px] !py-3 lg:!py-5 !rounded-lg relative xl:absolute xl:top-20"
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
              className="text-[#878787] bg-[#EAEAEA] mobile-normal-bold lg:desktop-normal-bold self-center flex gap-x-2 px-10 !py-3 lg:!py-5 rounded-lg"
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
          updateUserAddressInfoMutation.mutate(data)
        )}
      >
        {(["street", "buildingNumber", "city", "zipCode"] as const).map(
          (field) => (
            <div key={field} className="flex flex-col gap-y-2">
              <label htmlFor={field} className={activeLabel}>
                {field === "street"
                  ? "Ulica"
                  : field === "buildingNumber"
                  ? "Numer domu / mieszkania"
                  : field === "city"
                  ? "Miasto"
                  : "Kod pocztowy"}
              </label>
              <input
                type={"text"}
                id={field}
                className={activeInput}
                {...register(field)}
              />
              {errors[field] && (
                <span className="text-red-500 text-sm">
                  {errors[field]?.message}
                </span>
              )}
            </div>
          )
        )}
      </form>
    </article>
  );
};

export default AddressForm;
