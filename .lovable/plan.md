# Why Facebook shows 3 conversions today with no form filled

## What I found
- No forms were filled today. The last two were last night (scores 37 and 50, both not qualified).
- The server sent nothing to Facebook today: the server-side conversion function has no activity.
- So the 3 conversions come from the browser "Lead" pixel, which fires on a page, not on a form.
- The live site most likely still runs the old version: the booking page ("Félicitations", /lead-agence-marketing/rendez-vous) sent a "Lead" every time someone opened it. Anyone reopening that link (from a GHL email/SMS, a bookmark, you or your team checking the page, the admin "Voir version" buttons) counts as a conversion. Yesterday's fix only works after publishing.
- Another possible source: the same Facebook pixel installed on GoHighLevel pages (calendar or booking confirmation) sending its own "Lead".

## Answer: does "Envoyer" send an event by itself?
In the new version, no. The "Lead" only fires after the form is saved AND the person is qualified. Clicking "Envoyer" with a wrong field, a failed send or a non-qualified result sends nothing. This is only true once published; the live site may still run the old version.

## Plan
0. Fix the phone box first (see below) — it blocks real leads.
1. Publish the site so the fix goes live (only a qualified form sends "Lead", once, matched with the server event).
2. Remove the old public conversion function that any page could call to send a "Lead", so nothing else can send one.
3. Check the published site after publishing: open the booking page directly and confirm no "Lead" fires.
4. You check in GoHighLevel that no calendar/funnel page or workflow uses pixel 673688814007270 with a "Lead" event.
5. Optional: in Facebook Events Manager, look at today's 3 "Lead" events — the "URL" column shows which page sent them; tell me and I'll confirm the source.

## Phone number field (people can't enter their number)
Confirmed by you: only the "+225" picker shows; the number box is squeezed to nothing. Other problems in the same field:
- It cuts the number at 15 characters, so a pasted or auto-filled "+225 07 00 00 00 00" gets chopped and then refused.
- It silently deletes "+", dots, dashes and brackets while typing, which feels like the field is broken.
- On small phones the number box can get squeezed next to the country picker.

Fix:
- Accept any way of writing the number (spaces, dots, dashes, "+225" or "00225" in front); clean it up automatically.
- Remove the 15-character cut; check only that there are 8 to 12 digits after cleaning.
- If the person types the country code inside the number, remove it so it isn't doubled.
- Make the number box always take the remaining width; show a clear message if the number is too short.
- Test on a phone screen: typing, pasting, auto-fill, then a full submission.

## Technical details
- `DiagnosticModal.tsx`: drop `maxLength`, keep raw input, normalize on submit (`replace(/\D/g,"")`, strip leading `00`/country digits), zod check 8–12 digits; input `flex-1 min-w-0`. Server zod in `ghl-webhook` already allows 6–30 chars.
- Delete `supabase/functions/facebook-capi` (deployed + code); only `ghl-webhook` sends CAPI "Lead" when `fbEligible`.
- Verify with Playwright on agencelgm.com that `/lead-agence-marketing/rendez-vous` loaded directly makes no `facebook.com/tr?ev=Lead` request.
- Remove unused `trackQualifiedLead` from `src/lib/facebookPixel.ts`.
