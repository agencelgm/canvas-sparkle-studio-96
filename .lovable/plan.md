# Show Deborah which offer each lead gets

## What changes
Deborah sees the lead's offer in the task title and at the top of the note:

- **Usual offer (270 000 FCFA/month):** title "Appeler [Nom] — Offre habituelle 270 000 F — RDV Koffi ou Ousmane"
- **Pilot programme (175 000 FCFA/month):** title "Appeler [Nom] — PROGRAMME PILOTE 175 000 F — RDV Koffi ou Ousmane"
  The note starts with: "Pas qualifié pour l'offre à 270 000 F. Qualifié pour le programme pilote à 175 000 F/mois. Présenter cette offre promotionnelle pendant l'appel et le préciser à Koffi/Ousmane lors du briefing."

**Also new:** a lead who was not qualified but clicks "Oui, je veux une place" on the pilot page also gets an urgent task. It is marked "A choisi le programme pilote (175 000 F) après le diagnostic". Today these leads only go to GoHighLevel.

## Fixing the 4 existing tasks
Out of the 4 tasks already created, 2 should say pilot programme:
- Abakar HASSABALLAH — programme pilote
- Kouadio Kossonou — programme pilote
- Mybook Kader, Abdoul Ouedraogo — usual offer (no change to the offer, only the new title)

Client Growth Hub ignores a lead it has already received, so it can't fix these tasks on its own. You'll need to paste this request into Client Growth Hub:

> In `lead-intake`, when a task with the same `source_key` already exists, update its `title` and `description` with the new values (keep status, assignee and dates) and return `{ updated: true, task_id }`. Then deploy.

Once that's done, I'll send the 4 leads again so their tasks get updated (no duplicates).

## Technical details
- `_shared/growthHub.ts`: add `tier: "pilot_offer"` (accepted the offer on the pilot page); title and note header depend on the tier; price constants in one place.
- `ghl-offer-accept`: when `offer === "pilote"`, call `sendLeadToHub` with tier `pilot_offer` and set `hub_task_status`.
- `hub-backfill`: add `force` option to resend leads already marked `sent`; read `updated` in the reply.
- Add a test for the title/note per tier (usual / pilot / pilot_offer).
