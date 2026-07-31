CREATE TABLE public.demandes_services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL,
  pack_selectionne TEXT,
  reponses JSONB DEFAULT '{}'::jsonb,
  nom TEXT,
  whatsapp TEXT,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.demandes_services TO authenticated;
GRANT ALL ON public.demandes_services TO service_role;
GRANT SELECT, INSERT ON public.demandes_services TO anon;

ALTER TABLE public.demandes_services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public submissions" ON public.demandes_services
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Admins can view submissions" ON public.demandes_services
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_demandes_services_updated_at
  BEFORE UPDATE ON public.demandes_services
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();