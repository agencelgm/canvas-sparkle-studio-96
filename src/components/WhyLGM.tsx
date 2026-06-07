import { publicImages } from "@/data/publicContent";
import { ImageFrame, MagneticLink, Reveal } from "@/components/public/PublicPrimitives";

const reasons = [
  "Une lecture locale d'Abidjan et des marches francophones, pas une strategie importee sans contexte.",
  "Une equipe qui relie creation, media, conversion et reporting dans le meme systeme.",
  "Des decisions hebdomadaires basees sur les chiffres, pas sur l'opinion la plus bruyante.",
  "Une exigence visuelle qui donne envie de faire confiance avant meme le premier appel.",
];

const WhyLGM = () => (
  <section className="section-platinum section-pad overflow-hidden">
    <div className="container-wide grid gap-12 lg:grid-cols-[0.86fr_1fr] lg:items-center">
      <Reveal>
        <ImageFrame src={publicImages.about} alt="Equipe LGM en strategie marketing, communication, acquisition et suivi commercial a Abidjan" tone="light" className="min-h-[520px]" />
      </Reveal>
      <Reveal delay={0.12}>
        <p className="section-kicker text-[#d7b46a]">Pourquoi LGM</p>
        <h2 className="public-h2 max-w-4xl text-platinum-text">Pas une agence generique. Une methode qui se voit.</h2>
        <p className="public-lead text-platinum-muted">
          Votre site, vos campagnes et vos relances doivent raconter la meme histoire : une entreprise serieuse, claire et capable de convertir.
        </p>
        <div className="mt-9 border-t border-[rgba(16,24,39,0.16)]">
          {reasons.map((reason) => (
            <div key={reason} className="grid gap-3 border-b border-[rgba(16,24,39,0.13)] py-5 sm:grid-cols-[auto_1fr] sm:items-start">
              <span className="mt-2 h-2 w-2 rounded-full bg-[#d7b46a]" aria-hidden="true" />
              <p className="text-[1.02rem] font-semibold leading-relaxed text-platinum-text">{reason}</p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <MagneticLink to="/a-propos" variant="outline">Lire notre histoire</MagneticLink>
        </div>
      </Reveal>
    </div>
  </section>
);

export default WhyLGM;
