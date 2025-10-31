import { NextRequest, NextResponse } from "next/server";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8000";

export async function GET(_req: NextRequest) {
  // list jobs
  try {
    const res = await fetch(`${API_BASE}/jobs`, { cache: "no-store" });
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to list jobs" }, { status: res.status });
    }
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ error: "Upstream error" }, { status: 502 });
  }
}

export async function POST(req: NextRequest) {
  // create job
  const body = await req.json().catch(() => ({}));
  try {
    const res = await fetch(`${API_BASE}/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to create job" }, { status: res.status });
    }
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ error: "Upstream error" }, { status: 502 });
  }
}
