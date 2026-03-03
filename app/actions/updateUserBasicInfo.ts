"use server";

import { getAuth } from "./getAuth";

export const updateUserBasicInfo = async (data: any): Promise<any> => {
  try {
    const response = await getAuth();
    const user = response?.data;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/Auth/updateBasicInfo`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.userId,
          name: data.name,
          surname: data.surname,
          email: data.email,
          phoneNumber: data.phoneNumber,
          companyName: data.companyName,
          nip: data.nip,
        }),
      }
    );
    const result = await res.json();

    if (!res.ok) {
      throw new Error("Creating offer failed");
    }
    return { success: true, message: result };
  } catch (error) {
    return { error: `Failed to create!. Please try again. ${error}` };
  }
};
