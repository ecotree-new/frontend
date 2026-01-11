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
      <main className="min-h-screen py-20 lg:py-32 bg-white">
        <div className="container-ecotree">
          {/* Title */}
          <h1 className="text-[40px] md:text-[48px] font-bold text-[#111111] text-center mb-4">
            문의하기
          </h1>
          <p className="text-[16px] text-[#727783] text-center mb-2">
            에코트리에 대해 궁금하신 사항을 문의해 주세요.
          </p>
          <p className="text-[16px] text-[#727783] text-center mb-12">
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
