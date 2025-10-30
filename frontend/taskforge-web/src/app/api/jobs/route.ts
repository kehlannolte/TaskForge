import { NextResponse } from "next/server";
import { createJob, listJobs, type Job } from "@/lib/store";

export const dynamic = "force-dynamic"; // ensure fresh data in dev

// GET /api/jobs -> { jobs: Job[] }
export async function GET() {
  const jobs = listJobs();
  return NextResponse.json({ jobs });
}

// POST /api/jobs -> Job
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<Job>;
    const title = (body.title ?? "").toString().trim();
    const status = (body.status as Job["status"]) ?? "New";
    const notes = (body.notes ?? "").toString().trim();

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }
    if (!["New", "In Progress", "Done"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const job = createJob({ title, status, notes: notes || undefined });
    return NextResponse.json(job, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }
}
