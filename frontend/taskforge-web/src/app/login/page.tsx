"use client";

import { useState, FormEvent } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const logos = [
  { name: "Sparkle Wash Co.", src: "/vercel.svg" },
  { name: "JetStream HVAC", src: "/vercel.svg" },
  { name: "Golden Gate Plumbing", src: "/vercel.svg" },
  { name: "NorthPeak Electric", src: "/vercel.svg" },
];

const testimonials = [
  {
    name: "Ava C.",
    role: "Owner, Sparkle Wash",
    quote:
      "TaskForge replaced 4 tools. AI lead finder + quick invoices = more booked jobs with less admin.",
  },
  {
    name: "Derrick M.",
    role: "Ops Lead, JetStream HVAC",
    quote:
      "Scheduling went from chaos to clarity. The dashboard shows KPIs I actually use every morning.",
  },
  {
    name: "Priya T.",
    role: "Founder, NorthPeak Electric",
    quote:
      "Payments and automations just work. Techs love the simple mobile flow, customers love the reminders.",
  },
];

const features = [
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
    desc: "Automatic confirmations, on-the-way texts, photo-rich summaries, and review nudges.",
  },
  {
    title: "Reporting That Sells",
    desc: "Job margin, unsold estimates, tech performance—see what to fix to grow profit, not just revenue.",
  },
];

export default function LoginLandingPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg(null);
    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
      callbackUrl: "/dashboard",
    });

    if (res?.error) {
      setErrorMsg("Invalid username or password.");
      setSubmitting(false);
      return;
    }
    window.location.href = "/dashboard";
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <header className="w-full border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image alt="TaskForge" src="/vercel.svg" width={24} height={24} />
            <span className="font-semibold text-lg">TaskForge</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#features" className="hover:underline">Features</a>
            <a href="#social-proof" className="hover:underline">Customers</a>
            <a href="#faq" className="hover:underline">FAQ</a>
            <Link href="/login" className="hover:underline">Login</Link>
          </nav>
        </div>
      </header>

      {/* Hero + Login */}
      <section className="w-full">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-16 grid lg:grid-cols-2 gap-10">
          {/* Hero */}
          <div className="flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 w-max mb-4">
              Built for field service pros
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
              Run a tighter operation. Book more jobs. Get paid faster.
            </h1>
            <p className="mt-4 text-gray-600 text-base sm:text-lg">
              TaskForge unifies leads, scheduling, job execution, and payments—plus an AI assistant
              that keeps work flowing, not piling up.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href="#demo"
                className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-medium shadow hover:shadow-md bg-black text-white"
              >
                Book a Live Demo
              </a>
              <a
                href="#features"
                className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-medium border"
              >
                See How It Works
              </a>
            </div>

            <div className="mt-8 rounded-2xl border bg-white p-3">
              <div className="aspect-video w-full rounded-xl bg-gray-100 grid place-items-center text-gray-500">
                TaskForge dashboard preview / video
              </div>
            </div>
          </div>

          {/* Login Card */}
          <div className="lg:pl-6">
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold">Sign in to TaskForge</h2>
              <p className="text-sm text-gray-500 mt-1">Private admin access</p>

              {errorMsg && (
                <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={onSubmit} className="mt-5 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Username</label>
                  <input
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2"
                    placeholder="admin"
                    autoComplete="username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Password</label>
                  <input
                    required
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2"
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="inline-flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span>Remember me</span>
                  </label>
                  <button
                    type="button"
                    className="text-gray-600 hover:underline"
                    onClick={() => alert("Contact admin to reset your password.")}
                  >
                    Forgot Password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-xl py-2 font-medium shadow hover:shadow-md disabled:opacity-60 bg-black text-white"
                >
                  {submitting ? "Signing in..." : "Sign In"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section id="social-proof" className="bg-white border-t">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <p className="text-sm text-gray-500">Chosen by modern service teams</p>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-6 items-center">
            {logos.map((l) => (
              <div key={l.name} className="opacity-70">
                <Image alt={l.name} src={l.src} width={100} height={24} />
              </div>
            ))}
          </div>

          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="rounded-xl border p-5 bg-gray-50">
                <p className="text-gray-800">“{t.quote}”</p>
                <p className="mt-4 text-sm text-gray-600">
                  <span className="font-medium">{t.name}</span> — {t.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-gray-50 border-t">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-semibold">Everything you need to run & grow</h2>
          <p className="text-gray-600 mt-2">
            Easier than legacy FSM suites. More scalable than “lightweight” apps. TaskForge is that happy middle—fast to adopt, strong on ROI.
          </p>

          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="rounded-xl border bg-white p-6">
                <h3 className="font-medium">{f.title}</h3>
                <p className="text-sm text-gray-600 mt-2">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 text-sm text-gray-600 flex items-center justify-between">
          <span>© {new Date().getFullYear()} TaskForge</span>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Terms</a>
            <a href="#" className="hover:underline">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
