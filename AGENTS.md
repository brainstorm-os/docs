# Brainstorm Docs — for agents

This is the source for https://docs.getbrainstorm.online (Astro + Starlight).

Agent-readable Markdown is generated automatically:

- `/llms.txt` — index of every page
- `/llms-full.txt` — all docs concatenated as one Markdown file
- append `.md` to any page URL for its Markdown twin

Content lives in `src/content/docs/`. Edit Markdown there; the sidebar is in `astro.config.mjs`.
