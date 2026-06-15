-- Table pour stocker les demandes de logo et de site internet
CREATE TABLE IF NOT EXISTS demandes_services (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  type        TEXT        NOT NULL CHECK (type IN ('logo', 'site')),
  pack_selectionne TEXT,
  reponses    JSONB       NOT NULL DEFAULT '{}',
  nom         TEXT        NOT NULL,
  whatsapp    TEXT        NOT NULL,
  email       TEXT        NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Activer Row Level Security
ALTER TABLE demandes_services ENABLE ROW LEVEL SECURITY;

-- Tout le monde peut insérer (formulaire public)
CREATE POLICY "insert_public_demandes"
  ON demandes_services
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Seuls les admins authentifiés peuvent lire
CREATE POLICY "select_authenticated_demandes"
  ON demandes_services
  FOR SELECT
  TO authenticated
  USING (true);
