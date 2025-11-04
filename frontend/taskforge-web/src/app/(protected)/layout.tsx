import { ReactNode } from "react";
import NavBar from "@/components/NavBar";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
    </div>
  );
}