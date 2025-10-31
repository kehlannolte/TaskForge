cat > /Users/kehlannolte/TaskForge/frontend/taskforge-web/src/app/api/jobs/[id]/route.ts <<'TS'
import { NextRequest, NextResponse } from "next/server";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8000";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const res = await fetch(`${API_BASE}/jobs/${id}`, { cache: "no-store" });
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch job" }, { status: res.status });
    }
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ error: "Upstream error" }, { status: 502 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const body = await req.json();
  try {
    const res = await fetch(`${API_BASE}/jobs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to update job" }, { status: res.status });
    }
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ error: "Upstream error" }, { status: 502 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const res = await fetch(`${API_BASE}/jobs/${id}`, { method: "DELETE" });
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to delete job" }, { status: res.status });
    }
    return NextResponse.json({}, { status: res.status });
  } catch {
    return NextResponse.json({ error: "Upstream error" }, { status: 502 });
  }
}
TS
