# WBS 3.3: Web UI Test Suite - Post-Mortem Diagnostics with Trace Viewer

## Metadata

- **WBS Code:** `3.3`
- **Task Name:** Web UI Ca 3: Chẩn Đoán Hậu Kỳ với Playwright Trace Viewer & Performance Glitch User
- **Assignee:** Lê Minh Tài (MSSV: 0306241145)
- **Task Weight:** `6.0%`
- **Deliverable Artifacts:** File mã nguồn `tests/e2e/diagnostics_trace.spec.ts`, file nén trace `test-results/trace.zip`, Pull Request GitHub, Mục 3.3.3 Chương 3 trong `67_Bao_cao.docx` / `67_Bao_cao.tex`.

## TL;DR

- **Bản chất:** Đặc tả nhiệm vụ hiện thực ca kiểm thử tự động giao diện Web UI Ca 3: Cơ chế ghi vết và chẩn đoán lỗi hậu kỳ (Post-Mortem Diagnostics) thông qua **Playwright Trace Viewer**, kết hợp kiểm thử tài khoản bị nghẽn hiệu năng (`performance_glitch_user`).
- **Mục đích:** Xóa bỏ hoàn toàn tình trạng "Test fail trên CI nhưng chạy local thì pass", cung cấp bằng chứng chẩn đoán chi tiết: Timeline từng frame, DOM Snapshot tại thời điểm click, và Network Waterfall.
- **Điểm mấu chốt:** Khai thác cấu hình `trace: 'on-first-retry'` để tối ưu dung lượng ổ đĩa trên CI (chỉ lưu trace khi test thất bại).

---

## 1. Mục Tiêu & Bối Cảnh Nghiệp Vụ (Business & Technical Context)

- **Bối cảnh kỹ thuật:**
  - Trong quy trình kiểm thử CI/CD, các lỗi Flaky (lúc pass lúc fail) hoặc lỗi trễ mạng (Network Latency) rất khó tái hiện lại trên máy cá nhân của lập trình viên.
  - Video quay màn hình thông thường chỉ là các điểm ảnh (Pixels) thụ động, không thể inspect DOM, không xem được network payload hay console logs tại micro-giây xảy ra lỗi.
  - **Playwright Trace Viewer** là công cụ chẩn đoán hậu kỳ độc quyền: Ghi lại toàn bộ hành trình thực thi của bài test dưới dạng một gói nén ZIP gồm:
    1. **Filmstrip Timeline:** Ảnh chụp màn hình tuần tự từng bước.
    2. **DOM Snapshots Before / After:** Bản sao cây DOM thực tế trước và sau mỗi hành động (cho phép inspect element trực tiếp).
    3. **Network Waterfall:** Toàn bộ requests/responses HTTP diễn ra trong phiên test.
    4. **Source Code Inspector & Action Log:** Vị trí dòng lệnh đang chạy và thời gian hoàn thành từng actionability check.
  - Trên SauceDemo, tài khoản `performance_glitch_user` mô phỏng độ trễ tải trang nghiêm trọng ($> 5000\text{ms}$), là đối tượng hoàn hảo để phân tích Timeline và Network Waterfall trong Trace Viewer.

---

## 2. Các Yêu Cầu Thiết Kế Ca Kiểm Thử (Test Design Specifications)

Người phụ trách cần thiết kế và hiện thực các kịch bản kiểm thử trong `tests/e2e/diagnostics_trace.spec.ts`:

1. **`TC-UI-TRACE-01: Performance Glitch Latency Triage & Trace Generation`**
   - **Thao tác:** Đăng nhập bằng tài khoản `performance_glitch_user`, thực hiện hành động thêm sản phẩm và chuyển hướng trang.
   - **Kỳ vọng & Bất biến (Invariants):**
     - Bài test vượt qua thành công mà không bị timeout nhờ cơ chế Auto-waiting thông minh của Playwright.
     - Sinh ra tệp dữ liệu `trace.zip` chứa đầy đủ thông tin phân tích hiệu năng.
2. **`TC-UI-TRACE-02: Intentional Assertion Failure for Post-Mortem Diagnostics`**
   - **Thao tác:** Thiết kế một kịch bản cố tình kỳ vọng sai (ví dụ: kỳ vọng một element biến mất nhưng thực tế vẫn còn) để kích hoạt cơ chế ghi vết lỗi trên CI.
   - **Kỳ vọng:**
     - Playwright tự động chụp và lưu vết gói Trace Viewer tại bước xảy ra lỗi (`Action Log: click failed`).
     - Tệp trace cho phép mở bằng lệnh `bunx playwright show-trace` để quan sát chính xác trạng thái DOM tại thời điểm $t_{\text{fail}}$.
3. **`TC-UI-TRACE-03: Network Waterfall & Slow Request Identification`**
   - **Mục tiêu:** Mở Trace Viewer và xác định chính xác request nào gây ra độ trễ $> 5000\text{ms}$ trong Network Tab.

---

## 3. Câu Hỏi Cốt Lõi Cần Trả Lời & Kịch Bản Thất Bại (Failure Modes)

- Tại sao cấu hình `trace: 'on-first-retry'` được xem là chuẩn mực vàng trên hạ tầng CI/CD doanh nghiệp thay vì `trace: 'on'` cho mọi bài test?
- Sự khác biệt căn bản giữa việc xem lại một Video MP4 thông thường và việc mở một tệp `trace.zip` trong Playwright Trace Viewer là gì?
- Làm thế nào Playwright ghi lại được DOM Snapshot thật mà không làm suy giảm hiệu năng thực thi của bài test?

---

## 4. Tài Liệu Nghiên Cứu Bắt Buộc (Primary Official Sources)

1. **Tài Liệu Playwright Trace Viewer & CI Triage:**
   - [Playwright Official Guide - Trace Viewer](https://playwright.dev/docs/trace-viewer)
   - [Playwright Test Retries and Flaky Test Triage](https://playwright.dev/docs/test-retries)
2. **Chuẩn Kiến Trúc Tracing:**
   - [Chrome DevTools Protocol - Tracing Domain](https://chromedevtools.github.io/devtools-protocol/tot/Tracing/)

---

## 5. Cấu Trúc Báo Cáo & Yêu Cầu Đầu Ra (Required Deliverables)

### Báo Cáo (`67_Bao_cao.docx` / `67_Bao_cao.tex` - Mục 3.3.3 Chương 3)
Người phụ trách soạn thảo theo khung 5 phần học thuật:
1. **Mục tiêu & Cơ chế kỹ thuật:** Phân tích nguyên lý thu thập Trace (DOM Snapshots, Filmstrip, Action Logs) của Playwright.
2. **Đặc tả kịch bản & Dữ liệu kiểm thử:** Bảng kịch bản kiểm thử hiệu năng với `performance_glitch_user`.
3. **Trích đoạn mã nguồn then chốt:** Trích dẫn 15 - 25 dòng code cấu hình Trace Programmatically (`context.tracing.start`, `stop`) hoặc cấu hình config.
4. **Bằng chứng thực nghiệm & Phân tích log:** Ảnh chụp màn hình giao diện Trace Viewer (Gồm đủ: Filmstrip timeline, DOM snapshot, Network waterfall, và Action log).
5. **Đánh giá rủi ro & Bài học kỹ thuật:** Phân tích quy trình điều tra lỗi (Root Cause Analysis - RCA) trong các dự án thực tế.

---

## 6. Tiêu Chí Nghiệm Thu & Bằng Chứng Bàn Giao (Definition of Done)

- [ ] **Mã Nguồn Kiểm Thử & Chạy Pass ($100\%$):**
  - [ ] Tạo file `tests/e2e/diagnostics_trace.spec.ts`.
  - [ ] Chạy lệnh `bunx playwright test tests/e2e/diagnostics_trace.spec.ts --project=chromium --trace on` pass $100\%$.
  - [ ] Trích xuất thành công file `trace.zip` và mở kiểm tra được bằng `bunx playwright show-trace`.
- [ ] **Bằng Chứng Git & Pull Request:**
  - [ ] Tạo nhánh `feat/wbs-3.3-ui-diagnostics-trace`.
  - [ ] Tạo Pull Request trên GitHub đính kèm ảnh chụp 4 vùng chức năng của Trace Viewer.
- [ ] **Chất Lượng Học Thuật Trong Báo Cáo:**
  - [ ] Hoàn thành đầy đủ 5 phần cho Mục 3.3.3 trong Báo cáo đồ án.
