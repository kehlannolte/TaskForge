"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
// ... your existing imports

export default function NavBar() {
  const { data: session } = useSession();
  const loggedIn = !!session;

  return (
    <nav className="border-b bg-white">
      <div className="container flex items-center justify-between py-3">
        <Link href="/" className="font-semibold">TaskForge</Link>

        <div className="flex gap-4">
          {loggedIn && (
            <>
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/jobs">Jobs</Link>
              <Link href="/leads">Leads</Link>
              <Link href="/find-lead">Find Lead</Link>
              <Link href="/payments">Payments</Link>
              <Link href="/settings">Settings</Link>
            </>
          )}

          {!loggedIn ? (
            <Link href="/login" className="rounded-md border px-3 py-1.5 text-sm">
              Login
            </Link>
          ) : (
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="rounded-md border px-3 py-1.5 text-sm"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
