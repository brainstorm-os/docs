import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

// A single, flat sitemap.xml for the docs site. Starlight bundles
// @astrojs/sitemap, which emits a sitemap-index.xml plus chunked sitemap-N.xml
// files; that auto-integration is suppressed in astro.config.mjs so this one
// file is the whole sitemap. URLs are derived from the same `docs` content
// collection Starlight routes, so the sitemap never drifts from the pages.
//
// The docs are localised (English at the root, the rest under a `/<code>/`
// prefix), so every entry carries xhtml:link alternates for each locale that
// exists (+ x-default) — this is what makes Google cluster the language
// versions instead of treating them as duplicate content. Add a locale to
// PREFIXED (and astro.config's `locales`) and it flows through.
const PREFIXED = ["de", "fr"] as const;

const route = (id: string): string => {
	// Starlight serves the root index.md at "/" and "<dir>/index.md" at "/<dir>/".
	const slug = id.replace(/(^|\/)index$/, "").replace(/^\/+|\/+$/g, "");
	return slug === "" ? "/" : `/${slug}/`;
};

// Split a full route into its locale and locale-neutral path.
const localeOf = (fullRoute: string): { lang: string; neutral: string } => {
	for (const code of PREFIXED) {
		if (fullRoute === `/${code}/` || fullRoute.startsWith(`/${code}/`)) {
			return { lang: code, neutral: fullRoute.slice(`/${code}`.length) || "/" };
		}
	}
	return { lang: "en", neutral: fullRoute };
};

// The route for a given locale-neutral path in `lang` ("en" lives at the root).
const localized = (lang: string, neutral: string): string =>
	lang === "en" ? neutral : neutral === "/" ? `/${lang}/` : `/${lang}${neutral}`;

export const GET: APIRoute = async ({ site }) => {
	const base = (site ?? new URL("https://docs.getbrainstorm.online")).toString().replace(/\/$/, "");
	const docs = await getCollection("docs");

	// Group routes by their locale-neutral path, recording which locales exist.
	const byNeutral = new Map<string, Set<string>>();
	for (const entry of docs) {
		const { lang, neutral } = localeOf(route(entry.id));
		const langs = byNeutral.get(neutral) ?? new Set<string>();
		langs.add(lang);
		byNeutral.set(neutral, langs);
	}

	const urlXml = (loc: string, langs: Set<string>, neutral: string): string => {
		const links: string[] = [];
		for (const lang of ["en", ...PREFIXED]) {
			if (langs.has(lang)) {
				links.push(
					`\t\t<xhtml:link rel="alternate" hreflang="${lang}" href="${base}${localized(lang, neutral)}" />`,
				);
			}
		}
		// x-default points at English when it exists, else the first prefixed locale.
		const defLang = langs.has("en") ? "en" : (PREFIXED.find((c) => langs.has(c)) ?? "en");
		links.push(
			`\t\t<xhtml:link rel="alternate" hreflang="x-default" href="${base}${localized(defLang, neutral)}" />`,
		);
		return `\t<url>\n\t\t<loc>${base}${loc}</loc>\n${links.join("\n")}\n\t</url>`;
	};

	const urls: string[] = [];
	for (const neutral of [...byNeutral.keys()].sort()) {
		const langs = byNeutral.get(neutral) as Set<string>;
		for (const lang of ["en", ...PREFIXED]) {
			if (langs.has(lang)) urls.push(urlXml(localized(lang, neutral), langs, neutral));
		}
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
