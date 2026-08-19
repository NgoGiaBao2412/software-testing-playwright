# WBS 2.3: API Test Suite - Booking Transaction and Idempotency Verification

## Metadata

- **WBS Code:** `2.3`
- **Task Name:** API Ca 3: Booking Transaction, Webhook & Idempotency
- **Assignee:** Đặng Duy Lam (MSSV: 0306241125)
- **Task Weight:** `7.5%`
- **Deliverable Artifacts:** File mã nguồn `tests/api/booking.spec.ts`, Pull Request GitHub, Mục 3.2.3 Chương 3 trong `67_Bao_cao.docx` / `67_Bao_cao.tex`.

## TL;DR

- **Bản chất:** Đặc tả nhiệm vụ hiện thực bộ kiểm thử tự động API Ca 3: Giao dịch thanh toán đặt vé và xác thực tính bất biến Idempotency thông qua tiêu đề `Idempotency-Key` (UUID v4).
- **Mục đích:** Đảm bảo hệ thống xử lý an toàn khi người dùng nhấp đúp (Double Click) hoặc khi mạng chập chờn kích hoạt cơ chế tự động gửi lại (Client Retry).
- **Điểm mấu chốt:** Kiểm chứng bất biến tuyệt đối: Không trừ tiền hai lần, không tạo bản ghi giao dịch rác và trả về cùng một phản hồi nghiệp vụ ban đầu.

---

## 1. Mục Tiêu & Bối Cảnh Nghiệp Vụ (Business & Technical Context)

- **Bối cảnh hệ thống:**
  - Trong các giao dịch thanh toán trực tuyến, tình huống mất gói tin (Network Timeout / Packet Loss) xảy ra thường xuyên: Client đã gửi request trừ tiền nhưng chưa nhận được response từ máy chủ $\to$ Client tự động gửi lại request lần 2.
  - Nếu API không có tính chất **Idempotency** ($f(f(x)) = f(x)$), tài khoản khách hàng sẽ bị trừ tiền 2 lần cho cùng một chiếc vé.
  - Backend `ticket-booking` triển khai tiêu đề chuẩn `Idempotency-Key` (chuỗi UUID v4):
    - Request đầu tiên kèm Key $K_1$: Backend thực thi tạo giao dịch, lưu kết quả phản hồi vào bộ nhớ đệm Cache/Redis cùng mã băm (Hash) của Payload.
    - Request thứ hai gửi lại với cùng Key $K_1$ và Payload y hệt: Backend phát hiện trùng Key, lập tức trả về kết quả đã lưu trong Cache mà **hoàn toàn không thực thi lại logic trừ tiền hay ghi thêm bản ghi vào Database**.

---

## 2. Các Yêu Cầu Thiết Kế Ca Kiểm Thử (Test Design Specifications)

Người phụ trách cần thiết kế và hiện thực 4 kịch bản kiểm thử tự động trong file `tests/api/booking.spec.ts`:

1. **`TC-IDEMP-01: First Execution (Happy Path Booking Creation)`**
   - **Thao tác:** Sinh ngẫu nhiên một chuỗi UUID v4 làm `Idempotency-Key`, gửi request `POST /api/v1/bookings` với payload hợp lệ.
   - **Kỳ vọng:** Phản hồi HTTP `201 Created`, trả về `bookingId` mới và cơ sở dữ liệu tăng đúng 1 bản ghi.
2. **`TC-IDEMP-02: Duplicate Request with Identical Key & Payload`**
   - **Thao tác:** Gửi lại chính xác request trên với cùng `Idempotency-Key` và cùng nội dung payload.
   - **Kỳ vọng & Bất biến (Invariants):**
     - Phản hồi HTTP `200 OK` hoặc `201 Created`.
     - Mã `bookingId`, trạng thái đơn hàng và dữ liệu trả về giống hệt lần 1.
     - Số lượng bản ghi trong Database **không thay đổi** (không sinh ra booking thừa).
3. **`TC-IDEMP-03: Key Conflict with Mutated Payload (Tampered Body)`**
   - **Mục tiêu:** Kiểm tra cơ chế chống gian lận khi kẻ xấu dùng lại `Idempotency-Key` cũ nhưng thay đổi dữ liệu đặt vé (khác ghế, khác số tiền).
   - **Kỳ vọng:** Backend phát hiện mismatch payload hash, từ chối với HTTP `422 Unprocessable Entity` hoặc HTTP `400 Bad Request`.
4. **`TC-IDEMP-04: Concurrent Race on Same Idempotency Key`**
   - **Thao tác:** Bắn đồng thời 5 requests với cùng 1 `Idempotency-Key` qua `Promise.all()`.
   - **Kỳ vọng:** Duy nhất 1 giao dịch được tạo ra trong DB và 5 phản hồi trả về cùng một mã `bookingId`.

---

## 3. Câu Hỏi Cốt Lõi Cần Trả Lời & Kịch Bản Thất Bại (Failure Modes)

- Tại sao phương thức `POST` trong chuẩn HTTP vốn dĩ là Non-idempotent và cần phải bổ sung tiêu đề `Idempotency-Key`?
- Backend làm thế nào để phân biệt giữa "Gửi lại request hợp lệ do mạng lag" và "Cố tình dùng lại key cũ để thực hiện giao dịch khác"?
- Nếu Redis lưu trữ Idempotency Key bị crash giữa chừng, chiến lược bảo vệ Fallback trong Transaction Database (PostgreSQL Unique Constraint) là gì?

---

## 4. Tài Liệu Nghiên Cứu Bắt Buộc (Primary Official Sources)

1. **Chuẩn Giao Thức & Thực Tiễn Công Nghiệp:**
   - [IETF Internet-Draft - The Idempotency-Key HTTP Header Field](https://datatracker.ietf.org/doc/html/draft-ietf-httpapi-idempotency-key-header)
   - [Stripe Engineering Documentation - Designing Robust Idempotent APIs](https://stripe.com/docs/api/idempotent_requests)
2. **Tài Liệu Playwright API Testing:**
   - [Playwright API Testing Guide](https://playwright.dev/docs/api-testing)
   - [Playwright Test Fixtures Architecture](https://playwright.dev/docs/test-fixtures)

---

## 5. Cấu Trúc Báo Cáo & Yêu Cầu Đầu Ra (Required Deliverables)

### Báo Cáo (`67_Bao_cao.docx` / `67_Bao_cao.tex` - Mục 3.2.3 Chương 3)
Người phụ trách soạn thảo theo khung 5 phần học thuật:
1. **Mục tiêu & Cơ chế kỹ thuật:** Phân tích định nghĩa toán học của Idempotency và cơ chế hoạt động của header `Idempotency-Key`.
2. **Đặc tả kịch bản & Dữ liệu kiểm thử:** Bảng thông số 4 ca test (`TC-IDEMP-01` $\to$ `TC-IDEMP-04`).
3. **Trích đoạn mã nguồn then chốt:** Trích dẫn 15 - 25 dòng code khởi tạo UUID v4 và kiểm định tính bất biến dữ liệu.
4. **Bằng chứng thực nghiệm & Phân tích log:** Ảnh chụp màn hình terminal chạy pass $100\%$, log so sánh 2 phản hồi trùng lặp.
5. **Đánh giá rủi ro & Bài học kỹ thuật:** Phân tích rủi ro tài chính khi khách hàng bị trừ tiền trùng lặp.

---

## 6. Tiêu Chí Nghiệm Thu & Bằng Chứng Bàn Giao (Definition of Done)

- [ ] **Mã Nguồn Kiểm Thử & Chạy Pass ($100\%$):**
  - [ ] Tạo file `tests/api/booking.spec.ts`.
  - [ ] Chạy lệnh `bunx playwright test tests/api/booking.spec.ts --project=api` pass $100\%$ cả 4 kịch bản.
  - [ ] Xác nhận không có hiện tượng duplicate record trong database khi chạy lặp lại.
- [ ] **Bằng Chứng Git & Pull Request:**
  - [ ] Tạo nhánh `feat/wbs-2.3-api-booking-idempotency`.
  - [ ] Tạo Pull Request trên GitHub với mô tả chi tiết, log JSON và ảnh test pass.
- [ ] **Chất Lượng Học Thuật Trong Báo Cáo:**
  - [ ] Hoàn thành đầy đủ 5 phần cho Mục 3.2.3 trong Báo cáo đồ án.
