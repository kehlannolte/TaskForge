import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  return NextResponse.json(db.jobs.list());
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { title, customer, price } = body ?? {};
  if (!title || !customer || typeof price !== "number") {
    return NextResponse.json({ error: "Invalid job payload" }, { status: 400 });
  }
  const job = db.jobs.add({ title, customer, price, status: "active" });
  return NextResponse.json(job, { status: 201 });
}
