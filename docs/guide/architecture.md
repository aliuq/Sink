---
title: Architecture
description: How Sink handles the dashboard, API, redirects, storage, and analytics.
---

# Architecture

Sink runs the dashboard, API, and short-link redirects on Cloudflare Workers or Pages.

## What happens when someone opens a short link

1. A visitor opens a short link on your domain
2. Sink looks up the link and redirects (or shows a password/warning page based on stored settings; DoH safe-browsing checks run at link creation/editing time, not during redirects)
3. You manage links in the dashboard or via the API (both require login)
4. If analytics is enabled, visits show up in reports and logs

## Cloudflare services Sink uses

| Binding name | Product          | Required?   | Description                                    |
| ------------ | ---------------- | ----------- | ---------------------------------------------- |
| `DB`         | D1               | Yes         | Authoritative database storing links           |
| `KV`         | KV               | Yes         | Fast cache for redirects + one-time setup flag |
| `ANALYTICS`  | Analytics Engine | Recommended | Visit events for charts and logs               |
| `R2`         | R2               | Optional    | Object storage for backups and social images   |
| `AI`         | Workers AI       | Optional    | Suggests short codes and titles                |

**D1** is where links are really stored. **KV** is a fast copy used for redirects. After you save a link, Sink updates the cache; if the cache is wrong, it is dropped and reloaded from D1.

After the first deploy, open **Dashboard → Links** once so Sink can finish storage setup. Until then, most link APIs fail with “storage not ready” (HTTP 423). See [storage setup / migration](/storage/kv-to-d1).

R2 and AI are optional extras. Start with [Getting Started](./getting-started).
