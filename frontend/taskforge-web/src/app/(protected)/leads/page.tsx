"use client";
import { useEffect, useState } from "react";

type Lead = { id: string; name: string; phone: string; service: string; createdAt: string; };

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [form, setForm] = useState({ name: "", phone: "", service: "" });

  async function load() {
    const res = await fetch("/api/leads");
    setLeads(await res.json());
  }
  useEffect(() => { load(); }, []);

  async function addLead(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/leads", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ name: "", phone: "", service: "" });
    load();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Leads</h1>

      <form onSubmit={addLead} className="rounded-lg border bg-white p-4 grid sm:grid-cols-3 gap-3 items-end">
        <div>
          <label className="text-sm text-gray-600">Name</label>
          <input className="mt-1 w-full rounded-md border px-3 py-2" value={form.name}
            onChange={e => setForm(v => ({ ...v, name: e.target.value }))} required />
        </div>
        <div>
          <label className="text-sm text-gray-600">Phone</label>
          <input className="mt-1 w-full rounded-md border px-3 py-2" value={form.phone}
            onChange={e => setForm(v => ({ ...v, phone: e.target.value }))} required />
        </div>
        <div className="sm:col-span-3">
          <label className="text-sm text-gray-600">Service Needed</label>
          <input className="mt-1 w-full rounded-md border px-3 py-2" value={form.service}
            onChange={e => setForm(v => ({ ...v, service: e.target.value }))} required />
        </div>
        <button className="rounded-md bg-black text-white px-4 py-2">Add Lead</button>
      </form>

      <div className="rounded-lg border bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="p-3">Name</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Service</th>
              <th className="p-3">Created</th>
            </tr>
          </thead>
          <tbody>
            {leads.map(l => (
              <tr key={l.id} className="border-b last:border-0">
                <td className="p-3">{l.name}</td>
                <td className="p-3">{l.phone}</td>
                <td className="p-3">{l.service}</td>
                <td className="p-3">{new Date(l.createdAt).toLocaleString()}</td>
              </tr>
            ))}
            {leads.length === 0 && (
              <tr><td className="p-4 text-gray-500" colSpan={4}>No leads yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
