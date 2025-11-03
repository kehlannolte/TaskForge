export default function DashboardPage() {
  // Dummy data for MVP visuals
  const kpis = [
    { label: "This week’s revenue", value: "$3,240" },
    { label: "Active jobs", value: "7" },
    { label: "Unpaid invoices", value: "$1,180" },
  ];

  const activeJobs = [
    { id: "JF-1027", customer: "Smith Residence", service: "House Wash", status: "Scheduled Today" },
    { id: "JF-1028", customer: "Oak Apartments", service: "Gutter Clean", status: "In Progress" },
    { id: "JF-1031", customer: "Green Nursery", service: "Concrete Clean", status: "Awaiting Payment" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-gray-600 mt-1">Here’s how you’re doing this week.</p>
      </div>

      {/* KPIs */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-xl border bg-white p-5">
            <p className="text-sm text-gray-600">{k.label}</p>
            <p className="mt-2 text-2xl font-semibold">{k.value}</p>
          </div>
        ))}
      </div>

      {/* Active jobs table */}
      <div className="rounded-xl border bg-white">
        <div className="flex items-center justify-between p-5">
          <h2 className="text-lg font-medium">Active Jobs</h2>
          <a href="/jobs" className="text-sm text-blue-600 hover:underline">View all</a>
        </div>
        <div className="border-t">
          <div className="grid grid-cols-4 px-5 py-2 text-xs text-gray-500">
            <span>Job #</span><span>Customer</span><span>Service</span><span>Status</span>
          </div>
          <div className="divide-y">
            {activeJobs.map((j) => (
              <div key={j.id} className="grid grid-cols-4 px-5 py-3 text-sm">
                <span className="font-medium">{j.id}</span>
                <span>{j.customer}</span>
                <span>{j.service}</span>
                <span className="text-gray-600">{j.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payments summary inside Dashboard (lean MVP) */}
      <div className="rounded-xl border bg-white p-5">
        <h2 className="text-lg font-medium">Payments Summary</h2>
        <p className="text-sm text-gray-600 mt-1">Quick view of money in and what’s left to collect.</p>
        <div className="grid sm:grid-cols-3 gap-4 mt-4">
          <div className="rounded-lg border p-4">
            <p className="text-xs text-gray-500">Paid this month</p>
            <p className="mt-1 text-xl font-semibold">$12,430</p>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-xs text-gray-500">Unpaid total</p>
            <p className="mt-1 text-xl font-semibold">$1,180</p>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-xs text-gray-500">Avg. days to pay</p>
            <p className="mt-1 text-xl font-semibold">2.3</p>
          </div>
        </div>
      </div>
    </div>
  );
}
