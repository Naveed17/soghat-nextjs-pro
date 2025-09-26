import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decryptData } from "@lib/cryptoJS";
import { transaction } from "@src/actions";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const params = new URLSearchParams(rawBody);
    const PaRes = params.get("PaRes");
    if (!PaRes) throw new Error("Missing PaRes parameter.");

    const value = cookies().get("customer_validate")?.value;
    if (!value) throw new Error("Missing customer validation cookie.");

    let customer;
    try {
      customer = decryptData(value as string);
    } catch (decryptError) {
      console.error("Error decrypting customer data:", decryptError);
      throw new Error("Failed to decrypt customer data.");
    }

    const payload = { ...customer, data_3ds_pares: PaRes };

    // Delete the cookie safely
    cookies().set("customer_validate", "", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      expires: new Date(0),
    });
    const data = await transaction(payload);

    if (data?.status === "error") {
      return NextResponse.json({ error: data.message });
    }

    const { status, message, ...rest } = data;
    cookies().set(
      "success_transaction",
      JSON.stringify({ ...rest.payment_details }),
      {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 60, // 60 seconds
      }
    );

    return NextResponse.json({ message: "Please wait for the Payment..." });
  } catch (error) {
    console.error("Error in callback handler:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
