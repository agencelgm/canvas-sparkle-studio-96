import { publicImages } from "@/data/publicContent";
import { ImageFrame, Reveal } from "@/components/public/PublicPrimitives";

const Manifeste = () => (
  <section className="section-platinum section-pad overflow-hidden">
    <div className="container-wide grid gap-12 lg:grid-cols-[0.72fr_1fr] lg:items-center">
      <Reveal>
        <ImageFrame src={publicImages.about} alt="Equipe marketing en session de strategie autour d'un brief de croissance" tone="light" className="min-h-[460px]" />
      </Reveal>
      <Reveal delay={0.12}>
        <p className="section-kicker text-[#d7b46a]">Manifeste</p>
        <blockquote className="max-w-4xl">
          <p className="font-display text-[clamp(2.2rem,5vw,5.6rem)] italic leading-[1.04] text-platinum-text">
            Nous ne vendons pas du bruit digital. Nous construisons le systeme qui amene les bonnes personnes jusqu'a votre offre.
          </p>
          <footer className="mt-8 flex flex-col gap-4 text-sm font-semibold text-platinum-muted sm:flex-row sm:items-center">
            <span className="h-px w-14 bg-[#d7b46a]" aria-hidden="true" />
            La methode ACF, par LGM
          </footer>
        </blockquote>
      </Reveal>
    </div>
  </section>
);

export default Manifeste;
