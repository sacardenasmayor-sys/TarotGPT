# Product Requirements Document: TarotGPT

## 1. Executive Summary

**TarotGPT** is a premium, AI-powered spiritual guidance application designed for iOS and Android. Unlike existing solutions that lack "soul" or authenticity, TarotGPT combines the deep contextual understanding of Large Language Models (LLMs) with immersive, interactive card mechanics (shuffling, cutting, revealing) to simulate a genuine tarot session. The goal is to democratize access to spiritual consultation through a subscription-based mobile experience that feels personal, secure, and mystically accurate.

## 2. North Star Metric

**"Authentic Session Completion Rate"**
_Defined as:_ The percentage of started sessions where the user completes the full reading flow (Context -> Shuffle -> Spread -> Interpretation) and rates the insight as "Resonant" or "Helpful".
_Secondary Metric:_ Monthly Recurring Revenue (MRR) from subscriptions.

## 3. User Personas

### 3.1 The Spiritual Seeker (Primary)

- **Profile:** Late 20s to 40s, interested in astrology, mindfulness, or spirituality.
- **Pain Point:** Cannot always afford or find a human tarot reader when anxiety or questions arise. Feels current apps are "RNG games" (Random Number Generators) without connection.
- **Goal:** A "human-like", empathetic reading that considers their specific context history.

### 3.2 The Curious Skeptic

- **Profile:** Tech-savvy, curious about AI applications.
- **Pain Point:** Intimidated by esoteric tarot complexity.
- **Goal:** An intuitive UI that explains cards simply and relates them directly to their question without jargon.

## 4. Functional Requirements

### 4.1 Core Session Experience (The "Brain")

- **LLM Chat Interface:** A ChatGPT-like UI where users converse to set intention/context.
  - **Initial Prompt:** System starts with "What do you want to explore today?"
  - **Input Methods:** Free text OR suggestion bubbles (e.g., "Love", "Career", "Health").
  - **Intent Refinement:** The Agent must drill down into broad topics (e.g., User selects "Career" -> Agent asks "Are you looking for a new job, facing conflict, or seeking promotion?" _before_ suggesting a spread).
  - **Response Management:** The model must distinguish between single vs. multi-part user inputs and guide the UI accordingly.
- **Context Awareness:** The AI must suggest specific spreads (e.g., Celtic Cross, 3-Card Past/Present/Future) based on the user's query.
- **Synthesized Interpretation:**
  - **Micro:** Individual card meanings revealed upon flipping.
  - **Macro:** A holistic summary connecting all cards to the user's specific question (not generic boilerplate).

### 4.2 Interactive Mechanics (The "Feel")

- **Flow Guidance:** Dynamic prompt bubbles to confirm user state (e.g., "Are you done shuffling?", "Ready to cut?").
- **Real Deck Simulation:** The system must maintain a stateful "Virtual Deck" (array of 78 cards) where every card has a specific position. The order changes _only_ via user interaction (shuffles, cuts, re-ordering). It must NOT be a random generation per draw; it must simulate a physical deck's state 100%.
- **Deck Physics:** Users must be able to:
  - Shuffle the deck (animation/haptics).
  - "Cut" the deck or select cards manually.
  - Flip cards individually or "Reveal All".
- **Visual Fidelity:** High-quality card art and animations to promote immersion.

### 4.3 History & Persistence

- **Session Storage:** Users can browse past readings.
- **Long-term Memory:** The LLM should recall context from previous sessions (e.g., "How is that situation with your brother evolving?").

### 4.4 Monetization & Account

- **Hybrid Auth Flow:** Users can start the _first_ reading anonymously. Account creation (OAuth) is prompted to _save_ the result or access History.
- **Subscription Model:** Free tier (limited spreads) vs. Premium (unlimited/advanced spreads, deeper history).

## 5. Non-Functional Requirements

- **Platform:** Cross-platform Mobile (iOS & Android). _Tech Logic: React Native (Expo)._
- **Performance:**
  - **Streaming Responses:** LLM text interpretation must stream token-by-token to reduce perceived latency (Time to First Token < 1.5s).
  - **Animation:** Deck interactions must run at 60fps on standard devices.
- **Privacy:** Complete data privacy. User confessions/questions are sensitive data.
- **Aesthetics:** "Mystical yet Modern".
  - **Thematic Progression:** UI colors should shift subtly based on the "phase" (Light for Chat -> Dark/Mystical for Shuffle -> Rich Gold for Reveal).

## 6. Constraints & Assumptions

- **Timeline:** Launch MVP within 1 month.
- **Tech:** LLM API dependency (e.g., OpenAI/Anthropic/Gemini) implies variable recurring costs.
- **Compliance:** App Store guidelines regarding "Fortune Telling" apps (must often be categorized as Entertainment).
