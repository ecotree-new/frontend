import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/cases/HeroSection';
import ProcessSection from '@/components/cases/ProcessSection';
import CaseStudySection from '@/components/cases/CaseStudySection';
import JointCaseSection from '@/components/cases/JointCaseSection';
import TestimonialSection from '@/components/cases/TestimonialSection';

export default function CasesPage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ProcessSection />
        <CaseStudySection />
        <JointCaseSection />
        <TestimonialSection />
      </main>
      <Footer />
    </>
  );
}
