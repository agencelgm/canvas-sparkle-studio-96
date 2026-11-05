# Why Facebook shows 3 conversions today with no form filled

## What I found
- No forms were filled today. The last two were last night (scores 37 and 50, both not qualified).
- The server sent nothing to Facebook today: the server-side conversion function has no activity.
- So the 3 conversions come from the browser "Lead" pixel, which fires on a page, not on a form.
- The live site most likely still runs the old version: the booking page ("Félicitations", /lead-agence-marketing/rendez-vous) sent a "Lead" every time someone opened it. Anyone reopening that link (from a GHL email/SMS, a bookmark, you or your team checking the page, the admin "Voir version" buttons) counts as a conversion. Yesterday's fix only works after publishing.
- Another possible source: the same Facebook pixel installed on GoHighLevel pages (calendar or booking confirmation) sending its own "Lead".

## Plan
1. Publish the site so the fix goes live (only a qualified form sends "Lead", once, matched with the server event).
2. Remove the old public conversion function that any page could call to send a "Lead", so nothing else can send one.
3. Check the published site after publishing: open the booking page directly and confirm no "Lead" fires.
4. You check in GoHighLevel that no calendar/funnel page or workflow uses pixel 673688814007270 with a "Lead" event.
5. Optional: in Facebook Events Manager, look at today's 3 "Lead" events — the "URL" column shows which page sent them; tell me and I'll confirm the source.

## Technical details
- Delete `supabase/functions/facebook-capi` (deployed + code); only `ghl-webhook` sends CAPI "Lead" when `fbEligible`.
- Verify with Playwright on agencelgm.com that `/lead-agence-marketing/rendez-vous` loaded directly makes no `facebook.com/tr?ev=Lead` request.
- Remove unused `trackQualifiedLead` from `src/lib/facebookPixel.ts`.
