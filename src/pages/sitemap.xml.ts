import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

// A single, flat sitemap.xml for the docs site. Starlight bundles
// @astrojs/sitemap, which emits a sitemap-index.xml plus chunked sitemap-N.xml
// files; that auto-integration is suppressed in astro.config.mjs so this one
// file is the whole sitemap. URLs are derived from the same `docs` content
// collection Starlight routes, so the sitemap never drifts from the pages.
//
// The docs are localised (English at the root, German under /de/), so every
// entry carries xhtml:link alternates for both locales (+ x-default) — this is
// what makes Google cluster the language versions instead of treating them as
// duplicate content.

const DE = "de";

const route = (id: string): string => {
	// Starlight serves the root index.md at "/" and "<dir>/index.md" at "/<dir>/".
	const slug = id.replace(/(^|\/)index$/, "").replace(/^\/+|\/+$/g, "");
	return slug === "" ? "/" : `/${slug}/`;
};

// Split a full route into its locale and locale-neutral path.
const localeOf = (fullRoute: string): { lang: string; neutral: string } => {
	if (fullRoute === `/${DE}/` || fullRoute.startsWith(`/${DE}/`)) {
		return { lang: DE, neutral: fullRoute.slice(`/${DE}`.length) || "/" };
	}
	return { lang: "en", neutral: fullRoute };
};

const enRoute = (neutral: string): string => neutral;
const deRoute = (neutral: string): string => (neutral === "/" ? `/${DE}/` : `/${DE}${neutral}`);

export const GET: APIRoute = async ({ site }) => {
	const base = (site ?? new URL("https://docs.getbrainstorm.online")).toString().replace(/\/$/, "");
	const docs = await getCollection("docs");

	// Group routes by their locale-neutral path, recording which locales exist.
	const byNeutral = new Map<string, { en: boolean; de: boolean }>();
	for (const entry of docs) {
		const { lang, neutral } = localeOf(route(entry.id));
		const rec = byNeutral.get(neutral) ?? { en: false, de: false };
		if (lang === DE) rec.de = true;
		else rec.en = true;
		byNeutral.set(neutral, rec);
	}

	const urlXml = (loc: string, rec: { en: boolean; de: boolean }, neutral: string): string => {
		const links: string[] = [];
		if (rec.en)
			links.push(
				`\t\t<xhtml:link rel="alternate" hreflang="en" href="${base}${enRoute(neutral)}" />`,
			);
		if (rec.de)
			links.push(
				`\t\t<xhtml:link rel="alternate" hreflang="de" href="${base}${deRoute(neutral)}" />`,
			);
		// x-default points at English when it exists, else the German fallback.
		const def = rec.en ? enRoute(neutral) : deRoute(neutral);
		links.push(`\t\t<xhtml:link rel="alternate" hreflang="x-default" href="${base}${def}" />`);
		return `\t<url>\n\t\t<loc>${base}${loc}</loc>\n${links.join("\n")}\n\t</url>`;
	};

	const urls: string[] = [];
	for (const neutral of [...byNeutral.keys()].sort()) {
		const rec = byNeutral.get(neutral) as { en: boolean; de: boolean };
		if (rec.en) urls.push(urlXml(enRoute(neutral), rec, neutral));
		if (rec.de) urls.push(urlXml(deRoute(neutral), rec, neutral));
	}

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n")}
</urlset>
`;

	return new Response(body, {
		headers: { "Content-Type": "application/xml; charset=utf-8" },
	});
};
