import { NextResponse } from "next/server";
import { deleteJob, getJob, updateJob, type Job } from "@/lib/store";

type Params = { params: { id: string } };

export const dynamic = "force-dynamic";

// GET /api/jobs/:id -> Job
export async function GET(_req: Request, { params }: Params) {
  const job = getJob(params.id);
  if (!job) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(job);
}

// PUT /api/jobs/:id -> Job
export async function PUT(req: Request, { params }: Params) {
  try {
    const body = (await req.json()) as Partial<Job>;
    const patch: Partial<Job> = {};

    if (typeof body.title === "string") {
      const t = body.title.trim();
      if (!t) return NextResponse.json({ error: "Title is required" }, { status: 400 });
      patch.title = t;
    }

    if (typeof body.notes === "string") {
      patch.notes = body.notes.trim() || undefined;
    }

    if (body.status) {
      if (!["New", "In Progress", "Done"].includes(body.status))
        return NextResponse.json({ error: "Invalid status" }, { status: 400 });
      patch.status = body.status;
    }

    const updated = updateJob(params.id, patch);
    if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
}

// DELETE /api/jobs/:id -> { ok: true }
export async function DELETE(_req: Request, { params }: Params) {
  const ok = deleteJob(params.id);
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
