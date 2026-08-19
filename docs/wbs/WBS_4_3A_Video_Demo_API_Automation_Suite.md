# WBS 4.3A: Video Demo Production - API Automation Suite

## Metadata

- **WBS Code:** `4.3A`
- **Task Name:** Sản xuất Video Clip Thuyết minh & Demo Bộ Test API (Thời lượng: 5 - 8 Phút)
- **Assignee:** Ngô Gia Bảo (MSSV: 0306241090)
- **Task Weight:** `3.5%`
- **Deliverable Artifacts:** File video demo `67_Demo_API.mp4` (Full HD 1080p), đường link video YouTube trong file `67_Demo.txt`.

## TL;DR

- **Bản chất:** Sản xuất video clip demo thực tế bộ kiểm thử tự động API Automation Suite trên hệ thống NestJS Ticket Booking.
- **Mục đích:** Thuyết minh chi tiết 4 ca kiểm thử API (Auth, Concurrency Redlock, Idempotency, RFC 9457 & Rate Limiting).
- **Điểm mấu chốt:** Minh chứng năng lực thực thi micro-giây của Playwright `APIRequestContext` và kết quả pass $100\%$ trên Terminal & CI/CD.

## Core Architectural Content to Implement

### 1. Kịch Bản Quay & Lời Thuyết Minh Chi Tiết (5 - 8 Phút)

```text
TIMELINE VIDEO DEMO API (Thời lượng: 5 - 8 Phút)
├── 00:00 - 00:45 | Phần 1: Giới thiệu kiến trúc framework & file cấu hình playwright.config.ts
├── 00:45 - 02:00 | Phần 2: API Ca 1 - Auth Lifecycle, JWT & Single-use Refresh Token Rotation
├── 02:00 - 03:30 | Phần 3: API Ca 2 - High-Contention Concurrency & Redis Redlock Race Condition
├── 03:30 - 05:00 | Phần 4: API Ca 3 - Booking Transaction & Idempotency Key (UUID v4 Header)
├── 05:00 - 06:30 | Phần 5: API Ca 4 - Chuẩn hóa mã lỗi RFC 9457 & Rate Limiting Throttler
└── 06:30 - 07:00 | Phần 6: Tổng kết kết quả chạy pass toàn bộ test suite trên Terminal & CI/CD
```

- **Phần 1: Giới thiệu kiến trúc:** Mở file `playwright.config.ts`, giải thích cấu hình project `api` chạy ở tốc độ micro-giây không cần mở trình duyệt.
- **Phần 2: Demo Ca 1 (Auth):** Chạy `bunx playwright test tests/api/auth.spec.ts --project=api`, giải thích luồng lấy JWT Token và request gửi lại Token cũ bị chặn `HTTP 403`.
- **Phần 3: Demo Ca 2 (Concurrency Redlock):** Chạy `bunx playwright test tests/api/concurrency.spec.ts --project=api`, bắn đồng thời 10 requests qua `Promise.all()`, giải thích log chỉ có đúng 1 request nhận `200/201` và 9 requests nhận `409 Conflict`.
- **Phần 4: Demo Ca 3 (Idempotency):** Chạy `bunx playwright test tests/api/booking.spec.ts --project=api`, chứng minh gửi lại cùng `Idempotency-Key` không làm tăng vé trong DB.
- **Phần 5: Demo Ca 4 (RFC 9457):** Chạy `bunx playwright test tests/api/rfc9457_throttling.spec.ts --project=api`, giải thích Schema Zod bắt lỗi Contract Drift và phản hồi `HTTP 429`.

### 2. Quy Chuẩn Kỹ Thuật Video

1. **Chất lượng hình ảnh:** Full HD ($1920 \times 1080$), $16:9$, $\ge 30\text{fps}$ (khuyên dùng 60fps). Cửa sổ Terminal phóng to font $\ge 16\text{pt}$.
2. **Chất lượng âm thanh:** Lồng tiếng giọng đọc rõ ràng, phát âm chuẩn thuật ngữ kỹ thuật tiếng Anh (Playwright, WebSocket, JWT, Redlock, Idempotency, RFC 9457), loại bỏ tạp âm.
3. **Hiệu ứng trực quan:** Mouse cursor highlight và zoom-in vào dòng lệnh hoặc kết quả kiểm thử quan trọng.

---

## Acceptance Criteria & Definition of Done (DoD Checklist)

- [ ] **Sản Xuất & Biên Tập Video:**
  - [ ] Hoàn thành video thời lượng từ $5 - 8$ phút theo kịch bản ở Mục 1.
  - [ ] Video có âm thanh thuyết minh rõ ràng, hình ảnh sắc nét Full HD 1080p.
- [ ] **Xuất Bản & Bàn Giao:**
  - [ ] Đăng tải video lên YouTube ở chế độ Không công khai (Unlisted) hoặc Công khai.
  - [ ] Cập nhật link vào file `67_Demo.txt` và nộp file video gốc `67_Demo_API.mp4` cho Trưởng nhóm.
