---
tags: [type/method, topic/project-management, layer/quality]
status: permanent
date: 2026-08-14
description: Deep architectural breakdown, design patterns, and Definition of Done for WBS 1.4 - Web UI and API Core Capabilities
---

# WBS 1.4: Web UI and API Core Capabilities Analysis

## Metadata

- **WBS Code:** `1.4`
- **Task Name:** Phân Tích Tính Năng Cốt Lõi cho Kiểm Thử Web/App và API
- **Total Task Weight:** `5.0%`
- **Deliverable Artifacts:** Mục 2.3 Chương 2 trong `STT nhom_Bao cao.docx` và các Slide tương ứng trong `STT nhom_Slide.pptx`.

## TL;DR

Tài liệu đặc tả kiến trúc kỹ thuật phân tích các tính năng cốt lõi của Playwright trên cả 2 tầng: Tầng Web UI (mô hình Page Object Model, Component Object Model, Network Interception & Mocking) và Tầng API (đối tượng `APIRequestContext`, kỹ thuật xác thực lai Hybrid Auth, Request Chaining và kiểm định dữ liệu tự động).

## Core Content to Document

### 1. Kỹ Thuật Kiểm Thử Giao Diện Web (Web UI Automation Capabilities)

1. **Page Object Model (POM) & Component Object Model (COM):**
   - *Bản chất:* Tách biệt hoàn toàn phần tử giao diện (Locators) và nghiệp vụ trang khỏi logic kiểm thử (Assertions).
   - *Cấu trúc:*
     ```text
     tests/ui/
     ├── components/
     │   └── NavbarComponent.ts    <-- Đóng gói Menu, Cart Badge, Logout
     ├── pages/
     │   ├── LoginPage.ts          <-- Đóng gói form đăng nhập
     │   ├── InventoryPage.ts      <-- Đóng gói danh sách sản phẩm & lọc giá
     │   └── CheckoutPage.ts       <-- Đóng gói form thanh toán
     └── specs/
         └── checkout.spec.ts      <-- File kịch bản kiểm thử sạch sẽ, dễ đọc
     ```
2. **Network Interception & Mocking (`page.route()`):**
   - *Bản chất:* Can thiệp vào luồng HTTP request của trình duyệt ở cấp độ giao thức CDP.
   - *Ứng dụng:* Giả lập lỗi Server (Mock HTTP 500), làm chậm mạng giả lập mạng 3G yếu, chặn tải ảnh/video để tăng tốc độ chạy test.

### 2. Kỹ Thuật Kiểm Thử Giao Diện Lập Trình Ứng Dụng (API Automation Capabilities)

1. **Đối Tượng `APIRequestContext` Không Đầu (Headless HTTP Engine):**
   - Thực thi các cuộc gọi HTTP `request.post()`, `request.get()` trực tiếp với tốc độ micro-giây mà không cần dựng cây DOM hay mở Browser.
2. **Kỹ Thuật Xác Thực Lai (Hybrid Auth & Storage State Injection):**
   - Đăng nhập lấy JWT Token qua API chỉ mất $50\text{ms}$, lưu lại file `storageState.json` và tái sử dụng cho hàng trăm bài test UI mà không cần gõ username/password trên form đăng nhập lặp đi lặp lại.
3. **Mô Hình Service Object Model (SOM) & Request Chaining:**
   - Đóng gói các endpoint vào các Service class (`AuthService`, `BookingService`) để xâu chuỗi dữ liệu đầu ra của API này làm đầu vào cho API tiếp theo (`Token -> Reserve -> Confirm`).
4. **Kiểm Định Hợp Đồng Lỗi Chuẩn Hóa (RFC 9457 & Zod Schema):**
   - Kiểm tra định dạng response `application/problem+json` và bảo vệ hệ thống khỏi rò rỉ cấu trúc dữ liệu lỗi (Contract Drift).

---

## Acceptance Criteria & Definition of Done (DoD Checklist)

- [ ] **Báo cáo Word (`STT nhom_Bao cao.docx`):**
  - [ ] Soạn thảo đầy đủ Mục 2.3 Chương 2: Phân tích kiến trúc POM/COM, Network Mocking, APIRequestContext, Hybrid Auth.
  - [ ] Đính kèm sơ đồ luồng dữ liệu (Data Flow Diagram) minh họa kiến trúc POM và SOM.
  - [ ] Đính kèm các đoạn code mẫu TypeScript minh họa cho từng kỹ thuật.
- [ ] **Slide Thuyết Trình (`STT nhom_Slide.pptx`):**
  - [ ] Thiết kế 2 slide: Slide 1 (Kiến trúc POM/COM cho UI), Slide 2 (Kiến trúc SOM & Hybrid Auth cho API).
- [ ] **Review & Bàn Giao:**
  - [ ] Nộp bản thảo cho Trưởng nhóm review và chuẩn hóa nội dung.

## Related Notes

- [[Page_Object_Model_and_Component_Architecture]]
- [[Network_Interception_and_Mocking_Mechanics]]
- [[APIRequestContext_vs_Browser_Engine]]
- [[Hybrid_Auth_and_Storage_State_Injection]]
- [[Service_Object_Model_and_API_Request_Chaining]]
- [[Team_Work_Breakdown_and_Contribution_Matrix_Template]]
