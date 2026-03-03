"use server";

import { getAuth } from "./getAuth";

export const getChatHeaders = async () => {
  try {
    const user = await getAuth();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/Chat/chats/${user?.data.userId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error("Fetching chats failed");
    }
    return { success: true, data: data };
  } catch (error) {
    return { error: `Failed to Fetch Chats. Please try again. ${error}` };
  }
};
