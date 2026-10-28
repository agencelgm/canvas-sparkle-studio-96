import { Link } from "react-router-dom";
import { navLinks, publicServices, serviceAreaPages, siteContact } from "@/data/publicContent";
import { scrollToDiagnostic } from "@/lib/diagnosticScroll";

const linkCls = "text-sm font-semibold text-platinum/60 transition-colors hover:text-platinum";

const Footer = () => (
  <footer className="section-charcoal border-t border-[#f0d9961f] py-14 md:py-20">
    <div className="container-wide">
      <div className="grid gap-10 border-b border-[#f0d99614] pb-12 lg:grid-cols-[1.3fr_1fr] lg:items-end">
        <div>
          <p className="section-kicker">Un systeme complet</p>
          <p className="public-h2 max-w-[16ch]">Attirer, convertir et fideliser vos clients.</p>
        </div>
        <div className="flex flex-wrap gap-3 lg:justify-end">
          <Link to="#diagnostic" onClick={() => window.setTimeout(() => scrollToDiagnostic(), 0)} className="btn-cobalt">Faire mon diagnostic</Link>
          <a href={siteContact.whatsapp} target="_blank" rel="noreferrer" className="btn-cobalt-outline">WhatsApp</a>
        </div>
      </div>

      <div className="grid gap-10 pt-12 sm:grid-cols-2 lg:grid-cols-[1.1fr_0.8fr_1fr_0.8fr_1fr]">
        <div>
          <Link to="/" aria-label="LGM, accueil" className="mb-5 inline-flex">
            <img src="/lovable-uploads/lgm-logo-light.png" alt="LGM" className="h-10 w-auto" />
          </Link>
          <p className="public-body max-w-xs">
            Agence marketing a Abidjan. Campagnes, pages, qualification, CRM, rendez-vous, vente et fidelisation relies dans un seul systeme.
          </p>
        </div>

        <nav aria-label="Navigation du pied de page">
          <p className="section-kicker">Navigation</p>
          <ul className="flex flex-col gap-3">
            <li><Link to="/" className={linkCls}>Accueil</Link></li>
            {navLinks.map(({ href, label }) => (
              <li key={href}><Link to={href} className={linkCls}>{label}</Link></li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Services">
          <p className="section-kicker">Services</p>
          <ul className="flex flex-col gap-3">
            {publicServices.slice(0, 6).map((s) => (
              <li key={s.slug}><Link to={`/services/${s.slug}`} className={linkCls}>{s.title}</Link></li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Zones desservies">
          <p className="section-kicker">Zones</p>
          <ul className="flex flex-col gap-3">
            {serviceAreaPages.map(({ slug, city }) => (
              <li key={slug}><Link to={`/zones/${slug}`} className={linkCls}>{city}</Link></li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="section-kicker">Contact</p>
          <address className="space-y-3 text-sm not-italic text-platinum/60">
            <a className="block hover:text-platinum" href={`mailto:${siteContact.email}`}>{siteContact.email}</a>
            <a className="block hover:text-platinum" href={`tel:${siteContact.phoneHref}`}>{siteContact.phoneDisplay}</a>
            <p>{siteContact.hours}</p>
            <p>{siteContact.address}</p>
          </address>
        </div>
      </div>

      <div className="mt-12 flex flex-col gap-3 border-t border-[#f0d99614] pt-6 text-xs text-platinum/40 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} LGM, Les Gens du Marketing. Tous droits reserves.</p>
        <p>Abidjan, Cote d'Ivoire</p>
      </div>
    </div>
  </footer>
);

export default Footer;
