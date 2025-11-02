// Simple in-memory store for demo.
// ⚠️ Resets when the server restarts or a new Vercel instance spins up.

export type JobStatus = "active" | "complete" | "paid";

export type Job = {
  id: string;
  title: string;
  customer: string;
  price: number;
  status: JobStatus;
  createdAt: string;
};

export type Lead = {
  id: string;
  name: string;
  phone: string;
  service: string;
  createdAt: string;
};

let _jobs: Job[] = [
  { id: "j1", title: "Driveway Wash", customer: "Ava C.", price: 250, status: "active", createdAt: new Date().toISOString() },
  { id: "j2", title: "Patio Clean", customer: "Derrick M.", price: 180, status: "complete", createdAt: new Date().toISOString() },
  { id: "j3", title: "Roof Soft Wash", customer: "Priya T.", price: 620, status: "paid", createdAt: new Date().toISOString() },
];

let _leads: Lead[] = [
  { id: "l1", name: "Maria R.", phone: "555-111-2222", service: "House Wash", createdAt: new Date().toISOString() },
];

let _findLeads = [
  { id: "fl1", name: "Jeff P.", phone: "555-333-4444", service: "Gutter Clean", city: "San Mateo" },
  { id: "fl2", name: "Lauren H.", phone: "555-222-3333", service: "House Wash", city: "San Jose" },
];

export const db = {
  jobs: {
    list: () => _jobs,
    get: (id: string) => _jobs.find(j => j.id === id),
    add: (j: Omit<Job, "id" | "createdAt">) => {
      const job: Job = { ...j, id: "j" + (Math.random().toString(36).slice(2, 7)), createdAt: new Date().toISOString() };
      _jobs = [job, ..._jobs];
      return job;
    },
    update: (id: string, patch: Partial<Job>) => {
      _jobs = _jobs.map(j => (j.id === id ? { ...j, ...patch } : j));
      return _jobs.find(j => j.id === id)!;
    },
  },
  leads: {
    list: () => _leads,
    add: (l: Omit<Lead, "id" | "createdAt">) => {
      const lead: Lead = { ...l, id: "l" + (Math.random().toString(36).slice(2, 7)), createdAt: new Date().toISOString() };
      _leads = [lead, ..._leads];
      return lead;
    },
  },
  findLeads: {
    list: () => _findLeads,
  },
  stats: {
    weeklyEarnings: () => db.jobs.list().filter(j => j.status !== "active").reduce((sum, j) => sum + j.price, 0),
    monthEarnings: () => db.jobs.list().filter(j => j.status === "paid").reduce((sum, j) => sum + j.price, 0),
    activeCount: () => db.jobs.list().filter(j => j.status === "active").length,
  },
};
