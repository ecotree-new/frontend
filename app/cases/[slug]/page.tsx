import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ArticlePage from '@/components/cases/ArticlePage';
import { JOINT_CASE_ARTICLES } from '@/lib/constants';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = JOINT_CASE_ARTICLES[slug];

  if (!article) {
    return {
      title: '아티클을 찾을 수 없습니다',
    };
  }

  return {
    title: `${article.title} | 에코트리 운영사례`,
    description: article.sections[0]?.content.slice(0, 160),
  };
}

export function generateStaticParams() {
  return Object.keys(JOINT_CASE_ARTICLES).map((slug) => ({
    slug,
  }));
}

export default async function CaseArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = JOINT_CASE_ARTICLES[slug];

  if (!article) {
    notFound();
  }

  return (
    <>
      <Header />
      <main>
        <ArticlePage article={article} />
      </main>
      <Footer />
    </>
  );
}
