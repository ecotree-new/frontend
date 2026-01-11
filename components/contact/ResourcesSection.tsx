'use client';

import { RESOURCES_DATA } from '@/lib/constants';

export default function ResourcesSection() {
  return (
    <div>
      {RESOURCES_DATA.map((resource, index) => (
        <div
          key={resource.id}
          className="flex items-center justify-between py-6 border-b border-[#1B67FF]/30"
        >
          {/* Left - Number and Title */}
          <div className="flex items-center gap-6">
            <span className="text-[16px] font-medium text-[#1B67FF]">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="text-[16px] text-[#111111]">
              {resource.title}
            </span>
          </div>

          {/* Right - Date and Download Button */}
          <div className="flex items-center gap-6">
            <span className="text-[14px] text-[#999999]">
              {resource.date}
            </span>
            <a
              href={resource.downloadUrl}
              download
              className="inline-flex items-center gap-1 px-4 py-2 border border-[#E5E5E5] rounded-full text-[14px] text-[#999999] hover:border-[#1B67FF] hover:text-[#1B67FF] transition-colors"
            >
              자료 다운
              <svg
                className="w-4 h-4"
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
