---
title: Objects
description: Everything in a vault is an object with typed properties, shared across every app rather than locked inside one.
---

Everything you create in Brainstorm is an **object**: a note, a task, a contact, a file, a calendar event. Objects are the shared substance of a vault — apps are just different ways of looking at them.

## One object, many views

An object isn't trapped in the app that made it. A task you create in a database can show up on the calendar, appear as a node in the graph, and be linked from a note — because all of those apps read and write the **same** object layer.

This is what makes Brainstorm feel connected rather than like a folder of disconnected tools: there's one shared space of objects, and apps are lenses over it.

## Typed properties

Objects carry **properties** — typed fields like text, number, date, checkbox, link, or a value drawn from a defined set. Properties are defined at the vault level, so the meaning of "Status" or "Due date" is consistent across every app that touches an object. Anything about an object that isn't its main body is a property, edited through a real, shared property system rather than ad-hoc fields per app.

## Links and relationships

Objects relate to each other:

- **Mentions** — type `@` in rich text to link to any object. The link is real and bidirectional, so you can see everything that references a given object.
- **Collections** — group objects into typed sets (a reading list, a project's tasks) without copying them.

The [Graph](/apps/graph/) app visualizes these relationships directly.

## Built on Block Protocol

Under the hood, objects follow the **Block Protocol** — an open standard for typed, interoperable data. That keeps your content structured and portable rather than locked to a proprietary format, and it's why blocks and data can move cleanly between apps.

## Next steps

- [Apps](/apps/) — the lenses you use to work with objects
- [Local-first & sync](/concepts/local-first-and-sync/) — how objects stay consistent across devices
