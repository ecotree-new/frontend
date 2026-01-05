import Link from 'next/link';
import { COMPANY_INFO, FOOTER_LINKS } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-[#1E1F23] text-white py-12 lg:py-16">
      <div className="container-ecotree">
        <div className="flex flex-col md:flex-row md:justify-between gap-8">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="w-[180px] h-[50px] bg-gray-500 flex items-center justify-center text-sm text-gray-300">
              LOGO
            </div>
          </div>

          {/* Company Info & Links - md 이상에서 오른쪽 정렬 */}
          <div className="flex flex-row gap-6 md:gap-16 justify-between md:justify-end">
            {/* Company Info */}
            <div className="space-y-2 text-[14px] text-[#BFBFBF]">
              <p>회사명 : {COMPANY_INFO.name}</p>
              <p>대표이사 : {COMPANY_INFO.ceo}</p>
              <p>사업자등록번호 : {COMPANY_INFO.businessNumber}</p>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 text-[14px] text-[#BFBFBF]">
              <p>대표전화 : {COMPANY_INFO.phone}</p>
              <p>대표 메일 : {COMPANY_INFO.email}</p>
              <Link
                href="/contact"
                className="flex items-center gap-1 text-[#BFBFBF] hover:text-[#F5F5F5] transition-colors group"
              >
                <span>문의하기</span>
                <svg
                  className="w-4 h-4 text-[#BFBFBF] group-hover:text-[#F5F5F5] transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
              <p className="pt-2">주소 : {COMPANY_INFO.address}</p>
              <Link
                href="/about#location"
                className="flex items-center gap-1 text-[#BFBFBF] hover:text-[#F5F5F5] transition-colors group"
              >
                <span>오시는길</span>
                <svg
                  className="w-4 h-4 text-[#BFBFBF] group-hover:text-[#F5F5F5] transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>

            {/* Legal Links */}
            <div className="space-y-2 text-[14px]">
              {FOOTER_LINKS.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-[#BFBFBF] hover:text-[#F5F5F5] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-8 border-gray-600" />

        {/* Copyright */}
        <div className="text-center text-[14px] text-[#727783]">
          Copyright &copy; [{new Date().getFullYear()}] ecotree All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
