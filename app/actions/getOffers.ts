"use server";

export const getOffers = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/Offer`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error("Fetching offers failed");
    }
    return { success: true, data: data };
  } catch (error) {
    return { error: `Failed to Fetch Offers. Please try again. ${error}` };
  }
};
