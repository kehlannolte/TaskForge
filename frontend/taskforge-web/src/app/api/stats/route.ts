import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  return NextResponse.json({
    weeklyEarnings: db.stats.weeklyEarnings(),
    monthEarnings: db.stats.monthEarnings(),
    activeJobs: db.stats.activeCount(),
  });
}
