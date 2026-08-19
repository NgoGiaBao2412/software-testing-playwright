# WBS 2.2: API Test Suite - High-Contention Concurrency and Redis Redlock

## Metadata

- **WBS Code:** `2.2`
- **Task Name:** API Case 2: Concurrency Race Condition & Redis Redlock
- **Assignee:** Trần Văn Ngọc (MSSV: 0306241131)
- **Task Weight:** `7.5%`
- **Deliverable Artifacts:** File mã nguồn `tests/api/concurrency.spec.ts`, Pull Request GitHub, Mục 3.2 Chương 3 trong `67_Bao_cao.docx` và các Slide tương ứng trong `67_Slide.pptx`.

## TL;DR

- **Bản chất:** Kịch bản kiểm thử tự động API Ca 2: Điều kiện chạy đua (Race Condition) và tranh chấp tài nguyên cao độ trong hệ thống đặt vé.
- **Mục đích:** Áp dụng kỹ thuật Asynchronous Socket Flooding với `Promise.all()` để bắn đồng thời $N$ requests giữ chỗ trên cùng một mã ghế.
- **Điểm mấu chốt:** Kiểm chứng cơ chế khóa phân tán Redis Redlock / Pessimistic Locking ngăn ngừa $100\%$ Double-booking.

## Core Architectural Content to Implement

### 1. Bản Chất Kỹ Thuật: Bài Toán Race Condition & Double-Booking

```text
Time (ms)   User 1 (Request 1)              User 2 (Request 2)              Database / Redis
---------   ------------------              ------------------              ----------------
  T0        SELECT status FROM seats (FREE)                                 Seat A12: FREE
  T1                                        SELECT status FROM seats (FREE) Seat A12: FREE
  T2        UPDATE seats SET status=HELD                                    Seat A12: HELD (User 1)
  T3                                        UPDATE seats SET status=HELD    Seat A12: HELD (User 2 - DOUBLE BOOKING!)
```

- **Lỗi Naive Check:** Nếu Backend chỉ kiểm tra trạng thái trước khi cập nhật mà không có cơ chế khóa, hai luồng xử lý song song sẽ cùng ghi đè quyền sở hữu $\to$ Double-booking.
- **Cơ chế Khóa Phân Tán (Redis Redlock / DB Pessimistic Lock):**
  - Luồng đến trước giành được khóa trên Key `lock:seat:A12` $\to$ Thành công (`HTTP 200/201`).
  - Toàn bộ luồng đến sau không thể lấy khóa $\to$ Bị từ chối ngay lập tức (`HTTP 409 Conflict`).

### 2. Kỹ Thuật Asynchronous Socket Flooding Với `Promise.all()`

```typescript
// tests/api/concurrency.spec.ts
import { test, expect } from '@playwright/test';

test('Concurrent Seat Booking Race Condition Test', async ({ request }) => {
  const targetSeatId = 'SEAT-VIP-A12';
  const totalConcurrentUsers = 10;
  
  // Tạo mảng 10 requests đồng thời với 10 User Tokens khác nhau
  const requests = Array.from({ length: totalConcurrentUsers }, (_, i) => {
    return request.post(`/api/v1/seats/${targetSeatId}/hold`, {
      data: { userId: `user_${i + 1}`, holdDurationSeconds: 60 },
    });
  });

  // Bắn đồng thời 10 requests qua Promise.all
  const responses = await Promise.all(requests);
  const statusCodes = responses.map(res => res.status());

  // Kiểm tra bất biến toán học:
  const successCount = statusCodes.filter(code => code === 200 || code === 201).length;
  const conflictCount = statusCodes.filter(code => code === 409).length;

  expect(successCount).toBe(1); // Đúng duy nhất 1 người đặt được ghế!
  expect(conflictCount).toBe(totalConcurrentUsers - 1); // 9 người còn lại nhận 409 Conflict
});
```

### 3. Các Điều Kiện Biên Bắt Buộc Kiểm Tra (Boundary Checks)

1. **Tính nguyên tử (Atomicity):** Số lượng bản ghi `Booking` được tạo ra trong cơ sở dữ liệu phải đúng bằng 1.
2. **Khôi phục trạng thái sau khi hết hạn Lock (TTL Expiration):** Khi User giữ ghế không thanh toán sau thời gian timeout, khóa Redis tự động giải phóng và ghế trở lại trạng thái `FREE`.

---

## Acceptance Criteria & Definition of Done (DoD Checklist)

- [ ] **Mã Nguồn Kiểm Thử & Chạy Pass ($100\%$):**
  - [ ] Tạo file `tests/api/concurrency.spec.ts`.
  - [ ] Chạy lệnh `bunx playwright test tests/api/concurrency.spec.ts --project=api` pass $100\%$.
  - [ ] Xác nhận tỷ lệ Double-booking là $0.00\%$ trên tối thiểu 10 requests đồng thời.
- [ ] **Bằng Chứng Git & Pull Request:**
  - [ ] Tạo nhánh `feat/wbs-2.2-api-concurrency-redlock`.
  - [ ] Tạo Pull Request trên GitHub với mô tả chi tiết, log status codes và ảnh test pass.
  - [ ] Cập nhật link PR vào Google Sheets Master WBS.
- [ ] **Báo Cáo:**
  - [ ] Soạn thảo bản thảo Mục 3.2 Chương 3 cho Báo cáo Word (`67_Bao_cao.docx`).
