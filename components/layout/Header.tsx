'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_ITEMS } from '@/lib/constants';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  // 현재 페이지 링크 클릭 시 페이지 초기화 (최상단으로)
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (isActive(href)) {
      e.preventDefault();
      setIsMobileMenuOpen(false);
      window.location.href = href;
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 h-16">
        <div className="container-ecotree h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0" onClick={(e) => handleNavClick(e, '/')}>
              <Image
                src="/logo.png"
                alt="에코트리"
                width={156}
                height={50}
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-10">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`
                    text-[16px] leading-6 cursor-pointer
                    ${isActive(item.href)
                      ? 'font-bold text-[#111111]'
                      : 'font-medium text-[#111111]'
                    }
                  `}
                >
                  {item.label}
                </Link>
              ))}

              {/* 문의하기 - 일반 텍스트 링크 */}
              <Link
                href="/contact"
                onClick={(e) => handleNavClick(e, '/contact')}
                className={`
                  text-[16px] leading-6 cursor-pointer
                  ${isActive('/contact')
                    ? 'font-bold text-[#111111]'
                    : 'font-medium text-[#111111]'
                  }
                `}
              >
                문의하기
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="메뉴 열기"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile/Tablet Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop - 태블릿(md)에서만 보임 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 z-50 hidden md:block lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-full md:w-[360px] bg-white z-50 lg:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Header Row - 모바일: 로고 + X */}
                <div className="flex items-center justify-between h-16 px-5 md:hidden">
                  <Link href="/" onClick={(e) => handleNavClick(e, '/')} className="flex-shrink-0">
                    <Image
                      src="/logo.png"
                      alt="에코트리"
                      width={156}
                      height={50}
                    />
                  </Link>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 -mr-2"
                    aria-label="메뉴 닫기"
                  >
                    <motion.svg
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </motion.svg>
                  </button>
                </div>

                {/* Header Row - 태블릿: 회사소개 + X (같은 row, items-center로 수직 정렬) */}
                <div className="hidden md:flex items-center justify-between pt-[28px] px-[48px]">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0 }}
                  >
                    <Link
                      href="/about"
                      onClick={(e) => handleNavClick(e, '/about')}
                      className={`
                        block py-5 text-[20px] font-semibold cursor-pointer
                        ${isActive('/about')
                          ? 'text-[#1B67FF]'
                          : 'text-[#111111]'
                        }
                      `}
                    >
                      회사소개
                    </Link>
                  </motion.div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 -mr-2"
                    aria-label="메뉴 닫기"
                  >
                    <motion.svg
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </motion.svg>
                  </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-5 md:px-[48px] pt-4 md:pt-0">
                  <ul className="space-y-2 md:space-y-0">
                    {/* 모바일: 모든 메뉴, 태블릿: 회사소개 제외 */}
                    {NAV_ITEMS.map((item, index) => {
                      const isFirstItem = index === 0;
                      return (
                        <motion.li
                          key={item.href}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (isFirstItem ? 0 : index) * 0.05 }}
                          className={isFirstItem ? 'md:hidden' : ''}
                        >
                          <Link
                            href={item.href}
                            onClick={(e) => handleNavClick(e, item.href)}
                            className={`
                              block py-4 md:py-5 text-[20px] cursor-pointer
                              ${isActive(item.href)
                                ? 'font-bold md:font-semibold text-[#1B67FF]'
                                : 'font-semibold text-[#111111]'
                              }
                            `}
                          >
                            {item.label}
                          </Link>
                        </motion.li>
                      );
                    })}

                    {/* 문의하기 */}
                    <motion.li
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: NAV_ITEMS.length * 0.05 }}
                    >
                      <Link
                        href="/contact"
                        onClick={(e) => handleNavClick(e, '/contact')}
                        className={`
                          block py-4 md:py-5 text-[20px] cursor-pointer
                          ${isActive('/contact')
                            ? 'font-bold md:font-semibold text-[#1B67FF]'
                            : 'font-semibold text-[#111111]'
                          }
                        `}
                      >
                        문의하기
                      </Link>
                    </motion.li>
                  </ul>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer for fixed header */}
      <div className="h-16" />
    </>
  );
}
