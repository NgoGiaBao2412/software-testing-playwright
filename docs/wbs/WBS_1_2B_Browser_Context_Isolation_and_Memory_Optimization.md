# WBS 1.2B: Browser Context Isolation and Memory Optimization

## Metadata

- **WBS Code:** `1.2B`
- **Task Name:** Cơ chế Browser Context Isolation & Tối ưu hóa Bộ nhớ RAM
- **Assignee:** Nguyễn Quốc Đương (MSSV: 0306241102)
- **Task Weight:** `2.5%`
- **Deliverable Artifacts:** Mục 1.4 Chương 1 trong `67_Bao_cao.docx` và các Slide tương ứng trong `67_Slide.pptx`.

## TL;DR

- **Bản chất:** Kiến trúc bộ nhớ và cơ chế cô lập ngữ cảnh trình duyệt (Browser Context Isolation) của Playwright.
- **Mục đích:** Ảo hóa môi trường trong RAM tương đương Incognito, cho phép chạy song song hàng trăm test độc lập trên 1 Browser Process duy nhất.
- **Điểm mấu chốt:** Tiết kiệm $90\%$ dung lượng RAM và giảm thời gian khởi tạo từ $1500\text{ms}$ xuống $< 10\text{ms}$.

## Core Architectural Content to Document

### 1. Phân Tầng Tiến Trình: Browser Process vs BrowserContext

```text
+----------------------------------------------------------------------------------------------------+
|                                      BROWSER PROCESS (OS Level)                                    |
|   (Khởi động 1 lần duy nhất: ~1500ms, tiêu tốn ~150MB RAM, quản lý Renderer & Network Service)     |
+----------------------------------------------------------------------------------------------------+
       |                                      |                                      |
       v                                      v                                      v
+-----------------------------+ +-----------------------------+ +-----------------------------+
|    BrowserContext 1 (RAM)   | |    BrowserContext 2 (RAM)   | |    BrowserContext 3 (RAM)   |
| (Khởi tạo: ~5ms, ~1MB RAM)  | | (Khởi tạo: ~5ms, ~1MB RAM)  | | (Khởi tạo: ~5ms, ~1MB RAM)  |
| - Cookies (User A)          | | - Cookies (User B)          | | - Cookies (Admin)           |
| - LocalStorage / Session    | | - LocalStorage / Session    | | - LocalStorage / Session    |
| - IndexedDB / Cache         | | - IndexedDB / Cache         | | - IndexedDB / Cache         |
+-----------------------------+ +-----------------------------+ +-----------------------------+
```

- **Browser Process (Tiến trình OS):** Nhị phân Chromium/Firefox/WebKit, khởi động nặng CPU và RAM.
- **BrowserContext (Ngữ cảnh RAM):** Phiên làm việc cô lập trong bộ nhớ của Browser Process hiện hữu.
  - Khởi tạo mới chỉ mất $2\text{ms} - 10\text{ms}$.
  - Tiêu tốn RAM chỉ vài Megabytes mỗi context.

### 2. Cơ Chế Cô Lập Trạng Thái Tuyệt Đối (State Isolation)

Mỗi `BrowserContext` sở hữu không gian lưu trữ độc lập:

1. **Cookies:** Cookies trong Context 1 không rò rỉ sang Context 2.
2. **Web Storage:** `localStorage` và `sessionStorage` hoàn toàn trống rỗng khi mở context mới.
3. **IndexedDB & Cache:** Đóng gói độc lập, ngăn ngừa xung đột dữ liệu giữa các worker.
4. **Permissions & Geolocation:** Thiết lập quyền và tọa độ địa lý độc lập cho từng ca kiểm thử.

### 3. Cơ Chế Quản Lý Phiên Xác Thực Nhanh (`storageState`)

- **Vấn đề:** Đăng nhập qua UI lặp lại ở mọi test tốn $3\text{s} - 5\text{s}$ mỗi bài.
- **Giải pháp:** Đăng nhập 1 lần qua API setup $\to$ Lưu `storageState.json` $\to$ Nạp trực tiếp vào RAM của `BrowserContext` mới, bỏ qua bước đăng nhập UI.

---

## Acceptance Criteria & Definition of Done (DoD Checklist)

- [ ] **Báo cáo Word (`67_Bao_cao.docx`):**
  - [ ] Hoàn thành Mục 1.4 Chương 1: Kiến trúc BrowserContext, cơ chế cô lập bộ nhớ và kỹ thuật `storageState`.
  - [ ] Đính kèm sơ đồ cây phân cấp bộ nhớ Browser -> BrowserContext -> Page.
  - [ ] Bảng so sánh tài nguyên giữa việc tạo Browser mới và tạo BrowserContext mới.
- [ ] **Review & Bàn Giao:**
  - [ ] Nộp bản thảo Word cho Trưởng nhóm nghiệm thu đúng hạn.
