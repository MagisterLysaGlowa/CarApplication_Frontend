"use server";
import { cookies } from "next/headers";
export async function getToken() {
  try {
    const token = (await cookies()).get("token");
    if (token) {
      return token.value;
    }
  } catch (error) {
    return "";
  }
}
