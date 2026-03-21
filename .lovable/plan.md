

## Redesign Hero Right Column to Match Reference

### The problem

The current hero has only a floating stats card on the right. The reference image shows a **large photo** with a stats card **overlapping** it, plus a "Join the Future" pill at the bottom. The composition creates much more visual impact.

### Changes

**1. Generate a hero image using AI**

Use the AI image generation edge function to create a professional photo-style image of a marketing professional at work — styled to match the LGM dark/bronze aesthetic. Store it in the public folder.

**2. `src/components/Hero.tsx`** — Restructure right column

Replace the current right column with the reference layout:
- A large **rounded image** (takes up most of the right side, with rounded corners and slight top-right crop)
- The **stats card** (existing "Résultats prouvés" card) positioned to **overlap** the left edge of the image, floating on top
- The **"Rejoignez l'avenir du marketing" pill** positioned at the bottom-right of the image
- Use `absolute` positioning for the card and pill relative to the image container
- Keep the existing card content (headline, 9.6 rating, stars, avatar group)

**3. Layout adjustments**

- The image should have `rounded-2xl` with `object-cover`
- Stats card: `absolute top-8 -left-12` overlapping the image boundary
- Pill: `absolute bottom-6 right-6`
- On mobile: stack image below text, card overlaps still visible but adjusted for smaller screens
- Keep the dark background and bronze accents — do NOT switch to light theme

### Technical details

- Generate image via the existing `generate-illustration` edge function or add a static placeholder image
- The right column becomes a `relative` container with the image as the base and card/pill as `absolute` children
- No structural changes to left column — only the right column composition changes

