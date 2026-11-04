# Fix: Facebook receives "Lead" conversions for non-qualified people

## What I found
- The last 3 form submissions (2 today: scores 50 and 37, 1 on Nov 2: score 60) were all **non-qualified** and correctly sent to the pilot programme page.
- The Facebook "Lead" event is not sent when the form is submitted. It is sent **every time anyone opens the "Félicitations / réservez votre appel" page**, with no check on who they are. That page gets opened by:
  - a page refresh or the back button (one person = several conversions),
  - the "Voir version A/B" buttons in the admin and my own test visits,
  - anyone who receives or reuses the link, including GoHighLevel redirects.
- So the 7 conversions in Facebook do not match real qualified leads. Facebook may also count conversions on the day of the ad click, not the day of the form, so its numbers can include earlier days.

## The fix
1. **Send the conversion only from a real qualified submission.** Once the form is scored, the server sends the "Lead" to Facebook only if the person is qualified (65+ or pilot programme, per your rules). Under 100 000 FCFA and non-qualified people: nothing is sent.
2. **Only once per person.** Each submission gets a single ID. The browser and server events share it so Facebook counts it once, even after refreshes.
3. **The "Félicitations" page no longer sends anything.** Opening, refreshing or sharing it no longer creates a conversion.
4. **Record it.** Each submission keeps a "Facebook sent: yes/no" mark so you can compare with Facebook in the admin leads list.

## To check on your side
- In GoHighLevel, check that no workflow or Facebook integration also sends conversions to Facebook. If one exists, turn it off or it will keep counting extra leads.
- After the fix, past wrong conversions stay in Facebook. Only new ones will be correct.

## Technical details
- Remove `trackQualifiedLead` call from `LeadAgenceRendezVousPage.tsx`.
- `ghl-webhook`: after scoring, if `qualified || tier === "pilot"` (never `excluded`), generate `event_id` = `lead-<submission id>`, call Conversions API server-side (reuse facebook-capi logic, fbp/fbc + user agent/IP passed from client), store `fb_status` on `qualification_submissions` (migration adds column), return `event_id`.
- `DiagnosticModal`: on qualified response, fire `fbq('track','Lead',…,{eventID})` with the returned id, guarded by a sessionStorage key so it fires once.
- Verify with Playwright: qualified path → one `facebook.com/tr` Lead request; non-qualified and direct visit to rendez-vous → none.
