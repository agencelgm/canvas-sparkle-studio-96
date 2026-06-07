import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { navLinks, serviceAreaPages, siteContact } from "@/data/publicContent";
import { Arrow, EASE } from "@/components/public/PublicPrimitives";

const Footer = () => (
  <footer className="section-charcoal border-t border-[#f0d9961f] py-12 md:py-16">
    <div className="container-wide">
      <motion.div
        className="grid gap-10 md:grid-cols-2 md:items-start lg:grid-cols-[1.2fr_0.75fr_0.85fr_0.9fr]"
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
            Agence marketing et communication basee a Abidjan. Nous structurons acquisition, conversion, fidelisation, IA et automatisation pour les entreprises ambitieuses des marches francophones.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={siteContact.whatsapp} target="_blank" rel="noreferrer" className="btn-cobalt-outline min-h-0 px-5 py-2 text-[0.78rem]">
              WhatsApp
            </a>
            <a href={`mailto:${siteContact.email}`} className="btn-cobalt-outline min-h-0 px-5 py-2 text-[0.78rem]">
              Email
            </a>
          </div>
        </div>

        <div>
          <p className="section-kicker">Navigation</p>
          <nav className="flex flex-col gap-3" aria-label="Navigation footer">
            {navLinks.map(({ href, label }) => (
              <Link key={href} to={href} className="inline-flex items-center gap-2 text-sm font-semibold text-platinum/58 transition-colors hover:text-platinum">
                {label}
                <Arrow className="h-3 w-3" />
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <p className="section-kicker">Zones</p>
          <nav className="flex flex-col gap-3" aria-label="Zones desservies">
            {serviceAreaPages.map(({ slug, city, country }) => (
              <Link key={slug} to={`/zones/${slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-platinum/58 transition-colors hover:text-platinum">
                {city}, {country}
                <Arrow className="h-3 w-3" />
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <p className="section-kicker">Contact</p>
          <div className="space-y-3 text-sm text-platinum/58">
            <a className="block transition-colors hover:text-platinum" href={`mailto:${siteContact.email}`}>{siteContact.email}</a>
            <a className="block transition-colors hover:text-platinum" href={`tel:${siteContact.phoneHref}`}>{siteContact.phoneDisplay}</a>
            <p>{siteContact.hours}</p>
            <p>{siteContact.address}</p>
          </div>
        </div>
      </motion.div>

      <div className="mt-12 flex flex-col gap-3 border-t border-[#f0d99614] pt-6 text-xs text-platinum/34 md:flex-row md:items-center md:justify-between">
        <p>(c) {new Date().getFullYear()} LGM, Les Gens du Marketing. Tous droits reserves.</p>
        <p>Abidjan, Cote d'Ivoire</p>
      </div>
    </div>
  </footer>
);

export default Footer;
