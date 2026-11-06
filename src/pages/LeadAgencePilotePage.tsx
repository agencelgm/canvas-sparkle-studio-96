import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Hourglass, MessageCircle, Play, Users, X, ArrowDown } from "lucide-react";
import { trackAbEvent, useAbTest } from "@/hooks/useAbTest";
import ScoreResultBadge from "@/components/diagnostic/ScoreResultBadge";
import LeadShell from "@/components/lead/LeadShell";
import { leadAgenceConfig, piloteWhatsappUrl } from "@/data/leadAgenceConfig";
import { piloteDeclineLabel, piloteSales as S } from "@/data/piloteContent";

const UNLOCK_KEY = "lgm-pilote-video-unlocked";
const UNLOCK_RATIO = 0.25;
const UNLOCK_DELAY_MS = 60_000;

const Choices = ({ cta, onYes, onNo }: { cta: string; onYes: () => void; onNo: () => void }) => (
  <div className="flex flex-col gap-3">
    <a href={piloteWhatsappUrl} target="_blank" rel="noopener noreferrer" onClick={onYes} className="dx-btn-primary w-full">
      <MessageCircle aria-hidden="true" className="h-4 w-4" />
      {cta}
    </a>
    <Link
      to={leadAgenceConfig.formationFacebookPath}
      onClick={onNo}
      className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-platinum/20 px-5 py-3.5 text-sm font-semibold text-platinum/80 transition-colors hover:border-bronze/50 hover:text-platinum"
    >
      {piloteDeclineLabel}
      <ArrowRight aria-hidden="true" className="h-4 w-4" />
    </Link>
  </div>
);

const Summary = () => (
  <div className="dx-launcher text-left">
    <ul className="space-y-3">
      {S.benefits.map((b) => (
        <li key={b} className="flex gap-3 text-sm leading-6 text-platinum/80">
          <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-bronze" />
          {b}
        </li>
      ))}
    </ul>
  </div>
);

const LeadAgencePilotePage = () => {
  const { ready, content, convert } = useAbTest("programme-pilote");
  const sales = content.layout === "sales";
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [unlocked, setUnlocked] = useState(() => {
    try { return sessionStorage.getItem(UNLOCK_KEY) === "1"; } catch { return false; }
  });
  const played = useRef(false);
  const reached = useRef(false);

  const unlock = () => {
    setUnlocked(true);
    try { sessionStorage.setItem(UNLOCK_KEY, "1"); } catch { /* ignore */ }
  };

  // Ne jamais bloquer : les boutons apparaissent après 60 s sur la page.
  useEffect(() => {
    if (unlocked || sales) return;
    const t = window.setTimeout(unlock, UNLOCK_DELAY_MS);
    return () => window.clearTimeout(t);
  }, [unlocked, sales]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onPlay = () => {
      if (!played.current) { played.current = true; trackAbEvent("programme-pilote", "video_play"); }
    };
    const onTime = () => {
      if (video.duration && video.currentTime / video.duration >= UNLOCK_RATIO) {
        if (!reached.current) { reached.current = true; trackAbEvent("programme-pilote", "video_25"); }
        if (!unlocked) unlock();
      }
    };
    video.addEventListener("play", onPlay);
    video.addEventListener("timeupdate", onTime);
    return () => { video.removeEventListener("play", onPlay); video.removeEventListener("timeupdate", onTime); };
  }, [unlocked, ready, sales]);

  const startVideo = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    v.currentTime = 0;
    void v.play();
    setStarted(true);
  };

  const onNo = () => trackAbEvent("programme-pilote", "decline");
  const cta = content.cta ?? "Oui, je veux une place dans le programme pilote";

  const video = (withCover: boolean) => (
    <div>
      {withCover && !started && (
        <p className="mb-3 flex items-center justify-center gap-2 text-sm font-semibold text-bronze">
          <ArrowDown aria-hidden="true" className="h-4 w-4 motion-safe:animate-bounce" />
          Regardez cette courte vidéo avant de décider
          <ArrowDown aria-hidden="true" className="h-4 w-4 motion-safe:animate-bounce" />
        </p>
      )}
      <div className="relative aspect-video w-full overflow-hidden rounded-md border border-bronze/30 bg-black">
        <video
          ref={videoRef}
          src={leadAgenceConfig.videos.pilote}
          controls={!withCover || started}
          playsInline
          preload="metadata"
          className="h-full w-full"
          title="Le programme pilote LGM"
        />
        {withCover && !started && (
          <button
            type="button"
            onClick={startVideo}
            aria-label="Cliquez ici pour regarder la vidéo"
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/55 text-platinum"
          >
            <span className="relative flex h-20 w-20 items-center justify-center">
              <span aria-hidden="true" className="absolute inset-0 rounded-full bg-bronze/50 motion-safe:animate-ping" />
              <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-bronze shadow-lg">
                <Play aria-hidden="true" className="ml-1 h-9 w-9 fill-current text-background" />
              </span>
            </span>
            <span className="text-lg font-bold sm:text-xl">Cliquez ici pour regarder la vidéo</span>
            <span className="text-sm text-platinum/75">Le son est activé · 2 minutes</span>
          </button>
        )}
      </div>
    </div>
  );

  return (
    <LeadShell>
      <Helmet>
        <title>Programme pilote LGM | Agence LGM</title>
        <meta name="description" content="Découvrez le programme pilote LGM réservé à 5 très petites entreprises." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <section className="section-charcoal">
        <div className="container-narrow py-12 md:py-16">
          {!ready ? (
            <div className="min-h-[60vh]" />
          ) : sales ? (
            <div className="mx-auto w-full max-w-3xl pb-24 md:pb-0">
              <div className="text-center">
                <ScoreResultBadge caption="Diagnostic enregistré" />
                <p className="section-kicker mt-6">{S.kicker}</p>
                <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.05] text-platinum [text-wrap:balance]">
                  {content.headline ?? S.headline}
                </h1>
                <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-platinum/75 md:text-lg md:leading-8">
                  {content.subtitle ?? S.intro}
                </p>
              </div>

              <div className="mt-8"><Choices cta={cta} onYes={convert} onNo={onNo} /></div>

              <h2 className="mt-12 font-display text-2xl font-bold text-platinum">Ce que vous obtenez</h2>
              <div className="mt-4"><Summary /></div>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <div className="dx-launcher text-left">
                  <h2 className="text-sm font-bold text-platinum">C'est pour vous si…</h2>
                  <ul className="mt-3 space-y-2">
                    {S.forYou.map((t) => (
                      <li key={t} className="flex gap-2 text-sm leading-6 text-platinum/75"><Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-bronze" />{t}</li>
                    ))}
                  </ul>
                </div>
                <div className="dx-launcher text-left">
                  <h2 className="text-sm font-bold text-platinum">Ce n'est pas pour vous si…</h2>
                  <ul className="mt-3 space-y-2">
                    {S.notForYou.map((t) => (
                      <li key={t} className="flex gap-2 text-sm leading-6 text-platinum/75"><X aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-platinum/50" />{t}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <h2 className="mt-12 font-display text-2xl font-bold text-platinum">Comment ça se passe</h2>
              <ol className="mt-4 grid gap-4 sm:grid-cols-3">
                {S.steps.map((s, i) => (
                  <li key={s.title} className="dx-launcher text-left">
                    <p className="font-display text-2xl font-extrabold text-bronze">{i + 1}</p>
                    <h3 className="mt-1 text-sm font-bold text-platinum">{s.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-platinum/65">{s.text}</p>
                  </li>
                ))}
              </ol>

              <p className="mt-8 flex items-center justify-center gap-2 text-center text-sm text-platinum/70">
                <Hourglass aria-hidden="true" className="h-4 w-4 text-bronze" />
                {S.scarcity}
              </p>

              <h2 className="mt-12 font-display text-2xl font-bold text-platinum">Voir la présentation en vidéo</h2>
              <div className="mt-4">{video(false)}</div>

              <div className="mt-8"><Choices cta={cta} onYes={convert} onNo={onNo} /></div>

              <div className="fixed inset-x-0 bottom-0 z-40 border-t border-platinum/10 bg-charcoal/95 p-3 backdrop-blur md:hidden">
                <a href={piloteWhatsappUrl} target="_blank" rel="noopener noreferrer" onClick={convert} className="dx-btn-primary w-full">
                  <MessageCircle aria-hidden="true" className="h-4 w-4" />
                  Je veux une place
                </a>
              </div>
            </div>
          ) : (
            <div className="mx-auto w-full max-w-3xl text-center">
              <ScoreResultBadge caption="Diagnostic enregistré" />
              <p className="section-kicker mt-6">Un instant</p>
              <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.05] text-platinum [text-wrap:balance]">
                {content.headline ?? S.headline}
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-platinum/75 md:text-lg md:leading-8">
                {content.subtitle ?? "Regardez cette courte vidéo : elle explique le programme pilote et quoi faire ensuite."}
              </p>

              <div className="mt-8">{video(true)}</div>

              {!showSummary && (
                <button type="button" onClick={() => setShowSummary(true)} className="mt-3 text-sm text-platinum/60 underline underline-offset-4 hover:text-platinum">
                  Je préfère lire
                </button>
              )}
              {showSummary && <div className="mt-6"><Summary /></div>}

              <div className="dx-launcher mt-8 text-left">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="flex gap-3">
                    <Users aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-bronze" />
                    <div>
                      <h2 className="text-sm font-bold text-platinum">Réservé aux très petites entreprises</h2>
                      <p className="mt-1 text-sm leading-6 text-platinum/65">Le programme pilote permet de bénéficier de nos services avec un budget réduit.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Hourglass aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-bronze" />
                    <div>
                      <h2 className="text-sm font-bold text-platinum">Seulement 5 entreprises</h2>
                      <p className="mt-1 text-sm leading-6 text-platinum/65">{S.scarcity}</p>
                    </div>
                  </div>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {unlocked || showSummary ? (
                  <motion.div key="choices" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }} className="mt-8">
                    <Choices cta={cta} onYes={convert} onNo={onNo} />
                  </motion.div>
                ) : (
                  <motion.p key="hint" exit={{ opacity: 0 }} className="mt-8 text-sm text-platinum/55">
                    Les options apparaîtront pendant la vidéo.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>
    </LeadShell>
  );
};

export default LeadAgencePilotePage;
