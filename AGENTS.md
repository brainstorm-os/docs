# Brainstorm Docs — for agents

This is the source for https://docs.getbrainstorm.online (Astro + Starlight).

Agent-readable Markdown is generated automatically:

- `/llms.txt` — index of the documentation (links to the sets below)
- `/llms-small.txt` — the docs as one Markdown file, non-essential content removed
- `/llms-full.txt` — the full docs concatenated as one Markdown file

Content lives in `src/content/docs/`. Edit Markdown there; the sidebar is in `astro.config.mjs`.
