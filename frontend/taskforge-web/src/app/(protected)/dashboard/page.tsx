import { Suspense } from "react";

const APP_URL =
  process.env.NEXTAUTH_URL?.replace(/\/$/, "") ?? "http://localhost:3000";

type Job = {
  id?: string | number;
  title?: string;
  name?: string;
  customer?: string;
  status?: string;
  amount?: number;
  total?: number;
  price?: number;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any;
};

async function getJobs(): Promise<Job[]> {
  const res = await fetch(`${APP_URL}/api/jobs`, { cache: "no-store" });
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data) ? data : Array.isArray(data?.jobs) ? data.jobs : [];
}

function formatCurrency(n: number) {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(n);
  } catch {
    return `$${Math.round(n)}`;
  }
}

function jobAmount(job: Job): number {
  if (typeof job.total === "number") return job.total;
  if (typeof job.amount === "number") return job.amount;
  if (typeof job.price === "number") return job.price;
  return 0;
}

function jobTitle(job: Job): string {
  return (
    (typeof job.title === "string" && job.title) ||
    (typeof job.name === "string" && job.name) ||
    (typeof job.customer === "string" && job.customer) ||
    `Job ${job.id ?? ""}`.trim()
  );
}

export default async function DashboardPage() {
  const jobs = await getJobs();

  const totalRevenue = jobs.reduce((sum, j) => sum + jobAmount(j), 0);
  const totalJobs = jobs.length;
  const completedJobs = jobs.filter(
    (j) =>
      typeof j.status === "string" &&
      ["done", "completed", "complete"].includes(j.status.toLowerCase())
  ).length;

  const recent = jobs
    .slice()
    .sort((a, b) => {
      const aT = Date.parse(a.updatedAt ?? a.createdAt ?? "0");
      const bT = Date.parse(b.updatedAt ?? b.createdAt ?? "0");
      return bT - aT;
    })
    .slice(0, 8);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow">
          <div className="text-sm text-gray-500">Total Revenue</div>
          <div className="mt-1 text-3xl font-bold">{formatCurrency(totalRevenue)}</div>
          <div className="mt-2 text-xs text-gray-400">Sum of amounts across all jobs</div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow">
          <div className="text-sm text-gray-500">Jobs</div>
          <div className="mt-1 text-3xl font-bold">{totalJobs}</div>
          <div className="mt-2 text-xs text-gray-400">Total jobs in the system</div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow">
          <div className="text-sm text-gray-500">Completed</div>
          <div className="mt-1 text-3xl font-bold">{completedJobs}</div>
          <div className="mt-2 text-xs text-gray-400">Jobs marked as done/completed</div>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white shadow">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-lg font-medium">Recent Jobs</h2>
        </div>

        <Suspense>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left">
              <thead className="text-xs uppercase text-gray-500">
                <tr className="[&>th]:px-5 [&>th]:py-3">
                  <th>ID</th>
                  <th>Title</th>
                  <th>Status</th>
                  <th className="text-right">Amount</th>
                  <th className="text-right">Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recent.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-5 py-6 text-center text-gray-500">
                      No jobs yet.
                    </td>
                  </tr>
                ) : (
                  recent.map((j) => {
                    const amt = jobAmount(j);
                    const updated = j.updatedAt ?? j.createdAt;
                    const when =
                      updated && !Number.isNaN(Date.parse(updated))
                        ? new Date(updated).toLocaleDateString()
                        : "—";
                    return (
                      <tr key={`${j.id ?? Math.random()}`} className="[&>td]:px-5 [&>td]:py-3">
                        <td className="text-gray-700">{String(j.id ?? "—")}</td>
                        <td className="font-medium text-gray-900">{jobTitle(j)}</td>
                        <td>
                          <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs">
                            {j.status ?? "—"}
                          </span>
                        </td>
                        <td className="text-right font-medium">
                          {amt ? formatCurrency(amt) : "—"}
                        </td>
                        <td className="text-right text-gray-600">{when}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </Suspense>
      </div>
    </div>
  );
}
