# Fix the WhatsApp number box for good

## What I found
- Your screenshot shows the old version of the form, where the "+225" list takes the whole row and the number box is missing.
- The live site (agencelgm.com) already has the fix. When I open it at your screen size, the number box shows next to "+225" and you can type in it.
- So your browser is most likely still showing an old saved copy of the page. A hard refresh (Ctrl + F5) or a private window should show the new version.
- I did find a real problem on phones, though: the number box is wider than the form and its right edge gets cut off. On small phones (320–360 px wide) it gets worse and the box can end up mostly hidden. That probably explains why people can't type their number.

## What I'll change
1. Put the "+225" list and the number box on a fixed two-part row: the list keeps a small fixed width and the number box takes the rest, so it can never be pushed out or cut off, whatever the screen size.
2. Make the number box allowed to shrink on narrow screens. Today its default width forces it wider than the form.
3. Leave the rest alone: the same fields, the same check that cleans up the number, the same data sent to GoHighLevel and Facebook.

## How I'll check it
- Open the last step of the form at 320, 360, 390 and 811 px wide and on desktop, both on the campaign page and in the pop-up.
- Check in both Chrome and the iPhone (Safari) engine that the number box is fully visible inside the form, that I can type a number in it, and that the form accepts it.
- Publish, then check the live site the same way.

## Technical details
- `DiagnosticModal.tsx` contact step: replace the `flex gap-2` wrapper with `grid grid-cols-[6.5rem_minmax(0,1fr)] gap-2`; add `min-w-0` to the wrapping `motion.div` (grid item `min-width:auto` currently lets the input's intrinsic ~225 px width widen the track); add `size={1}` and `w-full` on the tel input and drop the inline `width:auto` / flex styles.
- Playwright in Chromium + WebKit; compare input bounding box against the panel's inner edges.
