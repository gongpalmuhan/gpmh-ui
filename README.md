# GPMH UI

GPMH 프로젝트가 공유하는 무채색 기반의 React UI 라이브러리입니다.

## Packages

- `@gpmh/tokens`: 색상, 간격, 반경, 그림자, 타이포그래피 토큰
- `@gpmh/ui`: 웹 React 컴포넌트
- `@gpmh/docs`: 개발 중인 컴포넌트 문서와 시각적 프리뷰
- `@gpmh/storybook`: 웹 React 컴포넌트의 상태별 Storybook과 접근성 확인

## Start

```bash
pnpm install
pnpm dev
```

`http://127.0.0.1:5173`에서 문서 프리뷰를 열 수 있습니다.

## Web Storybook

```bash
pnpm storybook
pnpm build-storybook
```

Storybook은 `http://127.0.0.1:6006`에서 실행되며, 정적 빌드는
`apps/storybook/storybook-static`에 생성됩니다. 기존 `pnpm dev` 문서 사이트는 그대로 유지됩니다.

스토리는 `packages/ui/src/*.stories.tsx`에 컴포넌트와 함께 둡니다. Controls에서 props를 바꾸고,
Docs에서 사용 예제를 확인하며, Accessibility 패널에서 접근성 검사 결과를 확인할 수 있습니다.
설정과 스토리의 타입 검사 및 전체 빌드는 `pnpm check`에 포함됩니다.
Storybook 도구는 루트와 앱의 devDependencies에만 두며, 스토리는 UI 패키지 빌드에서 제외합니다.

웹 Storybook과 미래의 React Native/Expo Storybook은 별도 환경으로 구성합니다.
토큰과 상태 시나리오는 공유하되, DOM 컴포넌트와 RN 컴포넌트의 구현은 분리합니다.
현재 구성은 [Storybook React + Vite](https://storybook.js.org/docs/get-started/frameworks/react-vite)와
[a11y addon](https://storybook.js.org/docs/writing-tests/accessibility-testing)을 사용합니다.

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
