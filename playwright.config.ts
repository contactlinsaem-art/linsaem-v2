import { defineConfig, devices } from "@playwright/test";

const port = 3100;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: `http://localhost:${port}`,
    locale: "fr-FR",
    trace: "retain-on-failure",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    // Build de production servi localement en mode « dry run » : ni Turnstile, ni email réel.
    command: `npx next build && npx next start --port ${port}`,
    url: `http://localhost:${port}/contact`,
    reuseExistingServer: !process.env.CI,
    timeout: 300_000,
    env: {
      CONTACT_DRY_RUN: "1",
      NEXT_PUBLIC_TURNSTILE_SITE_KEY: "",
    },
  },
});
