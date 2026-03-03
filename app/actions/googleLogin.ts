"use server";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export interface GoogleUserData {
  email: string;
  name: string;
  picture?: string;
}

export const googleLogin = async (credential: string) => {
  try {
    // Dekoduj token Google
    const decodedUser = jwtDecode(credential) as {
      email: string;
      name: string;
      picture?: string;
    };

    // Przygotuj dane do wysłania na backend
    const googleAuthData = {
      idToken: credential,
      email: decodedUser.email,
      name: decodedUser.name,
      photoUrl: decodedUser.picture,
    };
    // Wyślij żądanie do backendu
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google-login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(googleAuthData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Błąd logowania przez Google");
    }
    const data = await response.json();

    const token = data.token;
    (await cookies()).set("token", token, {
      httpOnly: true, // Chroni przed dostępem z JavaScript
      secure: true, // Użyj secure tylko w produkcji
      sameSite: "none", // Zabezpiecza przed CSRF
      path: "/", // Ciasteczko dostępne w całej witrynie
      maxAge: 60 * 60 * 24 * 3, // Ważność ciasteczka: 7 dni
    });

    return { success: true, data };
  } catch (error) {
    console.error("Błąd podczas logowania przez Google:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Nieznany błąd logowania",
    };
  }
};
