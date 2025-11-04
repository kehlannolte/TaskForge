// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import AuthProvider from "@/components/AuthProvider";
import SWRegister from "@/components/SWRegister.client";

export const metadata: Metadata = {
  title: "TaskForge",
  description: "Run a tighter operation. Book more jobs. Get paid faster.",
  // (Optional) these help Next set basic meta automatically
  themeColor: "#0B0F19"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* PWA links */}
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#0B0F19" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body>
        <SWRegister />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}