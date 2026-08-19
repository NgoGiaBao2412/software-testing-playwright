# WBS 3.4: Web UI Test Suite - Visual Regression and Dynamic Data Masking

## Metadata

- **WBS Code:** `3.4`
- **Task Name:** UI Case 4: Visual Regression Testing & Dynamic Data Masking
- **Assignee:** Lê Minh Tài (MSSV: 0306241145)
- **Task Weight:** `6.0%`
- **Deliverable Artifacts:** File mã nguồn `tests/e2e/visual_regression.spec.ts`, các file ảnh Golden Snapshots, Pull Request GitHub, Mục 3.8 Chương 3 trong `67_Bao_cao.docx` và các Slide tương ứng trong `67_Slide.pptx`.

## TL;DR

- **Bản chất:** Kịch bản kiểm thử tự động Web UI Ca 4: Kiểm thử hồi quy trực quan (Visual Regression Testing) so khớp điểm ảnh (Pixel-by-Pixel) với `toHaveScreenshot()`.
- **Mục đích:** Phát hiện lỗi vỡ layout, tràn text, sai lệch màu sắc hoặc lệch vị trí CSS mà Functional Testing bỏ sót.
- **Điểm mấu chốt:** Triển khai kỹ thuật che dữ liệu động (Dynamic Data Masking) loại bỏ hoàn toàn cảnh báo sai lệch giả (False Positives).

## Core Architectural Content to Implement

### 1. Bản Chất Kỹ Thuật Của Visual Regression Testing

- **Functional Testing vs Visual Testing:**
  - *Functional:* Chỉ kiểm tra text/element có trong DOM, không phát hiện được vỡ giao diện hay lệch CSS.
  - *Visual Regression:* So khớp ảnh màn hình thực tế với Golden Reference Snapshot bằng thuật toán Pixelmatch.

### 2. Kỹ Thuật Che Dữ Liệu Động (Dynamic Data Masking)

```text
[ GIAO DIỆN THỰC TẾ ]                        [ KHI SO SÁNH ẢNH SNAPSHOT ]
+------------------------------------+       +------------------------------------+
|  Welcome, John Doe                 |       |  Welcome, John Doe                 |
|  Current Time: 14:32:05 (DYNAMIC!) | ----> |  Current Time: [ CHE HỘP ĐỒNG ]    |
|  Total Balance: $1,250.00          |       |  Total Balance: $1,250.00          |
+------------------------------------+       +------------------------------------+
  (Dữ liệu giờ thay đổi liên tục              (Che phần tử giờ bằng màu hồng,
   sẽ làm test fail nếu không mask!)           loại bỏ 100% lỗi False-Positive!)
```

### 3. Mã Nguồn Kiểm Thử Mẫu (`tests/e2e/visual_regression.spec.ts`)

```typescript
// tests/e2e/visual_regression.spec.ts
import { test, expect } from '@playwright/test';

test('Visual Regression on SauceDemo Inventory with Masking', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.locator('.inventory_list')).toBeVisible();

  // So khớp ảnh toàn trang với Dynamic Masking
  await expect(page).toHaveScreenshot('inventory-landing.png', {
    mask: [
      page.locator('.inventory_item_img'),
      page.locator('.shopping_cart_badge'),
    ],
    maxDiffPixelRatio: 0.02, // Cho phép sai lệch màu tối đa 2% pixel
    animations: 'disabled',  // Vô hiệu hóa animation
  });
});
```

### 4. Quy Trình Cập Nhật Golden Snapshots

```bash
# Tạo mới hoặc cập nhật ảnh Golden Snapshots khi UI chủ đích thay đổi
bunx playwright test tests/e2e/visual_regression.spec.ts --update-snapshots
```

---

## Acceptance Criteria & Definition of Done (DoD Checklist)

- [ ] **Mã Nguồn Kiểm Thử & Chạy Pass ($100\%$):**
  - [ ] Tạo file `tests/e2e/visual_regression.spec.ts`.
  - [ ] Chạy lệnh `bunx playwright test tests/e2e/visual_regression.spec.ts --project=chromium` pass $100\%$.
  - [ ] Thư mục `__snapshots__` chứa ảnh Golden Snapshot chuẩn.
- [ ] **Bằng Chứng Git & Pull Request:**
  - [ ] Tạo nhánh `feat/wbs-3.4-ui-visual-regression`.
  - [ ] Tạo Pull Request trên GitHub đính kèm ảnh visual diff và ảnh test pass.
  - [ ] Cập nhật link PR vào Google Sheets Master WBS.
- [ ] **Báo Cáo:**
  - [ ] Soạn thảo bản thảo Mục 3.8 Chương 3 cho Báo cáo Word (`67_Bao_cao.docx`).
