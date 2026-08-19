# WBS 3.4: Web UI Test Suite - Visual Regression and Data Masking

## Metadata

- **WBS Code:** `3.4`
- **Task Name:** Web UI Ca 4: Kiểm Thử Hồi Quy Trực Quan Visual Regression & Data Masking
- **Assignee:** Lê Minh Tài (MSSV: 0306241145)
- **Task Weight:** `6.0%`
- **Deliverable Artifacts:** File mã nguồn `tests/e2e/visual_regression.spec.ts`, thư mục ảnh mẫu `tests/e2e/__snapshots__/`, Pull Request GitHub, Mục 3.3.4 Chương 3 trong `67_Bao_cao.docx` / `67_Bao_cao.tex`.

## TL;DR

- **Bản chất:** Đặc tả nhiệm vụ hiện thực ca kiểm thử tự động giao diện Web UI Ca 4: Kiểm thử hồi quy trực quan (Visual Regression Testing / Pixel-by-Pixel Comparison) kết hợp kỹ thuật che giấu dữ liệu động (**Dynamic Data Masking**).
- **Mục đích:** Phát hiện các lỗi vỡ giao diện (CSS Regression, Font Misalignment, Sai lệch màu sắc/khoảng cách) mà các câu lệnh assertion DOM thông thường không thể bắt được.
- **Điểm mấu chốt:** Sử dụng `expect(page).toHaveScreenshot({ mask: [...] })` để che đi các vùng dữ liệu biến đổi (thời gian, username ngẫu nhiên, hình ảnh động), triệt tiêu $100\%$ lỗi Flaky do lệch ảnh.

---

## 1. Mục Tiêu & Bối Cảnh Nghiệp Vụ (Business & Technical Context)

- **Bối cảnh kỹ thuật:**
  - Một bài test chức năng có thể pass $100\%$ (do các thẻ HTML `<button>`, `<input>` vẫn tồn tại trong DOM), nhưng giao diện người dùng thực tế có thể đã bị vỡ hoàn toàn do lỗi CSS: Nút bấm bị tràn màn hình, chữ bị đè lên nhau, hoặc icon bị mất màu.
  - **Visual Regression Testing** trong Playwright giải quyết bài toán này bằng cách: Chụp ảnh màn hình thực tế của trang web và so sánh từng điểm ảnh (Pixelmatch Engine) với một bức ảnh chuẩn mẫu (**Golden Baseline Screenshot**). Nếu tỷ lệ sai khác vượt ngưỡng cho phép (Threshold), test sẽ báo fail và xuất ra ảnh Visual Diff (vùng sai lệch được tô màu đỏ).
  - Tuy nhiên, các trang web thực tế luôn có các phần tử dữ liệu động (Dynamic Elements) như: Đồng hồ thời gian thực, mã đơn hàng ngẫu nhiên, banner quảng cáo xoay vòng. Nếu không che chắn, bài test so sánh ảnh sẽ liên tục bị fail oan (False Positive).
  - Kỹ thuật **Data Masking** của Playwright cho phép chỉ định danh sách locators cần che phủ một lớp màu hồng/xám trung tính trước khi chụp ảnh so sánh.

---

## 2. Các Yêu Cầu Thiết Kế Ca Kiểm Thử (Test Design Specifications)

Người phụ trách cần thiết kế và hiện thực các kịch bản kiểm thử trong `tests/e2e/visual_regression.spec.ts`:

1. **`TC-UI-VIS-01: Baseline Snapshot Generation & Page Comparison`**
   - **Thao tác:** Đăng nhập vào trang sản phẩm SauceDemo và chụp ảnh toàn trang (Full Page Screenshot).
   - **Kỳ vọng:** Khởi tạo bức ảnh chuẩn `inventory-baseline.png` trong thư mục `__snapshots__` và so sánh đạt độ khớp $100\%$ ở các lần chạy tiếp theo.
2. **`TC-UI-VIS-02: Dynamic Data Masking on Variable Locators`**
   - **Mục tiêu:** Kiểm tra kỹ thuật che giấu các phần tử có nội dung thay đổi hoặc hình ảnh dễ biến động.
   - **Thao tác:** Sử dụng tùy chọn `mask: [page.locator('.inventory_item_img'), page.locator('.footer')]` trong hàm `toHaveScreenshot()`.
   - **Kỳ vọng:** Ảnh chụp tự động phủ lớp màu che kín các phần tử trên, đảm bảo bài test ổn định tuyệt đối dù nội dung bên trong có thay đổi.
3. **`TC-UI-VIS-03: Visual Regression Failure & Diff Image Generation`**
   - **Thao tác:** Cố tình tiêm mã CSS làm đổi màu nền một nút bấm sang màu khác (`page.evaluate(() => document.querySelector('.btn_primary').style.backgroundColor = 'red')`).
   - **Kỳ vọng:**
     - Assertion `expect(page).toHaveScreenshot()` phát hiện sai lệch và báo fail.
     - Sinh ra 3 tệp ảnh chẩn đoán: `actual.png` (ảnh thực tế), `expected.png` (ảnh mẫu), và `diff.png` (ảnh tô đỏ vùng sai khác).

---

## 3. Câu Hỏi Cốt Lõi Cần Trả Lời & Kịch Bản Thất Bại (Failure Modes)

- Thuật toán Pixelmatch trong Playwright tính toán khoảng cách màu sắc (Color Delta E) và tỷ lệ lệch điểm ảnh (`maxDiffPixelRatio`) như thế nào?
- Tại sao việc chạy Visual Regression trên các hệ điều hành khác nhau (macOS vs Linux vs Windows) có thể bị lệch điểm ảnh do cơ chế khử răng cưa font chữ (Font Anti-aliasing)?
- Làm thế nào để giải quyết triệt để sự khác biệt font chữ giữa các OS khi chạy Visual Test trên CI (chạy trong Docker Container đồng nhất)?

---

## 4. Tài Liệu Nghiên Cứu Bắt Buộc (Primary Official Sources)

1. **Tài Liệu Playwright Visual Testing:**
   - [Playwright Official Guide - Visual Comparisons & Snapshots](https://playwright.dev/docs/test-snapshots)
   - [Playwright API Reference - LocatorAssertions.toHaveScreenshot()](https://playwright.dev/docs/api/class-locatorassertions#locator-assertions-to-have-screenshot)
2. **Thư Viện So Sánh Ảnh:**
   - [Mapbox Pixelmatch - Fast Pixel-level Image Comparison Engine](https://github.com/mapbox/pixelmatch)

---

## 5. Cấu Trúc Báo Cáo & Yêu Cầu Đầu Ra (Required Deliverables)

### Báo Cáo (`67_Bao_cao.docx` / `67_Bao_cao.tex` - Mục 3.3.4 Chương 3)
Người phụ trách soạn thảo theo khung 5 phần học thuật:
1. **Mục tiêu & Cơ chế kỹ thuật:** Phân tích nguyên lý Pixel-by-Pixel comparison và giải pháp Data Masking.
2. **Đặc tả kịch bản & Dữ liệu kiểm thử:** Bảng các kịch bản kiểm thử Visual (Full Page, Component, Masking).
3. **Trích đoạn mã nguồn then chốt:** Trích dẫn 15 - 25 dòng code cấu hình `toHaveScreenshot({ mask: [...] })` và ngưỡng `maxDiffPixels`.
4. **Bằng chứng thực nghiệm & Phân tích log:** Ảnh chụp terminal chạy pass $100\%$, hình ảnh minh họa bộ 3 ảnh: Actual, Expected, và Visual Diff.
5. **Đánh giá rủi ro & Bài học kỹ thuật:** Phân tích hiện tượng lệch ảnh do môi trường OS (Font Rendering) và chiến lược chuẩn hóa môi trường bằng Docker.

---

## 6. Tiêu Chí Nghiệm Thu & Bằng Chứng Bàn Giao (Definition of Done)

- [ ] **Mã Nguồn Kiểm Thử & Chạy Pass ($100\%$):**
  - [ ] Tạo file `tests/e2e/visual_regression.spec.ts`.
  - [ ] Chạy lệnh `bunx playwright test tests/e2e/visual_regression.spec.ts --project=chromium -u` để tạo snapshot mẫu ban đầu.
  - [ ] Chạy kiểm thử xác nhận pass $100\%$ với độ sai lệch trong ngưỡng cho phép ($< 0.1\%$).
- [ ] **Bằng Chứng Git & Pull Request:**
  - [ ] Tạo nhánh `feat/wbs-3.4-ui-visual-regression`.
  - [ ] Tạo Pull Request trên GitHub đính kèm ảnh baseline và ảnh Visual Diff minh họa.
- [ ] **Chất Lượng Học Thuật Trong Báo Cáo:**
  - [ ] Hoàn thành đầy đủ 5 phần cho Mục 3.3.4 trong Báo cáo đồ án.
