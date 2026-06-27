import type { SessionUser } from "./types";
import type { MobileLesson, MobilePlatform } from "./mobile-lessons";

export function hasMobilePlatformAccess(user: SessionUser, platform: MobilePlatform): boolean {
  if (user.role === "owner" || user.role === "admin") return true;
  if (platform === "ios")     return !!user.mobileIos;
  if (platform === "android") return !!user.mobileAndroid;
  return false;
}

export function hasMobileLessonAccess(user: SessionUser, lesson: Pick<MobileLesson, "platform">): boolean {
  return hasMobilePlatformAccess(user, lesson.platform);
}
