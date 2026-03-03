// app/api/payment/create.ts
import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://localhost:5001";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await fetch(`${API_URL}/Payment/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(
        data.message || "Wystąpił błąd podczas tworzenia płatności"
      );
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error creating payment:", error);
    return NextResponse.json(
      {
        message: error.message || "Wystąpił błąd podczas tworzenia płatności",
      },
      { status: 500 }
    );
  }
}
