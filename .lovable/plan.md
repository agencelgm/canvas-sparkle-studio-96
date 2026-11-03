# Formulaire visible directement sur la page campagne

Scope: the campaign landing page (/lead-agence-marketing) only. The rest of the site keeps the pop-up unless you say otherwise.

## What changes
1. **Form shown in the page, top right**: the "Score de préparation" card is replaced by the diagnostic itself (same questions, score gauge, animations, scoring 65/100, pilot and exclusion rules, GoHighLevel sending, Facebook rules, redirections). No pop-up, no "Commencer" click: the first question is visible immediately.
2. **Desktop**: form sits in the right column next to the hero text and stays visible while scrolling (already sticky).
3. **Phone**: form appears right under the headline, before the rest of the page.
4. **Every button on the page** ("Remplir le formulaire — 2 minutes", top, middle, sticky mobile bar) scrolls smoothly to the form instead of opening the pop-up. The sticky mobile bar hides when the form is on screen.
5. Changing question inside the form keeps the form in view (scrolls to the form top, not page top).

## Technical details
- Extract the step/score/submit logic of `DiagnosticModal.tsx` into a shared `DiagnosticFlow` component; `DiagnosticModal` wraps it in the portal overlay, new `DiagnosticInline` renders it in a card (compact layout, no sidebar breakdown, gauge in header).
- `LeadAgencePage.tsx`: render `DiagnosticInline` in `#formulaire`, restore `scrollToForm` = `scrollIntoView` on `#formulaire`, restore IntersectionObserver for sticky bar.
- Global `#diagnostic` link interception stays for other pages.
- Verify with Playwright on desktop and phone: form visible on load, buttons scroll to it, a full test submission reaches the right page (one test contact in GoHighLevel to delete).
