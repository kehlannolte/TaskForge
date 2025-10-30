import { NextResponse } from "next/server";

// GET /api/dashboard
export async function GET() {
  // Mock data — adjust to your needs
  const data = {
    summary: {
      jobs: 3,
      leads: 5,
      payments: 2,
      updatedAt: new Date().toISOString(),
    },
    recentJobs: [
      { id: "job_1", title: "Driveway Pressure Wash", status: "In Progress" },
      { id: "job_2", title: "Storefront Cleaning", status: "Scheduled" },
      { id: "job_3", title: "Patio Wash", status: "Completed" },
    ],
    recentLeads: [
      { id: "lead_1", name: "Marta’s Cafe", stage: "Contacted" },
      { id: "lead_2", name: "Oak Apartments", stage: "New" },
    ],
    recentPayments: [
      { id: "pay_1", amount: 18000, currency: "USD", status: "succeeded" }, // cents
      { id: "pay_2", amount: 9500, currency: "USD", status: "pending" },
    ],
  };

  return NextResponse.json(data, { status: 200 });
}
