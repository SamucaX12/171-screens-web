import { screens171Brand } from "./171-screens";
import { deepScreenShareBrand } from "./deep-screen-share";
import type { BrandId, SiteBrand } from "./types";

export const brands: Record<BrandId, SiteBrand> = {
  "171screens": screens171Brand,
  deepscreenshare: deepScreenShareBrand,
};

export const DEFAULT_BRAND_ID: BrandId = "171screens";

export function resolveBrandId(raw?: string | null): BrandId {
  if (raw === "deepscreenshare" || raw === "171screens") return raw;
  return DEFAULT_BRAND_ID;
}

export function getBrand(id?: string | null): SiteBrand {
  return brands[resolveBrandId(id)];
}

export type { BrandId, SiteBrand, BrandUiStyle } from "./types";
