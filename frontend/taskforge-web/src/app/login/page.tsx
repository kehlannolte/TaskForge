"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-md bg-white p-8 shadow">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Welcome to TaskForge</h1>
        <p className="text-sm text-gray-600 mb-6">
          Sign in to continue.
        </p>

        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="w-full btn"
        >
          Continue with Google
        </button>

        <p className="mt-4 text-xs text-gray-500">
          By continuing, you agree to our Terms and acknowledge our Privacy Policy.
        </p>
      </div>
    </main>
  );
}

