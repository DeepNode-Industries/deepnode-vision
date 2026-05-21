# DeepNode Vision

AI-powered document intelligence platform built with **React Native + Expo SDK 52**. Extract, classify, and validate documents in real-time with a futuristic dark UI — fully functional in demo mode without any API keys.

---

## Features

- **AI Scanner** — Photograph or pick documents; simulated OCR + field extraction
- **Native Camera** — Direct rear-camera via `expo-image-picker`; gallery + PDF support
- **Document History** — Persistent analysis log with search, export, and delete
- **Analytics** — 14-day usage charts, document type breakdown, confidence metrics
- **Templates** — 8 pre-built extractors (invoice, ID, contract, receipt, medical, legal, financial, form)
- **Multi-provider Architecture** — Swap AI backends without touching application code
- **Demo Mode** — Realistic simulated analysis with no real API calls required
- **Haptic Feedback** — Native haptics on every interaction

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Expo SDK 52 + React Native 0.76 |
| Routing | Expo Router v4 (file-based) |
| Language | TypeScript (strict) |
| Styling | NativeWind v4 (Tailwind for RN) |
| Animation | React Native Reanimated v3 |
| Charts | Custom SVG (react-native-svg) |
| State | Zustand + AsyncStorage persistence |
| Icons | lucide-react-native |
| Fonts | Space Grotesk + Inter (expo-google-fonts) |
| Haptics | expo-haptics |
| Build | EAS Build |

---

## AI Provider Support

The platform ships with a clean `VisionProvider` interface (`src/lib/providers.ts`):

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

# Start Expo dev server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios
```

Copy `.env.example` to `.env.local` and add API keys to activate real providers:

```bash
cp .env.example .env.local
```

---

## Build Android APK (EAS)

```bash
# Install EAS CLI
npm install -g eas-cli

# Log in to Expo account
eas login

# Build preview APK
eas build -p android --profile preview

# Build production AAB (Play Store)
eas build -p android --profile production
```

---

## Project Structure

```
app/
├── _layout.tsx               # Root layout (fonts, SafeArea, Stack)
├── (tabs)/
│   ├── _layout.tsx           # Custom tab bar
│   ├── index.tsx             # Dashboard
│   ├── scanner.tsx           # Camera + analysis (core screen)
│   ├── documents.tsx         # History & search
│   ├── analytics.tsx         # Charts & metrics
│   └── settings.tsx          # Provider config
├── templates.tsx             # Pre-built extractors (modal)
└── about.tsx                 # App info (modal)

src/
├── components/
│   ├── vision/               # ScanAnimation, ConfidenceMeter, ExtractionPanel, Timeline
│   ├── dashboard/            # MetricCard, UsageChart, DocumentTypeChart
│   └── ui/                   # Button, Card, Badge
├── lib/
│   ├── vision-engine.ts      # Simulation core
│   ├── providers.ts          # AI provider interfaces
│   ├── native-camera.ts      # expo-image-picker / expo-document-picker
│   ├── types.ts              # TypeScript interfaces
│   ├── storage.ts            # AsyncStorage helpers
│   ├── document-detectors.ts # File type detection
│   └── mock-data.ts          # Demo data
└── store/
    └── vision-store.ts       # Zustand store (AsyncStorage persist)
```

---

## How to Connect Real AI Providers

All provider interfaces are in `src/lib/providers.ts`.

### OpenAI GPT-4o Vision
1. Set `OPENAI_API_KEY` in `.env.local`
2. Implement `OpenAIVisionProvider.analyzeDocument()` in `providers.ts`
3. Install: `npm install openai`
4. Send `base64` image via `gpt-4o` with structured JSON output

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

## Roadmap

- [ ] Real OCR integration (Google Vision / Textract)
- [ ] Webhook delivery on analysis complete
- [ ] Multi-page PDF support
- [ ] Batch document processing
- [ ] Team workspaces and roles
- [ ] SAT API integration for CFDI validation

---

DeepNode Industries © 2026. Todos los derechos reservados.
