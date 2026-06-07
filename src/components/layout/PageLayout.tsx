import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GrainOverlay from "@/components/GrainOverlay";
import QuickResponseBand from "@/components/QuickResponseBand";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="public-shell flex min-h-[100dvh] flex-col">
      <GrainOverlay />
      <Header />
      <main className="public-main flex-1">{children}</main>
      <QuickResponseBand />
      <Footer />
    </div>
  );
};

export default PageLayout;
