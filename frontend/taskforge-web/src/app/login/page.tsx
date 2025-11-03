"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

export default function LoginPage() {
  const sp = useSearchParams();
  const callbackUrl = useMemo(() => sp.get("callbackUrl") || "/dashboard", [sp]);
  const [showAuth, setShowAuth] = useState(false);

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-50 via-white to-slate-50">
      {/* soft background blobs */}
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_60%_at_50%_40%,black,transparent)]">
        <div className="absolute -top-32 -right-24 h-80 w-80 rounded-full bg-blue-100 blur-3xl opacity-50" />
        <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-indigo-100 blur-3xl opacity-50" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Brand */}
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white">
            <span className="text-sm font-semibold tracking-wider">TF</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">TaskForge</h1>
          <p className="mt-2 text-sm text-gray-600">
            Meet TaskForge — your all-in-one, AI-powered office manager.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border bg-white/80 p-6 shadow-sm backdrop-blur">
          <h2 className="text-lg font-medium">Sign in</h2>
          <p className="mt-1 text-sm text-gray-500">
            Use your Google account to access your dashboard.
          </p>

          {/* Step 1: single Login button */}
          {!showAuth && (
            <div className="mt-6">
              <button
                onClick={() => signIn("google", { callbackUrl })}
                className="w-full rounded-xl bg-black px-4 py-2.5 text-sm font-medium text-white shadow hover:shadow-md active:scale-[.99] transition"
              >
                Login
              </button>
            </div>
          )}

          {/* Step 2: reveal “Continue with Google” */}
          {showAuth && (
            <div className="mt-4 animate-in fade-in slide-in-from-top-1">
              <button
                onClick={() => signIn("google", { callbackUrl })}
                className="w-full inline-flex items-center justify-center gap-3 rounded-xl border px-4 py-2.5 text-sm font-medium hover:bg-gray-50 active:scale-[.99] transition"
              >
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#EA4335"
                    d="M12 10.2v3.67h5.17c-.23 1.2-1.4 3.52-5.17 3.52-3.11 0-5.64-2.57-5.64-5.74S8.89 5.93 12 5.93c1.77 0 2.96.75 3.64 1.39l2.48-2.39C16.82 3.57 14.6 2.67 12 2.67 6.97 2.67 2.87 6.78 2.87 11.8S6.97 20.93 12 20.93c6.91 0 8.12-5.93 7.55-9.03H12z"
                  />
                </svg>
                Continue with Google
              </button>

              <button
                onClick={() => setShowAuth(false)}
                className="mt-3 w-full text-xs text-gray-500 underline"
              >
                Back
              </button>
            </div>
          )}

          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              By continuing you agree to our <a className="underline" href="#">Terms</a> and{" "}
              <a className="underline" href="#">Privacy</a>.
            </p>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-gray-500">
          Having trouble? <a className="underline" href="#">Contact support</a>
        </p>
      </div>
    </div>
  );
}
