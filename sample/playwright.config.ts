import { defineConfig, devices } from '@playwright/test'

const config = defineConfig({
  testDir: './e2e',
  // できるだけ並列にテストを行う
  fullyParallel: true,

  // マルチブラウザテストを行う（追加したいテストブラウザがあればここに追加する）
  projects: [
    {
      name: 'Pixel 4',
      use: {
        browserName: 'chromium',
        ...devices['Pixel 4'],
      },
    },
    {
      name: 'iPhone 11',
      use: {
        browserName: 'webkit',
        ...devices['iPhone 11'],
      },
    },
  ],

  webServer: {
    command: 'yarn dev',
    port: 3000,
  },
})

export default config
