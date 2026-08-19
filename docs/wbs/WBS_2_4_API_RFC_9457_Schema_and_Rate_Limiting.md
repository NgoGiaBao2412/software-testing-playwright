# WBS 2.4: API Test Suite - RFC 9457 Problem Details and Rate Limiting

## Metadata

- **WBS Code:** `2.4`
- **Task Name:** API Case 4: RFC 9457 Problem Details Schema Validation & Rate Limiting
- **Assignee:** Nguyễn Hoài Linh (MSSV: 0306241126)
- **Task Weight:** `7.5%`
- **Deliverable Artifacts:** File mã nguồn `tests/api/rfc9457_throttling.spec.ts`, `schemas/rfc9457.schema.ts`, Pull Request GitHub, Mục 3.4 Chương 3 trong `67_Bao_cao.docx` và các Slide tương ứng trong `67_Slide.pptx`.

## TL;DR

- **Bản chất:** Kịch bản kiểm thử tự động API Ca 4: Kiểm định hợp đồng dữ liệu lỗi theo chuẩn RFC 9457 bằng Zod và kiểm thử bộ điều tiết lưu lượng (Rate Limiting / Throttling).
- **Mục đích:** Ngăn ngừa Contract Drift và kiểm chứng cơ chế bảo vệ hệ thống trước tấn công từ chối dịch vụ.
- **Điểm mấu chốt:** Xác thực các HTTP headers kiểm soát tốc độ (`Retry-After`, `X-RateLimit-*`) và khớp cấu trúc schema `application/problem+json`.

## Core Architectural Content to Implement

### 1. Chuẩn Hóa Phản Hồi Lỗi Quốc Tế: RFC 9457 Problem Details

Khi API gặp sự cố (4xx / 5xx), response bắt buộc phải tuân theo cấu trúc JSON chuẩn `application/problem+json`:

1. **`type` (URI):** Địa chỉ URL định danh loại lỗi (ví dụ: `https://api.example.com/errors/rate-limit-exceeded`).
2. **`title` (String):** Tiêu đề ngắn gọn của nhóm lỗi (`Too Many Requests`).
3. **`status` (Number):** Mã trạng thái HTTP (`429`).
4. **`detail` (String):** Mô tả chi tiết nguyên nhân cụ thể dẫn đến lỗi.
5. **`instance` (URI - Optional):** Trace ID / Request ID duy nhất để tra cứu log.
6. **`invalid_params` (Array - Optional):** Danh sách các trường không hợp lệ nếu là lỗi `422`.

### 2. Kỹ Thuật Kiểm Định Hợp Đồng Bằng Zod

```typescript
// schemas/rfc9457.schema.ts
import { z } from 'zod';

export const ProblemDetailsSchema = z.object({
  type: z.string().url(),
  title: z.string().min(1),
  status: z.number().int().min(400).max(599),
  detail: z.string().min(1),
  instance: z.string().optional(),
  invalid_params: z.array(z.object({
    name: z.string(),
    reason: z.string(),
  })).optional(),
});
```

### 3. Kỹ Thuật Kiểm Thử Rate Limiting & Throttling

```typescript
// tests/api/rfc9457_throttling.spec.ts
import { test, expect } from '@playwright/test';
import { ProblemDetailsSchema } from '../../schemas/rfc9457.schema';

test('API Rate Limiting & RFC 9457 Validation', async ({ request }) => {
  const quotaLimit = 10;
  
  // Gửi 10 requests hợp lệ trong hạn mức
  for (let i = 0; i < quotaLimit; i++) {
    const res = await request.get('/api/v1/tickets');
    expect(res.status()).toBe(200);
  }

  // Request thứ 11 vượt quota -> Bắt buộc nhận HTTP 429
  const throttledRes = await request.get('/api/v1/tickets');
  expect(throttledRes.status()).toBe(429);

  // Kiểm tra headers điều tiết
  expect(throttledRes.headers()['retry-after']).toBeDefined();
  expect(throttledRes.headers()['x-ratelimit-remaining']).toBe('0');

  // Kiểm định Schema RFC 9457 bằng Zod
  const body = await throttledRes.json();
  const validation = ProblemDetailsSchema.safeParse(body);
  expect(validation.success).toBe(true);
});
```

---

## Acceptance Criteria & Definition of Done (DoD Checklist)

- [ ] **Mã Nguồn Kiểm Thử & Chạy Pass ($100\%$):**
  - [ ] Tạo file `schemas/rfc9457.schema.ts` và `tests/api/rfc9457_throttling.spec.ts`.
  - [ ] Chạy lệnh `bunx playwright test tests/api/rfc9457_throttling.spec.ts --project=api` pass $100\%$.
  - [ ] Xác nhận toàn bộ response lỗi 4xx/5xx đều pass qua bộ lọc Zod validation.
- [ ] **Bằng Chứng Git & Pull Request:**
  - [ ] Tạo nhánh `feat/wbs-2.4-api-rfc9457-throttling`.
  - [ ] Tạo Pull Request trên GitHub với đầy đủ mô tả, log JSON RFC 9457 và ảnh test pass.
  - [ ] Cập nhật link PR vào Google Sheets Master WBS.
- [ ] **Báo Cáo:**
  - [ ] Soạn thảo bản thảo Mục 3.4 Chương 3 cho Báo cáo Word (`67_Bao_cao.docx`).
