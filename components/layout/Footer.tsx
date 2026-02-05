import Link from 'next/link';
import Image from 'next/image';
import { COMPANY_INFO, FOOTER_LINKS } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-[#1E1F23] text-white py-10 md:py-12 lg:py-16">
      <div className="container-ecotree">
        <div className="flex flex-row justify-between gap-6 md:gap-8">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Image
              src="/logo.png"
              alt="에코트리"
              width={156}
              height={50}
              className="w-[156px] md:w-[180px] h-auto brightness-0 invert"
            />
          </div>

          {/* ===== Mobile Layout (<768px) - 단일 열 세로 배치 ===== */}
          <div className="flex flex-col text-[12px] text-[#BFBFBF] md:hidden">
            {/* Company Info */}
            <div className="space-y-1.5">
              <p>회사명 : {COMPANY_INFO.name}</p>
              <p>대표이사 : {COMPANY_INFO.ceo}</p>
              <p>사업자등록번호 : {COMPANY_INFO.businessNumber}</p>
            </div>

            {/* Contact Info */}
            <div className="space-y-1.5 mt-6">
              <p>대표전화 : {COMPANY_INFO.phone}</p>
              <p>대표 메일 : {COMPANY_INFO.email}</p>
              <Link
                href="/contact"
                className="flex items-center gap-1 text-[#BFBFBF] hover:text-[#F5F5F5] transition-colors group"
              >
                <span>문의하기</span>
                <svg
                  className="w-3.5 h-3.5 text-[#BFBFBF] group-hover:text-[#F5F5F5] transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <p className="pt-2">주소 : {COMPANY_INFO.address}</p>
              <Link
                href="/about#location"
                className="flex items-center gap-1 text-[#BFBFBF] hover:text-[#F5F5F5] transition-colors group"
              >
                <span>오시는길</span>
                <svg
                  className="w-3.5 h-3.5 text-[#BFBFBF] group-hover:text-[#F5F5F5] transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Legal Links */}
            <div className="flex flex-col space-y-1.5 mt-6">
              {FOOTER_LINKS.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[#BFBFBF] hover:text-[#F5F5F5] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* ===== Desktop Layout (≥768px) - 3열 가로 배치 ===== */}
          <div className="hidden md:flex md:flex-row gap-10 lg:gap-16">
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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
        <hr className="my-6 md:my-8 border-gray-600" />

        {/* Copyright */}
        <div className="text-center text-[12px] md:text-[14px] text-[#727783]">
          Copyright &copy; [{new Date().getFullYear()}] ECOTREE All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
