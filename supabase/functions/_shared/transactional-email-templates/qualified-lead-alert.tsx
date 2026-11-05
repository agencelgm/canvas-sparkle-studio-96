/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'
import { Body, Button, Container, Head, Heading, Hr, Html, Preview, Section, Text } from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  name?: string
  phone?: string
  email?: string
  sector?: string
  objective?: string
  budget?: string
  revenue?: string
  score?: number
  type?: string
}

const Row = ({ label, value }: { label: string; value?: string | number }) => (
  <Text style={row}><span style={rowLabel}>{label} : </span>{value ?? '—'}</Text>
)

const Email = ({ name, phone, email, sector, objective, budget, revenue, score, type }: Props) => {
  const digits = (phone ?? '').replace(/[^\d]/g, '')
  return (
    <Html lang="fr" dir="ltr">
      <Head />
      <Preview>{`Nouveau prospect qualifié : ${name ?? ''} — à appeler`}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={brand}>LGM · Les Gens du Marketing</Text>
          <Heading style={h1}>Nouveau prospect qualifié</Heading>
          <Text style={text}>À appeler pour fixer un rendez-vous (s'il ne l'a pas déjà réservé).</Text>
          <Section style={card}>
            <Row label="Nom" value={name} />
            <Row label="WhatsApp" value={phone} />
            <Row label="Email" value={email} />
            <Row label="Type" value={type} />
            <Row label="Secteur" value={sector} />
            <Row label="Objectif" value={objective} />
            <Row label="Budget" value={budget} />
            <Row label="Chiffre d'affaires" value={revenue} />
            <Row label="Score" value={score !== undefined ? `${score}/100` : undefined} />
          </Section>
          {digits ? <Button style={button} href={`https://wa.me/${digits}`}>Écrire sur WhatsApp</Button> : null}
          <Hr style={hr} />
          <Text style={small}>Alerte automatique envoyée depuis le formulaire de agencelgm.com.</Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: Email,
  subject: (d: Record<string, any>) => `Prospect qualifié : ${d.name ?? 'nouveau contact'}${d.type ? ` (${d.type})` : ''}`,
  displayName: 'Alerte prospect qualifié',
  previewData: { name: 'Awa Koné', phone: '+225 0700000000', email: 'awa@exemple.ci', sector: 'Immobilier / BTP', objective: 'Recevoir plus de prospects qualifiés', budget: 'Oui (270 000 FCFA/mois)', revenue: '1 à 5 millions FCFA', score: 72, type: 'Accompagnement complet' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Manrope, Arial, sans-serif' }
const container = { padding: '28px 24px', maxWidth: '560px' }
const brand = { fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#B8913F', margin: '0 0 8px' }
const h1 = { fontSize: '24px', fontWeight: 800, color: '#1B2537', margin: '0 0 8px' }
const text = { fontSize: '15px', color: '#4A5568', margin: '0 0 18px' }
const card = { backgroundColor: '#F7F3EA', borderRadius: '10px', padding: '14px 18px', margin: '0 0 20px' }
const row = { fontSize: '14px', color: '#1B2537', margin: '4px 0' }
const rowLabel = { color: '#6B7280' }
const button = { backgroundColor: '#B8913F', color: '#ffffff', borderRadius: '8px', padding: '12px 20px', fontWeight: 700, fontSize: '15px', textDecoration: 'none' }
const hr = { borderColor: '#E5E1D8', margin: '24px 0 12px' }
const small = { fontSize: '12px', color: '#9CA3AF' }
