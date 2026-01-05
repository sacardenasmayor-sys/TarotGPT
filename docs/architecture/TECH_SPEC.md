# Technical Specification: TarotGPT

## 1. System Overview

TarotGPT is a mobile application delivering AI-powered tarot readings. It uses a client-server architecture where the mobile app handles user interaction and "deck physics" simulation, while the backend manages LLM integration, session persistence, and user data.

## 2. Technology Stack

### 2.1 Core Technologies

- **Monorepo Manager**: Turborepo
- **Package Manager**: pnpm
- **Language**: TypeScript throughout (Full Stack Type Safety)
- **Shared Logic**: `packages/deck-engine` (Pure TS Tarot State Machine)

### 2.2 Mobile Client (`apps/mobile`)

- **Framework**: React Native (Expo Managed Workflow)
- **UI Library**: React Native Reanimated (Animations), React Native Skia (High-fidelity VFX)
  > **[SPIKE IN PROGRESS - MVP-07]**: Evaluating performance trade-offs between Reanimated (View-based) and Skia (Canvas-based) for the 78-card deck simulation.
- **State Management**: Zustand (lightweight, decoupled)
- **Navigation**: Expo Router (file-based routing)

### 2.3 Backend API (`apps/api`)

- **Framework**: NestJS
- **Architecture**: Hexagonal (Ports & Adapters)
  - **Domain Layer**: Pure business logic, entities. **STRICTLY FORBIDDEN**: Importing `@prisma/client` or Framework code here. Mappers required.
  - **Application Layer**: Use Cases (StartReading, ShuffleDeck).
  - **Infrastructure Layer**: PostgreSQL (Prisma), Redis (BullMQ - for async LLM processing), LLM Adapters.
- **Runtime**: Node.js

### 2.4 Data & Storage

- **Database**: PostgreSQL (Structured relational data for users, readings, decks)
- **ORM**: Prisma (Type-safe database access)
- **Validation**: Zod (Runtime validation for API Inputs/Outputs)

## 3. Architecture Principles

- **Decoupling**: The Domain layer MUST NOT depend on the Framework or Database.
- **Safety**: Strict type checking. Zod schemas used for both API validation and frontend form handling.
- **No Circular Dependencies**: Enforced via `dpdm` or strict module boundaries.

## 4. Directory Structure

```text
.
├── apps
│   ├── api                 # NestJS Application
│   │   ├── src
│   │   │   ├── domain      # Pure Entities (No Prisma)
│   │   │   ├── application # Use Cases, Ports
│   │   │   └── infrastructure # Redis, Prisma, Controllers
│   └── mobile              # Expo Application
│       ├── src
│       │   ├── app         # Expo Router screens
│       │   ├── features    # Feature-based collection
│       │   └── shared      # UI Components
├── packages
│   ├── types               # Shared Zod Schemas & DTOs
│   ├── deck-engine         # Shared Tarot State Logic (Shuffle/Cut algos)
│   └── config              # Shared Configs
├── docs
│   ├── architecture        # Tech Specs
│   └── product             # PRD
```

## 5. Data Model (Draft)

### 5.1 Entities

- **User**: `id`, `email`, `subscriptionTier`
- **Session (Reading)**: `id`, `userId`, `query`, `spreadType`, `createdAt`
- **CardDraw**: `sessionId`, `cardId`, `position`, `orientation` (upright/reversed)

### 5.2 API Interface (JSON)

- `POST /readings`: Start a new reading intent.
- `POST /readings/:id/shuffle`: Update deck state (simulated).
- `POST /readings/:id/draw`: Finalize card selection.
- `GET /readings/:id`: Get full reading with interpretation.

## 6. Security & Compliance

- **Auth**: Hybrid (Anonymous -> Registered). **Policy**: Wipe anonymous data after 7 days if unclaimed.
- **Data Privacy**: `query` and `meaning` columns MUST be encrypted at rest (e.g., Sodium/AES).
- **LLM**: PII Filtering middleware before sending prompts.
