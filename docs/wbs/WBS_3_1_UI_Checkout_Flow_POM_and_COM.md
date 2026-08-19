# WBS 3.1: Web UI Test Suite - E2E Checkout Flow with POM and COM

## Metadata

- **WBS Code:** `3.1`
- **Task Name:** Web UI Ca 1: Luồng Mua Hàng E2E Checkout POM & COM trên SauceDemo
- **Assignee:** Lê Minh Quân (MSSV: 0306241143)
- **Task Weight:** `7.0%`
- **Deliverable Artifacts:** File mã nguồn `tests/e2e/checkout.spec.ts`, các lớp đối tượng `pages/` và `pages/components/`, Pull Request GitHub, Mục 3.3.1 Chương 3 trong `67_Bao_cao.docx` / `67_Bao_cao.tex`.

## TL;DR

- **Bản chất:** Đặc tả nhiệm vụ hiện thực ca kiểm thử tự động giao diện Web UI Ca 1: Luồng nghiệp vụ mua hàng xuyên suốt (End-to-End Checkout Flow) trên hệ thống SauceDemo.
- **Mục đích:** Áp dụng kết hợp mẫu thiết kế **Page Object Model (POM)** và **Component Object Model (COM)** để đóng gói mã nguồn, loại bỏ lặp code và tăng khả năng bảo trì.
- **Điểm mấu chốt:** Khử sạch $100\%$ các bộ định vị dễ vỡ (Brittle Locators như XPath tuyệt đối), chỉ sử dụng User-Facing Locators chuẩn (`getByRole`, `getByTestId`, `getByText`).

---

## 1. Mục Tiêu & Bối Cảnh Nghiệp Vụ (Business & Technical Context)

- **Bối cảnh ứng dụng:**
  - Ứng dụng SauceDemo (`https://www.saucedemo.com`) là sàn thương mại điện tử chuẩn để đánh giá năng lực kiểm thử Web UI.
  - Luồng mua hàng hoàn chỉnh gồm các giai đoạn:
    1. Đăng nhập với tài khoản hợp lệ (`standard_user`).
    2. Trang danh mục sản phẩm (Inventory): Thêm nhiều sản phẩm vào giỏ hàng, kiểm tra số lượng trên biểu tượng giỏ hàng (Cart Badge).
    3. Trang giỏ hàng (Cart): Xác nhận danh sách sản phẩm và bấm Checkout.
    4. Trang thông tin thanh toán (Checkout Step One): Nhập First Name, Last Name, Postal Code.
    5. Trang xác nhận đơn hàng (Checkout Step Two): Kiểm tra tổng tiền (Item Total, Tax, Total).
    6. Trang hoàn tất (Checkout Complete): Nhận thông báo `THANK YOU FOR YOUR ORDER`.
- **Kiến trúc mã nguồn:**
  - Áp dụng cấu trúc thư mục phân lớp rõ ràng:
    - `pages/LoginPage.ts`: Đóng gói form đăng nhập.
    - `pages/InventoryPage.ts`: Đóng gói danh sách sản phẩm và giỏ hàng.
    - `pages/CheckoutPage.ts`: Đóng gói các bước thanh toán và xác nhận.
    - `pages/components/HeaderComponent.ts`: Đóng gói thanh điều hướng và nút mở menu bên / giỏ hàng (COM).
    - `pages/components/FooterComponent.ts`: Đóng gói thông tin bản quyền và liên kết mạng xã hội (COM).

---

## 2. Các Yêu Cầu Thiết Kế Ca Kiểm Thử (Test Design Specifications)

Người phụ trách cần thiết kế và hiện thực các kịch bản kiểm thử trong `tests/e2e/checkout.spec.ts`:

1. **`TC-UI-CHK-01: Full E2E Checkout Flow (Happy Path)`**
   - **Thao tác:** Thực hiện toàn bộ luồng mua 2 sản phẩm ngẫu nhiên từ lúc đăng nhập đến khi hoàn tất đơn hàng.
   - **Kỳ vọng & Bất biến (Invariants):**
     - Sau khi thêm 2 sản phẩm: Số hiển thị trên giỏ hàng (Cart Badge) cập nhật đúng số `2`.
     - Tại trang thanh toán: Tổng tiền hiển thị phải thỏa mãn công thức toán học: $\text{Total} = \text{Item Total} + \text{Tax}$.
     - Hoàn tất: Hiển thị tiêu đề thông báo `THANK YOU FOR YOUR ORDER` và icon hoàn thành màu xanh.
2. **`TC-UI-CHK-02: Checkout Form Validation (Missing Mandatory Fields)`**
   - **Thao tác:** Tiến hành Checkout nhưng bỏ trống thông tin `Postal Code`.
   - **Kỳ vọng:** Xuất hiện thông báo lỗi `Error: Postal Code is required` với icon cảnh báo màu đỏ, URL không được chuyển hướng sang Step Two.
3. **`TC-UI-CHK-03: Cart State Persistence Across Page Navigation`**
   - **Mục tiêu:** Kiểm tra trạng thái lưu trữ của giỏ hàng khi người dùng chuyển hướng quay lại tiếp tục mua sắm.
   - **Kỳ vọng:** Sản phẩm đã chọn vẫn giữ nguyên trong giỏ hàng và nút bấm chuyển trạng thái thành `Remove`.

---

## 3. Câu Hỏi Cốt Lõi Cần Trả Lời & Kịch Bản Thất Bại (Failure Modes)

- Tại sao việc kết hợp Component Object Model (COM) với Page Object Model (POM) giúp tránh trùng lặp code khi một Header/Navbar xuất hiện trên hàng chục trang khác nhau?
- Tại sao Playwright khuyến cáo tuyệt đối không dùng XPath tuyệt đối (`/html/body/div[1]/...`) hoặc CSS class ngẫu nhiên, mà bắt buộc dùng User-Facing Locators (`page.getByRole('button', { name: 'Add to cart' })`)?
- Cơ chế Auto-waiting của Playwright tự động xử lý việc chờ nút bấm sẵn sàng (Visible, Enabled, Stable) trước khi bấm click ra sao?

---

## 4. Tài Liệu Nghiên Cứu Bắt Buộc (Primary Official Sources)

1. **Kiến Trúc Page Object Model & Component Modeling:**
   - [Playwright Official Guide - Page Object Models](https://playwright.dev/docs/pom)
   - [Playwright Official Guide - Locators Best Practices](https://playwright.dev/docs/locators)
   - [Martin Fowler's Article - Page Object Pattern](https://martinfowler.com/bliki/PageObject.html)
2. **Ứng Dụng Thực Nghiệm:**
   - [SauceDemo E-Commerce Testing Platform](https://www.saucedemo.com)

---

## 5. Cấu Trúc Báo Cáo & Yêu Cầu Đầu Ra (Required Deliverables)

### Báo Cáo (`67_Bao_cao.docx` / `67_Bao_cao.tex` - Mục 3.3.1 Chương 3)
Người phụ trách soạn thảo theo khung 5 phần học thuật:
1. **Mục tiêu & Cơ chế kỹ thuật:** Phân tích mô hình kiến trúc POM & COM và triết lý User-Facing Locators.
2. **Đặc tả kịch bản & Dữ liệu kiểm thử:** Bảng các bước kịch bản E2E Checkout kèm dữ liệu đầu vào.
3. **Trích đoạn mã nguồn then chốt:** Trích dẫn 15 - 25 dòng code khởi tạo Page Objects và chuỗi hành động thanh toán.
4. **Bằng chứng thực nghiệm & Phân tích log:** Ảnh chụp màn hình terminal chạy pass $100\%$, ảnh chụp giao diện hoàn tất đơn hàng.
5. **Đánh giá rủi ro & Bài học kỹ thuật:** Phân tích rủi ro Flaky test khi dùng bộ định vị kém bền vững và chiến lược bảo trì POM trong dự án lớn.

---

## 6. Tiêu Chí Nghiệm Thu & Bằng Chứng Bàn Giao (Definition of Done)

- [ ] **Mã Nguồn Kiểm Thử & Chạy Pass ($100\%$):**
  - [ ] Khởi tạo đầy đủ các class trong `pages/` và `pages/components/`.
  - [ ] Tạo file `tests/e2e/checkout.spec.ts` và chạy lệnh `bunx playwright test tests/e2e/checkout.spec.ts --project=chromium` pass $100\%$.
  - [ ] Không sử dụng `page.waitForTimeout()` hoặc XPath tuyệt đối.
- [ ] **Bằng Chứng Git & Pull Request:**
  - [ ] Tạo nhánh `feat/wbs-3.1-ui-checkout-pom-com`.
  - [ ] Tạo Pull Request trên GitHub với mô tả chi tiết và ảnh test pass.
- [ ] **Chất Lượng Học Thuật Trong Báo Cáo:**
  - [ ] Hoàn thành đầy đủ 5 phần cho Mục 3.3.1 trong Báo cáo đồ án.
