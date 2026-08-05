# Shubham — AI Hiring Assistant (Frontend)

A minimal, editorial chat interface for an AI hiring assistant. Built with
React, TypeScript, Vite and Tailwind CSS. Designed to feel like a
thoughtfully-made product — not a generic AI chatbot template.

## Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- react-markdown + remark-gfm (assistant message rendering)
- Framer Motion (subtle message entrance animation only)
- Lucide React (icons)
- axios (reserved for future non-streaming endpoints)

## Project structure

```
src/
  components/
    Header.tsx            top bar: brand, profile links, New Chat
    ChatWindow.tsx         welcome state + scrolling message list
    Message.tsx            single message bubble (user/assistant/error)
    Composer.tsx           the input box
    SuggestedPrompts.tsx   welcome-screen suggestion chips
    TypingIndicator.tsx    subtle animated "thinking" dots
    MarkdownRenderer.tsx   markdown -> styled HTML for assistant replies
  hooks/
    useChat.ts             conversation state machine (send/stream/retry/reset)
  services/
    api.ts                 fetch-based streaming client for POST /chat
  types/
    chat.ts                shared TypeScript types
  utils/
    cn.ts, id.ts            small helpers
```

## Getting started

```bash
npm install
cp .env.example .env      # then edit VITE_API_BASE_URL if needed
npm run dev
```

The app runs at `http://localhost:5173` by default and expects the FastAPI
backend at the URL in `VITE_API_BASE_URL` (defaults to
`http://localhost:8000`).

## Backend requirements

The frontend calls `POST {VITE_API_BASE_URL}/chat` with:

```json
{ "message": "Tell me about his projects" }
```

and reads the response body as a **stream of raw text chunks**, appending
each chunk to the assistant's message as it arrives — matching the
`StreamingResponse` your FastAPI backend already returns.

**Important — enable CORS on the backend.** Since the frontend (port 5173)
and backend (port 8000) run on different origins during local development,
add this to your FastAPI app so the browser is allowed to call it:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # add your deployed frontend URL too
    allow_methods=["POST"],
    allow_headers=["Content-Type"],
)
```

Without this, the browser will block the streaming request with a CORS
error before any text renders.

## Adding your resume, LinkedIn and GitHub

Open `src/App.tsx` and edit the `PROFILE_LINKS` object near the top:

```ts
const PROFILE_LINKS = {
  linkedin: "https://www.linkedin.com/in/your-handle",
  github: "https://github.com/your-handle",
  resume: "/resume.pdf",
};
```

- **LinkedIn / GitHub** — just paste your real profile URLs in as strings.
- **Resume** — drop your actual PDF file into the `public/` folder and name
  it `resume.pdf` (so the path is `public/resume.pdf`). The default
  `resume: "/resume.pdf"` in `App.tsx` will then open it directly in a new
  tab when someone clicks "Resume" in the header.
  - Alternatively, if your resume is hosted elsewhere (Google Drive, Notion,
    your own site), just put that full URL in `resume` instead and skip the
    `public/` file entirely.

No rebuild step needed for the PDF itself — files in `public/` are served
as-is, so just drop it in and refresh.

## Dark mode

There's a sun/moon toggle in the header. It:

- Persists your choice in `localStorage` so it's remembered on reload.
- Falls back to the visitor's OS-level light/dark preference on first visit.
- Applies instantly with no flash-of-wrong-theme, via a tiny blocking script
  in `index.html` that sets the class before React mounts.

All colors are defined once as CSS variables in `src/index.css` (`:root` for
light, `.dark` for dark) and consumed through the same Tailwind color names
(`bg-canvas`, `text-ink`, etc.) everywhere else — so if you want to retune
either theme's palette, that's the only file to touch.

## Customizing

- **Profile links** — edit `PROFILE_LINKS` at the top of `src/App.tsx`
  (LinkedIn, GitHub, resume URL).
- **Resume file** — either point `resume` at an external URL, or drop a
  `resume.pdf` into `public/` and keep the default `/resume.pdf` path.
- **Suggested prompts** — edit `SUGGESTED_PROMPTS` in
  `src/components/SuggestedPrompts.tsx`.
- **Colors/type** — all design tokens (warm neutral palette, Instrument
  Sans / Newsreader fonts, terracotta accent) live in `tailwind.config.js`
  and the Google Fonts `<link>` in `index.html`.

## Design notes

- Palette: cream background (`#F7F4EF`), off-white cards (`#FDFBF8`), warm
  border (`#E6DDD3`), muted terracotta accent (`#C96C3A`) — no blue, no
  gradients, no glassmorphism.
- Type: Instrument Sans for UI text, Newsreader (serif) for the welcome
  headline only.
- Motion is limited to a short fade/slide on new messages and a quiet
  three-dot typing indicator — nothing else animates.
- Streaming is handled by reading `response.body` as a `ReadableStream` in
  `services/api.ts` (not axios — browsers can't stream a response body
  through axios the way `fetch` allows), so text appends incrementally
  without ever replacing the whole message.

## Building for production

```bash
npm run build     # type-checks, then outputs static files to dist/
npm run preview   # serve the production build locally
```

Deploy the contents of `dist/` to any static host (Vercel, Netlify,
Cloudflare Pages, etc.), and set `VITE_API_BASE_URL` to your deployed
backend's URL as a build-time environment variable.
