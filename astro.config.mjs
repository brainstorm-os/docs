// @ts-check
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import starlightLlmsTxt from "starlight-llms-txt";

// https://astro.build/config
export default defineConfig({
	site: "https://docs.getbrainstorm.online",
	integrations: [
		// Suppress Starlight's bundled @astrojs/sitemap (which emits a
		// sitemap-index.xml + chunked sitemap-N.xml). An integration already
		// named "@astrojs/sitemap" makes Starlight skip its own; the single flat
		// sitemap is served from src/pages/sitemap.xml.ts instead.
		{ name: "@astrojs/sitemap", hooks: {} },
		starlight({
			title: "Brainstorm Docs",
			description:
				"Documentation for Brainstorm — the local-first, AI-native operating system for knowledge work.",
			// English at the root, German under /de/. Starlight supplies the
			// language switcher, hreflang, <html lang> and localised UI chrome.
			defaultLocale: "root",
			locales: {
				root: { label: "English", lang: "en" },
				de: { label: "Deutsch", lang: "de" },
			},
			// Bing Webmaster Tools site verification for docs.getbrainstorm.online.
			head: [
				{
					tag: "meta",
					attrs: {
						name: "msvalidate.01",
						content: "E5A4E21AFE9DE84C10B6A60D56F7E341",
					},
				},
			],
			logo: {
				// Indigo mark in both themes (the dark variant keeps its own gradient).
				light: "./src/assets/brandmark.svg",
				dark: "./src/assets/brandmark-midnight.svg",
				alt: "Brainstorm",
			},
			favicon: "/favicon.svg",
			customCss: ["./src/styles/brand.css"],
			components: {
				// Wrap the default <Head> to add Amplitude (same as the marketing site).
				Head: "./src/components/Head.astro",
				// Logo/title link back to the main product site, not the docs root.
				SiteTitle: "./src/components/SiteTitle.astro",
				// Sun/moon toggle matching the marketing site (not Starlight's dropdown).
				ThemeSelect: "./src/components/ThemeSelect.astro",
				// EN/DE pill switcher matching the marketing site (not Starlight's dropdown).
				LanguageSelect: "./src/components/LanguageSelect.astro",
				// Header social icons get the theme-toggle's neutral + hover-area
				// treatment instead of an accent colour that shifts on hover.
				SocialIcons: "./src/components/SocialIcons.astro",
				// Splash hero restyled to the marketing-site hero (mono eyebrow +
				// wireframe accents + corner marks); content stays from frontmatter.
				Hero: "./src/components/Hero.astro",
				// Branded footer matching the marketing site (below Starlight's page nav).
				Footer: "./src/components/Footer.astro",
			},
			social: [
				{
					icon: "github",
					label: "GitHub",
					href: "https://github.com/brainstorm-os/shell",
				},
			],
			// Source lives in a private repo — no public "edit this page" link.
			editLink: undefined,
			plugins: [
				// Emits /llms.txt, /llms-full.txt and a .md twin of every page so
				// agents can read the docs as plain Markdown.
				starlightLlmsTxt({
					projectName: "Brainstorm",
					description:
						"Brainstorm is a local-first, AI-native operating system for knowledge work. A desktop shell hosts sandboxed apps over your own data; every app and every agent only touches what you allow.",
					details:
						"These docs cover using Brainstorm (vaults, apps, objects, local-first sync, the permission model) and building on it (the app model, manifest, capabilities, SDK, and data layer).",
				}),
			],
			sidebar: [
				{
					label: "Start here",
					translations: { de: "Erste Schritte" },
					items: [
						{
							label: "What is Brainstorm?",
							translations: { de: "Was ist Brainstorm?" },
							slug: "start-here/what-is-brainstorm",
						},
						{
							label: "Install",
							translations: { de: "Installation" },
							slug: "start-here/install",
						},
						{
							label: "Quickstart",
							translations: { de: "Schnellstart" },
							slug: "start-here/quickstart",
						},
					],
				},
				{
					label: "Concepts",
					translations: { de: "Konzepte" },
					items: [
						{ label: "Vaults", translations: { de: "Vaults" }, slug: "concepts/vaults" },
						{
							label: "Apps & permissions",
							translations: { de: "Apps & Berechtigungen" },
							slug: "concepts/apps-and-permissions",
						},
						{ label: "Objects", translations: { de: "Objekte" }, slug: "concepts/objects" },
						{
							label: "Local-first & sync",
							translations: { de: "Lokal-first & Synchronisierung" },
							slug: "concepts/local-first-and-sync",
						},
						{
							label: "Your data & security",
							translations: { de: "Deine Daten & Sicherheit" },
							slug: "concepts/your-data-and-security",
						},
					],
				},
				{
					label: "Apps",
					translations: { de: "Apps" },
					items: [{ autogenerate: { directory: "apps" } }],
				},
				{
					label: "Build",
					translations: { de: "Entwickeln" },
					items: [
						{ label: "Overview", translations: { de: "Überblick" }, slug: "build/overview" },
						{
							label: "Your first app",
							translations: { de: "Deine erste App" },
							slug: "build/your-first-app",
						},
						{
							label: "The manifest",
							translations: { de: "Das Manifest" },
							slug: "build/the-manifest",
						},
						{
							label: "Capabilities",
							translations: { de: "Fähigkeiten" },
							slug: "build/capabilities",
						},
						{ label: "SDK & runtime", translations: { de: "SDK & Laufzeit" }, slug: "build/the-sdk" },
						{
							label: "Working with data",
							translations: { de: "Mit Daten arbeiten" },
							slug: "build/working-with-data",
						},
						{
							label: "Recipes & anti-patterns",
							translations: { de: "Rezepte & Anti-Patterns" },
							slug: "build/recipes",
						},
					],
				},
			],
		}),
	],
});
