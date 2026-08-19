# WBS 1.1A: Playwright Overview and Code-First Philosophy

## Metadata

- **WBS Code:** `1.1A`
- **Task Name:** Tổng quan Playwright, Lịch sử & Triết lý Code-first
- **Assignee:** Lê Minh Quân (MSSV: 0306241143)
- **Task Weight:** `2.0%`
- **Deliverable Artifacts:** Mục 1.1 Chương 1 trong `67_Bao_cao.docx` và các Slide tương ứng trong `67_Slide.pptx`.

## TL;DR

- **Bản chất:** Tổng quan Playwright và triết lý thiết kế Code-first hiện đại cho SDET từ đội ngũ phát triển Puppeteer (Microsoft).
- **Mục đích:** Cung cấp nền tảng kiến trúc lý thuyết và 8 khái niệm cốt lõi cho Chương 1 báo cáo đồ án.
- **Điểm mấu chốt:** Khắc phục triệt để hạn chế của Selenium và Cypress thông qua cơ chế giao tiếp trực tiếp với lõi trình duyệt.

## Core Architectural Content to Document

### 1. Lịch Sử Phát Triển & Bối Cảnh Ra Đời

- **Nguồn gốc:** Khởi xướng và bảo trợ dài hạn bởi Microsoft (2020), phát triển bởi đội ngũ kỹ sư sáng lập Puppeteer (Google).
- **Mục tiêu cốt lõi:** Khắc phục hạn chế của Selenium (HTTP latency overhead) và Cypress (Single-tab/iframe sandbox boundary).
- **Mô hình cấp phép:** Mã nguồn mở $100\%$ theo giấy phép Apache 2.0.

### 2. Triết Lý Thiết Kế Code-First Trong Kiểm Thử Phần Mềm

- **Code-First vs Low-Code / Record-Playback (GUI Tools):**
  - Coi kịch bản kiểm thử là mã nguồn hạng nhất (First-Class Code), tuân thủ DRY, SOLID, Type Safety.
  - Loại bỏ sự phụ thuộc vào các công cụ GUI đắt đỏ, dễ gãy (brittle) khi UI thay đổi.
  - Tích hợp tự nhiên vào Git, Code Review và CI/CD Pipeline.
  - Xem Record-Playback (`codegen`) là công cụ hỗ trợ sinh mã ban đầu (Scaffolding), không phải giải pháp thay thế kỹ nghệ viết test.
- **Hỗ trợ đa ngôn ngữ:** TypeScript, JavaScript, Python, Java, C# (.NET).

### 3. 8 Khái Niệm Cốt Lõi (Playwright Core Concepts)

```text
+------------------------------------------------------------------------------------+
|                       HỆ THỐNG 8 KHÁI NIỆM CỐT LÕI PLAYWRIGHT                      |
+------------------------------------------------------------------------------------+
| 1. Browser Hierarchy       : Browser ---> BrowserContext ---> Page                 |
| 2. Locators                : Role-based, Lazy Evaluation, Strict Mode              |
| 3. Auto-waiting            : Tự động kiểm tra 5 điều kiện Actionability            |
| 4. Web-first Assertions    : Tự động Retry cho đến khi đạt kỳ vọng                 |
| 5. Network Interception    : Can thiệp & Mock API qua page.route()                 |
| 6. APIRequestContext       : Kiểm thử API trực tiếp, tốc độ micro-giây             |
| 7. POM & COM Architecture  : Page Object Model kết hợp Component Object Model      |
| 8. Test Fixtures           : Dependency Injection quản lý môi trường test          |
+------------------------------------------------------------------------------------+
```

1. **Browser Hierarchy (`Browser -> BrowserContext -> Page`):** Phân cấp tiến trình trình duyệt OS, không gian bộ nhớ cô lập và tab trang.
2. **Locators (Bộ định vị thế hệ mới):** Định vị dựa trên cây Accessibility Tree (`getByRole`, `getByText`, `getByLabel`), cơ chế Lazy Evaluation không bắt trước DOM, Strict Mode chống bắt nhầm phần tử.
3. **Auto-waiting:** Cơ chế tự động thăm dò 5 điều kiện Actionability trước khi thực thi action.
4. **Web-first Assertions:** Tự động retry liên tục trong khung thời gian timeout quy định.
5. **Network Interception:** Can thiệp sâu vào tầng mạng qua `page.route()` ở cấp độ CDP.
6. **APIRequestContext:** Thực thi các HTTP request trực tiếp không cần khởi tạo trình duyệt đồ họa.
7. **POM & COM Architecture (Page Object Model & Component Object Model):** Đóng gói trang lớn và các thành phần giao diện dùng chung (Navbar, Header, Footer) thành các class độc lập, triệt tiêu selector thô trong kịch bản test.
8. **Test Fixtures:** Cơ chế Dependency Injection cung cấp và dọn dẹp môi trường test độc lập.

---

## Acceptance Criteria & Definition of Done (DoD Checklist)

- [ ] **Báo cáo Word (`67_Bao_cao.docx`):**
  - [ ] Hoàn thành Mục 1.1 Chương 1: Giới thiệu Playwright, lịch sử hình thành, triết lý Code-first và 8 khái niệm cốt lõi.
  - [ ] Đính kèm sơ đồ cây 8 khái niệm cốt lõi (bao gồm kiến trúc POM & COM).
- [ ] **Review & Bàn Giao:**
  - [ ] Nộp bản thảo Word cho Trưởng nhóm nghiệm thu đúng hạn.
