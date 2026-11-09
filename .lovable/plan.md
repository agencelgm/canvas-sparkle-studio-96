# Fix: qualified leads not reaching Client Growth Hub

## The problem
Client Growth Hub rejects every lead with "not found". Its intake function looks for Deborah's team membership using a field (`status = 'active'`) that does not exist in its team table. The real field is `is_active = true`. Deborah's account is fine. This site already sends the right data.

## Step 1 — In Client Growth Hub (you do this, 1 minute)
I can't change another project from here. Open Client Growth Hub and paste this request into its chat:

> In the `lead-intake` function, replace `.eq('status', 'active')` with `.eq('is_active', true)` in the team-member lookup, then deploy the function.

## Step 2 — Back here (I do this)
- Run the catch-up again to send the 4 past qualified leads as urgent tasks for Deborah.
- Confirm all 4 come back as created, with due dates set by the opening hours (Mon–Fri 9h–17h, Abidjan).
- Send one test qualified lead to confirm new leads create a task right away.
- Each lead creates one task only. All the details the lead entered (name, phone, email, business, budget, answers, score, date submitted) go in the task's note.
- Check that the note is filled in on the tasks that get created.
- Nothing gets sent twice: each lead is matched by its own key.

## Technical details
- Endpoint: Client Growth Hub `lead-intake`, secret `LEAD_INTAKE_SECRET` already shared.
- Re-run `hub-backfill` with an admin session; expect `results.created = 4` instead of `error_404`.
- `hub_task_status` on each submission updates to `sent`.
