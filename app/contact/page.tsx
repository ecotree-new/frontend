import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen py-20 lg:py-32">
        <div className="w-full max-w-[1100px] min-w-[688px] mx-auto px-10 xl:px-0">
          <h1 className="text-[40px] md:text-[64px] font-bold text-[#111111] mb-8">
            문의하기
          </h1>
          <p className="text-[16px] md:text-[20px] text-[#727783] mb-12">
            에코트리 서비스에 대해 궁금한 점이 있으시면 문의해 주세요.
          </p>

          {/* Contact Form Placeholder */}
          <div className="bg-[#EDF3FF] rounded-2xl p-8 md:p-12">
            <form className="space-y-6">
              <div>
                <label className="block text-[14px] font-medium text-[#111111] mb-2">
                  이름
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B67FF]"
                  placeholder="이름을 입력해 주세요"
                />
              </div>
              <div>
                <label className="block text-[14px] font-medium text-[#111111] mb-2">
                  연락처
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B67FF]"
                  placeholder="연락처를 입력해 주세요"
                />
              </div>
              <div>
                <label className="block text-[14px] font-medium text-[#111111] mb-2">
                  이메일
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B67FF]"
                  placeholder="이메일을 입력해 주세요"
                />
              </div>
              <div>
                <label className="block text-[14px] font-medium text-[#111111] mb-2">
                  문의 내용
                </label>
                <textarea
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B67FF] resize-none"
                  placeholder="문의 내용을 입력해 주세요"
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-[#1B67FF] text-white font-medium rounded-full hover:font-bold transition-all"
              >
                문의하기
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
