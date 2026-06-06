import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { navLinks, siteContact } from "@/data/publicContent";
import { Arrow, EASE } from "@/components/public/PublicPrimitives";

const Footer = () => (
  <footer className="section-espresso border-t border-[#e8c96b1f] py-12 md:py-16">
    <div className="container-wide">
      <motion.div
        className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr] md:items-start"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.65, ease: EASE }}
      >
        <div>
          <Link to="/" aria-label="LGM, accueil" className="mb-6 inline-flex">
            <img src="/lovable-uploads/6072f7c5-86f3-42f4-beea-4b8b7541758e.png" alt="LGM" className="h-10 w-auto" />
          </Link>
          <p className="public-body max-w-md">
            L'agence qui structure acquisition, conversion et fidelisation pour les entreprises ambitieuses d'Afrique de l'Ouest.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={siteContact.whatsapp} target="_blank" rel="noreferrer" className="btn-akan-outline min-h-0 px-5 py-2 text-[0.78rem]">
              WhatsApp
            </a>
            <a href={`mailto:${siteContact.email}`} className="btn-akan-outline min-h-0 px-5 py-2 text-[0.78rem]">
              Email
            </a>
          </div>
        </div>

        <div>
          <p className="section-kicker">Navigation</p>
          <nav className="flex flex-col gap-3" aria-label="Navigation footer">
            {navLinks.map(({ href, label }) => (
              <Link key={href} to={href} className="inline-flex items-center gap-2 text-sm font-semibold text-ivory/58 transition-colors hover:text-ivory">
                {label}
                <Arrow className="h-3 w-3" />
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <p className="section-kicker">Contact</p>
          <div className="space-y-3 text-sm text-ivory/58">
            <a className="block transition-colors hover:text-ivory" href={`mailto:${siteContact.email}`}>{siteContact.email}</a>
            <a className="block transition-colors hover:text-ivory" href={`tel:${siteContact.phoneHref}`}>{siteContact.phoneDisplay}</a>
            <p>{siteContact.address}</p>
          </div>
        </div>
      </motion.div>

      <div className="mt-12 flex flex-col gap-3 border-t border-[#e8c96b14] pt-6 text-xs text-ivory/34 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} LGM, Les Gens du Marketing. Tous droits reserves.</p>
        <p>Abidjan, Cote d'Ivoire</p>
      </div>
    </div>
  </footer>
);

export default Footer;
