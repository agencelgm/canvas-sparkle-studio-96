export type LogoPortfolioItem = {
  id: number;
  src: string;
  alt: string;
  client: string;
  categorie?: string;
};

// Ajouter vos vrais logos dans public/logos/
// Remplacer les src par ex: "/logos/nom-client.png"
export const logoPortfolio: LogoPortfolioItem[] = [
  {
    id: 1,
    src: "/logos/logo-1.png",
    alt: "Logo client 1",
    client: "Client 1",
    categorie: "Identite de marque",
  },
  {
    id: 2,
    src: "/logos/logo-2.png",
    alt: "Logo client 2",
    client: "Client 2",
    categorie: "Logo minimaliste",
  },
  {
    id: 3,
    src: "/logos/logo-3.png",
    alt: "Logo client 3",
    client: "Client 3",
    categorie: "Pack professionnel",
  },
  {
    id: 4,
    src: "/logos/logo-4.png",
    alt: "Logo client 4",
    client: "Client 4",
    categorie: "Identite de marque",
  },
  {
    id: 5,
    src: "/logos/logo-5.png",
    alt: "Logo client 5",
    client: "Client 5",
    categorie: "Logo minimaliste",
  },
  {
    id: 6,
    src: "/logos/logo-6.png",
    alt: "Logo client 6",
    client: "Client 6",
    categorie: "Pack professionnel",
  },
];
