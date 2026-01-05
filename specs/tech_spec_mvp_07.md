# Tech Spec: Animation Performance Spike (MVP-07)

## 1. Approach

We will create a temporary "Playground" screen in `apps/mobile` that does not interfere with the main navigation structure yet. This screen will mount 78 "Card" components.

### 1.1 Test Case A: React Native Reanimated
- **Architecture:** 78 `<View>` components (Absolute Position).
- **State:** Each card has its own `useSharedValue` for x, y, rotation.
- **Animation:** Trigger a "Shuffle" animation loop where all cards move randomly.
- **Hypothesis:** Might bottleneck the JS bridge or UI thread overhead due to view flattening limitations on Android.

### 1.2 Test Case B: React Native Skia
- **Architecture:** Single `<Canvas>` element.
- **Rendering:** Loop through 78 state objects and draw images/rects with `canvas.drawImage`.
- **Animation:** `useFrameCallback` or `useDerivedValue` to update positions.
- **Hypothesis:** Extremely fast rendering, but gesture handling for individual "virtual" objects requires manual hit-testing (math checks), which complicates DX.

## 2. Implementation Details

### 2.1 File Structure
```text
apps/mobile/src
  ├── features/spike
  │   ├── SpikeScreen.tsx       # Toggles between implementations
  │   ├── ReanimatedDeck.tsx    # Test Case A
  │   └── SkiaDeck.tsx          # Test Case B
```

### 2.2 Measurement
- Use React Native's built-in Performance Monitor (Shake -> Perf Monitor).
- Visually observe "jank" during the shuffle animation.

## 3. Risk Assessment
- **Skia Interactivity:** Implementing complex drag-and-drop mechanics (physics, collisions) inside a Skia Canvas is effectively building a game engine. If Reanimated handles 78 views fine, it is preferred for its "DOM-like" event system.
