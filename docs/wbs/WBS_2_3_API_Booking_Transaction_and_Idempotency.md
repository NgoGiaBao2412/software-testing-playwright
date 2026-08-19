# WBS 2.3: API Test Suite - Booking Transaction and Idempotency Verification

## Metadata

- **WBS Code:** `2.3`
- **Task Name:** API Case 3: Booking Transaction, Webhook & Idempotency
- **Assignee:** Đặng Duy Lam (MSSV: 0306241125)
- **Task Weight:** `7.5%`
- **Deliverable Artifacts:** File mã nguồn `tests/api/booking.spec.ts`, Pull Request GitHub, Mục 3.3 Chương 3 trong `67_Bao_cao.docx` và các Slide tương ứng trong `67_Slide.pptx`.

## TL;DR

- **Bản chất:** Kịch bản kiểm thử tự động API Ca 3: Giao dịch đặt vé thanh toán và xác thực tính bất biến Idempotency (`Idempotency-Key` UUID v4).
- **Mục đích:** Đảm bảo hệ thống xử lý an toàn khi mạng chập chờn hoặc người dùng nhấp đúp thao tác thanh toán.
- **Điểm mấu chốt:** Bảo vệ tuyệt đối không trừ tiền trùng lặp và không tạo bản ghi rác trong cơ sở dữ liệu.

## Core Architectural Content to Implement

### 1. Bản Chất Kỹ Thuật Của Tính Bất Biến (Idempotency)

- **Định nghĩa toán học:** Thao tác $f(x)$ được gọi là Idempotent nếu áp dụng nhiều lần liên tiếp không làm thay đổi trạng thái hệ thống:
  $$f(f(x)) = f(x)$$
- **Vấn đề thực tế:** Người dùng click 2-3 lần liên tiếp hoặc client retry khi mạng lag $\to$ Hệ thống không được tạo thêm bản ghi thứ 2.

### 2. Cơ Chế Header `Idempotency-Key` (UUID v4)

```text
+---------------+   Request 1: POST /booking (Key: K_1, Seat: A12)   +---------------+
|  Playwright   | -------------------------------------------------> | Backend / DB  |
|  Test Runner  | <------------------------------------------------- | (Tạo Booking) |
+---------------+               Response: 201 Created (Booking ID: 99)|               |
        |                                                            +---------------+
        |                                                                    | Lưu Cache (Key: K_1, Payload Hash, Resp: 99)
        | Request 2: POST /booking (Gửi lại y hệt Key: K_1)                  v
        +----------------------------------------------------------> +---------------+
                                                                     | Backend Redis |
        <----------------------------------------------------------- | (Đọc từ Cache)|
                        Response: 200 OK (Booking ID: 99)            +---------------+
              (KHÔNG tạo thêm bản ghi mới, KHÔNG trừ tiền lần 2!)
```

### 3. Danh Sách Các Ca Kiểm Thử Bắt Buộc (Test Scenarios)

1. **`TC-IDEMP-01: First Execution (Happy Path)`**
   - Tạo UUID v4 ngẫu nhiên cho `Idempotency-Key`.
   - Gửi request tạo booking $\to$ Nhận `HTTP 201 Created`, DB tăng đúng 1 bản ghi.
2. **`TC-IDEMP-02: Duplicate Request with Identical Key & Payload`**
   - Gửi lại request với cùng `Idempotency-Key` và body $\to$ Nhận `HTTP 200/201`, mã `bookingId` giống hệt lần 1, DB không đổi.
3. **`TC-IDEMP-03: Key Conflict with Mutated Payload`**
   - Dùng lại `Idempotency-Key` nhưng thay đổi nội dung payload $\to$ Backend phát hiện mismatch payload hash, từ chối với `HTTP 422 Unprocessable Entity` / `HTTP 400 Bad Request`.
4. **`TC-IDEMP-04: Concurrency Race on Same Idempotency Key`**
   - Bắn đồng thời 5 requests với cùng 1 `Idempotency-Key` qua `Promise.all()` $\to$ Duy nhất 1 booking được tạo ra và 5 responses trả về cùng kết quả.

---

## Acceptance Criteria & Definition of Done (DoD Checklist)

- [ ] **Mã Nguồn Kiểm Thử & Chạy Pass ($100\%$):**
  - [ ] Tạo file `tests/api/booking.spec.ts`.
  - [ ] Chạy lệnh `bunx playwright test tests/api/booking.spec.ts --project=api` pass $100\%$.
  - [ ] Xác nhận kiểm tra đầy đủ cả 4 scenarios trên.
- [ ] **Bằng Chứng Git & Pull Request:**
  - [ ] Tạo nhánh `feat/wbs-2.3-api-booking-idempotency`.
  - [ ] Tạo Pull Request trên GitHub với mô tả chi tiết và ảnh test pass.
  - [ ] Cập nhật link PR vào Google Sheets Master WBS.
- [ ] **Báo Cáo:**
  - [ ] Soạn thảo bản thảo Mục 3.3 Chương 3 cho Báo cáo Word (`67_Bao_cao.docx`).
