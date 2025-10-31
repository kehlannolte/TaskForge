"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function NavBar() {
  const { data: session } = useSession();
  return (
    <nav className="flex items-center justify-between px-4 py-3 border-b bg-white">
      <Link href="/" className="font-semibold">TaskForge</Link>
      <div className="flex items-center gap-3">
        {session ? (
          <>
            <Link href="/dashboard" className="text-sm">Dashboard</Link>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="text-sm underline"
            >
              Sign out
            </button>
          </>
        ) : (
          <Link href="/login" className="text-sm underline">Sign in</Link>
        )}
      </div>
    </nav>
  );
}
