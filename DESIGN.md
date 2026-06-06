# DESIGN

## Design Read

Reading this as: public brand site for West African business owners and marketing leaders, with an Awwwards-bold contemporary African luxury language, leaning toward image-led editorial React sections, Tailwind v3 tokens, and Framer Motion.

## Theme

The site is a cinematic public brand surface. It uses deep espresso, warm dark brown, ivory, Akan gold and restrained terracotta. The palette is committed but not decorative: dark surfaces carry authority, ivory surfaces carry clarity, gold is a precise accent.

## Typography

- Display: Bricolage Grotesque for large confident headlines and kinetic navigation.
- Body/UI: Manrope for readable French copy, forms and buttons.
- Editorial accent: Bodoni Moda only for rare italic or oversized accent moments.
- Hero headings stay at 2 to 3 lines on desktop and never overflow mobile containers.

## Imagery

Images are local generated raster assets under `public/images/`. They should feel like editorial photography: Abidjan light, strategy rooms, fabric texture, business founders, city architecture, hands, notebooks and growth systems. No stock-photo smile, no generic SaaS dashboard, no purple AI glow.

## Layout

Sections are cinematic chapters with varied composition: bottom-left hero over image, split image/text, horizontal service rows, sticky-feeling method blocks, editorial quote bands, and dense but controlled blog surfaces. Avoid repeated equal card grids unless the content truly needs cards.

## Motion

Use Framer Motion with the global cubic bezier `[0.32, 0.72, 0, 1]`. Motion intensity is high enough to feel premium, but content is readable without animation. Prefer transform and opacity. Respect `prefers-reduced-motion`.

## Components

- Header: fixed public navigation, active state, no scroll event listener.
- Buttons: high-contrast filled gold, ivory and outline variants, with physical hover/active feedback.
- Image frames: local raster image, subtle parallax or scale, dark/ivory overlays only for readability.
- Forms: inline validation, visible focus, success/error states, Supabase field names unchanged.
- Footer: compact public navigation, direct contact, legal links, no link farm.

## Bans

No `source.unsplash`, no gradient text, no `h-screen`, no repeated eyebrow labels, no 3D/Three.js public components, no hand-wavy copy, no English 404, no old Lovable OG image.
