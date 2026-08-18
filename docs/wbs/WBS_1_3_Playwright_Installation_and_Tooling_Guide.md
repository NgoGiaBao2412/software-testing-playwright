---
tags: [type/method, topic/project-management, layer/quality]
status: permanent
date: 2026-08-14
description: Task specification, installation step-by-step tutorial, configuration guide, and Definition of Done for WBS 1.3
---

# WBS 1.3: Playwright Installation, Configuration, and Tooling Guide

## Metadata

- **WBS Code:** `1.3`
- **Task Name:** Hướng Dẫn Cài Đặt, Cấu Hình & Cách Sử Dụng Phần Mềm
- **Total Task Weight:** `4.0%`
- **Deliverable Artifacts:** Mục 2.1 & 2.2 Chương 2 trong `STT nhom_Bao cao.docx` và các Slide tương ứng trong `STT nhom_Slide.pptx`.

## TL;DR

Tài liệu hướng dẫn 2 thành viên phụ trách viết hướng dẫn từng bước khởi tạo dự án Playwright với NodeJS/Bun, giải thích chi tiết cấu trúc file cấu hình trung tâm `playwright.config.ts` và hướng dẫn cách làm chủ 4 công cụ thực thi kiểm thử (CLI commands, Codegen Record & Playback, UI Mode tương tác, Trace Viewer phân tích file `.zip`).

## Core Content to Document

### 1. Hướng Dẫn Khởi Tạo & Cài Đặt (Installation Guide)

```bash
# Bước 1: Khởi tạo dự án Playwright bằng npm / bun
npm init playwright@latest

# Các tùy chọn chọn trong quá trình setup:
# - Chọn ngôn ngữ: TypeScript (Khuyên dùng)
# - Thư mục chứa test: tests
# - Cài đặt trình duyệt Playwright: Yes
# - Cài đặt GitHub Actions CI: Yes

# Bước 2: Cài đặt thêm các gói hỗ trợ (Zod kiểm định schema, Dotenv quản lý biến môi trường)
npm install zod dotenv
```

### 2. Giải Thích Cấu Trúc File Cấu Hình `playwright.config.ts`

Người viết cần giải thích rõ ý nghĩa các trường cấu hình sau:

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',              // Thư mục chứa các file kiểm thử (*.spec.ts)
  fullyParallel: true,             // Cho phép chạy song song tất cả các file test
  forbidOnly: !!process.env.CI,    // Báo lỗi trên CI nếu vô tình để sót lệnh test.only
  retries: process.env.CI ? 2 : 0, // Số lần tự động chạy lại nếu test bị fail
  workers: process.env.CI ? 1 : undefined, // Số lượng luồng worker chạy đồng thời
  
  reporter: [
    ['html', { open: 'never' }],   // Báo cáo HTML trực quan
    ['list']                       // Hiển thị kết quả dạng danh sách trên terminal
  ],

  use: {
    baseURL: 'https://www.saucedemo.com', // Đường dẫn web mặc định
    trace: 'on-first-retry',              // Thu thập trace khi test bị fail lần đầu
    screenshot: 'only-on-failure',        // Tự động chụp ảnh khi có lỗi
    video: 'retain-on-failure',           // Tự động quay video khi có lỗi
  },

  projects: [
    { name: 'api-tests', testMatch: /.*api\/.*\.spec\.ts/ }, // Dự án API (không render UI)
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } }, // Dự án Web UI Chromium
  ],
});
```

### 3. Hướng Dẫn Sử Dụng 4 Công Cụ Thực Thi Cốt Lõi

1. **Giao diện Dòng Lệnh (CLI Execution):**
   * Chạy toàn bộ test: `npx playwright test`
   * Chạy riêng tầng API: `npx playwright test --project=api-tests`
   * Chạy riêng tầng Web UI: `npx playwright test --project=chromium`
   * Xem báo cáo HTML: `npx playwright show-report`
2. **Giao diện Sinh Code Tự Động (Playwright Codegen):**
   * Lệnh: `npx playwright codegen https://www.saucedemo.com`
   * Thao tác trên trình duyệt, quan sát cửa sổ Inspector tự động sinh code TypeScript.
3. **Giao diện Tương Tác Thời Gian Thực (Playwright UI Mode):**
   * Lệnh: `npx playwright test --ui`
   * Hướng dẫn xem cây test, tính năng Time-travel xem DOM snapshot, tab Network và Console.
4. **Giao diện Điều Tra Lỗi Hậu Kỳ (Trace Viewer):**
   * Lệnh: `npx playwright show-trace test-results/trace.zip`
   * Hướng dẫn tua lại filmstrip video và xem request mạng khi bài test gặp sự cố.

---

## Acceptance Criteria & Definition of Done (DoD Checklist)

- [ ] **Báo cáo Word (`STT nhom_Bao cao.docx`):**
  - [ ] Soạn thảo đầy đủ Mục 2.1 & 2.2 Chương 2: Hướng dẫn cài đặt, giải thích code `playwright.config.ts`, hướng dẫn sử dụng 4 công cụ.
  - [ ] Chụp ảnh thực tế màn hình cửa sổ Codegen và màn hình UI Mode đưa vào tài liệu.
  - [ ] Code block trong Word được đóng khung và tô màu cú pháp rõ ràng.
- [ ] **Slide Thuyết Trình (`STT nhom_Slide.pptx`):**
  - [ ] Thiết kế 2 - 3 slide trình bày ngắn gọn các lệnh CLI quan trọng và hình ảnh demo Codegen/UI Mode.
- [ ] **Review & Bàn Giao:**
  - [ ] Nộp bản thảo cho Trưởng nhóm review đúng thời hạn.

## Related Notes

- [[Playwright_Trace_Viewer_and_Post_Mortem_Diagnostics]]
- [[Distributed_CI_CD_Sharding_and_Blob_Report_Merging]]
- [[Team_Work_Breakdown_and_Contribution_Matrix_Template]]
