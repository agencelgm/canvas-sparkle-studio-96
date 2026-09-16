CREATE TABLE public.lead_agence_submissions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  form_id text,
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  nom text,
  email text,
  telephone text,
  source_page text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT INSERT ON public.lead_agence_submissions TO anon;
GRANT SELECT, INSERT ON public.lead_agence_submissions TO authenticated;
GRANT ALL ON public.lead_agence_submissions TO service_role;

ALTER TABLE public.lead_agence_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit lead agence" ON public.lead_agence_submissions FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins can view lead agence submissions" ON public.lead_agence_submissions FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));