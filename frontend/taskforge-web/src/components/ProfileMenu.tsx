"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import {
  Settings,
  LogOut,
  CreditCard,
  BadgeCheck,
  BookOpen,
  LifeBuoy,
  Puzzle,
  HelpCircle,
  Keyboard,
  Moon,
  SunMedium,
  Home,
  Briefcase,
  Users,
} from "lucide-react";

/**
 * Monday-inspired profile menu
 * - Right anchored panel
 * - Scrollable content with sticky footer
 * - Sectioned tiles
 * - Click-outside to close (when parent sends onRequestClose)
 */
export default function ProfileMenu() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const target = e.target as Node;
      if (panelRef.current?.contains(target)) return;
      if (buttonRef.current?.contains(target)) return;
      setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // Fake theme toggle (plugs into real theme later)
  function toggleTheme() {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  }

  const initials =
    (session?.user?.name ?? "U")
      .split(" ")
      .map((s) => s[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  return (
    <div className="relative">
      {/* Trigger */}
      <button
        ref={buttonRef}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center justify-center h-9 w-9 rounded-full border bg-white hover:bg-gray-50"
        aria-label="Open profile menu"
      >
        {session?.user?.image ? (
          <Image
            src={session.user.image}
            alt={session.user.name ?? "User"}
            width={28}
            height={28}
            className="rounded-full"
          />
        ) : (
          <span className="grid h-8 w-8 place-items-center rounded-full bg-blue-600 text-white text-xs font-semibold">
            {initials}
          </span>
        )}
      </button>

      {/* Panel */}
      {open && (
        <div
          ref={panelRef}
          className="absolute right-0 mt-2 w-[360px] max-h-[80vh] rounded-2xl border bg-white shadow-2xl overflow-hidden z-50"
          role="dialog"
          aria-label="Profile menu"
        >
          {/* Header */}
          <div className="flex items-center gap-3 p-4 border-b bg-white/70 backdrop-blur">
            {session?.user?.image ? (
              <Image
                src={session.user.image}
                alt={session.user.name ?? "User"}
                width={36}
                height={36}
                className="rounded-full"
              />
            ) : (
              <span className="grid h-9 w-9 place-items-center rounded-full bg-blue-600 text-white text-sm font-semibold">
                {initials}
              </span>
            )}
            <div className="min-w-0">
              <div className="truncate font-semibold text-gray-900">
                {session?.user?.name ?? "User"}
              </div>
              <div className="truncate text-xs text-gray-500">
                {session?.user?.email ?? "—"}
              </div>
            </div>
          </div>

          {/* Scrollable content */}
          <div className="max-h-[60vh] overflow-y-auto overscroll-contain px-3 py-3 space-y-3">
            {/* Quick tiles (app areas) */}
            <Section>
              <Tile href="/dashboard" icon={<Home className="h-4 w-4" />} title="Dashboard" desc="Open Dashboard" />
              <Tile href="/jobs" icon={<Briefcase className="h-4 w-4" />} title="Jobs" desc="Open Jobs" />
              <Tile href="/leads" icon={<Users className="h-4 w-4" />} title="Leads" desc="Open Leads" />
              <Tile href="/find-lead" icon={<HelpCircle className="h-4 w-4" />} title="Find a Lead" desc="Open Find-a-Lead" />
              <Tile href="/payments" icon={<CreditCard className="h-4 w-4" />} title="Payments" desc="Open Payments" />
              <Tile href="/settings" icon={<Settings className="h-4 w-4" />} title="Settings" desc="Open Settings" />
            </Section>

            {/* Help & feedback */}
            <LabeledSection label="Help & Support">
              <Row icon={<LifeBuoy className="h-4 w-4" />} title="Help Center" desc="Docs, FAQs, and chat" />
              <Row icon={<BookOpen className="h-4 w-4" />} title="Knowledge base" desc="Guides and tutorials" />
              <Row icon={<Puzzle className="h-4 w-4" />} title="Keyboard Shortcuts" desc="Speed up your workflow" />
            </LabeledSection>

            {/* Appearance */}
            <LabeledSection label="Appearance">
              <button
                onClick={toggleTheme}
                className="w-full flex items-center justify-between rounded-xl border p-3 hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  {theme === "light" ? <SunMedium className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  <div className="text-left">
                    <div className="text-sm font-medium">Theme</div>
                    <div className="text-xs text-gray-500">
                      {theme === "light" ? "Light" : "Dark"} (preview)
                    </div>
                  </div>
                </div>
                <span className="text-xs rounded-full border px-2 py-0.5 text-gray-600">Toggle</span>
              </button>
            </LabeledSection>
          </div>

          {/* Sticky footer */}
          <div className="sticky bottom-0 border-t bg-white p-3">
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/settings"
                className="inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium hover:bg-gray-50 transition"
                onClick={() => setOpen(false)}
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium hover:bg-gray-50 text-red-600 transition"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- small building blocks ---------- */

function Section({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-2">{children}</div>;
}

function LabeledSection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div className="px-1 text-[10px] uppercase tracking-wider text-gray-500">{label}</div>
      <div className="grid gap-2">{children}</div>
    </div>
  );
}

function Tile({
  href,
  icon,
  title,
  desc,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-xl border p-3 hover:bg-gray-50 transition"
    >
      <div className="flex items-center gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-lg border bg-white text-gray-700 group-hover:shadow-sm transition">
          {icon}
        </span>
        <div className="min-w-0">
          <div className="text-sm font-medium leading-tight">{title}</div>
          <div className="text-xs text-gray-500 truncate">{desc}</div>
        </div>
      </div>
    </Link>
  );
}

function Row({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border p-3 hover:bg-gray-50 transition">
      <span className="grid h-9 w-9 place-items-center rounded-lg border bg-white text-gray-700">
        {icon}
      </span>
      <div className="min-w-0">
        <div className="text-sm font-medium leading-tight">{title}</div>
        <div className="text-xs text-gray-500 truncate">{desc}</div>
      </div>
    </div>
  );
}