import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ecotree.co.kr"),
  title: "에코트리 | 친환경 행사 운영 서비스",
  description: "대여부터 회수·세척까지, 다회용기 운영의 전 과정을 책임집니다. 행사를 바꾸는 친환경 솔루션, 에코트리",
  keywords: ["에코트리", "다회용기", "친환경", "행사", "축제", "다회용기 대여", "친환경 행사"],
  openGraph: {
    title: "에코트리 | 친환경 행사 운영 서비스",
    description: "대여부터 회수·세척까지, 다회용기 운영의 전 과정을 책임집니다.",
    type: "website",
    locale: "ko_KR",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "에코트리 로고",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "에코트리 | 친환경 행사 운영 서비스",
    description: "대여부터 회수·세척까지, 다회용기 운영의 전 과정을 책임집니다.",
    images: ["/logo.png"],
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
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.png" sizes="48x48" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/pretendard@1.3.9/dist/web/static/pretendard.css"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Alexandria:wght@200&display=swap"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
