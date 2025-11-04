"use client";

import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export default function LoginClient() {
  const params = useSearchParams();
  const error = params.get("error");

  // 🔒 Full-screen Unauthorized overlay
  if (error === "AccessDenied") {
    return (
      <div className="fixed inset-0 z-50 flex flex-col bg-gray-100">
        {/* Top bar */}
        <div className="bg-white/90 backdrop-blur border-b">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="TaskForge" width={28} height={28} className="rounded" />
              <span className="font-semibold text-gray-800">TaskForge</span>
            </div>
            <Link
              href="/login"
              className="inline-flex items-center rounded-md bg-black px-3 py-1.5 text-sm font-medium text-white hover:opacity-90"
            >
              Back to Login
            </Link>
          </div>
        </div>

        {/* Centered message */}
        <div className="flex-1 grid place-items-center">
          <div className="text-center px-4">
            <div className="text-2xl font-semibold text-gray-800">
              Unauthorized access — nice try, buddy 😎
            </div>
            <p className="text-gray-600 mt-2">
              This account isn’t allowed to access TaskForge.
              <br />
              If you think this is a mistake, contact the admin.
            </p>
            <Link
              href="/login"
              className="mt-6 inline-flex items-center rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Normal login page
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top bar */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand: logo + wordmark */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="TaskForge Logo"
              width={40}
              height={40}
              className="rounded"
              priority
            />
            <span className="hidden sm:inline-block">
              <Image
                src="/wordmark.png"
                alt="TaskForge"
                width={220}
                height={40}
                priority
              />
            </span>
            <span className="sr-only">TaskForge</span>
          </Link>

          {/* One-click Google sign-in */}
          <button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="inline-flex items-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            Login
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-white border-b">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-16 grid lg:grid-cols-2 gap-10">
            <div className="flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700 w-max mb-4">
                Built for field service pros
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
                Run a tighter operation. Book more jobs. Get paid faster.
              </h1>

              {/* Subhead */}
              <p className="mt-4 text-gray-700 text-base sm:text-lg">
                TaskForge unifies leads, scheduling, job execution, and payments—plus an AI
                assistant that keeps work flowing, not piling up.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <a
                  href="#features"
                  className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-medium border hover:bg-gray-50"
                >
                  See How It Works
                </a>
                {/* Black “Why TaskForge” button */}
                <a
                  href="#features"
                  className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-medium shadow hover:shadow-md bg-black text-white"
                >
                  Why TaskForge
                </a>
              </div>

              {/* Preview box */}
              <div className="mt-8 rounded-2xl border bg-white p-3">
                <div className="aspect-video w-full rounded-xl bg-gray-100 grid place-items-center">
                  <p className="text-gray-800 font-medium">
                    The best investment Ryan will ever make 🍻
                  </p>
                </div>
              </div>

              {/* Inline Auth error (still shows below hero) */}
              {error === "AccessDenied" && (
                <div className="mt-6 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
                  Unauthorized access, nice try buddy 😎
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="bg-gray-50 border-t">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-2xl font-semibold">Everything you need to run & grow</h2>
            <p className="text-gray-600 mt-2">
              Easier than legacy FSM suites. More scalable than “lightweight” apps. TaskForge is that happy
              middle—fast to adopt, strong on ROI.
            </p>

            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "AI Lead Finder",
                  desc: "Discover and qualify local prospects automatically, then send personalized outreach in minutes.",
                },
                {
                  title: "Smart Scheduling",
                  desc: "Drag-and-drop calendar, route hints, and live tech status so you hit every time window.",
                },
                {
                  title: "Quotes → Jobs → Invoices",
                  desc: "Turn estimates into jobs, track materials/time, and invoice on-site or via link.",
                },
                {
                  title: "Payments & Receivables",
                  desc: "Collect deposits and balances quickly with transparent fees and clean receipts.",
                },
                {
                  title: "Customer Messaging",
                  desc: "Automatic confirmations, on-the-way texts, photo summaries, and review nudges.",
                },
                {
                  title: "Reporting That Sells",
                  desc: "Job margin, unsold estimates, tech performance—fix profit, not just revenue.",
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

        {/* Social proof / stats */}
        <section className="bg-white border-t">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              {[
                { big: "Thousands", small: "of home service pros trust TaskForge" },
                { big: "Millions", small: "of jobs completed by TaskForge-powered businesses" },
                { big: "14+ hours", small: "saved on average each week" },
                { big: "45% growth", small: "average revenue lift in year one" },
              ].map((s) => (
                <div key={s.big} className="rounded-xl border bg-gray-50 p-6">
                  <div className="text-2xl font-semibold">{s.big}</div>
                  <div className="text-sm text-gray-600 mt-1">{s.small}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI focus */}
        <section className="bg-gray-50 border-t">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-2xl font-semibold">AI that’s built for service pros</h2>
            <p className="text-gray-600 mt-2">
              TaskForge AI handles the busywork so you can focus on the work that matters.
            </p>

            <div className="mt-8 grid md:grid-cols-3 gap-6">
              <div className="rounded-xl border bg-white p-6">
                <h3 className="font-medium">AI Answering & Texting</h3>
                <p className="text-sm text-gray-600 mt-2">
                  Auto-reply to inbound leads, confirm appointments, and keep customers in the loop with natural,
                  friendly messages.
                </p>
              </div>
              <div className="rounded-xl border bg-white p-6">
                <h3 className="font-medium">Smart Route Optimization</h3>
                <p className="text-sm text-gray-600 mt-2">
                  Reduce windshield time and hit promised windows with intelligent routing hints and technician status.
                </p>
              </div>
              <div className="rounded-xl border bg-white p-6">
                <h3 className="font-medium">Pro-Ready Automations</h3>
                <p className="text-sm text-gray-600 mt-2">
                  From estimate follow-ups to post-job review nudges—automations are pre-tuned for trades like plumbing,
                  HVAC, cleaning, and more.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="bg-white border-t">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-2xl font-semibold">Our Story</h2>
            <p className="text-gray-700 mt-3 max-w-3xl">
              We built TaskForge after years of watching field teams juggle spreadsheets, phone calls, and disconnected
              apps. Our mission is simple: help growing home-service businesses run smooth, professional operations
              without the enterprise bloat—or price tag.
            </p>
          </div>
        </section>

        {/* Partners / ecosystem */}
        <section className="bg-gray-50 border-t">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-2xl font-semibold">Trusted ecosystem</h2>
            <p className="text-gray-600 mt-2">Works great alongside your favorite tools.</p>
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6 items-center">
              {["QuickBooks", "Stripe", "Google", "Twilio", "Zapier", "Mailchimp"].map((name) => (
                <div
                  key={name}
                  className="rounded-lg border bg-white p-4 text-center text-sm text-gray-700"
                >
                  {name}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid md:grid-cols-4 gap-8 text-sm">
          <div>
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="TaskForge" width={22} height={22} className="rounded" />
              <span className="font-semibold">TaskForge</span>
            </div>
            <p className="text-gray-600 mt-3">
              Software that helps field service pros work smarter—without extra overhead.
            </p>
          </div>

          <div>
            <h4 className="font-semibold">Industries</h4>
            <ul className="mt-3 space-y-2 text-gray-600">
              <li>Pressure Washing</li>
              <li>HVAC</li>
              <li>Plumbing</li>
              <li>Electrical</li>
              <li>Cleaning</li>
              <li>Landscaping</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">Features</h4>
            <ul className="mt-3 space-y-2 text-gray-600">
              <li>AI Lead Finder</li>
              <li>Scheduling</li>
              <li>Quotes & Invoices</li>
              <li>Payments</li>
              <li>Messaging</li>
              <li>Reports</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">Company</h4>
            <ul className="mt-3 space-y-2 text-gray-600">
              <li>
                <a href="#features" className="hover:underline">
                  Our Story
                </a>
              </li>
              <li>Our Team</li>
              <li>Careers</li>
              <li>Contact</li>
              <li>Resources</li>
            </ul>
          </div>
        </div>

        <div className="border-t">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 text-xs text-gray-500 flex items-center justify-between">
            <span>© {new Date().getFullYear()} TaskForge</span>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:underline">
                Privacy
              </a>
              <a href="#" className="hover:underline">
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}