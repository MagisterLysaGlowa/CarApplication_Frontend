"use server";
import { cookies } from "next/headers";

export const setCookieToken = async (token: string | undefined) => {
  if (token) {
    (await cookies()).set("token", token, {
      httpOnly: true, // Chroni przed dostępem z JavaScript
      secure: true, // Użyj secure tylko w produkcji
      sameSite: "none", // Zabezpiecza przed CSRF
      path: "/", // Ciasteczko dostępne w całej witrynie
      maxAge: 60 * 60 * 24 * 3, // Ważność ciasteczka: 7 dni
    });
  }
};
