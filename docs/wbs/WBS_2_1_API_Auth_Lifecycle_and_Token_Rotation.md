# WBS 2.1: API Test Suite - Auth Lifecycle and Single-Use Token Rotation

## Metadata

- **WBS Code:** `2.1`
- **Task Name:** API Case 1: Auth Lifecycle, Token Rotation & Revocation
- **Assignee:** Nguyễn Quốc Đương (MSSV: 0306241102)
- **Task Weight:** `7.5%`
- **Deliverable Artifacts:** File mã nguồn `tests/api/auth.spec.ts`, `fixtures/api.fixture.ts`, Pull Request GitHub, Mục 3.1 Chương 3 trong `67_Bao_cao.docx` và các Slide tương ứng trong `67_Slide.pptx`.

## TL;DR

- **Bản chất:** Kịch bản kiểm thử tự động API Ca 1: Vòng đời xác thực tài khoản (Register -> Login -> Token Issuance -> Refresh Token Rotation -> Logout).
- **Mục đích:** Kiểm tra các biên bảo mật JWT, phát hiện tấn công tái sử dụng Token cũ (Token Reuse Detection), Token giả mạo chữ ký và Token hết hạn.
- **Điểm mấu chốt:** Tự động hóa kiểm thử thu hồi toàn bộ chuỗi token (Family Revocation) khi phát hiện token cũ bị gửi lại.

## Core Architectural Content to Implement

### 1. Luồng Nghiệp Vụ Xác Thực & Vòng Xoay Refresh Token (Rotation Flow)

```text
+---------------+      1. POST /auth/login       +---------------+
|  API Client   | -----------------------------> |  Auth Service |
|  (Playwright) | <----------------------------- |  (Backend API)|
+---------------+   Access Token (15m) + RT (7d) +---------------+
        |
        | 2. POST /auth/refresh (Gửi RT_1)
        v
+---------------+   Trả về Access Token mới +    +---------------+
|  Auth Service | =============================> |  RT_2 mới     |
|               |    (Hủy bỏ RT_1 vào Blacklist) |  (Rotated RT) |
+---------------+                                +---------------+
        |
        | 3. ATTACK SCENARIO: Gửi lại RT_1 đã cũ (Token Reuse Attack)
        v
+---------------+   Phát hiện vi phạm bảo mật:
|  Security Hub | -----------------------------> Trả về HTTP 403 Forbidden
+---------------+                                Hủy toàn bộ chuỗi phiên của User!
```

### 2. Danh Sách Các Ca Kiểm Thử Trọng Tâm (Test Scenarios)

1. **`TC-AUTH-01: Happy Path Login & JWT Structure`**
   - Gửi payload đăng nhập hợp lệ (`email`, `password`).
   - Kiểm tra HTTP Status `200 OK`.
   - Kiểm tra cấu trúc JWT (3 phần phân tách bằng dấu chấm: `header.payload.signature`), giải mã payload chứa đúng `userId`, `role`, và `exp`.
2. **`TC-AUTH-02: Single-Use Refresh Token Rotation`**
   - Gửi Refresh Token lần 1 $\to$ Nhận cặp Token mới (`HTTP 200`).
   - Gửi lại Refresh Token lần 1 đã sử dụng $\to$ Backend kích hoạt phòng vệ, trả về `HTTP 403 Forbidden` / `HTTP 401 Unauthorized` và vô hiệu hóa Family Tokens.
3. **`TC-AUTH-03: Expired & Tampered Token Boundary`**
   - Gửi Access Token đã hết hạn $\to$ Nhận `HTTP 401 Unauthorized`.
   - Thay đổi 1 ký tự trong Signature của Token $\to$ Nhận `HTTP 401 Unauthorized` (Invalid Signature).
4. **`TC-AUTH-04: Full Logout & Session Invalidation`**
   - Gọi endpoint `/auth/logout` $\to$ Kiểm tra Access Token và Refresh Token không thể sử dụng lại.

### 3. Cấu Trúc Mã Nguồn Chuẩn Mực

```typescript
// tests/api/auth.spec.ts
import { test, expect } from "@playwright/test";

test.describe("API Case 1: Auth Lifecycle & Token Rotation", () => {
  test("TC-AUTH-01: Login returns valid JWT format", async ({ request }) => {
    const res = await request.post("/auth/login", {
      data: {
        email: process.env.TEST_USER_EMAIL,
        password: process.env.TEST_USER_PASSWORD,
      },
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.accessToken).toBeDefined();
    expect(body.accessToken.split(".")).toHaveLength(3);
  });
});
```

---

## Acceptance Criteria & Definition of Done (DoD Checklist)

- [ ] **Mã Nguồn Kiểm Thử & Chạy Pass ($100\%$):**
  - [ ] Tạo file `tests/api/auth.spec.ts` và cấu hình `fixtures/api.fixture.ts`.
  - [ ] Chạy lệnh `bunx playwright test tests/api/auth.spec.ts --project=api` pass $100\%$ cả 4 test cases.
  - [ ] Không có lệnh chờ tĩnh `sleep()`, code viết sạch đẹp theo chuẩn TypeScript.
- [ ] **Bằng Chứng Git & Pull Request:**
  - [ ] Tạo nhánh `feat/wbs-2.1-api-auth-lifecycle`.
  - [ ] Tạo Pull Request trên GitHub với đầy đủ mô tả và ảnh chụp kết quả chạy test pass.
  - [ ] Cập nhật link PR vào cột Audit Evidence trên Google Sheets Master WBS.
- [ ] **Báo Cáo:**
  - [ ] Soạn thảo bản thảo Mục 3.1 Chương 3 cho Báo cáo Word (`67_Bao_cao.docx`).
