# setup

プロジェクトの雛形と必要なライブラリの追加

```zsh
yarn create vite sample --template react-ts
cd sample
yarn add react-router-dom @emotion/react @emotion/styled react-hook-form zod @hookform/resolvers zustand
yarn add -D ts-node '@typescript-eslint/eslint-plugin@^7.8.0' '@typescript-eslint/parser@^7.8.0' 'eslint@8' prettier eslint-plugin-react eslint-config-prettier eslint-plugin-prettier @types/react-dom tailwindcss postcss autoprefixer @testing-library/react @testing-library/jest-dom @testing-library/dom vite-tsconfig-paths vitest @vitest/ui @playwright/test msw
```

開発に使う Service Worker を生成

```zsh
npx msw init public/ --save
```

Tailwind CSS を扱えるようにする  
参考： https://tailwindcss.com/docs/guides/vite

```zsh
npx tailwindcss init -p
```

Storybook を導入する

```zsh
npx sb init --builder=vite
```

PlayWright をセットアップする

```zsh
npx playwright install
```
