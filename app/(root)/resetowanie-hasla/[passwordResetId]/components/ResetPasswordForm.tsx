"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {
  passwordResetId: string;
};

const ResetPasswordForm = ({ passwordResetId }: Props) => {
  const [password, setPassword] = useState<string>("");
  const [passwordRepeat, setPasswordRepeat] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<string>("");
  const router = useRouter();
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const fetchEmail = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/Auth/getEmailByResetId/${passwordResetId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        toast.error("Nie udało się pobrać adresu email.");
        return;
      }
      const email = await res.text();
      setEmail(email);
    } catch (error) {
      toast.error("Wystąpił błąd podczas pobierania adresu email.");
    }
  };

  useEffect(() => {
    fetchEmail();
  }, [passwordResetId]);

  const validatePassword = (password: string): boolean => {
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Hasło musi zawierać małe i duże litery, cyfrę oraz znak specjalny"
      );
      return false;
    }
    setPasswordError("");
    return true;
  };

  const resetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    // Walidacja hasła
    if (!validatePassword(password)) {
      return;
    }

    // Sprawdzenie czy hasła są identyczne
    if (password !== passwordRepeat) {
      toast.error("Hasła nie są identyczne.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/Auth/resetUserPassowrd`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: password,
            passwordRepeat: passwordRepeat,
            email: email,
          }),
        }
      );

      if (!res.ok) {
        toast.error("Nie udało się zresetować hasła. Spróbuj ponownie.");
      } else {
        toast.success("Hasło zostało pomyślnie zresetowane!", {
          onClose: () => {
            // Przekierowanie do strony logowania po zamknięciu toasta
            router.push("/signIn");
          },
          autoClose: 3000, // Toast będzie widoczny przez 3 sekundy
        });
        // Czyszczenie formularza po sukcesie
        setPassword("");
        setPasswordRepeat("");
      }
    } catch (error) {
      toast.error("Wystąpił błąd podczas resetowania hasła.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} />
      <h3 className="mobile-h3 lg:desktop-h3 my-10 text-center">
        Resetowanie hasła dla {email}
      </h3>
      <form
        className="max-w-[600px] bg-WHITE-100 w-full rounded-[32px] shadow-md px-10 py-12"
        onSubmit={resetPassword}
      >
        <div className="flex flex-col">
          <label htmlFor="password" className="mobile-large lg:desktop-large">
            Hasło
          </label>
          <input
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validatePassword(e.target.value);
            }}
            type="password"
            className="h-14 border-[0.12em] border-WHITE-500 shadow-md rounded-xl pl-5 mobile-large lg:desktop-large outline-none"
          />
          {passwordError && (
            <p className="text-red-500 text-sm mt-1">{passwordError}</p>
          )}
        </div>

        <div className="flex flex-col mt-8">
          <label
            htmlFor="passwordRepeat"
            className="mobile-large lg:desktop-large"
          >
            Powtórz Hasło
          </label>
          <input
            id="passwordRepeat"
            value={passwordRepeat}
            onChange={(e) => {
              setPasswordRepeat(e.target.value);
            }}
            type="password"
            className="h-14 border-[0.12em] border-WHITE-500 shadow-md rounded-xl pl-5 mobile-large lg:desktop-large outline-none"
          />
          {password !== passwordRepeat && passwordRepeat !== "" && (
            <p className="text-red-500 text-sm mt-1">Hasła nie są identyczne</p>
          )}
        </div>

        <button
          className="aqua-btn mt-10 !py-5 w-full !rounded-xl"
          disabled={isLoading}
        >
          {isLoading ? "Resetowanie..." : "Resetuj hasło"}
        </button>
      </form>
    </>
  );
};

export default ResetPasswordForm;
