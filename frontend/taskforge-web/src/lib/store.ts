// Simple in-memory store for dev/testing.
// Data will reset on server restart or code reload.

export type Job = {
  id: string;
  title: string;
  status: "New" | "In Progress" | "Done";
  notes?: string;
  createdAt: string;
};

let jobs: Job[] = [];

// Seed with one sample job (optional)
if (jobs.length === 0) {
  jobs.push({
    id: "seed-1",
    title: "Pressure wash driveway",
    status: "New",
    notes: "Customer prefers Friday afternoon",
    createdAt: new Date().toISOString(),
  });
}

export function listJobs(): Job[] {
  // newest first
  return [...jobs].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function createJob(data: Omit<Job, "id" | "createdAt">): Job {
  const job: Job = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...data,
  };
  jobs.unshift(job);
  return job;
}

export function getJob(id: string): Job | undefined {
  return jobs.find((j) => j.id === id);
}

export function updateJob(id: string, patch: Partial<Omit<Job, "id" | "createdAt">>): Job | undefined {
  const idx = jobs.findIndex((j) => j.id === id);
  if (idx === -1) return undefined;
  const current = jobs[idx];
  const next: Job = {
    ...current,
    ...patch,
  };
  jobs[idx] = next;
  return next;
}

export function deleteJob(id: string): boolean {
  const len = jobs.length;
  jobs = jobs.filter((j) => j.id !== id);
  return jobs.length !== len;
}
