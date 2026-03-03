import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

type Props = {
  user: any;
  openedOffer: FullOffer | null;
  setRevalidate: React.Dispatch<React.SetStateAction<boolean>>;
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const MessageModalAceept = ({
  setRevalidate,
  setModalActive,
  user,
  openedOffer,
}: Props) => {
  const router = useRouter();
  const refreshLifeTime = async () => {
    if (!openedOffer) return;

    const toastId = toast.promise(
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/Offer/refresh-offer-lifetime/${user.userId}-${openedOffer.offerId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then(async (res) => {
        if (!res.ok) throw new Error("Błąd podczas odświeżania oferty");
        const data = await res.json();
        setRevalidate(true);
        router.refresh();
        return data;
      }),
      {
        pending: "Odświeżanie oferty...",
        success: "Oferta została pomyślnie odświeżona! 🚀",
        error: "Wystąpił błąd przy odświeżaniu 😓",
      }
    );

    return toastId;
  };

  return (
    <div className="flex items-center flex-col justify-center px-10 bg-white w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] 2xl:w-[40%] z-50 h-[450px] fixed translate-y-[-50%] top-1/2 left-1/2 translate-x-[-50%] rounded-[36px]">
      <h2 className="mobile-h2 lg:desktop-h2 text-BLACK-600 text-center">
        Czy napewno chcesz.....?
      </h2>
      <p className="mobile-normal lg:desktop-normal text-center mt-8">
        To właśnie tutaj pojawią się oferty od potencjalnych sprzedawców w
        odpowiedzi na Twoje zlecenie. Pamiętaj, akceptacja spowoduje pobranie
        <strong> 1 kluczyka</strong> z twojego konta.
      </p>
      <button
        className="text-white aqua-btn w-full !py-5 mt-16"
        onClick={async () => {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/Token/${user.userId}`
          );
          const tokens: number = await res.json();
          if (tokens > 0) {
            refreshLifeTime();
            setModalActive(false);
          } else {
            toast.error("Nie masz wystarczającej ilości kluczyków!");
            setModalActive(false);
          }
        }}
      >
        Tak, podejmij akcje
      </button>
      <button
        className="light-btn w-full !py-5 mt-6 !border-black !text-black"
        onClick={() => {
          setModalActive(false);
        }}
      >
        Anuluj
      </button>
    </div>
  );
};

export default MessageModalAceept;
