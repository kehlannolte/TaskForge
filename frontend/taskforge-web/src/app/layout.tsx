import "./globals.css";
import type { Metadata } from "next";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "TaskForge",
  description: "Field service ops that pay for themselves.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-gray-50">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
