# WBS 2.2: API Test Suite - High-Contention Concurrency and Redis Redlock

## Metadata

- **WBS Code:** `2.2`
- **Task Name:** API Ca 2: Concurrency Race Condition & Redis Redlock
- **Assignee:** Trần Văn Ngọc (MSSV: 0306241131)
- **Task Weight:** `7.5%`
- **Deliverable Artifacts:** File mã nguồn `tests/api/concurrency.spec.ts`, Pull Request GitHub, Mục 3.2.2 Chương 3 trong `67_Bao_cao.docx` / `67_Bao_cao.tex`.

## TL;DR

- **Bản chất:** Đặc tả nhiệm vụ hiện thực bộ kiểm thử tự động API Ca 2: Điều kiện chạy đua (Race Condition) và tranh chấp tài nguyên cao độ trong hệ thống đặt vé xem phim / sự kiện.
- **Mục đích:** Áp dụng kỹ thuật Asynchronous Socket Flooding với `Promise.all()` để bắn đồng thời $N$ requests giữ chỗ trên cùng một mã ghế duy nhất.
- **Điểm mấu chốt:** Kiểm chứng bất biến toán học: Đúng duy nhất 1 request thành công ($200/201$) và $N-1$ requests còn lại bị từ chối với HTTP $409\text{ Conflict}$, triệt tiêu $100\%$ lỗi Double-booking.

---

## 1. Mục Tiêu & Bối Cảnh Nghiệp Vụ (Business & Technical Context)

- **Bối cảnh hệ thống:**
  - Trong các đợt mở bán vé Flash-sale, hàng nghìn người dùng cùng lúc bấm nút đặt các ghế VIP đẹp nhất tại cùng một thời điểm $t_0$.
  - Nếu Backend chỉ dùng giải pháp kiểm tra trạng thái đơn giản (Naive Check: `SELECT status WHERE id = 'A12'` rồi mới `UPDATE`), hiện tượng Race Condition sẽ xảy ra: Cả 2 luồng đều thấy ghế đang `FREE` và cùng ghi đè quyền sở hữu $\to$ **Double-Booking (Bán 1 ghế cho 2 người)**.
  - Backend `ticket-booking` triển khai cơ chế **Khóa phân tán Redis Redlock** (hoặc DB Pessimistic Locking `SELECT ... FOR UPDATE`): Luồng đến trước giành được khóa trên Key `lock:seat:A12` sẽ thành công, toàn bộ luồng đến sau không thể lấy khóa và bị từ chối ngay lập tức.

---

## 2. Các Yêu Cầu Thiết Kế Ca Kiểm Thử (Test Design Specifications)

Người phụ trách cần thiết kế và hiện thực các kịch bản kiểm thử tự động trong file `tests/api/concurrency.spec.ts`:

1. **`TC-CONCUR-01: High-Contention Simultaneous Seat Booking (10 Concurrent Requests)`**
   - **Tiền điều kiện:** Ghế đích `SEAT-VIP-A12` đang ở trạng thái trống (`FREE`). Chuẩn bị sẵn 10 mã định danh người dùng khác nhau (`user_1`, `user_2`, ..., `user_10`).
   - **Thao tác thực hiện:** Khởi tạo một mảng gồm 10 HTTP requests đặt cùng mã ghế `SEAT-VIP-A12` và kích hoạt bắn đồng thời qua `Promise.all()`.
   - **Kỳ vọng & Bất biến toán học (Mathematical Invariants):**
     - Số lượng phản hồi thành công (HTTP `200 OK` hoặc `201 Created`): Đúng duy nhất $1$.
     - Số lượng phản hồi xung đột (HTTP `409 Conflict`): Đúng bằng $9$.
     - Số lượng bản ghi giao dịch đặt vé được tạo trong cơ sở dữ liệu: Đúng bằng $1$.
2. **`TC-CONCUR-02: Lock Expiration & Resource Release (TTL Expiration)`**
   - **Mục tiêu:** Kiểm tra cơ chế tự động giải phóng khóa khi người giữ ghế không hoàn tất thanh toán trong thời hạn quy định (Time-To-Live TTL).
   - **Kỳ vọng:** Sau khi hết thời gian giữ chỗ (Hold Timeout), ghế tự động quay về trạng thái `FREE` và người dùng khác có thể đặt thành công.

---

## 3. Câu Hỏi Cốt Lõi Cần Trả Lời & Kịch Bản Thất Bại (Failure Modes)

- Tại sao việc kiểm thử Race Condition bắt buộc phải dùng `Promise.all()` (Asynchronous Socket Flooding) thay vì dùng vòng lặp `for / await` tuần tự?
- Thuật toán Redis Redlock xử lý tính đồng thuận phân tán và Time-to-Live (TTL) như thế nào để tránh tình trạng Deadlock khi một Worker backend bị crash đột ngột?
- Tỷ lệ Double-booking chấp nhận được trong một hệ thống đặt vé thương mại là bao nhiêu ($0.00\%$ tuyệt đối)?

---

## 4. Tài Liệu Nghiên Cứu Bắt Buộc (Primary Official Sources)

1. **Tài Liệu Khóa Phân Tán & Bất Đồng Bộ:**
   - [Redis Official Documentation - Distributed Locks with Redis (Redlock)](https://redis.io/docs/latest/develop/use/dist-locks/)
   - [MDN Web Docs - Promise.all() Concurrency Mechanism](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)
2. **Tài Liệu Playwright Parallelism:**
   - [Playwright Test Parallelism and Sharding](https://playwright.dev/docs/test-parallel)

---

## 5. Cấu Trúc Báo Cáo & Yêu Cầu Đầu Ra (Required Deliverables)

### Báo Cáo (`67_Bao_cao.docx` / `67_Bao_cao.tex` - Mục 3.2.2 Chương 3)
Người phụ trách soạn thảo theo khung 5 phần học thuật:
1. **Mục tiêu & Cơ chế kỹ thuật:** Phân tích bản chất bài toán Race Condition và cơ chế khóa phân tán Redis Redlock.
2. **Đặc tả kịch bản & Dữ liệu kiểm thử:** Bảng thông số 10 concurrent requests (User IDs, Seat ID, Endpoint, Expected Statuses).
3. **Trích đoạn mã nguồn then chốt:** Trích dẫn 15 - 25 dòng code xử lý mảng `Promise.all()` và logic tính toán kiểm định $1$ Success + $9$ Conflict.
4. **Bằng chứng thực nghiệm & Phân tích log:** Ảnh chụp màn hình terminal chạy pass $100\%$, log danh sách mã trạng thái HTTP nhận về.
5. **Đánh giá rủi ro & Bài học kỹ thuật:** Phân tích hậu quả tài chính của Double-booking và sự cố sập server do lock contention.

---

## 6. Tiêu Chí Nghiệm Thu & Bằng Chứng Bàn Giao (Definition of Done)

- [ ] **Mã Nguồn Kiểm Thử & Chạy Pass ($100\%$):**
  - [ ] Tạo file `tests/api/concurrency.spec.ts`.
  - [ ] Chạy lệnh `bunx playwright test tests/api/concurrency.spec.ts --project=api` pass $100\%$.
  - [ ] Tỷ lệ Double-booking đạt $0.00\%$ trên tối thiểu 10 requests đồng thời.
- [ ] **Bằng Chứng Git & Pull Request:**
  - [ ] Tạo nhánh `feat/wbs-2.2-api-concurrency-redlock`.
  - [ ] Tạo Pull Request trên GitHub với mô tả chi tiết, log status codes và ảnh test pass.
- [ ] **Chất Lượng Học Thuật Trong Báo Cáo:**
  - [ ] Hoàn thành đầy đủ 5 phần cho Mục 3.2.2 trong Báo cáo đồ án.
