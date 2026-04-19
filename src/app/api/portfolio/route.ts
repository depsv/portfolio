import { NextResponse } from "next/server";
import { getPortfolioDataFromDB, initializeDatabase } from "@/lib/db";
import { defaultData } from "@/lib/data";

export async function GET() {
  try {
    await initializeDatabase();
    const data = await getPortfolioDataFromDB();
    return NextResponse.json(data ?? defaultData);
  } catch (error) {
    console.error("Failed to fetch portfolio data:", error);
    return NextResponse.json(defaultData);
  }
}
