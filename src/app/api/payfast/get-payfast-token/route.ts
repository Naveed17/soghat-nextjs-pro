import { NextResponse } from "next/server";
export async function GET() {
  const merchant_id = "102";
  const secured_key = "zWHjBp2AlttNu1sK";
  const response = await fetch(
    "https://ipguat.apps.net.pk/Ecommerce/api/Transaction/GetAccessToken",
    {
      cache: "no-cache",
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cache-Control": "no-cache", // Prevents caching
        Pragma: "no-cache", // HTTP 1.0 backward compatibility
      },
      body: new URLSearchParams({
        MERCHANT_ID: merchant_id,
        SECURED_KEY: secured_key!,
      }),
    }
  );
  const data = await response.json();
  return NextResponse.json({ token: data.ACCESS_TOKEN });
}
