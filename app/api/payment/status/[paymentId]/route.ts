import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://localhost:5001";

export async function GET(request: NextRequest, context: any) {
  const { params } = context;
  const { paymentId } = await params;

  if (!paymentId) {
    return NextResponse.json(
      { message: "Brak parametru paymentId" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(`${API_URL}/api/Payment/status/${paymentId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Wystąpił błąd podczas pobierania statusu płatności"
      );
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error fetching payment status:", error);
    return NextResponse.json(
      {
        message:
          error.message || "Wystąpił błąd podczas pobierania statusu płatności",
      },
      { status: 500 }
    );
  }
}
