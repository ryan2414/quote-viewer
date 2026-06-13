'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sun, Moon, LogIn, LogOut } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/hooks/useAuth';
import AuthModal from '@/components/AuthModal';
import StreakBadge from '@/components/StreakBadge';

export default function Header() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { user, isLoading, signOut } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const tNav = useTranslations('nav');
  const tCommon = useTranslations('common');

  const navLinks = [
    { href: '/quotes', label: tNav('quotes') },
    { href: '/scriptures', label: tNav('scriptures') },
    { href: '/today', label: tNav('history') },
    ...(user ? [{ href: '/profile', label: tNav('profile') }] : []),
  ];

  return (
    /* 헤더: 스크롤 고정, 반투명 블러 배경으로 콘텐츠 위 부유 표현 */
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-gray-950/90 backdrop-blur-md border-b border-gray-200/80 dark:border-gray-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-4">

        {/* 로고 / 브랜드명: 모바일에서 약간 작게 */}
        <Link
          href="/"
          className="flex items-center gap-2 shrink-0"
          aria-label="Quote Viewer 홈으로 이동"
        >
          {/* 로고 아이콘: 소형 장식 요소 */}
          <span
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gray-900 dark:bg-white flex items-center justify-center shrink-0"
            aria-hidden="true"
          >
            <svg
              className="w-4 h-4 sm:w-4 sm:h-4 text-white dark:text-gray-900"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </span>
          {/* 브랜드명: sm 미만에서는 짧게 표시 */}
          <span className="font-bold text-gray-900 dark:text-white tracking-tight text-base sm:text-lg hover:opacity-80 transition-opacity">
            <span className="hidden sm:inline">Quote Viewer</span>
            <span className="sm:hidden">QV</span>
          </span>
        </Link>

        {/* 우측: 네비게이션 + 다크모드 토글 + 인증 */}
        <div className="flex items-center gap-1">
        {/* 스트릭 배지 */}
        <StreakBadge />
        {/* 다크모드 토글 버튼 */}
        <button
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? tCommon('lightMode') : tCommon('darkMode')}
          className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors duration-150"
        >
          {theme === 'dark'
            ? <Sun className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            : <Moon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />}
        </button>

        {/* 인증 UI */}
        {isLoading ? (
          /* 세션 로딩 중: 레이아웃 점프 방지용 스켈레톤 */
          <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
        ) : user ? (
          /* 로그인 상태: 이니셜 아바타 + 로그아웃 버튼 */
          <div className="flex items-center gap-1">
            <div
              className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold select-none"
              aria-label={user.email ?? '사용자'}
              title={user.email ?? '사용자'}
            >
              {(user.email?.[0] ?? '?').toUpperCase()}
            </div>
            <button
              onClick={signOut}
              aria-label={tNav('logout')}
              className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors duration-150"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          /* 비로그인 상태: 로그인 버튼 */
          <button
            onClick={() => setIsAuthModalOpen(true)}
            aria-label={tNav('login')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors duration-150"
          >
            <LogIn className="w-4 h-4" />
            <span className="hidden sm:inline">{tNav('login')}</span>
          </button>
        )}

        {/* 주요 네비게이션: 모바일/데스크톱 모두 표시 (링크 수가 적어 접기 불필요) */}
        <nav aria-label="주요 네비게이션">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => {
              /* 홈 경로는 정확히 일치, 나머지는 경로 시작 여부로 활성 판단 */
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href);

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors duration-150 ${
                      isActive
                        ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                        : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        </div>
      </div>

      {/* 로그인 모달 */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </header>
  );
}
