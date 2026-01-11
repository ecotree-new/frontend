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
    <div className="flex gap-8">
      {/* Left Sidebar - Categories */}
      <div className="w-[240px] flex-shrink-0">
        <div className="space-y-0">
          {FAQ_CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setActiveCategoryId(category.id);
                setOpenId(null);
              }}
              className={`
                w-full text-left py-4 px-4 text-[14px] transition-all border-l-4
                ${activeCategoryId === category.id
                  ? 'border-l-[#1B67FF] bg-[#F8F9FA] text-[#1B67FF] font-medium'
                  : 'border-l-transparent text-[#999999] hover:text-[#666666]'
                }
              `}
            >
              {category.id}) {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Right Content - FAQ List */}
      <div className="flex-1">
        <div className="divide-y divide-[#E5E5E5]">
          {filteredFAQs.map((faq) => (
            <div key={faq.id}>
              {/* Question */}
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full flex items-center justify-between py-6 text-left"
              >
                <span className="text-[16px] text-[#111111] font-medium pr-4">
                  {faq.question}
                </span>
                <svg
                  className={`w-5 h-5 text-[#999999] transition-transform duration-300 flex-shrink-0 ${
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
                    <p className="text-[14px] text-[#666666] leading-relaxed pb-6">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {filteredFAQs.length === 0 && (
          <div className="text-center py-12 text-[#999999]">
            해당 카테고리에 FAQ가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
