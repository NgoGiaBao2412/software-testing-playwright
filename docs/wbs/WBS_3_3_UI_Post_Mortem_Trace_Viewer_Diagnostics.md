# WBS 3.3: Web UI Test Suite - Post-Mortem Diagnostics with Trace Viewer

## Metadata

- **WBS Code:** `3.3`
- **Task Name:** UI Case 3: Trace Viewer Diagnostics & Performance Glitch
- **Assignee:** Lê Minh Tài (MSSV: 0306241145)
- **Task Weight:** `6.0%`
- **Deliverable Artifacts:** File mã nguồn `tests/e2e/glitch_diagnostics.spec.ts`, file dữ liệu `trace.zip`, Pull Request GitHub, Mục 3.7 Chương 3 trong `67_Bao_cao.docx` và các Slide tương ứng trong `67_Slide.pptx`.

## TL;DR

- **Bản chất:** Kịch bản kiểm thử tự động Web UI Ca 3: Chẩn đoán nghẽn hiệu năng giao diện (Performance Bottleneck) qua tài khoản `performance_glitch_user`.
- **Mục đích:** Sử dụng Playwright Trace Viewer xuất file nén `trace.zip`, phân tích nguyên nhân gốc rễ (Root Cause Analysis).
- **Điểm mấu chốt:** Tái hiện chi tiết 4 luồng dữ liệu kiểm toán (Filmstrip, Network Waterfall, DOM Snapshot, Console Logs).

## Core Architectural Content to Implement

### 1. Kịch Bản Kiểm Thử Lỗi Hiệu Năng (`performance_glitch_user`)

- **Bản chất sự cố:** Tài khoản `performance_glitch_user` bị delay $5000\text{ms}$ ($5\text{s}$) trước khi tải xong Inventory.
- **Giải pháp Playwright:** Tận dụng **Auto-waiting** với ngưỡng timeout linh hoạt (`timeout: 10000`) và thu thập toàn bộ vết vào `trace.zip`.

### 2. Kỹ Thuật Lập Trình Thu Thập Trace Programmatic

```typescript
// tests/e2e/glitch_diagnostics.spec.ts
import { test, expect } from '@playwright/test';

test('Diagnose Performance Glitch User with Trace Viewer', async ({ browser }) => {
  const context = await browser.newContext();
  
  // Bắt đầu ghi trace toàn diện
  await context.tracing.start({
    screenshots: true,
    snapshots: true,
    sources: true,
  });

  const page = await context.newPage();
  await page.goto('https://www.saucedemo.com');

  await page.getByPlaceholder('Username').fill('performance_glitch_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  // Chờ danh sách sản phẩm với Auto-waiting 10s
  const inventoryList = page.locator('.inventory_list');
  await expect(inventoryList).toBeVisible({ timeout: 10000 });

  // Dừng ghi trace và xuất file zip kiểm toán
  await context.tracing.stop({
    path: 'test-results/glitch_diagnostics_trace.zip',
  });
});
```

### 3. Quy Trình Khám Nghiệm Sự Cố Bằng Trace Viewer

```bash
# Mở file zip vừa xuất với Bun
bunx playwright show-trace test-results/glitch_diagnostics_trace.zip
```

- **4 Bằng chứng kỹ thuật trích xuất vào Báo cáo:**
  1. **Filmstrip Timeline:** Chứng minh màn hình trắng/treo trong khoảng thời gian từ $0.5\text{s} \to 5.2\text{s}$.
  2. **Network Waterfall HAR:** Chỉ ra thanh request `POST /login` hoặc `GET /inventory` có Waiting Time kéo dài $5020\text{ms}$.
  3. **DOM Snapshot Before & After:** So sánh trạng thái DOM trước và sau action.
  4. **Call Log Timing:** Thống kê thời gian Playwright tự động polling chờ phần tử.

---

## Acceptance Criteria & Definition of Done (DoD Checklist)

- [ ] **Mã Nguồn Kiểm Thử & Chạy Pass ($100\%$):**
  - [ ] Tạo file `tests/e2e/glitch_diagnostics.spec.ts`.
  - [ ] Chạy lệnh `bunx playwright test tests/e2e/glitch_diagnostics.spec.ts --project=chromium` pass $100\%$.
  - [ ] Xuất thành công file `test-results/glitch_diagnostics_trace.zip`.
- [ ] **Bằng Chứng Git & Pull Request:**
  - [ ] Tạo nhánh `feat/wbs-3.3-ui-trace-diagnostics`.
  - [ ] Tạo Pull Request trên GitHub đính kèm ảnh chụp phân tích Network Waterfall và Filmstrip từ Trace Viewer.
  - [ ] Cập nhật link PR vào Google Sheets Master WBS.
- [ ] **Báo Cáo:**
  - [ ] Soạn thảo bản thảo Mục 3.7 Chương 3 cho Báo cáo Word (`67_Bao_cao.docx`).
