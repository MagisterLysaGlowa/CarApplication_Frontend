"use server";
import { ParamValue } from "next/dist/server/request/params";
import { cookies } from "next/headers";

export async function getOfferById(offerId: ParamValue) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/Offer/${offerId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    const data = await res.json();
    if (!res.ok) {
      return null;
    }

    if (!data) {
      return null;
    }
    return data;
  } catch (error) {
    return {
      success: false,
      error: `Failed to authenticate. Please try again. ${error}`,
    };
  }
}
