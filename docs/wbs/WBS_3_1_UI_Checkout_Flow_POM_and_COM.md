# WBS 3.1: Web UI Test Suite - End-to-End Checkout Flow with POM & COM

## Metadata

- **WBS Code:** `3.1`
- **Task Name:** UI Case 1: E2E Checkout Flow, POM & COM
- **Assignee:** Lê Minh Quân (MSSV: 0306241143)
- **Task Weight:** `7.0%`
- **Deliverable Artifacts:** File mã nguồn `tests/e2e/checkout.spec.ts`, các lớp POM & COM trong `pages/`, Pull Request GitHub, Mục 3.5 Chương 3 trong `67_Bao_cao.docx` và các Slide tương ứng trong `67_Slide.pptx`.

## TL;DR

- **Bản chất:** Kịch bản kiểm thử tự động Web UI Ca 1: Luồng mua hàng End-to-End hoàn chỉnh trên hệ sinh thái SauceDemo.
- **Mục đích:** Triển khai mô hình hướng đối tượng phân lớp kép Page Object Model (POM) và Component Object Model (COM).
- **Điểm mấu chốt:** Triệt tiêu $100\%$ bộ định vị thô trong test file, sử dụng Role-based Locators.

## Core Architectural Content to Implement

### 1. Luồng Nghiệp Vụ Mua Hàng E2E (Full Checkout Flow)

```text
[LoginPage]           1. Đăng nhập với standard_user / secret_sauce
     |
     v
[InventoryPage]       2. Lọc sản phẩm (Price: Low to High) -> Thêm 2 món hàng vào giỏ
     |
     v
[NavbarComponent]     3. Kiểm tra Shopping Cart Badge hiển thị đúng số lượng "2"
     |
     v
[CartPage]            4. Kiểm tra danh sách items -> Click nút "Checkout"
     |
     v
[CheckoutPage]        5. Điền First Name, Last Name, Zip Code -> Click "Continue"
     |
     v
[CheckoutPage]        6. Xác thực bảng tính: Item total ($23.98) + Tax ($1.92) = Total ($25.90)
     |
     v
[CheckoutFinish]      7. Click "Finish" -> Xác thực thông báo: "Thank you for your order!"
```

### 2. Thiết Kế Kiến Trúc Phân Lớp POM & COM

1. **`pages/components/NavbarComponent.ts` (COM):** Menu, Reset App State, Shopping Cart Badge.
2. **`pages/LoginPage.ts` (POM):** Form đăng nhập & validation error message.
3. **`pages/InventoryPage.ts` (POM):** Danh sách sản phẩm, dropdown filter, nút `Add to cart` động.
4. **`pages/CartPage.ts` (POM):** Danh sách giỏ hàng, nút `Remove`, `Continue Shopping`, `Checkout`.
5. **`pages/CheckoutPage.ts` (POM):** Form điền thông tin, bảng đối soát giá tiền (Subtotal, Tax, Total), nút `Finish`.

### 3. Cấu Trúc Kịch Bản Kiểm Thử (`tests/e2e/checkout.spec.ts`)

```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test('E2E Full Checkout Flow on SauceDemo', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.navigate();
  await loginPage.login('standard_user', 'secret_sauce');

  await inventoryPage.sortByPriceAscending();
  await inventoryPage.addItemToCart('Sauce Labs Backpack');
  await inventoryPage.addItemToCart('Sauce Labs Bike Light');
  await expect(inventoryPage.navbar.cartBadge).toHaveText('2');

  await inventoryPage.navbar.openCart();
  await cartPage.proceedToCheckout();

  await checkoutPage.fillCustomerInfo('John', 'Doe', '700000');
  await checkoutPage.continueCheckout();

  await checkoutPage.verifySummaryPrices();
  await checkoutPage.finishCheckout();
  await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
});
```

---

## Acceptance Criteria & Definition of Done (DoD Checklist)

- [ ] **Mã Nguồn Kiểm Thử & Chạy Pass ($100\%$):**
  - [ ] Tạo đầy đủ các file Page/Component Objects trong `pages/` và file `tests/e2e/checkout.spec.ts`.
  - [ ] Chạy lệnh `bunx playwright test tests/e2e/checkout.spec.ts --project=chromium` pass $100\%$.
  - [ ] Áp dụng $100\%$ Role-based Locators (`getByRole`, `getByText`, `getByPlaceholder`).
- [ ] **Bằng Chứng Git & Pull Request:**
  - [ ] Tạo nhánh `feat/wbs-3.1-ui-checkout-pom`.
  - [ ] Tạo Pull Request trên GitHub với mô tả chi tiết, ảnh chụp màn hình chạy test pass.
  - [ ] Cập nhật link PR vào Google Sheets Master WBS.
- [ ] **Báo Cáo:**
  - [ ] Soạn thảo bản thảo Mục 3.5 Chương 3 cho Báo cáo Word (`67_Bao_cao.docx`).
