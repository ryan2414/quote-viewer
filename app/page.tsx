import type { Metadata } from 'next';
import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import CtaSection from '@/components/landing/CtaSection';

export const metadata: Metadata = {
  title: 'Quote Viewer — 매일 명언과 성경 구절로 하루를 시작하세요',
  description:
    '위인들의 명언과 성경 구절로 매일 영감을 받으세요. 즐겨찾기, 수집, 공유까지 — Quote Viewer와 함께 하루를 풍요롭게.',
  openGraph: {
    title: 'Quote Viewer — 매일 명언과 성경 구절로 하루를 시작하세요',
    description: '위인들의 명언과 성경 구절로 매일 영감을 받으세요.',
  },
  twitter: {
    title: 'Quote Viewer — 매일 명언과 성경 구절로 하루를 시작하세요',
    description: '위인들의 명언과 성경 구절로 매일 영감을 받으세요.',
  },
  alternates: { canonical: '/' },
};

export default function LandingPage() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CtaSection />
    </main>
  );
}
