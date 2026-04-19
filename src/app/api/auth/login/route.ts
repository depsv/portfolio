import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";

const SESSION_COOKIE = "admin_session";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function getSessionToken(): string {
  const secret = process.env.ADMIN_SECRET ?? "";
  const password = process.env.ADMIN_PASSWORD ?? "";
  return createHash("sha256").update(secret + password).digest("hex");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body as { password: string };

    if (!password || password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Password salah" }, { status: 401 });
    }

    const token = getSessionToken();
    const response = NextResponse.json({ success: true });

    response.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: COOKIE_MAX_AGE,
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Request tidak valid" }, { status: 400 });
  }
}
