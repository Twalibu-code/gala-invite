import { NextResponse } from "next/server";
import { getStats } from "@/lib/sheets";

export const revalidate = 60;

// Public, aggregate-only numbers. No names, emails or phone numbers are ever returned.
export async function GET() {
  const { error, ...stats } = await getStats();
  return NextResponse.json(stats);
}
