import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "에코트리 | 친환경 행사 운영 서비스",
  description: "대여부터 회수·세척까지, 다회용기 운영의 전 과정을 책임집니다. 행사를 바꾸는 친환경 솔루션, 에코트리",
  keywords: ["에코트리", "다회용기", "친환경", "행사", "축제", "다회용기 대여", "친환경 행사"],
  openGraph: {
    title: "에코트리 | 친환경 행사 운영 서비스",
    description: "대여부터 회수·세척까지, 다회용기 운영의 전 과정을 책임집니다.",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/pretendard@1.3.9/dist/web/static/pretendard.css"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
