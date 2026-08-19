# WBS 3.2: Web UI Test Suite - Network Mocking and UI Error Handling

## Metadata

- **WBS Code:** `3.2`
- **Task Name:** UI Case 2: Network Interception & Error Mocking
- **Assignee:** Ngô Gia Bảo (MSSV: 0306241090)
- **Task Weight:** `6.0%`
- **Deliverable Artifacts:** File mã nguồn `tests/e2e/network_mock.spec.ts`, Pull Request GitHub, Mục 3.6 Chương 3 trong `67_Bao_cao.docx` và các Slide tương ứng trong `67_Slide.pptx`.

## TL;DR

- **Bản chất:** Kịch bản kiểm thử tự động Web UI Ca 2: Khả năng chịu lỗi của giao diện người dùng (UI Fault Tolerance & Graceful Degradation).
- **Mục đích:** Kiểm tra phản hồi khi tài khoản bị khóa (`locked_out_user`) và can thiệp tầng mạng ở cấp độ CDP (`page.route()`) giả lập lỗi HTTP 500.
- **Điểm mấu chốt:** Xác thực giao diện hiển thị Error Banner thay vì bị crash/trắng màn hình khi backend gặp sự cố.

## Core Architectural Content to Implement

### 1. Kịch Bản 1: Kiểm Thử Tài Khoản Bị Khóa (Locked-Out User)

1. Điều hướng đến `https://www.saucedemo.com`.
2. Nhập thông tin: `username: locked_out_user`, `password: secret_sauce` $\to$ Click `Login`.
3. Xác thực thông báo lỗi: `Epic sadface: Sorry, this user has been locked out.`.
4. Xác thực input viền đỏ cảnh báo lỗi và biểu tượng `svg.error_icon`.

### 2. Kịch Bản 2: Can Thiệp Tầng Mạng Giả Lập Lỗi HTTP 500 (`page.route()`)

```text
+-------------------+                                                                +-------------------+
|  Browser Engine   | ----> HTTP GET /api/v1/products -----------------------------> |  Backend Server   |
|  (Chromium DOM)   |                                                                |  (Bị Playwright   |
+-------------------+                                                                |   chặn trước khi  |
        ^                                                                            |   tới server!)    |
        |                                                                            +-------------------+
        |                                                                                      |
        +=================== HTTP 500 Internal Server Error <==================================+
                             (Playwright page.route() fulfill trực tiếp từ RAM)
```

```typescript
// tests/e2e/network_mock.spec.ts
import { test, expect } from '@playwright/test';

test('UI Graceful Degradation on HTTP 500 Server Error', async ({ page }) => {
  // Can thiệp vào request mạng trước khi rời khỏi trình duyệt
  await page.route('**/api/v1/inventory', async (route) => {
    await route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({ error: 'Database Connection Failed' }),
    });
  });

  await page.goto('/inventory.html');
  
  // Xác thực Error Banner hiển thị
  const errorBanner = page.getByRole('alert');
  await expect(errorBanner).toBeVisible();
  await expect(errorBanner).toContainText('Unable to load products. Please try again later.');
});
```

---

## Acceptance Criteria & Definition of Done (DoD Checklist)

- [ ] **Mã Nguồn Kiểm Thử & Chạy Pass ($100\%$):**
  - [ ] Tạo file `tests/e2e/network_mock.spec.ts`.
  - [ ] Chạy lệnh `bunx playwright test tests/e2e/network_mock.spec.ts --project=chromium` pass $100\%$.
  - [ ] Kiểm chứng đầy đủ cả 2 kịch bản: Locked-out user và `page.route()` HTTP 500.
- [ ] **Bằng Chứng Git & Pull Request:**
  - [ ] Tạo nhánh `feat/wbs-3.2-ui-network-mock`.
  - [ ] Tạo Pull Request trên GitHub với mô tả chi tiết và ảnh chụp màn hình test pass.
  - [ ] Cập nhật link PR vào Google Sheets Master WBS.
- [ ] **Báo Cáo:**
  - [ ] Soạn thảo bản thảo Mục 3.6 Chương 3 cho Báo cáo Word (`67_Bao_cao.docx`).
