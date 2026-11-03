import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Hourglass, MessageCircle, Users } from "lucide-react";
import ScoreResultBadge from "@/components/diagnostic/ScoreResultBadge";
import LeadShell from "@/components/lead/LeadShell";
import { leadAgenceConfig, piloteWhatsappUrl } from "@/data/leadAgenceConfig";

const UNLOCK_KEY = "lgm-pilote-video-unlocked";

const LeadAgencePilotePage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [unlocked, setUnlocked] = useState(() => {
    try { return sessionStorage.getItem(UNLOCK_KEY) === "1"; } catch { return false; }
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video || unlocked) return;
    const onTime = () => {
      if (video.duration && video.currentTime / video.duration >= 0.5) {
        setUnlocked(true);
        try { sessionStorage.setItem(UNLOCK_KEY, "1"); } catch { /* ignore */ }
      }
    };
    video.addEventListener("timeupdate", onTime);
    return () => video.removeEventListener("timeupdate", onTime);
  }, [unlocked]);

  return (
    <LeadShell>
      <Helmet>
        <title>Programme pilote LGM | Agence LGM</title>
        <meta name="description" content="Découvrez le programme pilote LGM réservé à 5 très petites entreprises." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <section className="section-charcoal">
        <div className="container-narrow py-12 md:py-16">
          <div className="mx-auto w-full max-w-3xl text-center">
            <ScoreResultBadge caption="Diagnostic enregistré" />
            <p className="section-kicker mt-6">Un instant</p>
            <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.05] text-platinum [text-wrap:balance]">
              Ne fermez pas cette page avant de quitter
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-platinum/75 md:text-lg md:leading-8">
              Regardez cette vidéo pour savoir ce qui se passe et quoi faire ensuite.
            </p>

            <div className="mt-8 aspect-video w-full overflow-hidden rounded-md border border-bronze/30 bg-black">
              <video
                ref={videoRef}
                src={leadAgenceConfig.videos.pilote}
                controls
                playsInline
                className="h-full w-full"
                title="Le programme pilote LGM"
              />
            </div>

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
                    <p className="mt-1 text-sm leading-6 text-platinum/65">Aucune nouvelle entreprise n'est acceptée tant qu'une place ne se libère pas.</p>
                  </div>
                </div>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {unlocked ? (
                <motion.div
                  key="choices"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="mt-8 flex flex-col gap-3"
                >
                  <a href={piloteWhatsappUrl} target="_blank" rel="noopener noreferrer" className="dx-btn-primary w-full">
                    <MessageCircle aria-hidden="true" className="h-4 w-4" />
                    Oui, je veux une place dans le programme pilote
                  </a>
                  <Link
                    to={leadAgenceConfig.formationFacebookPath}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-platinum/20 px-5 py-3.5 text-sm font-semibold text-platinum/80 transition-colors hover:border-bronze/50 hover:text-platinum"
                  >
                    Non, 175 000 F c'est encore trop pour moi aujourd'hui
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                </motion.div>
              ) : (
                <motion.p key="hint" exit={{ opacity: 0 }} className="mt-8 text-sm text-platinum/55">
                  Les options apparaîtront pendant la vidéo.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </LeadShell>
  );
};

export default LeadAgencePilotePage;
