import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export async function GET(request: Request) {
  const value = (await cookies()).get("success_transaction")?.value;
  if (!value) {
    return NextResponse.json({ status: "pending" });
  }
  return NextResponse.json({ status: true, ...JSON.parse(value) });
}
