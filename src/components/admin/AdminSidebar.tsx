import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, FileText, FolderOpen, Mail, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const AdminSidebar = () => {
  const location = useLocation();
  const { signOut } = useAuth();

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/posts", label: "Articles", icon: FileText },
    { href: "/admin/categories", label: "CatÃ©gories", icon: FolderOpen },
    { href: "/admin/contacts", label: "Messages", icon: Mail },
  ];

  const isActive = (href: string) => {
    if (href === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(href);
  };

  return (
    <aside className="w-64 bg-card border-r border-border min-h-[100dvh] flex flex-col">
      <div className="p-6 border-b border-border">
        <Link to="/" className="flex items-center gap-3">
          <img
            alt="LGM"
            className="h-8 w-auto"
            src="/lovable-uploads/6072f7c5-86f3-42f4-beea-4b8b7541758e.png"
          />
          <span className="font-semibold text-foreground">Admin</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              isActive(item.href)
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-border">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
          onClick={() => signOut()}
        >
          <LogOut className="w-5 h-5" />
          DÃ©connexion
        </Button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
