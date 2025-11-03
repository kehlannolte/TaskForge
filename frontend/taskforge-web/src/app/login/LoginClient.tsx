"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginClient() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* Top-right small Login button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="text-sm rounded-md border px-3 py-1.5 hover:bg-gray-100"
        aria-expanded={open}
        aria-controls="login-popover"
      >
        Login
      </button>

      {open && (
        <div
          id="login-popover"
          className="absolute right-0 mt-2 w-64 rounded-lg border bg-white p-3 shadow-lg z-30"
        >
          <p className="text-sm text-gray-600 mb-2">Sign in to continue</p>
          <button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="w-full rounded-md bg-black text-white px-4 py-2 text-sm hover:opacity-90"
          >
            Continue with Google
          </button>
          <p className="mt-2 text-[11px] text-gray-500">
            We only use your Google account to authenticate you.
          </p>
        </div>
      )}
    </div>
  );
}
