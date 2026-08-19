# WBS 1.6: Multi-Project Framework Setup and CI Pipeline

## Metadata

- **WBS Code:** `1.6`
- **Task Name:** Khởi tạo cấu trúc Multi-Project Framework, TypeScript, .env & CI Pipeline
- **Assignee:** Trần Văn Ngọc (MSSV: 0306241131)
- **Task Weight:** `2.0%`
- **Deliverable Artifacts:** File `playwright.config.ts`, `package.json`, `.github/workflows/playwright.yml` trong repository `software-testing-playwright`, PR #1 pass base command.

## TL;DR

- **Bản chất:** Khởi tạo cấu trúc framework kiểm thử chuẩn công nghiệp, cấu hình Playwright Multi-Project phân tách các tầng `api`, `chromium` (e2e), và `smoke`.
- **Mục đích:** Thiết lập nền tảng dự án, biến môi trường `.env`, cấu hình TypeScript và xây dựng pipeline CI/CD trên GitHub Actions với Bun.
- **Điểm mấu chốt:** Thống nhất $100\%$ cấu trúc thư mục `tests/api/`, `tests/e2e/`, `fixtures/`, `pages/`, `schemas/`.

## Core Architectural Blueprint

### 1. Cấu Trúc Thư Mục Repository Chuẩn Mực

```text
software-testing-playwright/
├── .github/
│   └── workflows/
│       └── playwright.yml         # CI/CD pipeline
├── tests/                         # Root test directory (Playwright testDir)
│   ├── api/                       # API Test Suite (WBS Phase 2)
│   │   ├── auth.spec.ts
│   │   ├── booking.spec.ts
│   │   ├── concurrency.spec.ts
│   │   └── rfc9457_throttling.spec.ts
│   ├── e2e/                       # Web UI Test Suite (WBS Phase 3)
│   │   ├── checkout.spec.ts
│   │   ├── network_mock.spec.ts
│   │   ├── glitch_diagnostics.spec.ts
│   │   └── visual_regression.spec.ts
│   └── smoke/                     # Healthcheck Baseline
│       └── smoke.spec.ts
├── fixtures/                      # Custom Fixtures mở rộng từ test.extend()
│   ├── api.fixture.ts
│   └── auth.fixture.ts
├── pages/                         # Page Object Model (POM & COM) cho Web UI
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   └── CheckoutPage.ts
├── schemas/                       # Zod validation schemas (chống Contract Drift)
│   └── rfc9457.schema.ts
├── utils/                         # Helper functions, data generators
├── playwright.config.ts
├── tsconfig.json
└── package.json
```

### 2. Cấu Hình Multi-Project trong `playwright.config.ts`

```typescript
import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ["html", { outputFolder: "playwright-report", open: "never" }],
    ["list"],
  ],

  projects: [
    {
      name: "api",
      testMatch: /.*tests\/api\/.*\.spec\.ts/,
      use: {
        baseURL:
          process.env.API_BASE_URL ||
          "https://ticket-booking-amqv.onrender.com",
        extraHTTPHeaders: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    },
    {
      name: "chromium",
      testMatch: /.*tests\/e2e\/.*\.spec\.ts/,
      use: {
        baseURL: process.env.WEB_BASE_URL || "https://www.saucedemo.com",
        ...devices["Desktop Chrome"],
        trace: "on-first-retry",
        screenshot: "only-on-failure",
        video: "retain-on-failure",
      },
    },
    {
      name: "smoke",
      testMatch: /.*tests\/smoke\/.*\.spec\.ts/,
      use: {
        baseURL: process.env.WEB_BASE_URL || "https://www.saucedemo.com",
        ...devices["Desktop Chrome"],
      },
    },
  ],
});
```

### 3. GitHub Actions CI Workflow (`.github/workflows/playwright.yml`)

```yaml
name: Playwright Tests CI

on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]

jobs:
  test:
    timeout-minutes: 30
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2
        with:
          bun-version: latest
      - name: Install dependencies
        run: bun install --frozen-lockfile
      - name: Install Playwright Browsers
        run: bunx playwright install --with-deps chromium
      - name: Run Playwright tests
        run: bunx playwright test
      - uses: actions/upload-artifact@v4
        if: ${{ !cancelled() }}
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 14
```

---

## Acceptance Criteria & Definition of Done (DoD Checklist)

- [ ] **Khởi Tạo Repository & Dependencies:**
  - [ ] Khởi tạo hoàn tất thư mục `software-testing-playwright/` với cấu trúc `tests/api/`, `tests/e2e/`, `fixtures/`, `pages/`, `schemas/`.
  - [ ] Cài đặt đầy đủ các package: `@playwright/test`, `typescript`, `zod`, `dotenv`.
- [ ] **Cấu Hình Multi-Project:**
  - [ ] Cấu hình `playwright.config.ts` với `testDir: './tests'` và các project `api`, `chromium`, `smoke`.
  - [ ] Chạy thử lệnh `bunx playwright test --list` hiển thị đầy đủ danh sách test thuộc các project.
- [ ] **Tích Hợp CI/CD:**
  - [ ] File `.github/workflows/playwright.yml` sử dụng `setup-bun` và kích hoạt thành công khi có Pull Request.
- [ ] **Bàn Giao & Phân Quyền:**
  - [ ] Cung cấp tài liệu mẫu cho 6 thành viên clone repo và chạy thử lệnh `bunx playwright test` ban đầu thành công.
