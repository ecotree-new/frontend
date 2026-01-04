import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function FoodtruckPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen py-20 lg:py-32">
        <div className="w-full max-w-[1100px] min-w-[688px] mx-auto px-10 xl:px-0">
          <h1 className="text-[40px] md:text-[64px] font-bold text-[#111111] mb-8">
            세계음식 한국 푸드트럭 중앙회
          </h1>
          <p className="text-[16px] md:text-[20px] text-[#727783]">
            이 페이지는 준비 중입니다.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
