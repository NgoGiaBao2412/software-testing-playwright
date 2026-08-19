# WBS 1.3B: Playwright UI Mode and Trace Viewer Diagnostics

## Metadata

- **WBS Code:** `1.3B`
- **Task Name:** Hướng dẫn chuyên sâu Playwright UI Mode & Trình gỡ lỗi Trace Viewer
- **Assignee:** Lê Minh Tài (MSSV: 0306241145)
- **Task Weight:** `2.5%`
- **Deliverable Artifacts:** Mục 2.2B Chương 2 trong `67_Bao_cao.docx` và các Slide tương ứng trong `67_Slide.pptx`.

## TL;DR

- **Bản chất:** Hướng dẫn vận hành Playwright UI Mode (tương tác thời gian thực) và Trace Viewer (khám nghiệm sự cố hậu kỳ).
- **Mục đích:** Cung cấp quy trình điều tra $100\%$ Audit Trail cho các bài test fail trên máy chủ CI/CD.
- **Điểm mấu chốt:** Khôi phục trạng thái DOM, Network Waterfall, Filmstrip mà không cần chạy lại test.

## Core Architectural Content to Document

### 1. Giao Diện Tương Tác Thời Gian Thực (Playwright UI Mode)

```bash
# Khoi dong giao dien UI Mode voi Bun
bunx playwright test --ui
```

- **Tính năng nổi bật:**
  1. **Cây Test Suite Trực Quan:** Xem danh sách test files, trạng thái Pass/Fail, thời gian thực thi từng step.
  2. **Watch Mode:** Tự động phát hiện thay đổi file và kích hoạt chạy lại tức thì.
  3. **Time-Travel Debugging:** Quan sát trạng thái DOM trước (`Before`), trong (`Action`), và sau khi click (`After`).
  4. **Locator Picker:** Nhấp chuột vào phần tử để tự động sinh Role-based Locator tối ưu.
  5. **Bảng Phân Tích Đa Luồng:** Tab `Console Logs`, `Network Waterfall`, `Source Code`, và `Call Log`.

### 2. Trình Gỡ Lỗi Hậu Kỳ (Playwright Trace Viewer)

```bash
# Mo file trace.zip de phan tich su co
bunx playwright show-trace test-results/glitch-test/trace.zip
```

- **Cấu hình thu thập Trace trong `playwright.config.ts`:**

  ```typescript
  use: {
    trace: 'on-first-retry', // Chi ghi trace khi test fail lan dau va retry
  }
  ```

- **4 Luồng Dữ Liệu Kiểm Toán Trong File `trace.zip`:**
  1. **Filmstrip Timeline:** Chuỗi ảnh chụp màn hình tuần tự theo từng mili-giây.
  2. **Action Snapshots:** Ảnh chụp DOM tương tác thực (có thể inspect phần tử trực tiếp).
  3. **Network Log (HAR):** Header, Request Body, Response Status, độ trễ API calls.
  4. **Console & Source Stack:** Vị trí chính xác dòng code gây Exception.
- **Xem Trace trên Cloud:** Kéo-thả file `.zip` vào [trace.playwright.dev](https://trace.playwright.dev).

---

## Acceptance Criteria & Definition of Done (DoD Checklist)

- [ ] **Báo cáo Word (`67_Bao_cao.docx`):**
  - [ ] Hoàn thành Mục 2.2B Chương 2: Phân tích UI Mode và Trace Viewer.
  - [ ] Đính kèm tối thiểu 3 ảnh chụp màn hình minh họa: UI Mode tổng quan, Time-travel DOM snapshot, Trace Viewer Network Waterfall.
  - [ ] Hướng dẫn cấu hình thu thập trace trong `playwright.config.ts`.
- [ ] **Review & Bàn Giao:**
  - [ ] Nộp bản thảo Word cho Trưởng nhóm nghiệm thu đúng hạn.
