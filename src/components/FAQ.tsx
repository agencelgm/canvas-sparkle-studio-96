import { Reveal } from "@/components/public/PublicPrimitives";
import { faqItems } from "@/data/faqContent";

const FAQ = () => (
  <section className="section-platinum section-pad-tight overflow-hidden">
    <div className="container-wide">
      <Reveal className="mx-auto mb-12 max-w-3xl text-center">
        <p className="section-kicker text-[#d7b46a]">Questions</p>
        <h2 className="public-h2 text-platinum-text">Reponses directes avant de contacter une agence.</h2>
        <p className="public-lead text-platinum-muted">
          Cette section est volontairement visible en clair pour aider les dirigeants, Google et les moteurs de reponse IA a comprendre exactement ce que fait LGM.
        </p>
      </Reveal>
      <div className="mx-auto grid max-w-3xl gap-5">
        {faqItems.map((item, index) => (
          <Reveal key={item.question} delay={index * 0.035}>
            <article className="border-t border-[rgba(16,24,39,0.14)] pt-5">
              <h3 className="public-h3 text-[clamp(1.1rem,1.8vw,1.55rem)] text-platinum-text">{item.question}</h3>
              <p className="public-body mt-3 text-platinum-muted">{item.answer}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default FAQ;
