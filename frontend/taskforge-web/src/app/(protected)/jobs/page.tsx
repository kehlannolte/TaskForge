"use client";

import { useEffect, useMemo, useState, FormEvent } from "react";
import { get, post, put, del } from "@/lib/api";
import { useToast } from "@/components/ToastProvider";

type Job = {
  id: string;
  title: string;
  status: "New" | "In Progress" | "Done";
  notes?: string;
  createdAt?: string;
};

type JobsResponse = { jobs: Job[] };

export default function JobsPage() {
  const { show } = useToast();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Form state
  const [title, setTitle] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [status, setStatus] = useState<Job["status"]>("New");

  // Editing state
  const [editingId, setEditingId] = useState<string | null>(null);

  const isEditing = useMemo<boolean>(() => editingId !== null, [editingId]);

  // --- Data load ---
  async function loadJobs(): Promise<void> {
    try {
      setLoading(true);
      setError("");
      const data = await get<JobsResponse>("/api/jobs");
      setJobs(data.jobs ?? []);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Failed to load jobs";
      setError(msg);
      show("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- CRUD handlers ---
  async function handleCreate(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    try {
      const body = { title: title.trim(), notes: notes.trim(), status };
      if (!body.title) {
        show("Title is required");
        return;
      }
      const created = await post<Job>("/api/jobs", body);
      setJobs((prev) => [created, ...prev]);
      setTitle("");
      setNotes("");
      setStatus("New");
      show("Job created");
    } catch (e) {
      show("Failed to create job");
    }
  }

  async function startEdit(job: Job): Promise<void> {
    setEditingId(job.id);
    setTitle(job.title);
    setNotes(job.notes ?? "");
    setStatus(job.status);
  }

  async function handleUpdate(): Promise<void> {
    if (!editingId) return;
    try {
      const body = { title: title.trim(), notes: notes.trim(), status };
      if (!body.title) {
        show("Title is required");
        return;
      }
      const updated = await put<Job>(`/api/jobs/${editingId}`, body);
      setJobs((prev) => prev.map((j) => (j.id === editingId ? updated : j)));
      setEditingId(null);
      setTitle("");
      setNotes("");
      setStatus("New");
      show("Job updated");
    } catch (e) {
      show("Failed to update job");
    }
  }

  async function handleDelete(id: string): Promise<void> {
    try {
      await del(`/api/jobs/${id}`);
      setJobs((prev) => prev.filter((j) => j.id !== id));
      show("Job deleted");
    } catch (e) {
      show("Failed to delete job");
    }
  }

  function cancelEdit(): void {
    setEditingId(null);
    setTitle("");
    setNotes("");
    setStatus("New");
  }

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="mb-6 text-3xl font-semibold text-blue-600">Jobs</h1>

      {/* Create / Edit form */}
      <section className="mb-8 rounded-md bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold">
          {isEditing ? "Edit Job" : "Create Job"}
        </h2>
        <form onSubmit={handleCreate} className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="md:col-span-1">
            <label className="mb-1 block text-sm text-gray-700">Title</label>
            <input
              className="w-full rounded-md border px-3 py-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Pressure wash driveway"
            />
          </div>

          <div className="md:col-span-1">
            <label className="mb-1 block text-sm text-gray-700">Status</label>
            <select
              className="w-full rounded-md border px-3 py-2"
              value={status}
              onChange={(e) => setStatus(e.target.value as Job["status"])}
            >
              <option value="New">New</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>

          <div className="md:col-span-1">
            <label className="mb-1 block text-sm text-gray-700">Notes</label>
            <input
              className="w-full rounded-md border px-3 py-2"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Optional notes"
            />
          </div>

          {!isEditing ? (
            <div className="md:col-span-3">
              <button type="submit" className="btn">Create Job</button>
            </div>
          ) : (
            <div className="flex gap-2 md:col-span-3">
              <button
                type="button"
                onClick={() => void handleUpdate()}
                className="btn"
              >
                Save Changes
              </button>
              <button type="button" onClick={cancelEdit} className="btn-secondary">
                Cancel
              </button>
            </div>
          )}
        </form>
      </section>

      {/* List */}
      <section className="rounded-md bg-white p-6 shadow">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Your Jobs</h2>
          <button
            onClick={() => void loadJobs()}
            className="rounded-md border px-3 py-2 text-sm hover:bg-gray-50"
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <p className="text-sm text-gray-500">Loading…</p>
        ) : error ? (
          <p className="text-sm text-red-600">{error}</p>
        ) : jobs.length === 0 ? (
          <p className="text-sm text-gray-500">No jobs yet — create your first one above.</p>
        ) : (
          <ul className="divide-y">
            {jobs.map((job) => (
              <li key={job.id} className="flex flex-col gap-2 py-4 md:flex-row md:items-center md:justify-between">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-gray-900">{job.title}</p>
                  <p className="text-xs text-gray-500">
                    {job.status}
                    {job.notes ? ` • ${job.notes}` : ""}
                    {job.createdAt ? ` • ${new Date(job.createdAt).toLocaleString()}` : ""}
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button
                    onClick={() => void startEdit(job)}
                    className="rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => void handleDelete(job.id)}
                    className="rounded-md bg-red-600 px-3 py-1.5 text-sm text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
