'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQ_DATA, FAQ_CATEGORIES } from '@/lib/constants';

export default function FAQSection() {
  const [openId, setOpenId] = useState<number | null>(1);
  const [activeCategoryId, setActiveCategoryId] = useState<number>(1);

  const filteredFAQs = useMemo(() => {
    return FAQ_DATA.filter((faq) => faq.categoryId === activeCategoryId);
  }, [activeCategoryId]);

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-8">
      {/* Left Sidebar - Categories (Horizontal scroll on mobile) */}
      <div className="w-full md:w-[240px] flex-shrink-0">
        <div className="flex md:flex-col overflow-x-auto md:overflow-x-visible gap-1.5 sm:gap-2 md:gap-0 pb-2 md:pb-0 -mx-1 px-1">
          {FAQ_CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setActiveCategoryId(category.id);
                setOpenId(null);
              }}
              className={`
                whitespace-nowrap md:whitespace-normal text-left py-2 px-3 sm:py-3 sm:px-4 md:py-4 text-[12px] sm:text-[13px] md:text-[14px] transition-all border-b-2 md:border-b-0 md:border-l-4 rounded-lg md:rounded-none
                ${activeCategoryId === category.id
                  ? 'border-b-[#1B67FF] md:border-l-[#1B67FF] bg-[#F8F9FA] text-[#1B67FF] font-medium'
                  : 'border-b-transparent md:border-l-transparent text-[#999999] hover:text-[#666666] bg-[#F8F9FA] md:bg-transparent'
                }
              `}
            >
              <span className="hidden md:inline">{category.id}) </span>{category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Right Content - FAQ List */}
      <div className="flex-1 min-w-0">
        <div className="divide-y divide-[#E5E5E5]">
          {filteredFAQs.map((faq) => (
            <div key={faq.id}>
              {/* Question */}
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full flex items-center justify-between py-4 sm:py-6 text-left gap-2"
              >
                <span className="text-[14px] sm:text-[16px] text-[#111111] font-medium">
                  {faq.question}
                </span>
                <svg
                  className={`w-4 h-4 sm:w-5 sm:h-5 text-[#999999] transition-transform duration-300 flex-shrink-0 ${
                    openId === faq.id ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Answer */}
              <AnimatePresence>
                {openId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-[13px] sm:text-[14px] text-[#666666] leading-relaxed pb-4 sm:pb-6">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {filteredFAQs.length === 0 && (
          <div className="text-center py-8 sm:py-12 text-[13px] sm:text-[14px] text-[#999999]">
            해당 카테고리에 FAQ가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
