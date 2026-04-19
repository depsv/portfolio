import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { savePortfolioDataToDB, initializeDatabase } from "@/lib/db";

const SESSION_COOKIE = "admin_session";

async function getExpectedToken(): Promise<string> {
  const secret = process.env.ADMIN_SECRET ?? "";
  const password = process.env.ADMIN_PASSWORD ?? "";
  const data = new TextEncoder().encode(secret + password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function POST(request: NextRequest) {
  // Verify session
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE)?.value;
  const expectedToken = await getExpectedToken();

  if (!sessionCookie || sessionCookie !== expectedToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    await initializeDatabase();
    await savePortfolioDataToDB(body);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to save portfolio data:", error);
    return NextResponse.json({ error: "Failed to save data" }, { status: 500 });
  }
}
