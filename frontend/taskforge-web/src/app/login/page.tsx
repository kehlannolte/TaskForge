// src/app/login/page.tsx
"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="min-h-screen grid place-items-center bg-gray-50">
      <div className="w-full max-w-md rounded-xl border bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold">TaskForge</h1>
        <p className="mt-2 text-gray-600">
          Meet TaskForge — your all-in-one AI-powered office manager.
        </p>

        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="mt-6 w-full rounded-lg bg-black px-4 py-2 font-medium text-white hover:opacity-90"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}
