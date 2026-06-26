import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getDb } from "@/lib/mongodb";
import { DashboardShell } from "@/components/DashboardShell";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/login");

  try {
    const db = await getDb();
    await db.collection("users").updateOne(
      { discordId: session.id },
      { $set: { lastSeenAt: new Date() } }
    );
  } catch (err) {
    console.error("Dashboard layout — MongoDB:", err);
  }

  return <DashboardShell user={session}>{children}</DashboardShell>;
}
