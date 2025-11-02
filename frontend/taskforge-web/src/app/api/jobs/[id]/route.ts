import { NextRequest, NextResponse } from "next/server";
import { db, JobStatus } from "@/lib/db";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const job = db.jobs.get(params.id);
  if (!job) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(job);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const patch = await req.json();
  const allowed: (keyof typeof patch)[] = ["title", "customer", "price", "status"];
  const clean: any = {};
  for (const k of allowed) if (k in patch) clean[k] = patch[k];

  if (clean.status && !["active","complete","paid"].includes(clean.status as JobStatus)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const updated = db.jobs.update(params.id, clean);
  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const exists = db.jobs.get(params.id);
  if (!exists) return NextResponse.json({ error: "Not found" }, { status: 404 });
  // simple remove
  (db as any)._jobs = db.jobs.list().filter(j => j.id !== params.id);
  return NextResponse.json({});
}
