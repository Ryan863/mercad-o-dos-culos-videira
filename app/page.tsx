import Aftercare from "@/components/Aftercare";
import CartDrawer from "@/components/CartDrawer";
import Catalog from "@/components/Catalog";
import FloatingBag from "@/components/FloatingBag";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Lenses from "@/components/Lenses";
import Location from "@/components/Location";
import PageShell from "@/components/PageShell";
import Prescription from "@/components/Prescription";
import Reviews from "@/components/Reviews";

export default function Home() {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-white"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <PageShell>
        <Hero />
        <Catalog />
        <Lenses />
        <Prescription />
        <Aftercare />
        <Reviews />
        <Location />
      </PageShell>
      <Footer />
      <CartDrawer />
      <FloatingBag />
    </>
  );
}
