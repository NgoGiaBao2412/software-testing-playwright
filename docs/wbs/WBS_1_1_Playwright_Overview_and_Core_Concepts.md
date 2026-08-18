---
tags: [type/method, topic/project-management, layer/quality]
status: permanent
date: 2026-08-14
description: Comprehensive task specification, theoretical architecture, and Definition of Done for WBS 1.1 - Playwright Overview, GUIs, and Core Concepts
---

# WBS 1.1: Playwright Overview, GUIs, and Core Concepts

## Metadata

- **WBS Code:** `1.1`
- **Task Name:** Tổng quan Playwright, Giao diện & Các Khái niệm Cốt lõi
- **Task Weight:** `4.0%`
- **Deliverable Artifacts:** Mục 1.1 Chương 1 trong `STT nhom_Bao cao.docx` và các Slide tương ứng trong `STT nhom_Slide.pptx`.

## TL;DR

Tài liệu đặc tả kỹ thuật chi tiết hướng dẫn thành viên phụ trách biên soạn phần Tổng quan Playwright cho Báo cáo và Slide. Nội dung bao gồm phân tích 5 Giao diện Đồ họa Trực quan (GUIs) của Playwright, 8 Khái niệm Cốt lõi (Browser Hierarchy, Locators, Auto-waiting 5 Actionability Checks, Web-first Assertions, Network Interception, APIRequestContext, POM/COM, Fixtures) kèm Definition of Done (DoD) kiểm toán.

## Core Architectural Content to Document

### 1. 5 Giao Diện Đồ Họa Trực Quan (Playwright GUIs)

Người thực hiện cần chụp ảnh màn hình và trình bày rõ 5 giao diện sau:

1. **Playwright UI Mode (`npx playwright test --ui`):**
   - Môi trường đồ họa tương tác thời gian thực.
   - Hỗ trợ cây Test Suite, chạy từng bài test, xem DOM Snapshot từng bước (Time-travel debugging), xem Network Waterfall, Console logs và chế độ Watch Mode tự động chạy lại khi sửa code.
2. **Playwright Trace Viewer (`npx playwright show-trace trace.zip`):**
   - Giao diện điều tra sự cố đồ họa hậu kỳ (Post-Mortem GUI).
   - Cung cấp Filmstrip tua video, DOM Snapshot trước/sau click, Network Waterfall HAR, Console Logs.
3. **Playwright Codegen / Inspector (`npx playwright codegen`):**
   - Công cụ ghi nhận thao tác tự động sinh mã nguồn (Record & Playback).
   - Tự động bắt XPath / Role-based locator khi người dùng tương tác trên trình duyệt.
4. **HTML Test Report Dashboard (`npx playwright show-report`):**
   - Trang báo cáo trực quan nền Web, tổng hợp tỷ lệ Pass/Fail, thời gian chạy, ảnh chụp lỗi và video đính kèm.
5. **VS Code Playwright Extension:**
   - Plugin tích hợp IDE hỗ trợ chạy test bằng một cú click và đặt Breakpoint debug trực tiếp trên từng dòng code.

### 2. 8 Khái Niệm Cốt Lõi (Core Concepts)

```text
┌────────────────────────────────────────────────────────────────────────┐
│                   HỆ THỐNG KHÁI NIỆM CỐT LÕI CỦA PLAYWRIGHT            │
├────────────────────────────────────────────────────────────────────────┤
│ 1. Browser Hierarchy    : Browser ──▶ BrowserContext ──▶ Page          │
│ 2. Locators             : Role-based, Lazy Evaluation, Strict Mode     │
│ 3. Auto-waiting         : Tự động kiểm tra 5 điều kiện Actionability   │
│ 4. Web-first Assertions : Tự động Retry cho đến khi đạt kỳ vọng        │
│ 5. Network Interception : Can thiệp & Mock API qua page.route()        │
│ 6. APIRequestContext    : Kiểm thử API không cần bật trình duyệt       │
│ 7. Page Object Model    : Tách biệt cấu trúc giao diện và luồng test   │
│ 8. Test Fixtures        : Cơ chế Dependency Injection cung cấp môi trường│
└────────────────────────────────────────────────────────────────────────┘
```

1. **Browser Hierarchy (`Browser -> BrowserContext -> Page`):**
   - `Browser`: Tiến trình trình duyệt vật lý (Chromium, Firefox, WebKit).
   - `BrowserContext`: Không gian cô lập tuyệt đối trong RAM (như cửa sổ ẩn danh Incognito), chứa Cookie/Session riêng, khởi tạo trong vài mili-giây, cho phép chạy song song hàng trăm bài test không rò rỉ session.
   - `Page`: Tab hoặc trang web cụ thể nằm trong `BrowserContext`.
2. **Locators (Định vị thế hệ mới):**
   - Ưu tiên User-facing Locators (`getByRole`, `getByText`, `getByLabel`, `getByTestId`).
   - *Lazy Evaluation:* Chỉ tìm kiếm phần tử trên DOM khi thao tác thực thi (loại bỏ lỗi `StaleElementReferenceException`).
   - *Strict Mode:* Mặc định bắt buộc trúng duy nhất 1 phần tử.
3. **Auto-waiting (Tự động chờ 5 điều kiện Actionability):**
   - Trước khi click/fill, Playwright tự động polling 5 trạng thái: Attached (gắn DOM), Visible (hiển thị), Stable (không animation), Enabled (không disabled), Unobscured (không bị che khuất).
   - Loại bỏ hoàn toàn các lệnh `sleep()` làm chậm bài test.
4. **Web-first Assertions:**
   - Lệnh `expect(locator).toBeVisible()`, `toHaveText()`.
   - Tự động Retry liên tục trong $5000\text{ms}$ cho đến khi thỏa mãn.
5. **Network Interception (`page.route()`):**
   - Can thiệp tầng mạng CDP để chặn tài nguyên, sửa header, hoặc mock response HTTP 500/JSON.
6. **APIRequestContext:**
   - Gửi HTTP Request trực tiếp với tốc độ micro-giây không cần khởi động trình duyệt.
7. **Page Object Model (POM) & Component Object Model (COM):**
   - Đóng gói Locators và nghiệp vụ của Trang/Component vào Class riêng biệt.
8. **Test Fixtures:**
   - Cơ chế Dependency Injection tự động chuẩn bị môi trường trước test và dọn dẹp sau test.

---

## Acceptance Criteria & Definition of Done (DoD Checklist)

Thành viên thực hiện phải hoàn thành đủ các tiêu chí dưới đây để được duyệt **$100\%$ ($4.0\%$ đồ án)**:

- [ ] **Báo cáo Word (`STT nhom_Bao cao.docx`):**
  - [ ] Soạn thảo đầy đủ Mục 1.1 Chương 1: Giới thiệu Playwright, 5 giao diện trực quan, 8 khái niệm cốt lõi.
  - [ ] Đính kèm tối thiểu 4 hình ảnh chụp màn hình minh họa thực tế cho các giao diện (UI Mode, Trace Viewer, Codegen, HTML Report).
  - [ ] Định dạng chuẩn: Font Times New Roman 13, giãn dòng 1.5 lines, canh đều hai bên (Justified).
- [ ] **Slide Thuyết Trình (`STT nhom_Slide.pptx`):**
  - [ ] Tạo 2 - 3 slide trình bày trực quan về Giao diện và Khái niệm cốt lõi (dùng sơ đồ, bullet points ngắn gọn, không nhồi nhét văn bản).
- [ ] **Review & Bàn Giao:**
  - [ ] Gửi bản thảo Word và Slide cho Trưởng nhóm review trước hạn chót.

## Related Notes

- [[Browser_Automation_IPC_Fundamentals]]
- [[Chrome_DevTools_Protocol_Mechanics]]
- [[Browser_Context_Isolation]]
- [[Playwright_Auto_Waiting_and_Actionability_Checks]]
- [[Role_Based_Locators_and_Accessibility_Tree]]
- [[Team_Work_Breakdown_and_Contribution_Matrix_Template]]
