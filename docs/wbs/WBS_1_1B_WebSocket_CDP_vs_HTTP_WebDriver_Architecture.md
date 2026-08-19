# WBS 1.1B: WebSocket CDP vs HTTP WebDriver Architecture

## Metadata

- **WBS Code:** `1.1B`
- **Task Name:** Kiến trúc kết nối WebSocket CDP vs HTTP WebDriver
- **Assignee:** Trần Văn Ngọc (MSSV: 0306241131)
- **Task Weight:** `2.0%`
- **Deliverable Artifacts:** Mục 1.2 Chương 1 trong `67_Bao_cao.docx` và các Slide tương ứng trong `67_Slide.pptx`.

## TL;DR

- **Bản chất:** Đối chiếu cơ chế giao tiếp giữa Single Persistent WebSocket Pipe (Playwright/CDP) và HTTP REST Proxy (Selenium WebDriver).
- **Mục đích:** Giải thích nguyên nhân gốc rễ giúp Playwright đạt hiệu năng thực thi dưới $1\text{ms}$ và bắt sự kiện thời gian thực.
- **Điểm mấu chốt:** Loại bỏ toàn bộ chi phí TCP handshake và HTTP header overhead cho từng thao tác click/fill.

## Core Architectural Content to Document

### 1. Kiến Trúc Kết Nối Truyền Thống: Selenium HTTP WebDriver

```text
+-------------------+      HTTP REST POST      +----------------------+      Driver IPC      +-------------------+
|  Selenium Test    | -----------------------> |  chromedriver.exe    | -------------------> |  Browser Process  |
|  Runner (Client)  | <----------------------- |  (HTTP Server Proxy) | <------------------- |  (Chromium Engine)|
+-------------------+      HTTP Response 200   +----------------------+      Native Events   +-------------------+
     (Mỗi thao tác là 1 HTTP Request riêng biệt gây ra độ trễ TCP Handshake và đóng gói header)
```

- **Mô hình Proxy trung gian:** Bắt buộc qua tiến trình trung gian (`chromedriver`, `geckodriver`).
- **Giao thức Stateless:** Mỗi thao tác sinh 1 HTTP POST độc lập, tạo độ trễ Round-Trip Time (RTT) lớn ($10\text{ms} - 50\text{ms}$).
- **Polling thụ động:** Không nhận được sự kiện đẩy từ trình duyệt; client phải liên tục polling DOM.

### 2. Kiến Trúc Hiện Đại: Playwright WebSocket CDP

```text
+-------------------+                        Single Persistent WebSocket Pipe                  +-------------------+
|  Playwright Bun   | <======================================================================> |  Browser Process  |
|  Driver Process   |               JSON-RPC 2.0 (Bi-directional / Multiplexed)                |  (CDP / WebKit)   |
+-------------------+                                                                          +-------------------+
     (1 kết nối duy nhất, Push Notifications tức thì, độ trễ micro-giây không cần HTTP Proxy)
```

- **Single Persistent WebSocket:** Duy trì 1 kết nối nhị phân duy nhất, loại bỏ $100\%$ TCP handshake thừa.
- **Multiplexed JSON-RPC 2.0:** Truyền đồng thời nhiều luồng dữ liệu độc lập mà không bị Head-of-Line Blocking.
- **Event-Driven Push Notifications:** Trình duyệt chủ động bắn sự kiện (Network finished, DOM mutation, Console logs) về Driver tức thì.

### 3. Bảng Đối Soát Thông Số Kỹ Thuật

| Tiêu Chí Kiến Trúc        | Selenium HTTP WebDriver                        | Playwright WebSocket CDP                         |
| ------------------------- | ---------------------------------------------- | ------------------------------------------------ |
| **Giao thức vận chuyển**  | HTTP 1.1 REST (Stateless)                      | WebSocket RFC 6455 (Stateful, Full-duplex)       |
| **Tiến trình trung gian** | Bắt buộc (`chromedriver`, `geckodriver`)       | Không cần (Giao tiếp trực tiếp qua Pipe/Socket)  |
| **Độ trễ mỗi thao tác**   | $10\text{ms} - 50\text{ms}$ (Do HTTP Overhead) | $< 1\text{ms}$ (Frame JSON qua Socket)           |
| **Lắng nghe sự kiện**     | Polling thụ động qua HTTP                      | Lắng nghe chủ động qua CDP Event Stream          |
| **Kiểm soát tầng mạng**   | Rất hạn chế (Cần BrowserMob Proxy)             | Toàn quyền can thiệp, sửa đổi và Mocking qua CDP |

---

## Acceptance Criteria & Definition of Done (DoD Checklist)

- [ ] **Báo cáo Word (`67_Bao_cao.docx`):**
  - [ ] Hoàn thành Mục 1.2 Chương 1: Kiến trúc kết nối WebSocket CDP so với HTTP WebDriver.
  - [ ] Đính kèm sơ đồ kiến trúc so sánh 2 mô hình và bảng đối soát 5 tiêu chí kỹ thuật.
- [ ] **Review & Bàn Giao:**
  - [ ] Nộp bản thảo Word cho Trưởng nhóm nghiệm thu đúng hạn.
