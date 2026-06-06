## Use uploaded image as About page hero background

The user is on `/a-propos` with the hero section selected. The About page uses `PageHero` from `PublicPrimitives`, which renders `publicImages.about` as a side `ImageFrame` — not a true background.

### Changes

1. **Upload the image as a Lovable asset** via the `lovable-assets` CLI from `/mnt/user-uploads/ChatGPT_Image_Jun_6_2026_11_26_26_PM.png` → `src/assets/about-hero.png.asset.json`.

2. **`src/data/publicContent.ts`** — update `publicImages.about` to import the new asset pointer (so any other references stay consistent).

3. **`src/pages/AboutPage.tsx`** — replace the `<PageHero>` call with a custom full-bleed hero section (mirroring the structure of `src/components/Hero.tsx`):
   - Full-width background `<img>` with the uploaded photo, subtle parallax via `useScroll`/`useTransform`.
   - Espresso gradient overlay (top→bottom) + soft bronze radial glow, same tokens as the homepage Hero.
   - Foreground content: kicker "L'agence", H1 "Les Gens du Marketing" (with `editorial-accent` on "Marketing"), and the existing lead paragraph.
   - Min-height `100dvh`, ivory text, container-wide layout.

### Out of scope
- Changing the homepage Hero image.
- Other pages that consume `publicImages.about` (will inherit the new image — confirm if that's not desired).

### Question
Do you want this image used **only** on the About page hero, or also wherever else `publicImages.about` is referenced (it may appear in other surfaces)?
