# Stop unqualified leads from reaching Facebook

## What the data shows
Last 17 form submissions in the database:
- 3 qualified (scores 81, 68, and 39 — the 39 answered "Oui" to 270 000 FCFA, which is your "always qualified" rule). Only these 3 were sent to Facebook by the site.
- 14 unqualified: the site marked all of them "not sent to Facebook".
- But 12 of those 14 unqualified leads WERE sent to GoHighLevel (before yesterday's change), and 2 more reached GoHighLevel today after clicking "Oui" on the pilot offer.

Today: 5 Facebook leads for 5 forms, while our server sent only 1 (the qualified 11:35 lead). A 1-for-1 match with every form suggests Facebook's own "automatic events": the pixel can detect a form submission on its own and count it as a Lead, whatever the score. This is now the #1 suspect, and step 1 below turns it off.

Second possible leak: GoHighLevel: if a GHL workflow or its Facebook integration sends a "Lead" / conversion for every new contact, every unqualified lead that lands in GHL becomes a Facebook conversion.

## Fix

1. **Block it on our side, for good**
   - Every lead sent to GoHighLevel carries a clear field and tag: `fb_qualifie = oui/non` and tag `lead-qualifie` or `lead-non-qualifie`, so a GHL workflow can never mistake them.
   - Unqualified people who click "Oui" on an offer get tag `non-qualifie-offre` (never `lead-qualifie`).
   - Turn off Facebook's "automatic events" on the site so the pixel only ever sends PageView plus our single Lead.

2. **Proof you can check yourself**
   - New "Facebook" column in admin leads: Envoyé / Non envoyé, with date, for every prospect. You can compare it line by line with Events Manager.

3. **What you need to do in GoHighLevel (I can't access it)**
   - Open Automation > Workflows and Settings > Integrations > Facebook: remove any "Facebook Conversion API" / "Lead" action triggered on contact created or form submitted, or add the filter `tag = lead-qualifie`.
   - In Facebook Events Manager, open the Lead event > "Source": if events show "Server" from a source other than our site, that is GHL.

4. **Decided:** "Oui 270 000" prospects (any score) and programme pilote prospects keep counting as Facebook leads. No change there.

## Technical details
- `ghl-webhook` / `ghl-offer-accept`: add `fb_qualifie` custom field + tags in payload.
- `index.html`: `fbq('set','autoConfig',false,'673688814007270')` before init.
- Admin leads table: show `fb_status` + `created_at`.
