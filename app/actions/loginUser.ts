"use server";
import { cookies } from "next/headers";
export async function loginUser(
  username: string | undefined,
  password: string | undefined
) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/Auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          login: username,
          password: password,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return {
        error: data.message || "Nieprawidłowe dane logowania",
        status: res.status,
      };
    }

    const token = data.token;
    (await cookies()).set("token", token, {
      httpOnly: true, // Chroni przed dostępem z JavaScript
      secure: true, // Użyj secure tylko w produkcji
      sameSite: "none", // Zabezpiecza przed CSRF
      path: "/", // Ciasteczko dostępne w całej witrynie
      maxAge: 60 * 60 * 24 * 3, // Ważność ciasteczka: 7 dni
    });

    return { success: true, data: data };
  } catch (error) {
    return { error: `Failed to Login. Please try again. ${error}` };
  }
}
