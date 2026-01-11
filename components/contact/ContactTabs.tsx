'use client';

import { CONTACT_TABS } from '@/lib/constants';

interface ContactTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export default function ContactTabs({ activeTab, onTabChange }: ContactTabsProps) {
  return (
    <div className="flex w-full mb-8">
      {CONTACT_TABS.map((tab, index) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`
            flex-1 py-4 text-[16px] transition-all border
            ${index === 0 ? 'rounded-l-lg' : ''}
            ${index === CONTACT_TABS.length - 1 ? 'rounded-r-lg' : ''}
            ${index > 0 ? 'border-l-0' : ''}
            ${activeTab === tab.id
              ? 'bg-[#1B67FF] text-white font-semibold border-[#1B67FF]'
              : 'bg-[#EDF3FF] text-[#97BAFF] border-[#C5D9FF] hover:bg-[#dbe8ff]'
            }
          `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
