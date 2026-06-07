CREATE TABLE public.qualification_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  has_business boolean NOT NULL,
  company_name text,
  industry text NOT NULL,
  location text NOT NULL,
  website_or_social text,
  service text NOT NULL,
  has_invested_marketing boolean,
  past_marketing_budget_raw text,
  past_marketing_budget_normalized numeric,
  past_marketing_result text,
  objective_90_days text NOT NULL,
  budget_raw text NOT NULL,
  budget_normalized numeric NOT NULL,
  can_invest_minimum boolean NOT NULL DEFAULT true,
  can_invest_10000_daily boolean,
  eligibility_status text NOT NULL DEFAULT 'eligible',
  source_page text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.qualification_submissions TO anon;
GRANT SELECT, INSERT ON public.qualification_submissions TO authenticated;
GRANT ALL ON public.qualification_submissions TO service_role;

ALTER TABLE public.qualification_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit qualification form"
  ON public.qualification_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view qualification submissions"
  ON public.qualification_submissions
  FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));