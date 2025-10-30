import { NextRequest, NextResponse } from 'next/server';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? 'http://localhost:8000';

type Job = {
  id: string;
  [key: string]: any;
};

async function proxy<T = unknown>(
  method: 'GET' | 'PUT' | 'DELETE',
  id: string,
  body?: unknown
): Promise<NextResponse<T | { error: string }>> {
  try {
    const res = await fetch(`${API_BASE}/jobs/${id}`, {
      method,
      headers: {
        'content-type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
      // Pass cookies/headers along if you need auth later:
      // credentials: 'include',
      // next: { revalidate: 0 },
    });

    const isJSON = res.headers.get('content-type')?.includes('application/json');
    const data = isJSON ? await res.json() : undefined;

    if (!res.ok) {
      const message = (data as any)?.error || `Upstream error (${res.status})`;
      return NextResponse.json({ error: message }, { status: res.status });
    }

    return NextResponse.json(data as T);
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? 'Unknown error' }, { status: 500 });
  }
}

// Note: Vercel/Next 16 build types expect `context.params` to be a Promise
// so we `await` it and then read `id`.

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  return proxy<Job>('GET', id);
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const body = await request.json();
  return proxy<Job>('PUT', id, body);
}

export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  return proxy('DELETE', id);
}
