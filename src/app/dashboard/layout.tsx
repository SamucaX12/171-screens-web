import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getSession } from "@/lib/auth";
import { getDb } from "@/lib/mongodb";
import { DashboardShell } from "@/components/DashboardShell";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/login");

  try {
    const h  = await headers();
    const ip = h.get("x-forwarded-for")?.split(",")[0].trim()
            ?? h.get("x-real-ip")
            ?? undefined;

    const db = await getDb();
    await db.collection("users").updateOne(
      { discordId: session.id },
      { $set: { lastSeenAt: new Date(), ...(ip ? { lastIp: ip } : {}) } }
    );
  } catch (err) {
    console.error("Dashboard layout — MongoDB:", err);
  }

  return <DashboardShell user={session}>{children}</DashboardShell>;
}
