# Qualified lead → priority task for Deborah in Client Growth Hub

## What you get
- Each time a prospect is qualified on agencelgm.com (full or pilot), a task appears right away in Client Growth Hub, assigned to Deborah.
- Title: "Appeler [Nom] — fixer un RDV avec Koffi ou Ousmane". Priority: urgent.
- Due date: same day. If the lead comes in on Saturday or Sunday, the due date is the next Monday. Abidjan time is used.
- The task lists everything the prospect entered: name, WhatsApp (clickable), email, sector, company, location, objective, revenue, budget, past marketing, every other answer, score /100, type (complet / pilote), the page they came from, ad source, and the date.
- Each lead creates only one task, even if it is sent twice.
- All past qualified leads get a task too, one time. Leads from past weekends follow the same rule, but older dates would show as late, so past leads get today as due date (or Monday if today is a weekend).

## How it works
Client Growth Hub is a separate app with its own database, and I can't change it from this chat. So the work has two parts:

1. **In Client Growth Hub (you paste a prompt I give you into that project):** add a secure "receive lead" entry point that creates the task for Deborah. It finds Deborah's account by her email (deborahlgm146@gmail.com) and uses its existing weekend rule.
2. **Here:** after each qualified lead is saved, the site sends it to that entry point. A one-time action sends all past qualified leads.

## Technical details
- Client Growth Hub: new edge function `lead-intake` (verify_jwt off, checks header `x-lead-secret` against secret `LEAD_INTAKE_SECRET`, zod body). Inserts into `public.tasks` with `agent_id` = Deborah's user id (lookup by email), organization_id of her org, `priority='urgent'`, `status='todo'`, `due_date` = next weekday in Africa/Abidjan (existing `next_weekday` trigger as backstop), `client_id` null, `source_key = 'lgm-lead:<submission_id>'` with unique check so retries never duplicate. Description = formatted lead details.
- This project: secrets `GROWTH_HUB_INTAKE_URL` and `LEAD_INTAKE_SECRET` (same value as there). `ghl-webhook` posts to it after insert when qualified; failure is logged in a new `hub_task_status` column and never blocks the form.
- Backfill: new admin-only function `hub-backfill` sends every `qualified = true` row (or pilot tier) not yet marked sent; run once after setup. Idempotent through `source_key`.
- Due-date helper lives in `_shared` with a unit test (Sat/Sun → Monday, weekday → same day).

## Open points
- "Qualified" includes pilot leads (100 000–270 000 FCFA). Say if pilot leads should not create tasks.
- Deborah needs an account in Client Growth Hub under deborahlgm146@gmail.com.
