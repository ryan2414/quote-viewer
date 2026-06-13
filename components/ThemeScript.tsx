'use client';

import { useServerInsertedHTML } from 'next/navigation';

// React 렌더 트리 외부에서 서버 HTML 스트림에 직접 주입 → React 19 script 경고 없음
export default function ThemeScript() {
  useServerInsertedHTML(() => (
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark');}}catch(e){}})();`,
      }}
    />
  ));
  return null;
}
