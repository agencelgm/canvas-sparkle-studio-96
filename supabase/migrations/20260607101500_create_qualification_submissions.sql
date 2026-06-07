CREATE TABLE public.qualification_submissions (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    has_business BOOLEAN NOT NULL,
    company_name TEXT,
    industry TEXT NOT NULL,
    location TEXT NOT NULL,
    website_or_social TEXT,
    service TEXT NOT NULL,
    has_invested_marketing BOOLEAN,
    past_marketing_budget_raw TEXT,
    past_marketing_budget_normalized INTEGER,
    past_marketing_result TEXT,
    objective_90_days TEXT NOT NULL,
    budget_raw TEXT NOT NULL,
    budget_normalized INTEGER NOT NULL,
    can_invest_minimum BOOLEAN NOT NULL,
    can_invest_10000_daily BOOLEAN,
    eligibility_status TEXT NOT NULL DEFAULT 'eligible',
    source_page TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.qualification_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit qualification form"
ON public.qualification_submissions
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can view qualification submissions"
ON public.qualification_submissions
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update qualification submissions"
ON public.qualification_submissions
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
