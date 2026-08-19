# WBS 1.4B: API Testing Capabilities and Design Patterns

## Metadata

- **WBS Code:** `1.4B`
- **Task Name:** Phân tích Năng lực API (APIRequestContext, Hybrid Auth, SOM)
- **Assignee:** Nguyễn Hoài Linh (MSSV: 0306241126)
- **Task Weight:** `2.5%`
- **Deliverable Artifacts:** Mục 2.4 Chương 2 trong `67_Bao_cao.docx` và các Slide tương ứng trong `67_Slide.pptx`.

## TL;DR

- **Bản chất:** Năng lực tự động hóa kiểm thử API của Playwright với engine HTTP độc lập `APIRequestContext`.
- **Mục đích:** Xây dựng khung kiến trúc cho toàn bộ bộ kiểm thử API của đồ án (Phase 2).
- **Điểm mấu chốt:** Xác thực lai (Hybrid Auth), Service Object Model (SOM), và kiểm định hợp đồng RFC 9457 với Zod.

## Core Architectural Content to Document

### 1. Đối Tượng `APIRequestContext` (Headless HTTP Engine)

```typescript
// Thuc thi HTTP Request doc lap khong can mo Browser
import { test, expect } from "@playwright/test";

test("API Health Check", async ({ request }) => {
  const response = await request.get("/api/health");
  expect(response.status()).toBe(200);
  const data = await response.json();
  expect(data.status).toBe("ok");
});
```

- **Tốc độ thực thi micro-giây:** Gọi trực tiếp qua socket, không tốn tài nguyên render Chromium hay DOM.
- **Tự động quản lý phiên:** Duy trì Cookie Jar, kế thừa `baseURL` và `extraHTTPHeaders` từ `playwright.config.ts`.

### 2. Kỹ Thuật Xác Thực Lai (Hybrid Auth & Storage State Injection)

```text
+-----------------------+
|  POST /api/v1/auth    | ----> Nhận JWT / Cookie trong 30ms ----> Lưu file storageState.json
+-----------------------+                                                    |
                                                                             v
+-----------------------+                                    +-------------------------------+
|  UI Test 1: Checkout  | <--------------------------------- | Nạp trực tiếp vào Context RAM |
+-----------------------+     (Trạng thái đã đăng nhập sẵn)  +-------------------------------+
```

- **Bản chất:** Bỏ qua các bước gõ phím đăng nhập trên UI ($3\text{s} - 5\text{s}$), gửi 1 HTTP Request trực tiếp lấy Token ($30\text{ms}$).
- **Hiệu quả:** Rút ngắn $> 80\%$ tổng thời gian chạy E2E suite.

### 3. Mô Hình Service Object Model (SOM) & Request Chaining

- **Service Object Model (SOM):** Đóng gói endpoints nghiệp vụ vào các class (`AuthService`, `BookingService`).
- **Request Chaining:** Chuyền dữ liệu đầu ra của API trước làm tham số đầu vào cho API kế tiếp:
  $$\text{Login API} \xrightarrow{\text{Token}} \text{Hold Seat API} \xrightarrow{\text{SeatID}} \text{Payment API} \xrightarrow{\text{BookingID}} \text{Get Ticket API}$$

### 4. Kiểm Định Hợp Đồng Chuẩn Hóa Lỗi (RFC 9457 & Zod Schema Validation)

- **Chống Contract Drift:** Backend đổi schema response lỗi $\to$ Zod bắt lỗi ngay lập tức tại ranh giới test.
- **Schema RFC 9457:** Kiểm định `type`, `title`, `status`, `detail`, `instance`.

---

## Acceptance Criteria & Definition of Done (DoD Checklist)

- [ ] **Báo cáo Word (`67_Bao_cao.docx`):**
  - [ ] Hoàn thành Mục 2.4 Chương 2: Phân tích `APIRequestContext`, kỹ thuật Hybrid Auth, mô hình SOM và chuẩn RFC 9457.
  - [ ] Đính kèm sơ đồ luồng dữ liệu Hybrid Auth và code mẫu Zod Schema.
  - [ ] Phân tích ưu thế của việc tích hợp kiểm thử API trực tiếp trong Playwright so với thư viện ngoài (Axios/RestAssured).
- [ ] **Review & Bàn Giao:**
  - [ ] Nộp bản thảo Word cho Trưởng nhóm nghiệm thu đúng hạn.
