import { defineConfig, devices } from '@playwright/test'

const config = defineConfig({
  testDir: './e2e',
  // できるだけ並列にテストを行う
  fullyParallel: true,

  // マルチブラウザテストを行う（追加したいテストブラウザがあればここに追加する）
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  webServer: {
    command: 'yarn dev',
    port: 3000,
  },
})

export default config
