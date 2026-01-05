# Test Strategy: The Ruthless QA Protocol

> "If it isn't tested, it's broken. If it's tested, it's still probably broken, but we have a stack trace."

## 1. The "No-Flake" Decree
**Determinism is Law.**
Any test that fails intermittently (flaky test) is treated as a **Critical Severity Bug**.
- **Banned:** `setTimeout`, `setInterval` in tests. Use fake timers.
- **Banned:** Network calls in unit tests. Mock everything.
- **Banned:** Randomness without a seeded PRNG.

## 2. The Verification Pyramid
We invert the pyramid? No. We fortify every layer.

### Level 1: Unit & Property-Based Testing (The Bedrock)
- **Scope:** Pure logic, algorithms, domain models.
- **Tool:** Vitest + fast-check.
- **Mandate:**
  - 100% Branch Coverage on Domain Logic.
  - **Property-Based Testing (PBT):** For every algorithm (e.g., Shuffle), we do not test "1+1=2". We test invariants: "The deck size remains 78", "No cards are duplicated", "Entropy measures fall within expected Chi-Squared distribution".

### Level 2: Integration Testing (The Glue)
- **Scope:** API Endpoints, Database Interaction, Cache Layers.
- **Tool:** Supertest / Vitest.
- **Mandate:**
  - Test boundary conditions (Empty DB, Duplicate Keys, Max Payload).
  - Mock external services (OpenAI, Stripe).

### Level 3: E2E Testing (The User)
- **Scope:** Critical User Journeys (CUJ).
- **Tool:** Maestro (Mobile) / Playwright (Web - internal admin).
- **Mandate:**
  - Smoke Test: "Can a user complete a reading?"
  - Login Flow.

## 3. Security Gates
- **Audit:** `pnpm audit` must have 0 High/Critical vulnerabilities.
- **Secrets:** Pre-commit hooks scan for entropy that looks like API keys.

## 4. Performance Thresholds
- **Unit Tests:** Must complete in < 5ms per test.
- **Total Suite:** < 30s.
