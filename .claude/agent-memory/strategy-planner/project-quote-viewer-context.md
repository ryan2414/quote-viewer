---
name: project-quote-viewer-context
description: Quote Viewer 프로젝트 현황, 기획 문서 위치, 전략 방향 — 기획 작업 시 참조
metadata:
  type: project
---

Quote Viewer는 솔로 개발자(이승재)가 운영하는 미니멀 명언 웹 서비스다. 2026-05-31 기준 Phase 5 진행 예정 상태.

**현황**
- 52개 명언, 5개 카테고리(wisdom/motivation/life/courage/love)
- localStorage 기반, 서버/DB 없음
- Vercel 배포 완료, Vercel Analytics 적용
- Next.js 16.2.6 + React 19.2.4 + TypeScript + Tailwind CSS 4

**완료된 기획 문서 (2026-05-31 작성)**
- `docs/GROWTH_STRATEGY.md` — 성장 전략 (SEO, 바이럴, KPI)
- `docs/FEATURE_BACKLOG.md` — 기능 백로그 및 우선순위
- `docs/UX_IMPROVEMENT_PLAN.md` — UX 개선 계획 (Quick Wins 포함)
- `docs/CONTENT_STRATEGY.md` — 콘텐츠 전략 (명언 확장, SEO 구조)

**전략 방향 요약**
- 단기 성장 엔진: SEO + 소셜 공유 바이럴 (명언 개별 페이지 `/quotes/[id]` 최우선)
- 재방문 엔진: PWA + 습관 형성 루프
- 콘텐츠 목표: 52개 → 100개 → 200개 → 500개
- 수익화: 1만 UV 이전까지 무광고, 이후 Buy Me a Coffee → 프리미엄 기능
- North Star Metric: DAU (일간 활성 사용자)

**Why:** 기획 문서들이 서로 연결된 전략을 담고 있어, 이후 기획 작업 시 이 컨텍스트를 알아야 일관성 있는 조언 가능.
**How to apply:** 새로운 기능/전략을 논의할 때 기존 문서와 중복되거나 충돌하지 않는지 확인. 솔로 개발자 관점에서 구현 가능성을 항상 먼저 검토.
