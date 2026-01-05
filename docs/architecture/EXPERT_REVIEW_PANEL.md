# Architecture Review Panel: TarotGPT

## Panel Members

1.  **Dr. Elena R. (Distributed Systems)** - _Focus: Scalability, Infrastructure_
2.  **Dr. Marcus T. (HCI & Mobile Computing)** - _Focus: Performance, UX, Frontend Architecture_
3.  **Dr. Sarah L. (Security & Privacy)** - _Focus: Data Protection, Auth, Compliance_
4.  **Dr. James B. (Software Engineering/DDD)** - _Focus: Maintainability, Clean Architecture_

---

## 1. Critique Session

### Dr. Elena R. (Distributed Systems)

> "The Monorepo choice (Turborepo) is solid for this team size. However, the `apps/api` (NestJS) monolithic approach is risky if LLM processing becomes long-running. We must ensure the API doesn't hang on LLM requests.
> **Critique:** The plan lacks a job queue definition. If 1000 users ask for a reading simultaneously, sticking them in a simpler HTTP request loop will timeout.
> **Recommendation:** Introduce a Queue system (e.g., BullMQ + Redis) for the 'Interpretation' phase. The client should poll or use WebSockets/SSE for the result, rather than a long-polling HTTP request."

### Dr. Marcus T. (HCI & Mobile Computing)

> "React Native + Reanimated is the correct baseline. However, the requirement for 'Real Deck Simulation' with 100% simulated state is heavy.
> **Critique:** Logic for shuffling 78 cards shouldn't just live in the UI state; it creates synchronization issues with the backend. Also, restricting `packages` to just `types` and `config` is a missed opportunity.
> **Recommendation:**
>
> 1. Move the 'Deck Engine' logic into a shared pure-TS package (`packages/deck-engine`) so it can be tested in isolation and potentially run on the server for validation.
> 2. Add `react-native-skia` to the stack options for the 'Mystical' visual effects (glows, particle systems) which are hard in vanilla Reanimated."

### Dr. Sarah L. (Security & Privacy)

> "Spiritual data is effectively health/mental-health data. It's extremely sensitive.
> **Critique:** The spec mentions 'saving results'. Storing raw text of user confessions and LLM advice in plaintext/Postgres is a liability.
> **Recommendation:**
>
> 1. **Column-Level Encryption:** The `query` and `interpretation` columns in the database must be encrypted at rest.
> 2. **LLM Anonymity:** Ensure the Prompt sent to the LLM strips any potential PII if the user accidentally types it.
> 3. **Anonymous Auth:** The spec mentions 'Hybrid Auth'. We need a clear TTL (Time To Live) for anonymous data. If they don't sign up in 7 days, wipe the data."

### Dr. James B. (DDD & Architecture)

> "Hexagonal in NestJS is often done lazily by importing Prisma Types into the Domain. This violates the dependency rule.
> **Critique:** The spec is too vague on 'Domain Layer'.
> **Recommendation:** Explicitly mandate that **Domain Entities** are plain classes/interfaces and **Mappers** must exist between Prisma Entities and Domain Entities. No `@prisma/client` imports allowed in `src/domain`."

---

## 2. Synthesis & Action Plan

Based on the panel's feedback, we will modify the Technical Specification:

1.  **Shared Logic**: Create `packages/deck-engine` to centralize the tarot card state machine (Game Logic).
2.  **Async Processing**: Add Redis/BullMQ to the Tech Spec for handling LLM latency (Server-Sent Events for streaming).
3.  **Visuals**: Add Skia to Mobile stack.
4.  **Security**: Add Requirement for Encryption-at-rest for reading content.
5.  **Clean Arch**: Explicitly forbid ORM types in Domain layer.

---

## 3. Post-Scaffolding Audit (Simulated)

The panel reconvened to inspect the actual generated code vs. the Implementation Plan.

### Dr. Elena R. (Distributed Systems) - **FAIL**

> "I requested a Queue system for LLM reliability. The `apps/api/package.json` **does not contain** `bullmq` or `ioredis`. You have scaffolded a skeletal NestJS app but ignored the scalability requirement I gave you."
> **Remediation**: Install `bullmq ioredis` immediately.

### Dr. Sarah L. (Security) - **FAIL**

> "I see no encryption libraries in `apps/api`. How do you plan to encrypt the `query` column? Also, `zod` in `packages/types` is listed under `devDependencies`. If you import these schemas into your runtime apps, it might fail or behave unexpectedly if hoisted incorrectly. It should be a runtime `dependency`."
> **Remediation**:
>
> 1. Install `sodium-native` or ensure `crypto` usage in API.
> 2. Move `zod` to `dependencies` in `packages/types`.

### Dr. Marcus T. (Mobile) - **PASS**

> "Good job including `@shopify/react-native-skia` and `react-native-reanimated`. The mobile skeleton looks ready for high-fidelity work."

### Dr. James B. (DDD) - **PASS**

> "The folder structure `domain`, `application`, `infrastructure` exists. I will be watching closely to ensure you don't pollute `domain` with Prisma dependencies."

---

## 4. Remediation Plan

1.  `apps/api`: Add `bullmq`, `ioredis`.
2.  `packages/types`: Move `zod` to `dependencies`.
