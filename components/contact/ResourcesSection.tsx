'use client';

import { RESOURCES_DATA } from '@/lib/constants';

export default function ResourcesSection() {
  return (
    <div>
      {RESOURCES_DATA.map((resource, index) => (
        <div
          key={resource.id}
          className="flex flex-col sm:flex-row sm:items-center justify-between py-3 sm:py-4 md:py-6 border-b border-[#1B67FF]/30 gap-2 sm:gap-3 md:gap-0"
        >
          {/* Left - Number and Title */}
          <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
            <span className="text-[13px] sm:text-[14px] md:text-[16px] font-medium text-[#1B67FF]">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="text-[13px] sm:text-[14px] md:text-[16px] text-[#111111]">
              {resource.title}
            </span>
          </div>

          {/* Right - Download Button */}
          <div className="flex items-center pl-7 sm:pl-0">
            <a
              href={resource.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 border border-[#E5E5E5] rounded-full text-[11px] sm:text-[12px] md:text-[14px] text-[#999999] hover:border-[#1B67FF] hover:text-[#1B67FF] transition-colors"
            >
              자료 다운
              <svg
                className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
