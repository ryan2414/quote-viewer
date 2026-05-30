# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 기술 스택

- **Next.js 16.2.6** — App Router 기반 React 프레임워크
- **React 19.2.4** — UI 라이브러리
- **TypeScript** — 타입 안정성
- **Tailwind CSS 4** — 유틸리티 기반 스타일링
- **ESLint 9** — 코드 품질 관리

## 프로젝트 구조

```
quote-viewer/
├── app/
│   ├── layout.tsx         # 루트 레이아웃
│   ├── page.tsx           # 홈페이지
│   └── globals.css        # 전역 스타일
├── mcp-shrimp-task-manager/  # 로컬 MCP 서버 (작업 관리)
├── package.json
├── tsconfig.json
├── next.config.ts
├── eslint.config.mjs
└── .mcp.json              # MCP 서버 설정
```

### Next.js 16 주요 변경사항

AGENTS.md에 명시된 대로, 이 버전의 Next.js는 기존 버전과 주요 API와 컨벤션이 다릅니다. 코드를 작성하기 전에 `node_modules/next/dist/docs/`의 가이드를 반드시 참고하세요.

## 개발 명령어

```bash
# 개발 서버 실행 (포트 3000)
npm run dev

# 프로덕션 빌드
npm run build

# 빌드된 앱 실행
npm start

# 코드 린트
npm run lint
```

## 핵심 아키텍처

### App Router 구조
- `app/` 디렉토리 기반 파일 라우팅
- `layout.tsx` — 중첩 레이아웃 정의
- `page.tsx` — 라우트 페이지
- Server Components가 기본값

### 스타일링
- Tailwind CSS 4의 새로운 CSS 변수 기반 구조 사용
- `globals.css`에서 전역 스타일 정의
- 클래스 이름으로 반응형 디자인 구현 (예: `sm:`, `md:`, `dark:`)

### TypeScript 설정
- Path alias: `@/*` → 프로젝트 루트
- Strict 모드 활성화
- Next.js 플러그인 포함으로 자동 타입 생성

## MCP 서버 통합

### shrimp-task-manager
로컬 Node.js 기반 MCP 서버로 작업 관리 기능을 제공합니다:
- 위치: `mcp-shrimp-task-manager/`
- 데이터 디렉토리: `shrimp_data/`
- `/mcp` 명령으로 연결 상태 확인 가능

### 활용 가능한 MCP 서버
`.mcp.json`에 설정된 기타 MCP 서버:
- **playwright** — 브라우저 자동화
- **context7** — 라이브러리 문서 검색
- **sequential-thinking** — 복잡한 추론 작업
- **shadcn** — UI 컴포넌트 관리

## 개발 워크플로우

1. **기능 개발**
   - `app/` 디렉토리에 새 라우트 추가
   - Server/Client Component 구분 고려
   - TypeScript 타입 정의로 안정성 보장

2. **스타일 작업**
   - Tailwind 클래스 직접 작성
   - Dark mode는 `dark:` 프리픽스 사용
   - 반응형은 `sm:`, `md:`, `lg:` 등 사용

3. **테스트 및 배포**
   - `npm run lint` — 코드 품질 확인
   - `npm run build` — 프로덕션 빌드 검증
   - `npm start` — 로컬에서 프로덕션 환경 테스트

## 주의사항

- `next.config.ts`는 현재 기본 설정만 포함 — 필요시 옵션 추가
- 환경 변수는 `.env.local` 사용 (git에서 제외됨)
- 공개 에셋은 `public/` 디렉토리에 배치
