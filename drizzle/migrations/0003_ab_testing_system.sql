CREATE TABLE public.ab_experiments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_key text NOT NULL,
  name text NOT NULL,
  status text NOT NULL DEFAULT 'proposed',
  started_at timestamptz,
  ended_at timestamptz,
  winner text,
  decision_reason text,
  final_stats jsonb NOT NULL DEFAULT '{}'::jsonb,
  ai_rationale text,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX ab_one_running_per_page ON public.ab_experiments(page_key) WHERE status = 'running';

CREATE TABLE public.ab_variants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  experiment_id uuid NOT NULL REFERENCES public.ab_experiments(id) ON DELETE CASCADE,
  variant text NOT NULL,
  label text NOT NULL,
  change_description text NOT NULL DEFAULT '',
  content jsonb NOT NULL DEFAULT '{}'::jsonb,
  UNIQUE (experiment_id, variant)
);

CREATE TABLE public.ab_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  experiment_id uuid NOT NULL REFERENCES public.ab_experiments(id) ON DELETE CASCADE,
  variant text NOT NULL,
  visitor_id text NOT NULL,
  event_type text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (experiment_id, visitor_id, event_type)
);
CREATE INDEX ab_events_exp_idx ON public.ab_events(experiment_id, variant, event_type);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.ab_experiments TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.ab_variants TO authenticated;
GRANT SELECT ON public.ab_events TO authenticated;
GRANT ALL ON public.ab_experiments, public.ab_variants, public.ab_events TO service_role;

ALTER TABLE public.ab_experiments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ab_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ab_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage experiments" ON public.ab_experiments FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage variants" ON public.ab_variants FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins read events" ON public.ab_events FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.ab_stats(_experiment_id uuid)
RETURNS TABLE(variant text, event_type text, n bigint)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT variant, event_type, count(*) FROM public.ab_events WHERE experiment_id = _experiment_id GROUP BY 1,2
$$;
REVOKE EXECUTE ON FUNCTION public.ab_stats(uuid) FROM public, anon;
GRANT EXECUTE ON FUNCTION public.ab_stats(uuid) TO authenticated, service_role;