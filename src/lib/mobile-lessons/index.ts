import { iosLessons } from "./ios";
import { androidLessons } from "./android";
import type { MobileLesson, MobilePlatform } from "./types";

export type { MobileLesson, MobilePlatform, MobileLessonSection, MobileLessonCategory } from "./types";
export { MOBILE_CATEGORIES, MOBILE_PLATFORM_META } from "./types";

export const mobileLessons: MobileLesson[] = [
  ...iosLessons,
  ...androidLessons,
].sort((a, b) => a.order - b.order);

export function getMobileLesson(id: string): MobileLesson | undefined {
  return mobileLessons.find((l) => l.id === id);
}

export function getMobileLessonsByPlatform(platform: MobilePlatform): MobileLesson[] {
  return mobileLessons
    .filter((l) => l.platform === platform)
    .sort((a, b) => a.order - b.order);
}

export function getMobileLessonCounts() {
  return {
    ios:     iosLessons.length,
    android: androidLessons.length,
    total:   mobileLessons.length,
  };
}
