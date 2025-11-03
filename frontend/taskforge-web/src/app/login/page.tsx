import { Suspense } from "react";
import { LoginClient } from "./LoginClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen grid place-items-center text-gray-600">Loading…</div>}>
      <LoginClient />
    </Suspense>
  );
}
