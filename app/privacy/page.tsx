import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen py-20 lg:py-32">
        <div className="w-full max-w-[1100px] min-w-[688px] mx-auto px-10 xl:px-0">
          <h1 className="text-[40px] md:text-[64px] font-bold text-[#111111] mb-8">
            개인정보처리방침
          </h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-[16px] text-[#727783] leading-relaxed">
              이 페이지는 준비 중입니다. 개인정보처리방침 내용이 여기에 표시됩니다.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
