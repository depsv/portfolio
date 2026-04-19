import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { cookies } from "next/headers";

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

  const formData = await request.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  // Validate file type
  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Only image files are allowed" }, { status: 400 });
  }

  // Validate file size (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: "File size must be less than 5MB" }, { status: 400 });
  }

  const blob = await put(`avatars/${Date.now()}-${file.name}`, file, {
    access: "public",
  });

  return NextResponse.json({ url: blob.url });
}
