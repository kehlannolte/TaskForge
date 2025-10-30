import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import NavBar from "@/components/NavBar";
import { ToastProvider } from "@/components/ToastProvider";

export const metadata: Metadata = {
  title: "TaskForge",
  description: "TaskForge MVP",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ToastProvider>
            <NavBar />
            {children}
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
