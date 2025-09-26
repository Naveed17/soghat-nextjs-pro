import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "@lib/session";

export async function GET(request: Request) {
  const session = (await cookies()).get("session")?.value;
  if (!session) return NextResponse.json({ user: null });
  const user = await decrypt(session);
  return NextResponse.json({ user });
}
