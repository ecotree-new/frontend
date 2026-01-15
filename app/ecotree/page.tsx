import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/ecotree/HeroSection';
import RentalFlowSection from '@/components/ecotree/RentalFlowSection';
import BusinessRangeSection from '@/components/ecotree/BusinessRangeSection';
import BrandTransitionSection from '@/components/ecotree/BrandTransitionSection';
import ProductShowcaseSection from '@/components/ecotree/ProductShowcaseSection';
import ProductVideoSection from '@/components/ecotree/ProductVideoSection';
import WashingProcessSection from '@/components/ecotree/WashingProcessSection';
import WashingFacilitySection from '@/components/ecotree/WashingFacilitySection';
import PostWashingSection from '@/components/ecotree/PostWashingSection';
import StatsSection from '@/components/ecotree/StatsSection';

export default function EcotreePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <RentalFlowSection />
        <BusinessRangeSection />
        <BrandTransitionSection />
        <ProductShowcaseSection />
        <ProductVideoSection />
        <WashingProcessSection />
        <WashingFacilitySection />
        <PostWashingSection />
        <StatsSection />
      </main>
      <Footer />
    </>
  );
}
