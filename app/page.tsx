import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import BannerSection from '@/components/sections/BannerSection';
import ProcessStrengthSection from '@/components/sections/ProcessStrengthSection';
import FestivalSection from '@/components/sections/FestivalSection';
import CTASection from '@/components/sections/CTASection';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* main_1: Hero Section */}
        <HeroSection />

        {/* main_2: Banner Section (Problem & Insight) */}
        <BannerSection />

        {/* main_3: Process & Strength Section */}
        <ProcessStrengthSection />

        {/* main_4: Festival Section */}
        <FestivalSection />

        {/* main_5: CTA Section */}
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
