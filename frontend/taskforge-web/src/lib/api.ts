/**
 * TaskForge API utility functions
 * Centralized wrappers for fetching data from your API routes or external endpoints.
 */

const BASE = process.env.NEXT_PUBLIC_API_BASE || "";

/**
 * Generic request helper
 */
async function request<T = any>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const url = `${BASE}${path.startsWith("/") ? path : `/${path}`}`;

  const res = await fetch(url, {
    cache: "no-store",
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(
      `${init?.method || "GET"} ${url} failed: ${res.status} — ${text}`
    );
  }

  try {
    return (await res.json()) as T;
  } catch {
    return {} as T;
  }
}

/**
 * CRUD helpers
 */
export const get = <T = any>(path: string) => request<T>(path);

export const post = <T = any>(path: string, body?: unknown) =>
  request<T>(path, {
    method: "POST",
    body: JSON.stringify(body ?? {}),
  });

export const put = <T = any>(path: string, body?: unknown) =>
  request<T>(path, {
    method: "PUT",
    body: JSON.stringify(body ?? {}),
  });

export const del = <T = any>(path: string) =>
  request<T>(path, { method: "DELETE" });

/**
 * Aliases for backward compatibility with older imports
 */
export const fetchData = get;
export const postJSON = post;
export const putJSON = put;
export const deleteItem = del;

/**
 * Example usage:
 * const jobs = await get('/api/jobs');
 * const newJob = await post('/api/jobs', { title: 'Pressure Wash Driveway' });
 */
