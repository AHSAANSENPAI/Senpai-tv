# SenpaiTV

An anime discovery and **authorized-streaming demonstration** platform, built with Next.js App Router, TypeScript, and Tailwind CSS. Data comes from a self-hosted [AniKotoAPI](https://github.com/Shineii86/AniKotoAPI) instance.

## What this is (and isn't)

SenpaiTV is a discovery front end: trending, top 10, search, genre/type/status filters, schedule, anime details, and episode lists, all backed by your AniKotoAPI deployment. The watch page includes a real, reusable player architecture (`VideoPlayer.tsx`) — but it **only ever plays back video from sources that pass an explicit authorization check** (`lib/streaming.ts`). If the API doesn't return a source from a recognized, licensed provider, the app either shows a clearly-labeled demo clip or the message:

> No authorized stream is currently available.

This project does not scrape copyrighted content, bypass DRM/paywalls/geo-restrictions, forge tokens, or run a proxy for unauthorized streams. See [`lib/streaming.ts`](./lib/streaming.ts) for the authorization logic, and add real providers there as you obtain the rights to use them.

## Getting started

```bash
npm install
cp .env.example .env.local
# edit .env.local and set ANIKOTO_API_URL to your AniKotoAPI deployment
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

| Variable | Required | Description |
| --- | --- | --- |
| `ANIKOTO_API_URL` | Yes | Base URL of your AniKotoAPI deployment. Never hard-coded — every call in `lib/api.ts` is built from this. |
| `NEXT_PUBLIC_AUTHORIZED_STREAM_HOSTS` | No | Comma-separated hostnames of additional licensed providers `lib/streaming.ts` should trust. |
| `SITE_ACCESS_CODE` | No | Code required to unlock the site (`/access-gate`). Defaults to `1066924` if unset. |

### Access gate

`middleware.ts` blocks every route until a visitor submits the correct code on `/access-gate`. On success, `app/api/access-gate/route.ts` sets an `httpOnly` cookie (30-day expiry) and the visitor is redirected back to the page they wanted. Change the code by setting `SITE_ACCESS_CODE` in your environment — it's never sent to the browser, only compared server-side.

## Architecture

```
app/
  page.tsx                Home — hero, trending, top 10
  search/page.tsx         Search results + pagination
  explore/page.tsx        Genre/type/status filters + results
  anime/[id]/page.tsx     Anime details, episode list, recommendations
  watch/[id]/page.tsx     Watch page (server) -> WatchClient (client)
  schedule/page.tsx       Airing schedule
  api/random/route.ts     Thin route so client components can trigger /random

components/
  Navbar.tsx, Footer.tsx, SearchBar.tsx, GenreFilter.tsx
  AnimeCard.tsx, AnimeGrid.tsx, Hero.tsx, SectionHeader.tsx
  EpisodeList.tsx, Pagination.tsx
  VideoPlayer.tsx         Reusable HLS/MP4 player (play/pause, volume,
                          fullscreen, progress, loading/error states)
  ServerSelector.tsx      Sub/dub + provider ("server") switching
  WatchClient.tsx         Wires episode switching + server selection to
                          the player on the client
  LoadingSkeleton.tsx, ErrorState.tsx

lib/
  api.ts          Single service layer for all AniKotoAPI requests
  streaming.ts    StreamingProvider abstraction + URL authorization
  types.ts        Shared TypeScript types (Anime, Episode, StreamingSource, ...)
  utils.ts        Small formatting helpers
```

### API service layer

Every network call to AniKoto goes through `lib/api.ts`. Nothing else in the app calls `fetch` on the anime API directly, which keeps the base URL, caching (`next: { revalidate }`), and error handling centralized. Preserved routes: `/trending`, `/top-ten`, `/search?keyword=`, `/info?id=`, `/episodes/{id}`, `/schedule`, `/random`, `/filter`.

### Streaming architecture

- `StreamingProviderAdapter` (in `lib/streaming.ts`) is the extension point: register a new authorized/licensed provider by adding its id, label, and authorized hostnames — no changes needed anywhere else.
- `authorizeSource()` / `authorizeSources()` validate candidate URLs against the provider allow-list and `NEXT_PUBLIC_AUTHORIZED_STREAM_HOSTS`. A source's `authorized` flag is only ever trusted after this check runs — never as returned by the API.
- `resolvePlaybackSource()` picks the first authorized source, or falls back to a bundled, developer-controlled demo clip (clearly labeled "Demo playback" in the UI) when nothing authorized is available.
- `VideoPlayer.tsx` renders the "No authorized stream is currently available." message whenever `resolvePlaybackSource` can't produce a source at all.

## Deploying to Vercel

1. Push this project to a GitHub repository.
2. In Vercel, **Add New → Project** and import the repo.
3. Under **Environment Variables**, add `ANIKOTO_API_URL` (and optionally `NEXT_PUBLIC_AUTHORIZED_STREAM_HOSTS`) with your production values.
4. Deploy — Vercel will detect Next.js automatically (`next build` / `next start`, no extra config needed).
5. For subsequent changes, push to your default branch; Vercel redeploys automatically.

## Scripts

```bash
npm run dev      # local dev server
npm run build    # production build
npm run start    # run the production build
npm run lint     # eslint
```
