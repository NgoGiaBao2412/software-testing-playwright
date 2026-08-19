# WBS 3.2: Web UI Test Suite - Network Mocking and Error Handling

## Metadata

- **WBS Code:** `3.2`
- **Task Name:** Web UI Ca 2: Network Mocking `page.route()` HTTP 500 & Locked-out User
- **Assignee:** Ngô Gia Bảo (MSSV: 0306241090)
- **Task Weight:** `6.0%`
- **Deliverable Artifacts:** File mã nguồn `tests/e2e/network_mocking.spec.ts`, Pull Request GitHub, Mục 3.3.2 Chương 3 trong `67_Bao_cao.docx` / `67_Bao_cao.tex`.

## TL;DR

- **Bản chất:** Đặc tả nhiệm vụ hiện thực ca kiểm thử tự động giao diện Web UI Ca 2: Chặn bắt và giả lập lưu lượng mạng (Network Mocking & Fault Injection) bằng `page.route()`, kết hợp kiểm thử xử lý lỗi tài khoản bị khóa (`locked_out_user`).
- **Mục đích:** Kiểm tra độ bền vững (Resilience) và khả năng suy thoái êm dịu (Graceful Degradation) của giao diện người dùng khi máy chủ gặp sự cố sập nguồn (HTTP 500 Internal Server Error).
- **Điểm mấu chốt:** Không cần can thiệp hay sửa đổi mã nguồn Backend, Playwright chặn trực tiếp ở tầng Network Layer của Browser Context để tiêm lỗi tức thì.

---

## 1. Mục Tiêu & Bối Cảnh Nghiệp Vụ (Business & Technical Context)

- **Bối cảnh kỹ thuật:**
  - Trong môi trường sản xuất, các dịch vụ bên thứ ba (Cổng thanh toán, Dịch vụ gợi ý sản phẩm) có thể bị mất kết nối hoặc trả về lỗi máy chủ nội bộ (HTTP `500 Internal Server Error` hoặc `503 Service Unavailable`).
  - Giao diện người dùng Web Frontend phải có khả năng bắt lỗi êm dịu (Error Boundary / Fallback UI): Hiển thị thông báo lỗi thân thiện (`Không thể tải danh sách sản phẩm, vui lòng thử lại sau`) thay vì để màn hình trắng xóa (Blank Screen of Death) hoặc vỡ layout.
  - Playwright cung cấp API `page.route('**/api/**', route => route.fulfill({ status: 500, ... }))` cho phép can thiệp vào tiến trình mạng mà không phụ thuộc vào trạng thái server thật.
  - Đồng thời, kiểm tra trường hợp người dùng bị khóa tài khoản (`locked_out_user`) trên SauceDemo để xác thực thông báo từ chối truy cập.

---

## 2. Các Yêu Cầu Thiết Kế Ca Kiểm Thử (Test Design Specifications)

Người phụ trách cần thiết kế và hiện thực các kịch bản kiểm thử trong `tests/e2e/network_mocking.spec.ts`:

1. **`TC-UI-MOCK-01: Network Fault Injection (Simulated HTTP 500 Internal Server Error)`**
   - **Kỹ thuật thực hiện:** Sử dụng `page.route()` để chặn bắt các request tải dữ liệu hoặc hình ảnh sản phẩm, trả về mã trạng thái HTTP `500` kèm payload lỗi giả lập.
   - **Kỳ vọng & Bất biến (Invariants):**
     - Giao diện ứng dụng không bị crash trắng trang.
     - Hiển thị thông báo lỗi hoặc trạng thái Fallback UI rõ ràng cho người dùng.
     - Các nút chức năng khác trên thanh menu vẫn hoạt động bình thường.
2. **`TC-UI-MOCK-02: Security Error Handling with Locked-Out User Account`**
   - **Thao tác:** Đăng nhập vào SauceDemo bằng tài khoản `locked_out_user` và mật khẩu `secret_sauce`.
   - **Kỳ vọng:**
     - Ứng dụng không được phép chuyển hướng vào trang `/inventory.html`.
     - Xuất hiện thông báo lỗi chính xác: `Epic sadface: Sorry, this user has been locked out.`
     - Các ô nhập liệu hiển thị icon cảnh báo lỗi màu đỏ (Error Cross SVG).
3. **`TC-UI-MOCK-03: Network Delay Simulation & Loading State Indicator`**
   - **Kỹ thuật thực hiện:** Dùng `route.continue()` hoặc làm trễ phản hồi $2000\text{ms}$ để kiểm tra trạng thái hiển thị con quay tải trang (Loading Spinner / Skeleton Loading).
   - **Kỳ vọng:** Trạng thái chờ hiển thị đúng trong thời gian trễ và biến mất sau khi dữ liệu tải xong.

---

## 3. Câu Hỏi Cốt Lõi Cần Trả Lời & Kịch Bản Thất Bại (Failure Modes)

- Tại sao kỹ thuật Network Mocking bằng `page.route()` trong Playwright vượt trội hơn việc dựng một Mock Server độc lập bên ngoài?
- Sự khác biệt giữa `route.fulfill()` (thay thế phản hồi hoàn toàn), `route.abort()` (ngắt kết nối giả lập rớt mạng) và `route.continue()` (cho phép request đi tiếp) là gì?
- Khi backend thật bị chết (HTTP 500), nếu frontend không có Error Boundary thì trải nghiệm người dùng sẽ bị ảnh hưởng nghiêm trọng ra sao?

---

## 4. Tài Liệu Nghiên Cứu Bắt Buộc (Primary Official Sources)

1. **Tài Liệu Chặn Bắt Mạng Playwright:**
   - [Playwright Official Guide - Network Interception & Mocking](https://playwright.dev/docs/network)
   - [Playwright API Reference - Page.route()](https://playwright.dev/docs/api/class-page#page-route)
2. **Chuẩn Mã Lỗi HTTP:**
   - [IETF RFC 9110 - HTTP Semantics (Section 15.6: Server Error 5xx)](https://datatracker.ietf.org/doc/html/rfc9110#section-15.6)

---

## 5. Cấu Trúc Báo Cáo & Yêu Cầu Đầu Ra (Required Deliverables)

### Báo Cáo (`67_Bao_cao.docx` / `67_Bao_cao.tex` - Mục 3.3.2 Chương 3)
Người phụ trách soạn thảo theo khung 5 phần học thuật:
1. **Mục tiêu & Cơ chế kỹ thuật:** Phân tích nguyên lý can thiệp tầng mạng của Browser Context qua `page.route()`.
2. **Đặc tả kịch bản & Dữ liệu kiểm thử:** Bảng các kịch bản Mocking HTTP 500, Rớt mạng (Abort), và Locked-out User.
3. **Trích đoạn mã nguồn then chốt:** Trích dẫn 15 - 25 dòng code xử lý `page.route()` và kiểm định thông báo lỗi.
4. **Bằng chứng thực nghiệm & Phân tích log:** Ảnh chụp màn hình terminal chạy pass $100\%$, ảnh chụp màn hình hiển thị thông báo lỗi tương ứng.
5. **Đánh giá rủi ro & Bài học kỹ thuật:** Phân tích tầm quan trọng của kiểm thử tiêu cực (Negative Testing) và khả năng tự phục hồi của ứng dụng.

---

## 6. Tiêu Chí Nghiệm Thu & Bằng Chứng Bàn Giao (Definition of Done)

- [ ] **Mã Nguồn Kiểm Thử & Chạy Pass ($100\%$):**
  - [ ] Tạo file `tests/e2e/network_mocking.spec.ts`.
  - [ ] Chạy lệnh `bunx playwright test tests/e2e/network_mocking.spec.ts --project=chromium` pass $100\%$ cả 3 kịch bản.
  - [ ] Dọn dẹp các bộ định tuyến mạng sau khi test hoàn tất bằng `page.unroute()`.
- [ ] **Bằng Chứng Git & Pull Request:**
  - [ ] Tạo nhánh `feat/wbs-3.2-ui-network-mocking`.
  - [ ] Tạo Pull Request trên GitHub với mô tả chi tiết và ảnh test pass.
- [ ] **Chất Lượng Học Thuật Trong Báo Cáo:**
  - [ ] Hoàn thành đầy đủ 5 phần cho Mục 3.3.2 trong Báo cáo đồ án.
