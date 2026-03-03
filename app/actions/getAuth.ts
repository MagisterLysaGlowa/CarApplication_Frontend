"use server";
import { cookies } from "next/headers";

export async function getAuth() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (!token) {
      return { success: false, error: "No token found" };
    }

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!backendUrl) {
      console.error("NEXT_PUBLIC_BACKEND_URL is not defined");
      return { success: false, error: "Backend URL configuration missing" };
    }

    const url = `${backendUrl}/Auth`;
    // Add timeout and better error handling
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
      cache: "no-store",
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    const data = await res.json();
    if (!res.ok) {
      return {
        success: false,
        error: data.message || "Nieprawidłowe dane",
        status: res.status,
      };
    }

    if (!data) {
      return { success: false, error: "No data returned from authentication" };
    }
    return { success: true, data: data };
  } catch (error) {
    return {
      success: false,
      error: `Failed to authenticate. Please try again. ${error}`,
    };
  }
}
