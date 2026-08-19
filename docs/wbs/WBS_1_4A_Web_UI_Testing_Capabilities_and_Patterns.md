# WBS 1.4A: Web UI Testing Capabilities and Design Patterns

## Metadata

- **WBS Code:** `1.4A`
- **Task Name:** Phân tích Năng lực Web UI (POM, COM, Role Locators, Network Mocking)
- **Assignee:** Lê Minh Quân (MSSV: 0306241143)
- **Task Weight:** `2.5%`
- **Deliverable Artifacts:** Mục 2.3 Chương 2 trong `67_Bao_cao.docx` và các Slide tương ứng trong `67_Slide.pptx`.

## TL;DR

- **Bản chất:** Đặc tả 3 trụ cột kỹ thuật kiểm thử Web UI: Mô hình phân lớp Page Object Model (POM) kết hợp Component Object Model (COM), chiến lược định vị bền vững Role-based Locators, và can thiệp tầng mạng `page.route()`.
- **Mục đích:** Xây dựng khung kiến trúc cho toàn bộ bộ kiểm thử E2E Web UI của đồ án.
- **Điểm mấu chốt:** Triệt tiêu hoàn toàn selector thô (XPath/CSS) trong file kịch bản kiểm thử.

## Core Architectural Content to Document

### 1. Kiến Trúc Phân Lớp POM & COM

```text
pages/
├── components/                 <-- Component Object Model (Tái sử dụng đa trang)
│   └── NavbarComponent.ts      <-- Menu, Shopping Cart Badge, Logout button
├── LoginPage.ts                <-- Form đăng nhập & validation error
├── InventoryPage.ts            <-- Danh sách sản phẩm, filter giá, add-to-cart
├── CartPage.ts                 <-- Giỏ hàng, danh sách item, nút Checkout
└── CheckoutPage.ts             <-- Form điền thông tin, tổng tiền, nút Finish

tests/e2e/                      <-- Test Scenarios (Ngắn gọn, rõ ràng, dễ bảo trì)
└── checkout.spec.ts            <-- Kịch bản kiểm thử E2E hoàn chỉnh
```

- **Nguyên lý Single Responsibility:** Tách biệt phần tử giao diện (Locators) và phương thức nghiệp vụ khỏi kịch bản kiểm thử (`expect`).
- **Component Object Model (COM):** Đóng gói các thành phần giao diện dùng chung (Navbar, Header, Footer) thành class độc lập nhúng vào Page Objects.

### 2. Chiến Lược Định Vị Bền Vững (Role-Based Locators)

- **Thứ tự ưu tiên locator:**
  1. `page.getByRole('button', { name: 'Submit' })` (Ưu tiên số 1: Trợ năng & hành vi người dùng thực).
  2. `page.getByLabel('Username')` (Định vị qua label form).
  3. `page.getByPlaceholder('Enter your email')` (Định vị qua placeholder).
  4. `page.getByTestId('checkout-btn')` (Định vị qua `data-testid`).
- **Anti-patterns nghiêm cấm:** Không dùng XPath tuyệt đối (`/html/body/div[2]/...`) hoặc class CSS ngẫu nhiên (`.btn-primary-2x`).

### 3. Can Thiệp Tầng Mạng & Mocking (`page.route()`)

```typescript
// Gia lap HTTP 500 ma khong can can thiep backend that
await page.route("**/api/v1/inventory", async (route) => {
  await route.fulfill({
    status: 500,
    contentType: "application/json",
    body: JSON.stringify({ error: "Internal Server Error" }),
  });
});
```

---

## Acceptance Criteria & Definition of Done (DoD Checklist)

- [ ] **Báo cáo Word (`67_Bao_cao.docx`):**
  - [ ] Hoàn thành Mục 2.3 Chương 2: Phân tích kiến trúc POM/COM, chiến lược định vị Role-based Locators và kỹ thuật `page.route()`.
  - [ ] Đính kèm sơ đồ cấu trúc thư mục phân lớp và code mẫu `page.route()`.
- [ ] **Review & Bàn Giao:**
  - [ ] Nộp bản thảo Word cho Trưởng nhóm nghiệm thu đúng hạn.
