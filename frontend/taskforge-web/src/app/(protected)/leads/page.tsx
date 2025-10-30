"use client";

import { useEffect, useMemo, useState, FormEvent } from "react";
import { get, post, put, del } from "@/lib/api";
import { useToast } from "@/components/ToastProvider";

type Lead = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  status: "New" | "Contacted" | "Qualified" | "Lost";
  notes?: string;
  createdAt?: string;
};

type LeadsResponse = { leads: Lead[] };

export default function LeadsPage() {
  const { show } = useToast();

  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Form state
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [status, setStatus] = useState<Lead["status"]>("New");
  const [notes, setNotes] = useState<string>("");

  // Editing state
  const [editingId, setEditingId] = useState<string | null>(null);
  const isEditing = useMemo(() => editingId !== null, [editingId]);

  // --- Data load ---
  async function loadLeads(): Promise<void> {
    try {
      setLoading(true);
      setError("");
      const data = await get<LeadsResponse>("/api/leads");
      setLeads(data.leads ?? []);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Failed to load leads";
      setError(msg);
      show("Failed to load leads");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadLeads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- CRUD handlers ---
  async function handleCreate(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    try {
      const body = {
        name: name.trim(),
        email: email.trim() || undefined,
        phone: phone.trim() || undefined,
        company: company.trim() || undefined,
        notes: notes.trim() || undefined,
        status,
      };
      if (!body.name) {
        show("Name is required");
        return;
      }
      const created = await post<Lead>("/api/leads", body);
      setLeads((prev) => [created, ...prev]);
      resetForm();
      show("Lead created");
    } catch {
      show("Failed to create lead");
    }
  }

  function startEdit(lead: Lead): void {
    setEditingId(lead.id);
    setName(lead.name);
    setEmail(lead.email ?? "");
    setPhone(lead.phone ?? "");
    setCompany(lead.company ?? "");
    setNotes(lead.notes ?? "");
    setStatus(lead.status);
  }

  async function handleUpdate(): Promise<void> {
    if (!editingId) return;
    try {
      const body = {
        name: name.trim(),
        email: email.trim() || undefined,
        phone: phone.trim() || undefined,
        company: company.trim() || undefined,
        notes: notes.trim() || undefined,
        status,
      };
      if (!body.name) {
        show("Name is required");
        return;
      }
      const updated = await put<Lead>(`/api/leads/${editingId}`, body);
      setLeads((prev) => prev.map((l) => (l.id === editingId ? updated : l)));
      resetForm();
      show("Lead updated");
    } catch {
      show("Failed to update lead");
    }
  }

  async function handleDelete(id: string): Promise<void> {
    try {
      await del(`/api/leads/${id}`);
      setLeads((prev) => prev.filter((l) => l.id !== id));
      show("Lead deleted");
    } catch {
      show("Failed to delete lead");
    }
  }

  function resetForm(): void {
    setEditingId(null);
    setName("");
    setEmail("");
    setPhone("");
    setCompany("");
    setNotes("");
    setStatus("New");
  }

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="mb-6 text-3xl font-semibold text-blue-600">Leads</h1>

      {/* Create / Edit form */}
      <section className="mb-8 rounded-md bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold">
          {isEditing ? "Edit Lead" : "Create Lead"}
        </h2>
        <form onSubmit={handleCreate} className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm text-gray-700">Name *</label>
            <input
              className="w-full rounded-md border px-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Evan Tester"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-gray-700">Email</label>
            <input
              type="email"
              className="w-full rounded-md border px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="evan@example.com"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-gray-700">Phone</label>
            <input
              className="w-full rounded-md border px-3 py-2"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="555-123-4567"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-gray-700">Company</label>
            <input
              className="w-full rounded-md border px-3 py-2"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Sample Co"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-gray-700">Status</label>
            <select
              className="w-full rounded-md border px-3 py-2"
              value={status}
              onChange={(e) => setStatus(e.target.value as Lead["status"])}
            >
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Lost">Lost</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm text-gray-700">Notes</label>
            <input
              className="w-full rounded-md border px-3 py-2"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Met at HOA meeting…"
            />
          </div>

          {!isEditing ? (
            <div className="md:col-span-3">
              <button type="submit" className="btn">Create Lead</button>
            </div>
          ) : (
            <div className="flex gap-2 md:col-span-3">
              <button type="button" onClick={() => void handleUpdate()} className="btn">
                Save Changes
              </button>
              <button type="button" onClick={resetForm} className="btn-secondary">
                Cancel
              </button>
            </div>
          )}
        </form>
      </section>

      {/* List */}
      <section className="rounded-md bg-white p-6 shadow">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Your Leads</h2>
          <button
            onClick={() => void loadLeads()}
            className="rounded-md border px-3 py-2 text-sm hover:bg-gray-50"
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <p className="text-sm text-gray-500">Loading…</p>
        ) : error ? (
          <p className="text-sm text-red-600">{error}</p>
        ) : leads.length === 0 ? (
          <p className="text-sm text-gray-500">No leads yet — create your first one above.</p>
        ) : (
          <ul className="divide-y">
            {leads.map((lead) => (
              <li
                key={lead.id}
                className="grid grid-cols-1 items-center gap-2 py-4 md:grid-cols-12"
              >
                <div className="md:col-span-3">
                  <p className="truncate text-sm font-medium text-gray-900">
                    {lead.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {lead.company ?? "—"}
                    {lead.createdAt ? ` • ${new Date(lead.createdAt).toLocaleString()}` : ""}
                  </p>
                </div>
                <div className="text-sm text-gray-700 md:col-span-3">
                  {lead.email ?? "—"}
                </div>
                <div className="text-sm text-gray-700 md:col-span-2">
                  {lead.phone ?? "—"}
                </div>
                <div className="text-sm md:col-span-2">
                  <span className="inline-flex rounded-md border px-2 py-1 text-xs">
                    {lead.status}
                  </span>
                </div>
                <div className="flex gap-2 md:col-span-2 md:justify-end">
                  <button
                    onClick={() => startEdit(lead)}
                    className="rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => void handleDelete(lead.id)}
                    className="rounded-md bg-red-600 px-3 py-1.5 text-sm text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>

                {lead.notes && (
                  <div className="md:col-span-12">
                    <p className="mt-1 text-xs text-gray-500">Notes: {lead.notes}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
