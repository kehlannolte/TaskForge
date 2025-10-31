// app/login/page.tsx
"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setU] = useState("");
  const [password, setP] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const res = await signIn("credentials", {
      redirect: false,   // <-- key
      username,
      password,
    });
    console.log("signIn result", res); // <-- watch console for res.error
    if (res?.error) {
      setError(res.error);             // shows NextAuth error code
      return;
    }
    router.push("/dashboard");
  }

  return (
    <form onSubmit={onSubmit} className="max-w-sm mx-auto p-6 space-y-3">
      <input className="border p-2 w-full" placeholder="Username" value={username} onChange={(e)=>setU(e.target.value)} />
      <input className="border p-2 w-full" placeholder="Password" type="password" value={password} onChange={(e)=>setP(e.target.value)} />
      <button className="btn-primary w-full" type="submit">Sign in</button>
      {error && <p className="text-red-600 text-sm">Error: {error}</p>}
    </form>
  );
}
