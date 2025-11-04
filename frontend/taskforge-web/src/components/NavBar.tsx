"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Menu } from "lucide-react";
import ProfileMenu from "@/components/ProfileMenu";

const navLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/jobs", label: "Jobs" },
  { href: "/leads", label: "Leads" },
  { href: "/find-lead", label: "Find a Lead" },
];

export default function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // close mobile menu on outside click
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
      <div
        ref={wrapperRef}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4"
      >
        {/* Left: Brand */}
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="flex items-center gap-3">
            {/* App icon */}
            <Image
              src="/logo.png"
              alt="TaskForge Logo"
              width={36}
              height={36}
              className="rounded"
              priority
            />

            {/* Wordmark image replaces text label (hidden on xs for space) */}
            <span className="hidden sm:inline-block">
              <Image
                src="/wordmark.png" // <-- your wordmark file
                alt="TaskForge"
                width={200}
                height={36}
                priority
              />
            </span>

            {/* Accessible fallback for screen readers */}
            <span className="sr-only">TaskForge</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-2 ml-4">
            {navLinks.map((l) => {
              const active = pathname?.startsWith(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`px-3 py-2 rounded-md text-base font-medium transition ${
                    active
                      ? "bg-gray-900 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right: mobile menu + profile */}
        <div className="flex items-center gap-2">
          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border hover:bg-gray-50"
            aria-label="Open navigation"
          >
            <Menu size={20} />
          </button>

          {/* Profile menu trigger */}
          <div className="relative z-50">
            <ProfileMenu />
          </div>
        </div>
      </div>

      {/* Mobile dropdown nav */}
      {open && (
        <div className="md:hidden border-t bg-white">
          <div className="mx-auto max-w-7xl px-4 py-3 grid gap-1">
            {navLinks.map((l) => {
              const active = pathname?.startsWith(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`block rounded-md px-3 py-2 text-sm font-medium ${
                    active
                      ? "bg-gray-900 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}