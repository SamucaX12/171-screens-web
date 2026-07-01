import { getBrand, resolveBrandId } from "./brands";

const brandId = resolveBrandId(process.env.NEXT_PUBLIC_BRAND);

/** Brand ativo no build — default: 171 ScreenS */
export const siteConfig = getBrand(brandId);

export { getBrand, resolveBrandId, brands } from "./brands";
export type { BrandId, SiteBrand } from "./brands";
