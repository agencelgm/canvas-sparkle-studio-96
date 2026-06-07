import { Link } from "react-router-dom";

export type Crumb = { label: string; to?: string };

type Props = {
  items: Crumb[];
  tone?: "dark" | "light";
  className?: string;
};

const Breadcrumbs = ({ items, tone = "dark", className = "" }: Props) => {
  if (items.length === 0) return null;
  const isLight = tone === "light";
  const baseColor = isLight ? "text-platinum-muted" : "text-platinum/64";
  const linkColor = isLight ? "hover:text-[#d7b46a]" : "hover:text-[#f0d996]";
  const sepColor = isLight ? "text-platinum-muted/60" : "text-platinum/30";

  return (
    <nav aria-label="Fil d'Ariane" className={`text-xs font-semibold ${baseColor} ${className}`}>
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => (
          <li key={`${item.label}-${i}`} className="flex items-center gap-1.5">
            {item.to ? (
              <Link to={item.to} className={`transition-colors ${linkColor}`}>
                {item.label}
              </Link>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
            {i < items.length - 1 && <span className={sepColor} aria-hidden="true">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
