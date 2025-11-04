"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

const navLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/jobs", label: "Jobs" },
  { href: "/leads", label: "Leads" },
  { href: "/find-lead", label: "Find a Lead" },
];

export default function ProtectedHeaderClient() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  const activeMatch = (href: string) =>
    pathname === href || pathname?.startsWith(href + "/");

  const initial =
    session?.user?.name?.trim()?.charAt(0)?.toUpperCase() ??
    session?.user?.email?.trim()?.charAt(0)?.toUpperCase() ??
    "U";

  return (
    <header className="sticky top-0 z-30 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-7xl h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: logo + product name */}
        <Link href="/dashboard" className="flex items-center gap-3">
          {/* Ensure /public/logo.svg exists */}
          <Image
            src="/logo.png"
            alt="TaskForge"
            width={30}
            height={30}
            priority
          />
          <span className="text-xl font-semibold tracking-tight">TaskForge</span>
        </Link>

        {/* Center: app-like pill nav */}
        <nav className="hidden md:flex items-center gap-2">
          {navLinks.map((l) => {
            const active = activeMatch(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={[
                  "rounded-xl px-4 py-2 text-[16px] leading-6 transition",
                  active
                    ? "bg-gray-900 text-white shadow-sm"
                    : "text-gray-700 hover:bg-gray-100"
                ].join(" ")}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: profile avatar dropdown */}
        <div className="relative">
          <button
            className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-black/40"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Open profile menu"
          >
            {/* Avatar: prefer Google image; fallback to initial bubble */}
            {session?.user?.image ? (
              <Image
                src={session.user.image}
                alt={session.user.name ?? "Profile"}
                width={36}
                height={36}
                className="rounded-full ring-1 ring-black/10"
              />
            ) : (
              <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-sm font-semibold ring-1 ring-black/10">
                {initial}
              </div>
            )}
          </button>

          {/* Dropdown */}
          {menuOpen && (
            <div
              className="absolute right-0 mt-2 w-56 rounded-xl border bg-white p-2 shadow-lg"
              onMouseLeave={() => setMenuOpen(false)}
            >
              <div className="px-2 py-2">
                <p className="text-sm font-medium text-gray-900">
                  {session?.user?.name ?? "Signed In"}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {session?.user?.email ?? " "}
                </p>
              </div>
              <hr className="my-1" />
              <Link
                href="/dashboard"
                className="block rounded-lg px-3 py-2 text-sm hover:bg-gray-100"
              >
                Dashboard
              </Link>
              <Link
                href="/jobs"
                className="block rounded-lg px-3 py-2 text-sm hover:bg-gray-100"
              >
                Jobs
              </Link>
              <Link
                href="/leads"
                className="block rounded-lg px-3 py-2 text-sm hover:bg-gray-100"
              >
                Leads
              </Link>
              <Link
                href="/find-lead"
                className="block rounded-lg px-3 py-2 text-sm hover:bg-gray-100"
              >
                Find a Lead
              </Link>
              <hr className="my-1" />
              <button
                className="w-full text-left rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                onClick={() => signOut({ callbackUrl: "/login" })}
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile pills (optional) */}
      <div className="md:hidden border-t bg-white">
        <div className="mx-auto max-w-7xl px-4 py-2 flex gap-2 overflow-x-auto">
          {navLinks.map((l) => {
            const active = activeMatch(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={[
                  "whitespace-nowrap rounded-lg px-3 py-1.5 text-[15px]",
                  active
                    ? "bg-gray-900 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                ].join(" ")}
              >
                {l.label}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}