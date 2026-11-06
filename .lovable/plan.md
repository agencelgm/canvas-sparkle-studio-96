# Send leads to GoHighLevel only when they matter

## What changes
Today every form submission is sent to GoHighLevel. After this change, a lead is sent only in two cases:

1. **Qualified at submission** (full accompaniment or pilot programme): sent right away, as now.
2. **Not qualified, but says yes to an offer later**: sent the moment they click
   - "Oui, je veux une place" on the programme pilote page, or
   - the buy button on the formation Facebook page.
   The lead arrives with a tag saying which offer (`offre-pilote` or `offre-formation`).

Everyone else (not qualified, no yes) is still saved on the site, but never reaches GoHighLevel. Each lead is sent at most once per offer, so double clicks don't create duplicates.

The free WhatsApp group is not counted as an offer. Tell me if it should be.

## Technical details
- `ghl-webhook`: skip the GHL POST when `!result.qualified`; set `ghl_status = "held"`. Move the payload builder into a shared helper.
- New public edge function `ghl-offer-accept` `{ submissionId, offer: "pilote"|"formation" }` (zod): loads the submission, skips if `ghl_status` is already `sent` or `sent_<offer>`, posts to GHL with the extra tag `offre-<offer>` and `offre_acceptee` field, then updates `ghl_status`.
- Frontend: after submit, keep the returned submission id in sessionStorage; the pilot "Oui" and formation buy buttons call `ghl-offer-accept` (fire-and-forget, keepalive) next to the existing A/B tracking.
- Update the unit test to check: qualified → sent, not qualified → held, then accept → sent once.
- Test end-to-end: one qualified and one unqualified submission, then click "Oui" on the pilot page, and check `ghl_status` on both.
