import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  return NextResponse.json(db.leads.list());
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, phone, service } = body ?? {};
  if (!name || !phone || !service) {
    return NextResponse.json({ error: "Invalid lead payload" }, { status: 400 });
  }
  const lead = db.leads.add({ name, phone, service });
  return NextResponse.json(lead, { status: 201 });
}
