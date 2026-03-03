"use client";
import Image from "next/image";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { toast } from "react-toastify";

// Validation schema
const ContactSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email jest wymagany" })
    .email({ message: "Nieprawidłowy format adresu email" }),
  privacyPolicy: z.boolean().refine((val) => val, {
    message: "Musisz zaakceptować politykę prywatności i regulamin",
  }),
});

type ContactFormData = z.infer<typeof ContactSchema>;

const Contact = ({ user }: { user: any }) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      email: "",
      privacyPolicy: false,
    },
    mode: "onChange", // To enable real-time validation
  });

  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Przykładowa symulacja wysyłki z opóźnieniem
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/Mail/contact-${data.email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        toast.success("Wysłano formularz z danymi:");
      } else {
        toast.warning("Błąd przy wysyłaniu formularza!:");
      }

      // Pokaż komunikat sukcesu
      setIsSuccess(true);

      // Resetowanie formularza po sukcesie
      reset();

      // Ukryj komunikat sukcesu po 3 sekundach
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      console.error("Błąd podczas wysyłania formularza:", error);
    }
  };

  return (
    <section
      className="flex justify-center bg-[#F2F7FF] pt-24 pb-5 lg:pb-36 px-2 sm:px-5 2xl:px-0"
      id="contact"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[20px] lg:gap-x-[80px] w-full max-w-[1400px]">
        <div className="bg-white rounded-[24px] px-5 sm:px-10 flex flex-col justify-center py-10 lg:py-5 shadow-md">
          <p className="mobile-small lg:desktop-small text-GOLD-400">Kontakt</p>
          {user && user.userId ? (
            <>
              <h2 className="mobile-h2 lg:desktop-h2 text-BLACK-600 mt-8">
                Skontaktuj się z nami
              </h2>
              <p className="text-BLACK-600 mobile-normal lg:desktop-normal mt-3">
                Jeśli potrzebujesz pomocy lub masz pytania, zostaw nam swój
                adres email, a my odpowiemy tak szybko jak to możliwe i
                rozwiejemy wszelkie wątpliwości.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
                <div className="flex items-center mb-6">
                  <Controller
                    name="privacyPolicy"
                    control={control}
                    render={({ field }) => (
                      <>
                        <input
                          type="checkbox"
                          id="accept"
                          className={`w-4 h-4 cursor-pointer ${
                            errors.privacyPolicy ? "border-red-500" : ""
                          }`}
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                        />
                        <label
                          htmlFor="accept"
                          className="ml-2 mobile-small lg:desktop-small text-[#454545] flex flex-wrap items-center cursor-pointer"
                        >
                          <p className="flex flex-wrap items-center gap-y-2 ml-2">
                            <span>Akceptuję</span>
                            <span className="text-AQUA-400 mx-1">
                              politykę prywatności
                            </span>
                            <span>oraz</span>
                            <span className="text-AQUA-400 mx-1">
                              regulamin
                            </span>
                            <span>serwisu YourVehicle</span>
                          </p>
                        </label>
                      </>
                    )}
                  />
                </div>
                {errors.privacyPolicy && (
                  <p className="text-red-500 -mt-4 mb-4 text-sm">
                    {errors.privacyPolicy.message}
                  </p>
                )}

                <div className="mb-4 gap-x-5 sm:gap-y-0 gap-y-3 contact-grid-form">
                  <div className="w-full">
                    <input
                      type="email"
                      {...register("email", {
                        onChange: () => {}, // Trigger onChange for real-time validation
                      })}
                      placeholder="Podaj adres email"
                      className={`w-full h-12 rounded-lg px-4 border ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      } outline-none transition-all`}
                    />
                    {errors.email && (
                      <p className="text-red-500 mt-2 text-sm">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !isValid}
                    className={`
                      aqua-btn h-12 mobile-small lg:mobile-normal contact-btn !transition-none
                      ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}
                    `}
                  >
                    {isSubmitting ? "Wysyłanie..." : "Zamów kontakt"}
                  </button>
                </div>
              </form>
            </>
          ) : (
            <>
              <h2 className="mobile-h2 lg:desktop-h2 text-BLACK-600 mt-5">
                Chcesz napisać wiadomość?
              </h2>
              <p className="text-BLACK-600 mobile-normal lg:desktop-normal mt-3">
                Załóż konto i skontaktuj się z nami poprzez formularz!
              </p>
              <div className="flex md:flex-row flex-col gap-3 mt-5">
                <Link href={"/signIn"} className="aqua-btn !py-5 !rounded-2xl">
                  Zaloguj się
                </Link>
                <Link
                  href={"/register"}
                  className="aqua-border-btn !py-5 !rounded-2xl"
                >
                  Załóż konto
                </Link>
              </div>
            </>
          )}
        </div>
        <div className="w-full relative">
          <div className="absolute flex flex-col w-[80%] lg:w-auto lg:max-w-[400px] xl:max-w-[500px] top-[40px] max-w-[600px]">
            <Image
              alt="contact"
              src="/images/landing/contact_box_1.webp"
              className="w-full"
              width={400}
              height={400}
            />
            <Image
              alt="contact"
              src="/images/landing/contact_box_2.webp"
              className="w-full mt-5 ml-16"
              width={400}
              height={400}
            />
          </div>
          <Image
            alt="contact"
            src="/images/landing/car.webp"
            className="w-full mt-16 sm:mt-0"
            width={400}
            height={400}
          />
        </div>
      </div>
    </section>
  );
};

export default Contact;
