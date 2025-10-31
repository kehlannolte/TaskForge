import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/app/api/auth/[...nextauth]/route";
import Providers from "@/components/Providers";

export default async function ProtectedLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  if (!session) redirect("/login");
  return <Providers session={session}>{children}</Providers>;
}
