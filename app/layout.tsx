import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quote Viewer",
  description: "매일 새로운 명언으로 영감을 받으세요",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      {/*
        suppressHydrationWarning: 시스템 다크 모드 감지 시
        서버/클라이언트 HTML 불일치(hydration mismatch)를 방지합니다.
        body에 배경색을 명시하여 다크 모드 전환 시 배경 깜빡임(FOUC)을 방지합니다.
      */}
      <body className="min-h-full flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-200">
        {/* 헤더: 모든 페이지 상단에 공통 마운트 */}
        <Header />
        <div className="flex-1">
          {children}
        </div>
      </body>
    </html>
  );
}
