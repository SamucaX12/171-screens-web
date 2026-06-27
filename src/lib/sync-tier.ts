import { getDb } from "./mongodb";
import {
  tierFromRoleIds,
  DISCORD_ROLE_LABELS,
  isBoosterOnlyAccess,
  BOOSTER_ACCESS_LABEL,
  mobileAccessFromRoleIds,
} from "./discord-roles";
import type { CourseTier, UserDoc, CourseAccessSource } from "./types";

export async function applyTierToUser(
  discordId: string,
  roleIds: string[],
  source: "oauth" | "bot" | "admin" = "oauth"
): Promise<{
  tier: CourseTier | null;
  mobileIos: boolean;
  mobileAndroid: boolean;
  changed: boolean;
}> {
  const tier = tierFromRoleIds(roleIds);
  const { mobileIos, mobileAndroid } = mobileAccessFromRoleIds(roleIds);
  const accessSource: CourseAccessSource = tier
    ? isBoosterOnlyAccess(roleIds)
      ? "booster"
      : "paid"
    : null;
  const db = await getDb();
  const user = await db.collection<UserDoc>("users").findOne({ discordId });

  if (!user) {
    return { tier, mobileIos, mobileAndroid, changed: false };
  }

  if (user.role === "owner") {
    return {
      tier: user.courseTier ?? "tier3",
      mobileIos: true,
      mobileAndroid: true,
      changed: false,
    };
  }

  const changed =
    user.courseTier !== tier ||
    user.accessSource !== accessSource ||
    user.mobileIos !== mobileIos ||
    user.mobileAndroid !== mobileAndroid;

  if (changed) {
    await db.collection<UserDoc>("users").updateOne(
      { discordId },
      {
        $set: {
          courseTier: tier,
          accessSource,
          mobileIos,
          mobileAndroid,
          updatedAt: new Date(),
        },
      }
    );

    const label =
      accessSource === "booster" && tier === "tier1"
        ? BOOSTER_ACCESS_LABEL
        : tier
          ? DISCORD_ROLE_LABELS[tier]
          : null;

    await db.collection("audit_logs").insertOne({
      action: "tier_sync",
      source,
      targetId: discordId,
      tier,
      accessSource,
      mobileIos,
      mobileAndroid,
      label,
      roleIds,
      createdAt: new Date(),
    });
  }

  return { tier, mobileIos, mobileAndroid, changed };
}
