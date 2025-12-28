import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-14 md:pt-16 lg:pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;
