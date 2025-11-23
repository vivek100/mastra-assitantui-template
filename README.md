# Mastra + Assistant UI Template

This project is a **single Next.js app** that includes both:

- A **Mastra server** (agents, workflows, tools) running on **http://localhost:4111**
- An **Assistant UI** chat frontend (Next.js) running on **http://localhost:3000**

The UI talks to Mastra via an AI-SDK-compatible chat route, e.g.:

- `http://localhost:4111/chat/weatherAgent`

This layout is designed to work well both locally and in hosted dev environments (e.g. Freestyle), using either `npm` or `pnpm`.

---

## Project structure

```text
assistant-ui-app/
  src/
    app/         # Next.js app router, Assistant UI components/pages
    mastra/      # Mastra configuration, agents, tools, workflows
  package.json   # Single package for both UI + Mastra
  .gitignore
  ...            # Next.js config files, tsconfig, etc.
```

### `src/mastra/`

- Contains the Mastra setup (e.g. `index.ts`, `agents/`, `workflows/`).
- Exposes an AI-SDK chat route via `@mastra/ai-sdk`'s `chatRoute`, typically:
  - `GET/POST /chat/:agentId` → e.g. `/chat/weatherAgent`
- Mastra server is started via the `mastra dev` command (see scripts below).

### `src/app/`

- Uses `@assistant-ui/react` and `@assistant-ui/react-ai-sdk`.
- The `Assistant` component (e.g. `app/assistant.tsx`) configures:
  - `AssistantRuntimeProvider`
  - `AssistantChatTransport` with `api: "http://localhost:4111/chat/weatherAgent"`

---

## Setup

### 1. Install dependencies

From the project root (`assistant-ui-app/`):

```bash
npm install
# or
pnpm install
```

Both `npm` and `pnpm` work because this is a single package (no workspaces here).

### 2. Environment variables

Create a `.env.local` file in `assistant-ui-app/` and add your keys, for example:

```bash
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

If your Mastra agents or tools require additional env vars (e.g. other providers), document and add them here as well.

---

## Running in development

To start **both** the Mastra server and the Next.js / Assistant UI dev server:

```bash
npm run dev
# or
pnpm dev
```

This runs (see `package.json`):

- `npm run dev:mastra` → `mastra dev` (Mastra server on **http://localhost:4111**)
- `next dev` or `next dev --turbopack` (Next.js dev on **http://localhost:3000**)

Then open:

- UI: <http://localhost:3000>
- Mastra API (for debugging): <http://localhost:4111/api>

You can start editing the UI by modifying files under `src/app/`. The page auto-updates as you edit.

To run just one side:

```bash
npm run dev:mastra   # only Mastra server
npm run dev:ui       # only Next.js / Assistant UI
```

---

## Notes for extending this template (humans + AI agents)

- **Do not change ports** without also updating:
  - Mastra server configuration in `src/mastra/index.ts` (port and `chatRoute` path).
  - The Assistant UI transport URL in `src/app/assistant.tsx` (or wherever the runtime is configured).
- **When adding new Mastra agents**:
  - Define them under `src/mastra/agents/`.
  - Register them in `src/mastra/index.ts` under the `agents` map.
  - Call them from the UI via the corresponding `/chat/<agentId>` URL.
- **When modifying tools, workflows, or memory**:
  - Keep their imports and registration inside `src/mastra` consistent.
  - If you need more advanced patterns, use the official Mastra docs or the `ui-dojo` repo as a reference.
- **Avoid breaking the core scripts** in `package.json`:
  - `dev`, `dev:mastra`, `dev:ui`
  These are expected by tooling and make local + hosted dev straightforward.

This repo is intended to be a small, understandable starting point for building Mastra-powered Assistant UI apps, and for use inside AI-driven sandboxes.
