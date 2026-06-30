import { createSession, getSession } from "@/lib/auth";
import { fetchMemberRolesBot } from "@/lib/discord-roles";
import { getDb } from "@/lib/mongodb";
import { applyTierToUser } from "@/lib/sync-tier";
import { DISCORD_ROLE_LABELS, isBoosterOnlyAccess, BOOSTER_ACCESS_LABEL, MOBILE_ROLE_LABELS } from "@/lib/discord-roles";
import { tierLabel } from "@/lib/tier-access";
import type { UserDoc } from "@/lib/types";
import { NextResponse } from "next/server";

export async function POST() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const roleIds = await fetchMemberRolesBot(session.id);
  if (!roleIds) {
    return NextResponse.json(
      { error: "sync_failed", message: "Não foi possível ler teus cargos. Entra no servidor Deep Screen Share no Discord." },
      { status: 502 }
    );
  }

  const { tier, mobileIos, mobileAndroid, changed } = await applyTierToUser(session.id, roleIds, "bot");

  const db = await getDb();
  const userDoc = await db.collection<UserDoc>("users").findOne({ discordId: session.id });
  if (!userDoc) {
    return NextResponse.json({ error: "user_not_found" }, { status: 404 });
  }

  await createSession(userDoc);

  const boosterOnly = tier ? isBoosterOnlyAccess(roleIds) : false;
  const label = boosterOnly ? BOOSTER_ACCESS_LABEL : tier ? DISCORD_ROLE_LABELS[tier] : null;
  const mobileLabels = [
    mobileIos ? MOBILE_ROLE_LABELS.ios : null,
    mobileAndroid ? MOBILE_ROLE_LABELS.android : null,
  ].filter(Boolean);

  return NextResponse.json({
    ok: true,
    changed,
    tier,
    mobileIos,
    mobileAndroid,
    mobileLabels,
    accessSource: userDoc.accessSource ?? null,
    label,
    display: boosterOnly ? BOOSTER_ACCESS_LABEL : tier ? tierLabel(tier) : "Sem acesso",
    message: tier || mobileLabels.length
      ? changed
        ? [
            tier
              ? boosterOnly
                ? `Booster sincronizado — ${BOOSTER_ACCESS_LABEL}`
                : `Cargo sincronizado: ${DISCORD_ROLE_LABELS[tier]}`
              : null,
            mobileLabels.length ? `Mobile: ${mobileLabels.join(" · ")}` : null,
          ]
            .filter(Boolean)
            .join(" · ")
        : [
            tier
              ? boosterOnly
                ? `Já estás com ${BOOSTER_ACCESS_LABEL}`
                : `Já estás com ${DISCORD_ROLE_LABELS[tier]}`
              : null,
            mobileLabels.length ? `Mobile: ${mobileLabels.join(" · ")}` : null,
          ]
            .filter(Boolean)
            .join(" · ")
      : "Nenhum cargo de curso encontrado. Dá boost no servidor ou compra no Discord.",
  });
}
