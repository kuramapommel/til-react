# setup

プロジェクトの雛形と必要なライブラリの追加

```zsh
yarn create vite sample --template react-ts
cd sample
yarn add react-router-dom @emotion/react @emotion/styled zod zustand
yarn add -D ts-node eslint prettier eslint-plugin-react eslint-config-prettier eslint-plugin-prettier @types/react-dom @testing-library/react @testing-library/jest-dom @testing-library/dom vite-tsconfig-paths vitest @vitest/ui msw
```

開発に使う Service Worker を生成

```zsh
npx msw init public/ --save
```
