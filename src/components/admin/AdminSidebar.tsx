import { Link, useLocation } from "react-router-dom";
import { ClipboardCheck, FileText, FolderOpen, LayoutDashboard, LogOut, Mail } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const AdminSidebar = () => {
  const location = useLocation();
  const { signOut } = useAuth();

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/posts", label: "Articles", icon: FileText },
    { href: "/admin/categories", label: "Categories", icon: FolderOpen },
    { href: "/admin/contacts", label: "Messages", icon: Mail },
    { href: "/admin/qualifications", label: "Qualifications", icon: ClipboardCheck },
  ];

  const isActive = (href: string) => {
    if (href === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(href);
  };

  return (
    <aside className="flex min-h-[100dvh] w-64 flex-col border-r border-border bg-card">
      <div className="border-b border-border p-6">
        <Link to="/" className="flex items-center gap-3">
          <img
            alt="LGM"
            className="h-8 w-auto"
            src="/lovable-uploads/6072f7c5-86f3-42f4-beea-4b8b7541758e.png"
          />
          <span className="font-semibold text-foreground">Admin</span>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
              isActive(item.href)
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="border-t border-border p-4">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
          onClick={() => signOut()}
        >
          <LogOut className="h-5 w-5" />
          Deconnexion
        </Button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
