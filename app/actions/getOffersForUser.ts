"use server";

import { getAuth } from "./getAuth";

export const getOffersForUser = async () => {
  try {
    const response = await getAuth();
    const user = response?.data;
    if (user) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/Offer/allUserOffers/${user.userId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await res.json();

      if (!res.ok) {
        throw new Error("Fetching offers failed");
      }
      return { success: true, data: data };
    } else {
      throw "error";
    }
  } catch (error) {
    return { error: `Failed to Fetch Offers. Please try again. ${error}` };
  }
};
