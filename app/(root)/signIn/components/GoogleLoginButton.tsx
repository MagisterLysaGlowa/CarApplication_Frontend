"use client";
import React from "react";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  CredentialResponse,
} from "@react-oauth/google";
import { googleLogin } from "@/app/actions/googleLogin";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { startConnection } from "@/lib/signalrClient";
import GoogleIcon from "../../../../public/images/icons/google_icon.svg";

interface GoogleLoginButtonProps {
  className?: string;
  onLoginStart?: () => void;
  onLoginSuccess?: () => void;
  onLoginError?: (error: string) => void;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({
  className,
  onLoginStart,
  onLoginSuccess,
  onLoginError,
}) => {
  const router = useRouter();

  const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
    try {
      // Sprawdź, czy credential istnieje
      if (!credentialResponse.credential) {
        toast.error("Nie otrzymano poświadczeń Google");
        if (onLoginError) onLoginError("Brak poświadczeń");
        return;
      }

      if (onLoginStart) onLoginStart();

      const result = await googleLogin(credentialResponse.credential);
      if (!result.success) {
        toast.error(result.error || "Nie udało się zalogować przez Google");
        if (onLoginError) onLoginError(result.error || "Błąd logowania");
        return;
      }

      // Ustanowienie połączenia SignalR
      await startConnection();

      toast.success("Zalogowano pomyślnie!");
      if (onLoginSuccess) onLoginSuccess();

      // Przekieruj użytkownika
      router.push("/chce-kupic");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Nieznany błąd";
      toast.error(`Błąd logowania przez Google: ${errorMessage}`);
      if (onLoginError) onLoginError(errorMessage);
    }
  };

  // ID klienta Google - powinieneś je uzyskać z Google Cloud Console
  // i dodać do zmiennych środowiskowych (.env.local)
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

  if (!clientId) {
    console.warn("Brak skonfigurowanego GOOGLE_CLIENT_ID");
    return (
      <button
        className={`light-btn !py-5 ${className}`}
        onClick={() =>
          toast.error("Logowanie przez Google nie zostało skonfigurowane")
        }
        disabled
      >
        <GoogleIcon width={22} height={22} />
        <span className="ml-2 mobile-normal lg:desktop-normal">
          Zaloguj się przez Google
        </span>
      </button>
    );
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className={`${className} flex justify-center`}>
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => {
            toast.error("Logowanie przez Google nie powiodło się");
            if (onLoginError) onLoginError("Błąd Google OAuth");
          }}
          useOneTap
          type="standard"
          theme="outline"
          text="signin_with"
          shape="rectangular"
          logo_alignment="left"
          locale="pl"
          width="100%"
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
