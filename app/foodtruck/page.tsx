import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroStepSection from '@/components/foodtruck/HeroStepSection';
import ServiceCardsSection from '@/components/foodtruck/ServiceCardsSection';
import MenuSliderSection from '@/components/foodtruck/MenuSliderSection';
import TruckSelectionSection from '@/components/foodtruck/TruckSelectionSection';
import OperationExamplesSection from '@/components/foodtruck/OperationExamplesSection';
import CTASection from '@/components/foodtruck/CTASection';

export default function FoodtruckPage() {
  return (
    <>
      <Header />
      <main className="fixed top-16 left-0 right-0 bottom-0 overflow-y-auto snap-y snap-mandatory scroll-smooth">
        {/* Snap sections - each section is exactly viewport height minus header */}
        <HeroStepSection />
        <ServiceCardsSection />
        <MenuSliderSection />
        {/* Free scroll sections */}
        <div className="snap-start">
          <TruckSelectionSection />
          <OperationExamplesSection />
          <CTASection />
          <Footer />
        </div>
      </main>
    </>
  );
}
