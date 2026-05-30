'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  // 현재 경로로 활성 링크 결정
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: '오늘의 명언' },
    { href: '/quotes', label: '명언 목록' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* 로고 / 브랜드명 */}
        <Link
          href="/"
          className="text-xl font-bold text-gray-900 dark:text-white tracking-tight hover:opacity-80 transition-opacity"
        >
          Quote Viewer
        </Link>

        {/* 네비게이션 링크 */}
        <nav aria-label="주요 네비게이션">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => {
              // 홈 경로는 정확히 일치, 나머지는 시작 여부로 판단
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href);

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
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
    </header>
  );
}
