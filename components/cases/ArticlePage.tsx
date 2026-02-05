'use client';

import Image from 'next/image';
import Link from 'next/link';
import { JOINT_CASE_ARTICLES } from '@/lib/constants';
import { IMAGE_MAP } from '@/lib/images';

interface ArticleData {
  id: string;
  label: string;
  date: string;
  title: string;
  heroImage: string;
  cardImage: string;
  cardTitle: string;
  sections: { heading: string; content: string }[];
}

interface ArticlePageProps {
  article: ArticleData;
}

export default function ArticlePage({ article }: ArticlePageProps) {
  // Get other articles for "다른 운영 후기 보기" section
  const otherArticles = Object.values(JOINT_CASE_ARTICLES).filter(
    (a) => a.id !== article.id
  );

  return (
    <article className="bg-white">
      {/* Header Section */}
      <div className="container-ecotree pt-8 md:pt-12 lg:pt-16">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6 md:mb-8">
          {/* Title */}
          <h1 className="text-[24px] md:text-[32px] lg:text-[40px] font-bold text-[#111111] leading-tight">
            {article.title}
          </h1>

          {/* Badges */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="px-3 py-1.5 md:px-4 md:py-2 bg-[#1B67FF] text-white text-[12px] md:text-[14px] font-medium rounded-full">
              {article.date}
            </span>
            <span className="px-3 py-1.5 md:px-4 md:py-2 bg-[#1B67FF] text-white text-[12px] md:text-[14px] font-medium rounded-full">
              {article.label}
            </span>
          </div>
        </div>

      </div>

      {/* Divider Line */}
      <div className="container-ecotree">
        <div className="w-full h-[1px] bg-[#1B67FF] my-6 md:my-8" />
      </div>

      {/* Hero Image */}
      <div className="container-ecotree mb-8 md:mb-12 lg:mb-16">
        <div className="relative w-full aspect-[16/9] md:aspect-[2/1] overflow-hidden">
          <Image
            src={IMAGE_MAP[article.heroImage] || article.heroImage}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Article Content */}
      <div className="container-ecotree pb-16 md:pb-24 lg:pb-32">
        {article.sections.map((section, index) => (
          <div key={index} className="mb-10 md:mb-14 last:mb-0">
            <h3 className="text-[18px] md:text-[24px] font-bold text-[#111111] mb-4 md:mb-6 leading-snug">
              {section.heading}
            </h3>
            <p className="text-[14px] md:text-[16px] text-[#333333] leading-relaxed whitespace-pre-line">
              {section.content}
            </p>
          </div>
        ))}
      </div>

      {/* Other Reviews Section */}
      <section className="bg-[#F4F5F7] py-16 md:py-24 lg:py-32">
        <div className="container-ecotree">
          <h2 className="text-[20px] md:text-[28px] lg:text-[32px] font-bold text-[#111111] mb-8 md:mb-12">
            다른 운영 후기 보기
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {otherArticles.map((otherArticle) => (
              <div key={otherArticle.id} className="group">
                {/* Image with Label Badge */}
                <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg">
                  <Image
                    src={IMAGE_MAP[otherArticle.cardImage] || otherArticle.cardImage}
                    alt={otherArticle.title}
                    fill
                    className="object-cover"
                  />
                  {/* Label Badge */}
                  <div className="absolute bottom-4 left-4">
                    <span className="inline-block px-3 py-1.5 bg-[#1B67FF] text-white text-[11px] md:text-[12px] font-medium rounded-full">
                      {otherArticle.label}
                    </span>
                  </div>
                </div>

                {/* Content Below Image */}
                <div className="pt-4 pb-2">
                  <h3 className="text-[16px] md:text-[20px] font-semibold text-[#111111] leading-tight mb-3 whitespace-pre-line">
                    {otherArticle.cardTitle}
                  </h3>
                  <Link
                    href={`/cases/${otherArticle.id}`}
                    className="inline-flex items-center gap-1 text-[12px] md:text-[14px] text-[#1B67FF] font-medium hover:font-semibold transition-all"
                  >
                    view more
                    <svg
                      className="w-3 h-3 md:w-4 md:h-4 transform group-hover:translate-x-1 transition-transform"
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
              </div>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
