"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { get } from "@/lib/api";
import { useToast } from "@/components/ToastProvider";

type Job = {
  id: string;
  title: string;
  status: "New" | "In Progress" | "Done";
  createdAt?: string;
};

type Lead = {
  id: string;
  name: string;
  status: "New" | "Contacted" | "Qualified" | "Lost";
  createdAt?: string;
};

type JobsResponse = { jobs: Job[] };
type LeadsResponse = { leads: Lead[] };

export default function DashboardPage() {
  const { show } = useToast();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function load() {
    try {
      setLoading(true);
      const [jobsRes, leadsRes] = await Promise.all([
        get<JobsResponse>("/api/jobs"),
        get<LeadsResponse>("/api/leads"),
      ]);
      setJobs(jobsRes.jobs ?? []);
      setLeads(leadsRes.leads ?? []);
    } catch {
      show("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- Derived stats ---
  const jobCounts = useMemo(() => {
    const total = jobs.length;
    const byStatus = {
      New: jobs.filter((j) => j.status === "New").length,
      "In Progress": jobs.filter((j) => j.status === "In Progress").length,
      Done: jobs.filter((j) => j.status === "Done").length,
    };
    return { total, ...byStatus };
  }, [jobs]);

  const leadCounts = useMemo(() => {
    const total = leads.length;
    const byStatus = {
      New: leads.filter((l) => l.status === "New").length,
      Contacted: leads.filter((l) => l.status === "Contacted").length,
      Qualified: leads.filter((l) => l.status === "Qualified").length,
      Lost: leads.filter((l) => l.status === "Lost").length,
    };
    return { total, ...byStatus };
  }, [leads]);

  const recentJobs = useMemo(
    () =>
      [...jobs]
        .sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""))
        .slice(0, 5),
    [jobs]
  );

  const recentLeads = useMemo(
    () =>
      [...leads]
        .sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""))
        .slice(0, 5),
    [leads]
  );

  return (
    <main className="container mx-auto px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-blue-600">Dashboard</h1>
        <button
          className="rounded-md border px-3 py-2 text-sm hover:bg-gray-50"
          onClick={() => void load()}
        >
          Refresh
        </button>
      </div>

      {/* KPI Cards */}
      <section className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="card">
          <p className="text-sm text-gray-500">Total Jobs</p>
          <p className="text-2xl font-semibold">{jobCounts.total}</p>
          <div className="mt-2 text-xs text-gray-500">
            New {jobCounts["New"]} • In Progress {jobCounts["In Progress"]} • Done {jobCounts["Done"]}
          </div>
          <Link href="/jobs" className="mt-3 inline-block text-sm text-blue-600 hover:underline">
            View Jobs →
          </Link>
        </div>

        <div className="card">
          <p className="text-sm text-gray-500">Total Leads</p>
          <p className="text-2xl font-semibold">{leadCounts.total}</p>
          <div className="mt-2 text-xs text-gray-500">
            New {leadCounts["New"]} • Contacted {leadCounts["Contacted"]} • Qualified {leadCounts["Qualified"]} • Lost {leadCounts["Lost"]}
          </div>
          <Link href="/leads" className="mt-3 inline-block text-sm text-blue-600 hover:underline">
            View Leads →
          </Link>
        </div>

        <div className="card">
          <p className="text-sm text-gray-500">Open Jobs</p>
          <p className="text-2xl font-semibold">{jobCounts["New"] + jobCounts["In Progress"]}</p>
          <p className="mt-2 text-xs text-gray-500">Jobs not marked Done</p>
        </div>

        <div className="card">
          <p className="text-sm text-gray-500">Active Pipeline</p>
          <p className="text-2xl font-semibold">{leadCounts["New"] + leadCounts["Contacted"] + leadCounts["Qualified"]}</p>
          <p className="mt-2 text-xs text-gray-500">Leads not Lost</p>
        </div>
      </section>

      {/* Recent Lists */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Recent Jobs</h2>
            <Link href="/jobs" className="text-sm text-blue-600 hover:underline">See all</Link>
          </div>
          {loading ? (
            <p className="text-sm text-gray-500">Loading…</p>
          ) : recentJobs.length === 0 ? (
            <p className="text-sm text-gray-500">No jobs yet.</p>
          ) : (
            <ul className="divide-y">
              {recentJobs.map((j) => (
                <li key={j.id} className="flex items-center justify-between py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-gray-900">{j.title}</p>
                    <p className="text-xs text-gray-500">
                      {j.status}
                      {j.createdAt ? ` • ${new Date(j.createdAt).toLocaleString()}` : ""}
                    </p>
                  </div>
                  <Link
                    href="/jobs"
                    className="shrink-0 rounded-md border px-3 py-1.5 text-xs hover:bg-gray-50"
                  >
                    Manage
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="card">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Recent Leads</h2>
            <Link href="/leads" className="text-sm text-blue-600 hover:underline">See all</Link>
          </div>
          {loading ? (
            <p className="text-sm text-gray-500">Loading…</p>
          ) : recentLeads.length === 0 ? (
            <p className="text-sm text-gray-500">No leads yet.</p>
          ) : (
            <ul className="divide-y">
              {recentLeads.map((l) => (
                <li key={l.id} className="flex items-center justify-between py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-gray-900">{l.name}</p>
                    <p className="text-xs text-gray-500">
                      {l.status}
                      {l.createdAt ? ` • ${new Date(l.createdAt).toLocaleString()}` : ""}
                    </p>
                  </div>
                  <Link
                    href="/leads"
                    className="shrink-0 rounded-md border px-3 py-1.5 text-xs hover:bg-gray-50"
                  >
                    Manage
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}
