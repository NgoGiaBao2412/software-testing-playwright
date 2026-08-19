# WBS 1.3A: Environment Setup, CLI Commands, and Playwright Codegen

## Metadata

- **WBS Code:** `1.3A`
- **Task Name:** Quy trình cài đặt môi trường, TypeScript, Playwright CLI & Codegen
- **Assignee:** Ngô Gia Bảo (MSSV: 0306241090)
- **Task Weight:** `2.5%`
- **Deliverable Artifacts:** Mục 2.1 & 2.2A Chương 2 trong `67_Bao_cao.docx` và các Slide tương ứng trong `67_Slide.pptx`.

## TL;DR

- **Bản chất:** Quy trình thiết lập môi trường kiểm thử tự động với Bun Runtime, TypeScript, và Playwright CLI.
- **Mục đích:** Hướng dẫn thành viên cài đặt công cụ, tra cứu bảng cờ lệnh thực thi và vận hành Playwright Codegen.
- **Điểm mấu chốt:** Chuẩn hóa $100\%$ lệnh thực thi qua Bun CLI (`bun`, `bunx`) cho toàn bộ dự án.

## Core Architectural Content to Document

### 1. Quy Trình Cài Đặt & Khởi Tạo Dự Án Mới

```bash
# Buoc 1: Cai dat Bun Runtime (neu chua co)
curl -fsSL https://bun.sh/install | bash

# Buoc 2: Cai dat Playwright Browsers va thu vien he dieu hanh
bunx playwright install --with-deps chromium

# Buoc 3: Cai dat dependencies du an
bun install
```

### 2. Bảng Tra Cứu Cờ Lệnh Dòng Lệnh Cốt Lõi (Playwright CLI Commands)

| Lệnh CLI Thực Thi (Bun)                   | Ý Nghĩa Kỹ Thuật & Tình Huống Sử Dụng                                  |
| ----------------------------------------- | ---------------------------------------------------------------------- |
| `bunx playwright test`                    | Thực thi toàn bộ test suite ở chế độ không đầu (Headless mode).        |
| `bunx playwright test --headed`           | Bật giao diện đồ họa trình duyệt để quan sát trực tiếp thao tác.       |
| `bunx playwright test --project=api`      | Chỉ thực thi các bài test thuộc cấu hình dự án API (không mở browser). |
| `bunx playwright test --project=chromium` | Chỉ thực thi các bài test thuộc cấu hình Web UI trên Chromium.         |
| `bunx playwright test -g "@smoke"`        | Lọc và chỉ chạy các bài test có chứa tag `@smoke` trong tiêu đề.       |
| `bunx playwright test --workers=4`        | Giới hạn số lượng luồng thực thi song song (Worker Threads) là 4.      |
| `bunx playwright test --retries=2`        | Tự động chạy lại tối đa 2 lần đối với các bài test bị thất bại.        |
| `bunx playwright show-report`             | Khởi động máy chủ Web nội bộ để xem báo cáo HTML.                      |

### 3. Hướng Dẫn Sử Dụng Playwright Codegen (Record & Playback)

- **Lệnh kích hoạt:**

  ```bash
  bunx playwright codegen https://www.saucedemo.com
  ```

- **Cơ chế hoạt động:**
  1. Tự động mở trang web đích kèm cửa sổ tiện ích **Playwright Inspector**.
  2. Mọi thao tác tương tác được phân tích qua cây Accessibility Tree và chuyển đổi thành bộ định vị chuẩn (`getByRole`, `getByPlaceholder`, `getByTestId`).
  3. Hỗ trợ giả lập thiết bị di động (Mobile Emulation) qua cờ `--device="iPhone 14"`.
  4. Hỗ trợ lưu phiên đăng nhập tự động qua cờ `--save-storage=auth.json`.

---

## Acceptance Criteria & Definition of Done (DoD Checklist)

- [ ] **Báo cáo Word (`67_Bao_cao.docx`):**
  - [ ] Hoàn thành Mục 2.1 & 2.2A Chương 2: Hướng dẫn cài đặt môi trường Bun, bảng tổng hợp cờ lệnh CLI và hướng dẫn sử dụng Codegen.
  - [ ] Đính kèm tối thiểu 2 ảnh chụp màn hình minh họa thực tế (terminal cài đặt và giao diện Codegen).
- [ ] **Review & Bàn Giao:**
  - [ ] Nộp bản thảo Word cho Trưởng nhóm nghiệm thu đúng hạn.
