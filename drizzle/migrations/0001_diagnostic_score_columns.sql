ALTER TABLE public.qualification_submissions
  ADD COLUMN IF NOT EXISTS score integer,
  ADD COLUMN IF NOT EXISTS qualified boolean,
  ADD COLUMN IF NOT EXISTS answers jsonb NOT NULL DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS ghl_status text,
  ADD COLUMN IF NOT EXISTS utm jsonb NOT NULL DEFAULT '{}'::jsonb;
GRANT ALL ON public.qualification_submissions TO service_role;