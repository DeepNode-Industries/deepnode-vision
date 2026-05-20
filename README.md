# DeepNode Vision

AI-powered document intelligence platform built with Next.js 14. Extract, classify, and validate documents in real-time with a futuristic dark UI — fully functional in demo mode without any API keys.

---

## Features

- **AI Scanner** — Upload or photograph documents; simulated OCR + field extraction
- **Camera Capture** — Direct rear-camera access on mobile via `capture="environment"`
- **Document History** — Persistent analysis log with search, export, and delete
- **Analytics** — 14-day usage charts, document type breakdown, confidence metrics
- **Templates** — 8 pre-built extractors (invoice, ID, contract, receipt, medical, legal, financial, form)
- **Multi-provider Architecture** — Swap AI backends without touching application code
- **Demo Mode** — Realistic simulated analysis with no real API calls required
- **Document Types** — Invoice, Receipt, Payment, Vehicle Plate, Contract, ID, CFDI, Product Image

---

## Mobile

- Bottom navigation bar (5 tabs)
- Slide-in drawer sidebar
- **"Take Photo"** button using `capture="environment"` for direct rear camera
- **"Upload File"** button for gallery / file picker
- Collapsible results panels with accordion animation
- Large touch targets throughout (`py-4` on primary actions)
- Tested on iPhone SE, iPhone 15, Android, and tablets

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v3 (custom cyber theme) |
| Animation | Framer Motion |
| State | Zustand + persist middleware |
| Charts | Recharts |
| Icons | Lucide React |
| Upload | React Dropzone |
| Fonts | Space Grotesk + Inter (next/font/google) |

---

## AI Provider Support

The platform ships with a clean `VisionProvider` interface (`src/lib/providers.ts`). Configure any provider via Settings:

| Provider | Key(s) |
|---|---|
| **OpenAI Vision** | `OPENAI_API_KEY` |
| **Google Vision AI** | `GOOGLE_VISION_API_KEY` |
| **AWS Textract** | `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION` |
| **Azure Document Intelligence** | `AZURE_DOCUMENT_INTELLIGENCE_ENDPOINT`, `AZURE_DOCUMENT_INTELLIGENCE_KEY` |
| **Tesseract OCR** | Local — no key required |
| **Demo** *(default)* | No key required |

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000).

Copy `.env.example` to `.env.local` and add API keys to activate real providers:

```bash
cp .env.example .env.local
```

---

## Project Structure

```
src/
├── app/                      # Next.js App Router pages
│   ├── page.tsx              # Landing page
│   ├── dashboard/            # Metrics + charts
│   ├── scanner/              # Camera + upload + analysis
│   ├── documents/            # History & search
│   ├── analytics/            # 14-day trend charts
│   ├── templates/            # Pre-built extractors
│   ├── settings/             # Provider config
│   └── about/                # App info + tech stack
├── components/
│   ├── layout/               # AppShell, Sidebar, Topbar
│   ├── vision/               # Scanner UI components
│   ├── dashboard/            # Metric cards, charts
│   ├── landing/              # Hero, Features, Footer
│   └── ui/                   # Button, Card, Badge, Input, Modal
├── lib/
│   ├── vision-engine.ts      # Simulation core
│   ├── providers.ts          # AI provider interfaces
│   ├── types.ts              # TypeScript interfaces
│   ├── storage.ts            # LocalStorage helpers
│   ├── document-detectors.ts # File type detection
│   └── mock-data.ts          # Demo data
└── store/
    └── vision-store.ts       # Zustand store
```

---

## How to Connect Real AI Providers

All provider interfaces are in `src/lib/providers.ts`.

### OpenAI GPT-4o Vision
1. Set `OPENAI_API_KEY` in `.env.local`
2. Open `OpenAIVisionProvider.analyzeDocument()` in `providers.ts`
3. Install: `npm install openai`
4. Implement with `gpt-4o` + structured JSON output

### Google Vision API
1. Set `GOOGLE_VISION_API_KEY`
2. Implement `GoogleVisionProvider.analyzeDocument()`
3. Call `https://vision.googleapis.com/v1/images:annotate` with `DOCUMENT_TEXT_DETECTION`

### AWS Textract
1. Set `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`
2. Implement `TextractProvider.analyzeDocument()`
3. Install: `npm install @aws-sdk/client-textract`

### Azure Document Intelligence
1. Set `AZURE_DOCUMENT_INTELLIGENCE_ENDPOINT` and `AZURE_DOCUMENT_INTELLIGENCE_KEY`
2. Implement `AzureDocumentIntelligenceProvider.analyzeDocument()`
3. Install: `npm install @azure/ai-form-recognizer`

---

## Deploy to Vercel

```bash
npm i -g vercel
vercel --prod
```

Or connect via [vercel.com/import](https://vercel.com/import) — zero configuration required.

---

## Roadmap

- [ ] Real OCR integration (Google Vision / Textract)
- [ ] Webhook delivery on analysis complete
- [ ] Multi-page PDF support
- [ ] Batch document processing
- [ ] Team workspaces and roles
- [ ] SAT API integration for CFDI validation

---

DeepNode Industries © 2026. Todos los derechos reservados.
