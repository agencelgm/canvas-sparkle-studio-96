# Keep the step panel visible alongside the six steps

## Problem
On /systeme-acquisition (desktop), the right-hand panel ("Etape 02 sur 06", image, progress bar) is meant to stay fixed on screen while the six steps scroll by on the left. Instead it stays at the top of the section and disappears once you scroll past it, so it no longer matches the step being read.

## Cause
The panel is set to stay pinned (sticky), but the page wrappers use `overflow-x: hidden` (`.public-shell` and `.public-main` in `src/index.css`). That property turns the wrapper into a scroll container, which breaks sticky pinning for everything inside.

## Fix
1. In `src/index.css`, replace `overflow-x: hidden` with `overflow-x: clip` on `.public-shell` and `.public-main` (and on `html, body, #root`). `clip` still prevents horizontal scrollbars but does not break sticky.
2. In `SystemJourney.tsx`, add `self-start`-safe behavior: keep the right column stretched to the full height of the list (default grid stretch) and keep `sticky top-28`, so the panel follows the reader from step 01 to step 06 and releases at the end of the section.
3. Check the other sticky panels that suffer from the same issue (services explorer on the same page, contact/cabinets form columns) — they get fixed by the same change.

## Verification
- Playwright at 1512px wide: scroll through the six steps, confirm the panel stays in view and its label changes 01 → 06.
- Confirm no horizontal scrollbar appears on desktop and mobile (390px).
- Mobile layout unchanged (steps stay fully readable, no pinned panel).
