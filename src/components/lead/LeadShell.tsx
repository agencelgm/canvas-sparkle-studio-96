import { siteContact } from "@/data/publicContent";

interface LeadShellProps {
  children: React.ReactNode;
}

/** En-tete + pied de page minimalistes, communs aux pages d'acquisition. */
const LeadShell = ({ children }: LeadShellProps) => (
  <div className="public-shell">
    <header className="border-b border-[rgba(240,217,150,0.14)]">
      <div className="container-wide flex items-center justify-between py-4">
        <img
          src="/lovable-uploads/lgm-logo-light.png"
          alt="Agence LGM — Les Gens du Marketing"
          className="h-9 w-auto"
        />
        <span className="hidden text-xs font-semibold text-platinum/60 sm:block">
          Agence de marketing digital — Abidjan
        </span>
      </div>
    </header>

    <main className="public-main">{children}</main>

    <footer className="border-t border-[rgba(240,217,150,0.14)] bg-[#070b12]">
      <div className="container-wide py-6 pb-24 text-center text-xs font-semibold text-platinum/60 md:pb-6">
        © {new Date().getFullYear()} Agence LGM — {siteContact.address}
      </div>
    </footer>
  </div>
);

export default LeadShell;
