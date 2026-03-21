

## Redesign Hero Section + Update Navigation

### Overview

Redesign the homepage hero to use a **split layout** inspired by the reference screenshots: text/CTA on the left, a visual card + image composition on the right. Also add "Accueil" as the first nav link.

### Changes

**1. `src/components/Header.tsx`** — Add "Accueil" link

- Add `{ href: "/", label: "Accueil" }` as the first item in `navLinks` array

**2. `src/components/Hero.tsx`** — Redesign to split layout

Replace the current centered layout with a two-column grid:

- **Left column** (text-aligned left):
  - SEO badge pill ("Marketing Digital")
  - H1: current headline, left-aligned
  - Subtitle paragraph, left-aligned
  - Two CTA buttons side by side (same as current)

- **Right column** (visual composition):
  - A floating card with: bold headline ("De la stratégie aux résultats concrets"), a rating/score display (e.g. "9.6" with stars), and a "Clients actifs" indicator with avatar circles
  - Behind/overlapping the card: a decorative image area using the existing bronze gradient orbs and hexagon pattern to create visual depth
  - A secondary pill/button: "Rejoignez l'avenir du marketing"

- **Responsive**: On mobile, stack vertically — text first, then the card composition below
- Keep existing background elements (hexagon pattern, bronze orbs, gradient)
- No external images needed — use gradients, shapes, and the existing design system to create the visual card

### Technical details

- The right-side card is pure CSS/HTML — rounded card with backdrop blur, bronze accents, avatar placeholders as colored circles
- Grid: `grid grid-cols-1 lg:grid-cols-2 gap-8 items-center`
- The card floats with slight rotation/shadow for depth, matching the reference aesthetic
- Stats card uses the existing `card` component styling

