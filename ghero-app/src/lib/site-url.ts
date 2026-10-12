/** Public origin of the site (no trailing slash), used for sitemap, robots and absolute links. */
export const SITE_URL = (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000").replace(/\/+$/, "");
