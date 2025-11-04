import { Suspense } from "react";
import LoginClient from "./LoginClient";

// (Optional) You can export metadata if you want a nicer tab title:
// export const metadata = { title: "Login • TaskForge" };

export default function LoginPage() {
  // Wrap the client component in Suspense because it uses useSearchParams()
  return (
    <Suspense fallback={<div className="p-6">Loading…</div>}>
      <LoginClient />
    </Suspense>
  );
}