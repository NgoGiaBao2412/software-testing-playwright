# WBS 2.4: API Test Suite - RFC 9457 Problem Details and Rate Limiting

## Metadata

- **WBS Code:** `2.4`
- **Task Name:** API Ca 4: RFC 9457 Problem Details Schema Validation & Rate Limiting
- **Assignee:** Nguyễn Hoài Linh (MSSV: 0306241126)
- **Task Weight:** `7.5%`
- **Deliverable Artifacts:** File mã nguồn `tests/api/rfc9457_throttling.spec.ts`, `schemas/rfc9457.schema.ts`, Pull Request GitHub, Mục 3.2.4 Chương 3 trong `67_Bao_cao.docx` / `67_Bao_cao.tex`.

## TL;DR

- **Bản chất:** Đặc tả nhiệm vụ hiện thực bộ kiểm thử tự động API Ca 4: Kiểm định hợp đồng cấu trúc dữ liệu lỗi chuẩn quốc tế RFC 9457 bằng Zod Schema và kiểm thử bộ điều tiết lưu lượng bảo vệ hệ thống (Rate Limiting / Throttler).
- **Mục đích:** Ngăn ngừa hiện tượng Contract Drift giữa Backend và Frontend khi có lỗi xảy ra, đồng thời kiểm chứng cơ chế tự bảo vệ của API trước tấn công từ chối dịch vụ (DoS).
- **Điểm mấu chốt:** Xác thực các tiêu đề kiểm soát tốc độ (`Retry-After`, `X-RateLimit-*`) và đảm bảo $100\%$ phản hồi lỗi tuân thủ định dạng chuẩn `application/problem+json`.

---

## 1. Mục Tiêu & Bối Cảnh Nghiệp Vụ (Business & Technical Context)

- **Bối cảnh hệ thống:**
  - Trong các hệ thống Microservices hoặc REST APIs hiện đại, khi có lỗi xảy ra (4xx / 5xx), việc mỗi lập trình viên trả về một kiểu JSON khác nhau (lúc `{ "err": "..." }`, lúc `{ "message": "..." }`) gây vỡ giao diện (Contract Drift).
  - Chuẩn quốc tế **RFC 9457 (Problem Details for HTTP APIs)** quy định cấu trúc JSON chuẩn mực bắt buộc: `type`, `title`, `status`, `detail`, `instance`.
  - Đồng thời, để bảo vệ tài nguyên máy chủ trước các cuộc tấn công Brute-force hoặc lạm dụng API, hệ thống tích hợp **Rate Limiting Guard**: Giới hạn mỗi IP chỉ được gọi tối đa $N$ requests trong một khung thời gian; các request vượt ngưỡng phải bị chặn lại với HTTP `429 Too Many Requests` kèm tiêu đề chỉ dẫn `Retry-After`.

---

## 2. Các Yêu Cầu Thiết Kế Ca Kiểm Thử (Test Design Specifications)

Người phụ trách cần thiết kế và hiện thực các kịch bản kiểm thử trong `tests/api/rfc9457_throttling.spec.ts` và `schemas/rfc9457.schema.ts`:

1. **`TC-RFC-01: Zod Schema Contract Validation for 4xx/5xx Errors`**
   - **Thao tác:** Xây dựng `ProblemDetailsSchema` bằng Zod và gửi các requests lỗi (gửi payload sai định dạng `400 Bad Request`, truy cập tài nguyên không tồn tại `404 Not Found`).
   - **Kỳ vọng & Bất biến (Invariants):**
     - Content-Type của response là `application/problem+json` hoặc `application/json`.
     - Dữ liệu JSON phản hồi parse thành công qua Zod Schema với `validation.success === true`.
     - Trường `type` phải là URL hợp lệ, `status` khớp với HTTP Status Code thực tế.
2. **`TC-THROTTLE-02: Rate Limiting Threshold Triggering & 429 Validation`**
   - **Thao tác:** Bắn liên tiếp một chuỗi $N$ requests vào endpoint được bảo vệ (ví dụ: `GET /api/v1/tickets`) cho đến khi vượt quá hạn mức quota quy định (ví dụ: 10 requests / phút).
   - **Kỳ vọng:**
     - Request thứ $N+1$ bắt buộc nhận mã trạng thái HTTP `429 Too Many Requests`.
     - Phản hồi chứa tiêu đề `Retry-After` (số giây phải chờ) và `X-RateLimit-Remaining: 0`.
     - Nội dung phản hồi HTTP 429 cũng phải tuân thủ chuẩn RFC 9457.
3. **`TC-THROTTLE-03: Quota Recovery after Window Cooldown`**
   - **Mục tiêu:** Kiểm tra cơ chế tự động mở lại quyền truy cập sau khi hết thời gian chờ `Retry-After`.
   - **Kỳ vọng:** Khi hết thời gian cooldown, request tiếp theo gửi lên thành công với HTTP `200 OK`.

---

## 3. Câu Hỏi Cốt Lõi Cần Trả Lời & Kịch Bản Thất Bại (Failure Modes)

- Chuẩn RFC 9457 giải quyết bài toán gì cho đội ngũ phát triển Frontend và Mobile App so với các cấu trúc lỗi tự chế?
- Tại sao việc kiểm thử API bắt buộc phải có bước kiểm định Schema (Zod Schema Validation) thay vì chỉ kiểm tra HTTP Status Code `200` hay `400`?
- Tiêu đề `Retry-After` đóng vai trò gì trong việc hướng dẫn client điều chỉnh tốc độ gửi request (Exponential Backoff)?

---

## 4. Tài Liệu Nghiên Cứu Bắt Buộc (Primary Official Sources)

1. **Chuẩn Giao Thức Quốc Tế:**
   - [IETF RFC 9457 - Problem Details for HTTP APIs](https://datatracker.ietf.org/doc/html/rfc9457)
   - [IETF RFC 6585 - Additional HTTP Status Codes (Section 4: 429 Too Many Requests)](https://datatracker.ietf.org/doc/html/rfc6585#section-4)
2. **Thư Viện Schema & Rate Limiting:**
   - [Zod TypeScript-First Schema Validation Documentation](https://zod.dev/)
   - [NestJS Rate Limiting / Throttler Official Documentation](https://docs.nestjs.com/security/rate-limiting)

---

## 5. Cấu Trúc Báo Cáo & Yêu Cầu Đầu Ra (Required Deliverables)

### Báo Cáo (`67_Bao_cao.docx` / `67_Bao_cao.tex` - Mục 3.2.4 Chương 3)
Người phụ trách soạn thảo theo khung 5 phần học thuật:
1. **Mục tiêu & Cơ chế kỹ thuật:** Phân tích chuẩn hóa lỗi RFC 9457 và nguyên lý hoạt động của Rate Limiting Throttler.
2. **Đặc tả kịch bản & Dữ liệu kiểm thử:** Bảng thông số test data cho `TC-RFC-01`, `TC-THROTTLE-02`, `TC-THROTTLE-03`.
3. **Trích đoạn mã nguồn then chốt:** Trích dẫn 15 - 25 dòng code định nghĩa Zod Schema và vòng lặp kiểm thử vượt quota.
4. **Bằng chứng thực nghiệm & Phân tích log:** Ảnh chụp màn hình terminal chạy pass $100\%$, log JSON response lỗi và headers rate limit.
5. **Đánh giá rủi ro & Bài học kỹ thuật:** Phân tích rủi ro sập hệ thống do bão request và tầm quan trọng của chuẩn hóa hợp đồng dữ liệu.

---

## 6. Tiêu Chí Nghiệm Thu & Bằng Chứng Bàn Giao (Definition of Done)

- [ ] **Mã Nguồn Kiểm Thử & Chạy Pass ($100\%$):**
  - [ ] Tạo file `schemas/rfc9457.schema.ts` và `tests/api/rfc9457_throttling.spec.ts`.
  - [ ] Chạy lệnh `bunx playwright test tests/api/rfc9457_throttling.spec.ts --project=api` pass $100\%$ các kịch bản.
  - [ ] Đảm bảo $100\%$ response lỗi 4xx/5xx đều pass qua bộ lọc Zod Schema.
- [ ] **Bằng Chứng Git & Pull Request:**
  - [ ] Tạo nhánh `feat/wbs-2.4-api-rfc9457-throttling`.
  - [ ] Tạo Pull Request trên GitHub với mô tả chi tiết, log JSON RFC 9457 và ảnh test pass.
- [ ] **Chất Lượng Học Thuật Trong Báo Cáo:**
  - [ ] Hoàn thành đầy đủ 5 phần cho Mục 3.2.4 trong Báo cáo đồ án.
