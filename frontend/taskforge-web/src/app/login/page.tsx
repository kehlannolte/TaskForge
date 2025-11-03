import { Suspense } from "react";
import LoginClient from "./LoginClient";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Top bar */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-black" />
            <span className="font-semibold tracking-tight">TaskForge</span>
          </div>
          {/* Small login button (reveals Google-login panel) */}
          <Suspense fallback={null}>
            <LoginClient />
          </Suspense>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 py-12 lg:py-16 grid lg:grid-cols-2 gap-10">
        <div className="flex flex-col justify-center">
          <p className="inline-flex items-center w-max rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700 mb-4">
            Built for field service pros
          </p>
          <h1 className="text-4xl lg:text-5xl font-semibold leading-tight">
            Run a tighter operation. <span className="underline decoration-2">Book more jobs</span>.
            Get paid faster.
          </h1>
          <p className="mt-4 text-gray-600 text-lg">
            TaskForge unifies leads, scheduling, job execution, and payments—plus an AI assistant
            that keeps work flowing, not piling up.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#features"
              className="inline-flex items-center justify-center rounded-lg px-5 py-3 font-medium border"
            >
              See Features
            </a>
            <a
              href="#why"
              className="inline-flex items-center justify-center rounded-lg px-5 py-3 font-medium bg-black text-white"
            >
              Why TaskForge
            </a>
          </div>

          <ul className="mt-6 space-y-2 text-sm text-gray-700">
            <li>• Google sign-in. No passwords to forget.</li>
            <li>• Works great on mobile for on-the-go use.</li>
            <li>• Minimal MVP: Dashboard, Jobs, Leads, Find a Lead.</li>
          </ul>
        </div>

        {/* Visual placeholder */}
        <div className="rounded-2xl border bg-white p-4">
          <div className="aspect-video w-full rounded-xl bg-gray-100 grid place-items-center text-gray-500">
            TaskForge dashboard preview
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="border-t bg-white" id="why">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <p className="text-sm text-gray-500">Chosen by modern service teams</p>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {["Sparkle Wash Co.", "JetStream HVAC", "Golden Gate Plumbing", "NorthPeak Electric"].map(
              (name) => (
                <div key={name} className="rounded-lg border p-4 text-sm text-gray-700 bg-gray-50">
                  {name}
                </div>
              )
            )}
          </div>

          <div className="mt-10 grid lg:grid-cols-3 gap-6">
            {[
              "TaskForge replaced 4 tools. AI lead finder + quick invoices = more booked jobs with less admin.",
              "Scheduling went from chaos to clarity. The dashboard shows KPIs I actually use every morning.",
              "Payments and automations just work. Techs love the simple mobile flow; customers love reminders.",
            ].map((quote, i) => (
              <div key={i} className="rounded-xl border p-5 bg-gray-50">
                <p className="text-gray-800">“{quote}”</p>
                <p className="mt-3 text-sm text-gray-600">— Happy TaskForge user</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t bg-gray-50" id="features">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <h2 className="text-2xl font-semibold">Everything you need to run & grow</h2>
          <p className="text-gray-600 mt-2">
            Easier than legacy FSM suites. More scalable than lightweight apps.
          </p>

          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "AI Lead Finder",
                desc: "Discover and qualify local prospects automatically, then kick off outreach in minutes.",
              },
              {
                title: "Smart Scheduling",
                desc: "Drag-and-drop calendar, route hints, and live tech status to hit every time window.",
              },
              {
                title: "Quotes → Jobs → Invoices",
                desc: "Turn estimates into jobs, track materials/time, and invoice on-site or via link.",
              },
              {
                title: "Payments & Receivables",
                desc: "Collect deposits and balances quickly with clean receipts and transparent fees.",
              },
              {
                title: "Customer Messaging",
                desc: "Automatic confirmations, on-the-way texts, photo-rich summaries, and review nudges.",
              },
              {
                title: "Reporting That Sells",
                desc: "Job margin, unsold estimates, tech performance—see what to fix to grow profit.",
              },
            ].map((f) => (
              <div key={f.title} className="rounded-xl border bg-white p-6">
                <h3 className="font-medium">{f.title}</h3>
                <p className="text-sm text-gray-600 mt-2">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-gray-600 flex items-center justify-between">
          <span>© {new Date().getFullYear()} TaskForge</span>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:underline">
              Privacy
            </a>
            <a href="#" className="hover:underline">
              Terms
            </a>
            <a href="#" className="hover:underline">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
