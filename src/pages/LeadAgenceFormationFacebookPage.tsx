import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { CalendarDays, Check, ChevronDown, Clock, Laptop, MessageCircle, Target, Wallet, X } from "lucide-react";
import LeadShell from "@/components/lead/LeadShell";
import VideoSlot from "@/components/lead/VideoSlot";
import { formationWhatsappUrl, leadAgenceConfig } from "@/data/leadAgenceConfig";
import { formationContent as c } from "@/data/formationContent";
import { absUrl, breadcrumbSchema } from "@/lib/site";

const formatIcons = [CalendarDays, Clock, Laptop, Target, Wallet, MessageCircle];

const ReserveButton = ({ className = "" }: { className?: string }) => (
  <a href={formationWhatsappUrl} target="_blank" rel="noopener noreferrer" className={`dx-btn-primary w-full sm:w-auto ${className}`}>
    <MessageCircle aria-hidden="true" className="h-4 w-4" />
    Je réserve ma place à la prochaine session
  </a>
);

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-extrabold leading-tight text-platinum">{children}</h2>
);

const LeadAgenceFormationFacebookPage = () => {
  const [showBar, setShowBar] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowBar(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const path = leadAgenceConfig.formationFacebookPath;
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Course",
      name: c.title,
      description: c.promise,
      url: absUrl(path),
      provider: { "@type": "Organization", name: "LGM - Les Gens du Marketing", url: absUrl("/") },
      offers: { "@type": "Offer", price: "50000", priceCurrency: "XOF", category: "Paid" },
      hasCourseInstance: { "@type": "CourseInstance", courseMode: "Online", courseSchedule: { "@type": "Schedule", repeatFrequency: "P1W", byDay: "https://schema.org/Wednesday", startTime: "19:00", duration: "P4W" } },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: c.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
    breadcrumbSchema([{ name: "Accueil", path: "/" }, { name: "Formation publicité Facebook", path }]),
  ];

  return (
    <LeadShell>
      <Helmet>
        <title>Formation publicité Facebook et Instagram en 4 semaines | LGM</title>
        <meta name="description" content="En 4 semaines, apprenez à créer, lancer, lire et corriger vos publicités Facebook et Instagram. 50 000 FCFA, en direct sur Zoom." />
        <meta name="robots" content="noindex, follow" />
        <script type="application/ld+json">{JSON.stringify(schemas)}</script>
      </Helmet>

      <section className="section-charcoal">
        <div className="container-narrow py-10 md:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <p className="section-kicker">Formation publicité Facebook et Instagram</p>
            <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.05] text-platinum [text-wrap:balance]">{c.title}</h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-platinum/75 md:text-lg md:leading-8">{c.promise}</p>
          </div>
          <div className="mx-auto mt-8 max-w-3xl overflow-hidden rounded-md">
            <VideoSlot url={leadAgenceConfig.videos.formationFacebook} title="Présentation de la formation" />
          </div>
          <div className="mt-8 text-center">
            <ReserveButton />
            <p className="mt-3 text-sm text-platinum/60">50 000 FCFA · 4 mercredis à 19h · En direct sur Zoom</p>
          </div>
        </div>
      </section>

      <section className="section-charcoal border-t border-bronze/15">
        <div className="container-narrow mx-auto max-w-3xl py-12 md:py-16">
          <H2>Cette formation est faite pour vous si…</H2>
          <ul className="mt-6 space-y-3">
            {c.forYou.map((t) => (
              <li key={t} className="flex gap-3 text-platinum/85"><Check aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-bronze" />{t}</li>
            ))}
          </ul>
          <p className="mt-6 flex gap-3 rounded-md border border-platinum/10 bg-platinum/5 p-4 text-sm text-platinum/70">
            <X aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-platinum/50" />{c.notForYou}
          </p>
        </div>
      </section>

      <section className="section-charcoal border-t border-bronze/15">
        <div className="container-narrow mx-auto max-w-4xl py-12 md:py-16">
          <H2>Le format</H2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {c.format.map((f, i) => {
              const Icon = formatIcons[i];
              return (
                <div key={f.label} className="rounded-md border border-bronze/20 bg-platinum/[0.03] p-4">
                  <Icon aria-hidden="true" className="h-5 w-5 text-bronze" />
                  <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-bronze">{f.label}</p>
                  <p className="mt-1 text-platinum/85">{f.value}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-charcoal border-t border-bronze/15">
        <div className="container-narrow mx-auto max-w-3xl py-12 md:py-16">
          <H2>Le programme, semaine par semaine</H2>
          <div className="mt-6 space-y-3">
            {c.weeks.map((w, i) => (
              <details key={w.title} open={i === 0} className="group rounded-md border border-bronze/20 bg-platinum/[0.03]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 font-semibold text-platinum [&::-webkit-details-marker]:hidden">
                  {w.title}
                  <ChevronDown aria-hidden="true" className="h-5 w-5 shrink-0 text-bronze transition-transform group-open:rotate-180 motion-reduce:transition-none" />
                </summary>
                <div className="px-4 pb-5">
                  <p className="text-sm text-bronze">Objectif : {w.goal}</p>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-platinum/80">
                    {w.points.map((p) => <li key={p}>{p}</li>)}
                  </ul>
                  <p className="mt-4 border-l-2 border-bronze pl-3 text-sm text-platinum/90">
                    <strong>À la fin de la séance :</strong> {w.result}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section-charcoal border-t border-bronze/15">
        <div className="container-narrow mx-auto max-w-3xl py-12 md:py-16">
          <H2>Ce que vous saurez faire à la fin des 4 semaines</H2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {c.skills.map((t) => (
              <li key={t} className="flex gap-3 text-platinum/85"><Check aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-bronze" />{t}</li>
            ))}
          </ul>
          <div className="mt-12">
            <H2>Pourquoi apprendre plutôt que déléguer, aujourd'hui</H2>
            {c.why.map((p) => <p key={p} className="mt-4 leading-7 text-platinum/80">{p}</p>)}
          </div>
        </div>
      </section>

      <section className="section-charcoal border-t border-bronze/15">
        <div className="container-narrow mx-auto max-w-3xl py-12 md:py-16">
          <H2>Questions fréquentes</H2>
          <div className="mt-6 space-y-3">
            {c.faq.map((f) => (
              <details key={f.q} className="group rounded-md border border-bronze/20 bg-platinum/[0.03]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 font-semibold text-platinum [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <ChevronDown aria-hidden="true" className="h-5 w-5 shrink-0 text-bronze transition-transform group-open:rotate-180 motion-reduce:transition-none" />
                </summary>
                <p className="px-4 pb-4 leading-7 text-platinum/80">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section-charcoal border-t border-bronze/15">
        <div className="container-narrow mx-auto max-w-2xl py-12 pb-28 text-center md:py-16">
          <p className="font-display text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold text-platinum">50 000 FCFA</p>
          <p className="mt-1 text-platinum/75">Une seule fois, pour les 4 semaines.</p>
          <p className="mt-1 text-sm text-bronze">Places limitées, une session par mois.</p>
          <ReserveButton className="mt-6" />
          <p className="mt-10 text-sm text-platinum/60">
            <Link to={leadAgenceConfig.groupeWhatsappPath} className="underline underline-offset-4 hover:text-platinum">
              Pas intéressé par la formation ? Rejoignez notre chaîne WhatsApp gratuite
            </Link>
          </p>
        </div>
      </section>

      <div className={`fixed inset-x-0 bottom-0 z-40 border-t border-bronze/20 bg-charcoal/95 p-3 backdrop-blur transition-transform motion-reduce:transition-none sm:hidden ${showBar ? "translate-y-0" : "translate-y-full"}`}>
        <ReserveButton />
      </div>
    </LeadShell>
  );
};

export default LeadAgenceFormationFacebookPage;
