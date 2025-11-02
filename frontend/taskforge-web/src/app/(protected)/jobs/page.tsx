"use client";

import { useEffect, useState } from "react";

type Job = {
  id: string;
  title: string;
  customer: string;
  price: number;
  status: "active" | "complete" | "paid";
  createdAt: string;
};

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [form, setForm] = useState({ title: "", customer: "", price: "" });
  const [loading, setLoading] = useState(false);

  async function load() {
    const res = await fetch("/api/jobs");
    setJobs(await res.json());
  }
  useEffect(() => { load(); }, []);

  async function createJob(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const priceNum = Number(form.price);
    await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: form.title, customer: form.customer, price: priceNum }),
    });
    setForm({ title: "", customer: "", price: "" });
    setLoading(false);
    load();
  }

  async function updateStatus(id: string, status: Job["status"]) {
    await fetch(`/api/jobs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    load();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Jobs</h1>

      <form onSubmit={createJob} className="rounded-lg border bg-white p-4 grid sm:grid-cols-4 gap-3 items-end">
        <div>
          <label className="text-sm text-gray-600">Title</label>
          <input className="mt-1 w-full rounded-md border px-3 py-2"
            value={form.title} onChange={e => setForm(v => ({ ...v, title: e.target.value }))} required />
        </div>
        <div>
          <label className="text-sm text-gray-600">Customer</label>
          <input className="mt-1 w-full rounded-md border px-3 py-2"
            value={form.customer} onChange={e => setForm(v => ({ ...v, customer: e.target.value }))} required />
        </div>
        <div>
          <label className="text-sm text-gray-600">Price ($)</label>
          <input className="mt-1 w-full rounded-md border px-3 py-2" type="number" min={0}
            value={form.price} onChange={e => setForm(v => ({ ...v, price: e.target.value }))} required />
        </div>
        <button disabled={loading} className="rounded-md bg-black text-white px-4 py-2">
          {loading ? "Adding..." : "Add Job"}
        </button>
      </form>

      <div className="rounded-lg border bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="p-3">Title</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Price</th>
              <th className="p-3">Status</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {jobs.map(j => (
              <tr key={j.id} className="border-b last:border-0">
                <td className="p-3">{j.title}</td>
                <td className="p-3">{j.customer}</td>
                <td className="p-3">${j.price}</td>
                <td className="p-3 capitalize">{j.status}</td>
                <td className="p-3 flex gap-2">
                  {j.status !== "complete" && (
                    <button onClick={() => updateStatus(j.id, "complete")} className="rounded-md border px-2 py-1">
                      Mark Complete
                    </button>
                  )}
                  {j.status !== "paid" && (
                    <button onClick={() => updateStatus(j.id, "paid")} className="rounded-md border px-2 py-1">
                      Mark Paid
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {jobs.length === 0 && (
              <tr><td className="p-4 text-gray-500" colSpan={5}>No jobs yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
