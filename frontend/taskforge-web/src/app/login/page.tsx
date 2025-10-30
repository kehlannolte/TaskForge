"use client";

import { useState, FormEvent } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

// ---- Simple logo list (replace with real customer logos anytime)
const logos = [
  { name: "BlueSpray Irrigation", src: "/vercel.svg" },
  { name: "BrightClean Pros", src: "/vercel.svg" },
  { name: "Peak HVAC", src: "/vercel.svg" },
  { name: "Atlas Plumbing", src: "/vercel.svg" },
];

// ---- Testimonials (swap with real quotes/images when ready)
const testimonials = [
  {
    name: "Maria R.",
    role: "Owner, Peak HVAC",
    quote:
      "We moved from spreadsheets + texts to TaskForge. Bookings up 23%, callbacks down 17%. It pays for itself.",
  },
  {
    name: "James T.",
    role: "Ops Manager, Atlas Plumbing",
    quote:
      "ServiceTitan was powerful but too much for our size. TaskForge hits the sweet spot without the enterprise price tag.",
  },
  {
    name: "Leah P.",
    role: "Founder, BrightClean",
    quote:
      "Setup was painless. Technicians love the mobile workflows. I love the real-time visibility.",
  },
];

// ---- Feature bullets speaking directly to FSM pains
const features = [
  {
    title: "Scheduling that works",
    desc: "Drag-and-drop calendar, route optimization, no more overbooking or missed windows.",
  },
  {
    title: "Estimates → Invoices → Paid",
    desc: "Fast estimates, 1-click convert to jobs, transparent pricing, and pay-on-site options.",
  },
  {
    title: "Technician mobile app",
    desc: "Simple on-the-go job notes, photos, signatures, and status updates—no training required.",
  },
  {
    title: "Customer communication",
    desc: "Automatic confirmations, on-the-way texts, and clean post-job summaries to reduce call volume.",
  },
  {
    title: "Integrations that matter",
    desc: "QuickBooks + payments + messaging—without costly add-ons or surprise fees.",
  },
  {
    title: "Actionable reporting",
    desc: "See margin by job, tech performance, and unsold estimates at a glance.",
  },
];

export default function LoginLandingPage() {
  // ---- Login form state
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
      {/* NOTE: No page-level header here to avoid duplicates.
          Your global NavBar from layout.tsx will render the single brand + login. */}

      {/* Hero + Login (2-column on desktop) */}
      <section className="w-full">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-16 grid lg:grid-cols-2 gap-10">
          {/* Hero content */}
          <div className="flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700 w-max mb-4">
              Built for field service businesses
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
              Maximize your profits and streamline operations
            </h1>
            <p className="mt-4 text-gray-600 text-base sm:text-lg">
              TaskForge helps service teams schedule faster, communicate better, and
              get paid sooner—without the complexity or cost of old-school FSM tools.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href="#demo"
                className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-medium shadow hover:shadow-md bg-black text-white"
              >
                Book a Demo
              </a>
              <a
                href="#features"
                className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-medium border"
              >
                Explore Features
              </a>
            </div>

            {/* Video or screenshot area (placeholder) */}
            <div className="mt-8 rounded-2xl border bg-white p-3">
              <div className="aspect-video w-full rounded-xl bg-gray-100 grid place-items-center text-gray-500">
                Product demo video / screenshot
              </div>
            </div>
          </div>

          {/* Login Card */}
          <div className="lg:pl-6">
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold">Sign in</h2>
              <p className="text-sm text-gray-500 mt-1">
                Admin access for TaskForge
              </p>

              {errorMsg && (
                <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={onSubmit} className="mt-5 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Username
                  </label>
                  <input
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2"
                    placeholder="your.username"
                    autoComplete="username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Password
                  </label>
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
                    onClick={() => alert("Ask admin to reset your password.")}
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

                <p className="text-xs text-gray-500">
                  By signing in you agree to our{" "}
                  <a href="#" className="underline">Terms</a> and{" "}
                  <a href="#" className="underline">Privacy Policy</a>.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section id="social-proof" className="bg-white border-t">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <p className="text-sm text-gray-500">Trusted by growing service teams</p>
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

          <div className="mt-6 flex items-center gap-3 text-sm text-gray-600">
            <span>Ratings on</span>
            <span className="rounded-full border px-3 py-1">G2</span>
            <span className="rounded-full border px-3 py-1">Capterra</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-gray-50 border-t">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-semibold">Powerful features without the enterprise price tag</h2>
          <p className="text-gray-600 mt-2">
            Easier than ServiceTitan. More scalable than Jobber. Built for teams that want real outcomes fast.
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

      {/* FAQ / Resources */}
      <section id="faq" className="bg-white border-t">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-semibold">Have questions?</h2>
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
