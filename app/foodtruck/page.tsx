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
      <main>
        <HeroStepSection />
        <ServiceCardsSection />
        <MenuSliderSection />
        <TruckSelectionSection />
        <OperationExamplesSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
