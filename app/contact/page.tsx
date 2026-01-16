'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ContactTabs from '@/components/contact/ContactTabs';
import InquiryForm from '@/components/contact/InquiryForm';
import FAQSection from '@/components/contact/FAQSection';
import ResourcesSection from '@/components/contact/ResourcesSection';

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState('inquiry');

  return (
    <>
      <Header />
      <main className="min-h-screen py-12 sm:py-16 md:py-20 lg:py-32 bg-white">
        <div className="container-ecotree px-4 sm:px-6">
          {/* Title */}
          <h1 className="text-[28px] sm:text-[36px] md:text-[40px] lg:text-[48px] font-bold text-[#111111] text-center mb-3 sm:mb-4">
            문의하기
          </h1>
          <p className="text-[14px] sm:text-[15px] md:text-[16px] text-[#727783] text-center mb-1 sm:mb-1">
            에코트리에 대해 궁금하신 사항을 문의해 주세요.
          </p>
          <p className="text-[14px] sm:text-[15px] md:text-[16px] text-[#727783] text-center mb-8 sm:mb-10 md:mb-12">
            최대한 빠른 시일 내에 답변해드리겠습니다.
          </p>

          {/* Tabs */}
          <ContactTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {/* Tab Content */}
          <div>
            {activeTab === 'inquiry' && <InquiryForm />}
            {activeTab === 'faq' && <FAQSection />}
            {activeTab === 'resources' && <ResourcesSection />}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
