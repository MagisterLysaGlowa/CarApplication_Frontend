"use server";
import { cookies } from "next/headers";

export async function logoutUser() {
  try {
    (await cookies()).set("token", "", {
      httpOnly: true,
      secure: true, // Use secure only in production
      sameSite: "none",
      path: "/",
      maxAge: 0, // Expire the cookie immediately
    });

    return { success: true, message: "Logged out successfully" };
  } catch (error) {
    return { error: `Failed to Logout. Please try again. ${error}` };
  }
}
