"use client";

import { useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// --- Helper: tiny sparkline component (pure SVG) ---
function Sparkline({ points, className = "" }: { points: number[]; className?: string }) {
  if (!points.length) return null;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const norm = points.map((p) => (max === min ? 50 : ((p - min) / (max - min)) * 100));
  const d = norm.map((y, i) => `${(i / (points.length - 1)) * 100},${100 - y}`).join(" ");
  return (
    <svg viewBox="0 0 100 100" className={`h-8 w-full ${className}`}>
      <polyline points={d} fill="none" stroke="currentColor" strokeWidth="3" />
    </svg>
  );
}

export default function DashboardPage() {
  const { data: session } = useSession();

  // --- Fake/live-ish data for the MVP ---
  const [stripeConnected, setStripeConnected] = useState(false); // flip to true when you wire Stripe
  const kpis = useMemo(
    () => ({
      weekRevenue: 3240, // $
      activeJobs: 6,
      conversionRate: 47, // %
      sparkline: [8, 9, 12, 10, 14, 16, 18, 19],
    }),
    []
  );

  const payments = useMemo(
    () => ({
      earnedThisMonth: 12980,
      paidJobs: 28,
      unpaidJobs: 5,
      nextPayout: stripeConnected ? "$1,840 • Nov 6" : null,
    }),
    [stripeConnected]
  );

  const recentJobs = useMemo(
    () => [
      { id: "J-1043", title: "Driveway Pressure Wash", customer: "Lisa R.", status: "In Progress", amount: 280 },
      { id: "J-1042", title: "Gutter Clean + Repair", customer: "NorthPeak HOA", status: "Scheduled", amount: 540 },
      { id: "J-1041", title: "Commercial Front Walk", customer: "Cafe Alder", status: "Completed", amount: 720 },
    ],
    []
  );

  const firstName =
    session?.user?.name?.split(" ")[0] ??
    (session?.user?.email ? session.user.email.split("@")[0] : "there");

  // --- simple, reusable motion presets ---
  const card = {
    hidden: { opacity: 0, y: 8, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.22 } },
  };

  const sectionTitle = "text-sm font-medium text-gray-900";
  const sectionSub = "text-xs text-gray-600";

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50">
      {/* Top greeting row */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.25 } }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Hey {firstName}! 👋
            </h1>
            <p className="text-gray-600 mt-1">
              Here’s your snapshot for today—revenue, jobs, and payments at a glance.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/jobs"
              className="inline-flex items-center rounded-lg border px-3 py-2 text-sm font-medium bg-white hover:bg-gray-50"
            >
              View Jobs
            </Link>
            <Link
              href="/leads"
              className="inline-flex items-center rounded-lg border px-3 py-2 text-sm font-medium bg-white hover:bg-gray-50"
            >
              View Leads
            </Link>
            <Link
              href="/find-lead"
              className="inline-flex items-center rounded-lg bg-black text-white px-3 py-2 text-sm font-medium hover:opacity-90"
            >
              Find a Lead
            </Link>
          </div>
        </motion.div>
      </div>

      {/* KPI Row */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-4 md:grid-cols-3">
        <AnimatePresence>
          <motion.div variants={card} initial="hidden" animate="show" exit="hidden" className="rounded-xl border bg-white p-5 shadow-sm">
            <div className={sectionTitle}>This Week’s Revenue</div>
            <div className="mt-2 text-3xl font-semibold">${kpis.weekRevenue.toLocaleString()}</div>
            <div className={`${sectionSub} mt-2`}>Trending past 7 days</div>
            <div className="mt-2 text-blue-600">
              <Sparkline points={kpis.sparkline} />
            </div>
          </motion.div>

          <motion.div variants={card} initial="hidden" animate="show" exit="hidden" className="rounded-xl border bg-white p-5 shadow-sm">
            <div className={sectionTitle}>Active Jobs</div>
            <div className="mt-2 text-3xl font-semibold">{kpis.activeJobs}</div>
            <div className={`${sectionSub} mt-2`}>On the schedule or in progress</div>
            <div className="mt-3">
              <Link href="/jobs" className="text-sm underline">
                Open jobs board →
              </Link>
            </div>
          </motion.div>

          <motion.div variants={card} initial="hidden" animate="show" exit="hidden" className="rounded-xl border bg-white p-5 shadow-sm">
            <div className={sectionTitle}>Lead → Job Conversion</div>
            <div className="mt-2 text-3xl font-semibold">{kpis.conversionRate}%</div>
            <div className={`${sectionSub} mt-2`}>Last 30 days</div>
            <div className="mt-3">
              <Link href="/leads" className="text-sm underline">
                Improve follow-ups →
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Payments Summary + Recent Jobs */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6 grid gap-6 lg:grid-cols-3">
        {/* Payments Summary */}
        <motion.div
          variants={card}
          initial="hidden"
          animate="show"
          className="rounded-xl border bg-white p-5 shadow-sm lg:col-span-1"
        >
          <div className="flex items-start justify-between">
            <div>
              <div className={sectionTitle}>Payments summary</div>
              <div className={`${sectionSub} mt-1`}>Ready for Stripe in seconds</div>
            </div>
            <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs bg-gray-50">
              {stripeConnected ? "Live" : "Not Connected"}
            </span>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="rounded-lg border bg-gray-50 p-3">
              <div className="text-xs text-gray-600">This Month</div>
              <div className="text-lg font-semibold">${payments.earnedThisMonth.toLocaleString()}</div>
            </div>
            <div className="rounded-lg border bg-gray-50 p-3">
              <div className="text-xs text-gray-600">Paid</div>
              <div className="text-lg font-semibold">{payments.paidJobs}</div>
            </div>
            <div className="rounded-lg border bg-gray-50 p-3">
              <div className="text-xs text-gray-600">Unpaid</div>
              <div className="text-lg font-semibold text-amber-700">{payments.unpaidJobs}</div>
            </div>
          </div>

          <div className="mt-4 rounded-lg border p-4">
            <div className="text-sm font-medium">Stripe</div>
            <p className="text-xs text-gray-600 mt-1">
              {stripeConnected
                ? `Next payout: ${payments.nextPayout}`
                : "Connect to Stripe to accept cards, track payouts, and reconcile faster."}
            </p>

            <div className="mt-3 flex items-center gap-2">
              {!stripeConnected ? (
                <>
                  {/* Replace href with your onboarding route when ready */}
                  <a
                    href="/api/stripe/connect"
                    className="inline-flex items-center rounded-lg bg-black text-white px-3 py-2 text-sm font-medium hover:opacity-90"
                  >
                    Connect Stripe
                  </a>
                  <button
                    onClick={() => setStripeConnected(true)}
                    className="inline-flex items-center rounded-lg border px-3 py-2 text-sm font-medium bg-white hover:bg-gray-50"
                    title="Simulate a connected state (MVP only)"
                  >
                    Simulate Connected
                  </button>
                </>
              ) : (
                <>
                  <a
                    href="/payments" // you can add this page later; for now it's okay if it 404s
                    className="inline-flex items-center rounded-lg border px-3 py-2 text-sm font-medium bg-white hover:bg-gray-50"
                  >
                    View payouts
                  </a>
                  <a
                    href="https://dashboard.stripe.com/"
                    target="_blank"
                    className="inline-flex items-center rounded-lg border px-3 py-2 text-sm font-medium bg-white hover:bg-gray-50"
                  >
                    Open Stripe
                  </a>
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* Recent Jobs & Quick Actions */}
        <motion.div
          variants={card}
          initial="hidden"
          animate="show"
          className="rounded-xl border bg-white p-5 shadow-sm lg:col-span-2"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className={sectionTitle}>Active & recent jobs</div>
              <div className={sectionSub}>Create, complete, or mark as paid</div>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/jobs?new=1" className="inline-flex items-center rounded-lg bg-black text-white px-3 py-2 text-sm font-medium hover:opacity-90">
                + New Job
              </Link>
              <Link href="/leads?new=1" className="inline-flex items-center rounded-lg border px-3 py-2 text-sm font-medium bg-white hover:bg-gray-50">
                + New Lead
              </Link>
            </div>
          </div>

          <div className="mt-4">
            <div className="overflow-hidden rounded-lg border">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="px-3 py-2 text-left font-medium">Job</th>
                    <th className="px-3 py-2 text-left font-medium">Customer</th>
                    <th className="px-3 py-2 text-left font-medium">Status</th>
                    <th className="px-3 py-2 text-right font-medium">Amount</th>
                    <th className="px-3 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {recentJobs.map((j, i) => (
                    <motion.tr
                      key={j.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.03 * i, duration: 0.18 }}
                      className="border-t bg-white"
                    >
                      <td className="px-3 py-2">{j.title} <span className="text-xs text-gray-500">({j.id})</span></td>
                      <td className="px-3 py-2">{j.customer}</td>
                      <td className="px-3 py-2">
                        <span
                          className={
                            "inline-flex items-center rounded-full px-2 py-0.5 text-xs " +
                            (j.status === "Completed"
                              ? "bg-green-50 border border-green-200 text-green-700"
                              : j.status === "Scheduled"
                              ? "bg-blue-50 border border-blue-200 text-blue-700"
                              : "bg-amber-50 border border-amber-200 text-amber-700")
                          }
                        >
                          {j.status}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-right">${j.amount.toLocaleString()}</td>
                      <td className="px-3 py-2 text-right">
                        <div className="flex justify-end gap-2">
                          <button className="rounded-lg border px-2 py-1 hover:bg-gray-50">Complete</button>
                          <button className="rounded-lg border px-2 py-1 hover:bg-gray-50">Mark Paid</button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Sticky bottom quick actions (mobile love) */}
      <div className="lg:hidden sticky bottom-4 z-30">
        <div className="mx-auto max-w-md px-4">
          <div className="rounded-2xl shadow-lg border bg-white p-3 grid grid-cols-3 gap-2">
            <Link href="/jobs?new=1" className="rounded-lg bg-black text-white py-2 text-center text-sm font-medium">
              New Job
            </Link>
            <Link href="/leads?new=1" className="rounded-lg border py-2 text-center text-sm font-medium">
              New Lead
            </Link>
            <Link href="/find-lead" className="rounded-lg border py-2 text-center text-sm font-medium">
              Find Lead
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}