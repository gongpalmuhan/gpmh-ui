# GPMH UI

GPMH 프로젝트가 공유하는 무채색 기반의 React UI 라이브러리입니다.

## Packages

- `@gpmh/tokens`: 색상, 간격, 반경, 그림자, 타이포그래피 토큰
- `@gpmh/ui`: 웹 React 컴포넌트
- `@gpmh/docs`: 개발 중인 컴포넌트 문서와 시각적 프리뷰

## Start

```bash
pnpm install
pnpm dev
```

`http://127.0.0.1:5173`에서 문서 프리뷰를 열 수 있습니다.

## Package usage

```tsx
import { Button } from '@gpmh/ui';
import '@gpmh/tokens/tokens.css';
import '@gpmh/ui/styles.css';

export function SaveButton() {
  return <Button>저장</Button>;
}
```

## Before the first npm publish

1. npm scope가 `@gpmh`인지 확인합니다.
2. 공개 패키지의 라이선스를 결정합니다.
3. `pnpm check`를 통과시킵니다.
4. Changesets로 버전 변경을 기록하고, `@gpmh/ui`와 `@gpmh/tokens`를 함께 배포합니다.

공개 scoped package의 첫 배포에는 `npm publish --access public`이 필요합니다.
