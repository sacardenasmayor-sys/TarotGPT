# Requirements: Animation Performance Spike (MVP-07)

**Ticket:** [MVP-07]
**Status:** DRAFT

## 1. Objective
Determine the most performant and maintainable approach for rendering and animating 78 interactive card sprites on the mobile client. Identify whether **React Native Reanimated** or **React Native Skia** is the superior choice for the "Virtual Deck" implementation.

## 2. Background
TarotGPT relies on a "physical" simulation of a 78-card deck. The user must be able to shuffle, spread, and flip cards smoothly. Dropped frames or lag during these interactions break immersion and are unacceptable (North Star: "Authentic Session").

## 3. Success Criteria
- **Performance:** Maintain steady **60 FPS** (frames per second) while animating 78 independent elements simultaneously on mid-range devices.
- **Interactivity:** Elements must support independent gestures (drag, tap).
- **Memory:** App must not crash due to memory pressure from 78 high-res textures.

## 4. Deliverables
1. **Prototype App:** A simple screen toggling between Implementation A (Reanimated) and Implementation B (Skia).
2. **Benchmark Report:** A markdown document (`docs/architecture/decisions/ADR-001_animation_engine.md`) summarizing FPS data, memory usage, and developer experience (DX).
3. **Recommendation:** A final decision on which library to use for the production deck.

## 5. Constraints
- **Device Support:** iOS and Android.
- **Timebox:** 1 Day.
