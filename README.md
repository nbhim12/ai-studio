AI Studio - 

A small React + TypeScript web app that simulates a lightweight AI studio:

Upload a PNG/JPG (≤10MB) and preview it
Enter a prompt + choose a style (Editorial / Streetwear / Vintage)
Live summary (image + prompt + style)
“Generate” with a mocked API (1–2s delay, 20% simulated failures)
Retry with exponential backoff (max 3), Abort in-flight
Persist last 5 generations in localStorage, click to restore

🔧 Tech Stack

Vite + React + TypeScript
TailwindCSS for styling
ESLint + Prettier
Vitest + React Testing Library for unit tests
Playwright for end-to-end tests

🚀 Getting Started

1) Install deps
npm install

2) Run dev server
npm run dev

✅ Tests

Unit tests (Vitest + RTL)

# run once (CI mode)
npm run test

# interactive UI
npm run test:ui

End-to-end tests (Playwright)

# run e2e specs
npm run e2e

# with visual test runner
npm run e2e:ui


✍️ Design Notes
Functional Requirements Mapping

Upload & Preview

Accepts PNG/JPG only; rejects files >10MB with error text.
Preview is shown immediately after upload.
Downscale Before Sending

Prompt & Style

PromptInput is a controlled textarea.
StyleSelect is typed via StyleOption = "Editorial" | "Streetwear" | "Vintage".

Live Summary

SummaryPanel reflects image/prompt/style in real time.

Generate Flow

Mocked API simulates 1–2s latency and a 20% “Model overloaded” error.
Retry with exponential backoff (500ms → 1s → 2s; max 3 attempts).
Abort using AbortController; button only visible while loading.


History

Persists the last 5 results in localStorage (GenerationResult).
Clicking a history entry restores it into the main preview/inputs.

Accessibility

Keyboard navigable: labeled inputs, visible focus styles, semantic headings.
Inline, screen-reader friendly errors (role="alert", aria-live="polite").
DOM order follows workflow: Upload → Preview → Prompt → Style → Summary → Generate → History.

Error Handling

Inline error UI for upload validation.
Friendly API error text with retries.
AbortController for canceling in-flight work.

🧪 What the tests cover

Unit (RTL)

UploadArea — accepts valid images, rejects >10MB & non-image, shows inline errors, calls onImageChange with DataURL.
PromptInput — controlled behavior (via harness), emits full text.
StyleSelect — selecting an option triggers onChange.
SummaryPanel — renders live state + empty states.
HistoryPanel — empty state, item click calls onSelect.
downscaleIfNeeded — returns original if ≤1920px; resizes otherwise.

E2E (Playwright)

Happy path: upload → prompt/style → generate (spinner) → history entry appears.
Abort path: start generating → abort → no history item with that prompt.