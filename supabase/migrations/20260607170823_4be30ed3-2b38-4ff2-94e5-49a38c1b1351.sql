ALTER TABLE public.qualification_submissions
  ADD COLUMN IF NOT EXISTS monthly_revenue_band text,
  ADD COLUMN IF NOT EXISTS team_size_band text,
  ADD COLUMN IF NOT EXISTS anchor_reaction text,
  ADD COLUMN IF NOT EXISTS daily_ad_budget_ready_5k boolean,
  ADD COLUMN IF NOT EXISTS coherence_score integer,
  ADD COLUMN IF NOT EXISTS budget_band text,
  ADD COLUMN IF NOT EXISTS coherence_flags text[];