# WBS 1.5B: Playwright vs Selenium and Cypress Comparison

## Metadata

- **WBS Code:** `1.5B`
- **Task Name:** So sánh đối sánh Playwright vs Selenium 4 & Cypress (HTTP vs CDP, Multi-tab)
- **Assignee:** Nguyễn Quốc Đương (MSSV: 0306241102)
- **Task Weight:** `2.0%`
- **Deliverable Artifacts:** Mục 4.1B Chương 4 trong `67_Bao_cao.docx` và các Slide tương ứng trong `67_Slide.pptx`.

## TL;DR

- **Bản chất:** So sánh kỹ thuật giữa Playwright và 2 công cụ mã nguồn mở phổ biến: Selenium 4 và Cypress.
- **Mục đích:** Phân tích 3 trường phái kiến trúc: HTTP WebDriver vs In-Browser Iframe vs Out-of-Process WebSocket CDP.
- **Điểm mấu chốt:** Năng lực xử lý đa tab / đa domain và khả năng thực thi song song độc lập.

## Core Architectural Content to Document

### 1. Phân Tích 3 Trường Phái Kiến Trúc Thực Thi

```text
1. SELENIUM (Ngoại vi qua HTTP Proxy):
   Test Code ---> HTTP Request ---> Chromedriver Proxy ---> Trình duyệt (Độ trễ cao, Stateless)

2. CYPRESS (Bên trong trình duyệt - In-Browser Iframe):
   Trình duyệt [ Iframe Test Code <---> Iframe App ] (Bị giới hạn Sandbox, không hỗ trợ đa tab thật)

3. PLAYWRIGHT (Trực tiếp qua WebSocket CDP):
   Test Code <==== WebSocket (Full-Duplex) ====> Lõi trình duyệt (Không bị Sandbox, đa tab, tốc độ cao)
```

- **Selenium 4 (W3C WebDriver):** Duy trì gửi request HTTP qua tiến trình Driver trung gian, độ trễ mạng lớn.
- **Cypress (In-Browser Execution):** Test code chạy trong iframe trình duyệt $\to$ Không mở được đa tab thật, xung đột khi chuyển domain (OAuth SSO / Cross-Origin).
- **Playwright (Out-of-Process WebSocket):** Kết nối trực tiếp vào lõi trình duyệt qua WebSocket, toàn quyền điều khiển mà không bị giới hạn bởi Sandbox.

### 2. Ma Trận So Sánh Kỹ Thuật 3 Công Cụ

| Tiêu Chí Kỹ Thuật       | Playwright                                        | Selenium 4                                | Cypress                                    |
| ----------------------- | ------------------------------------------------- | ----------------------------------------- | ------------------------------------------ |
| **Cơ chế thực thi**     | Out-of-process qua WebSocket CDP                  | Out-of-process qua HTTP WebDriver         | In-browser bên trong Iframe                |
| **Đa Tab & Đa Domain**  | **Hoàn hảo** (Mở tự do qua `context.newPage()`)   | Hỗ trợ (Chuyển Window Handle)             | **Bị giới hạn** (Không hỗ trợ đa tab thật) |
| **Kiểm thử API Native** | **Có sẵn** (`APIRequestContext`)                  | **Không có** (Cần thư viện phụ trợ)       | Có sẵn (`cy.request`)                      |
| **Thực thi Song Song**  | **Native Multi-Worker miễn phí**                  | Cần cài đặt Selenium Grid phức tạp        | Phải trả phí cho Cypress Cloud Dashboard   |
| **Khởi tạo môi trường** | Siêu nhanh ($< 10\text{ms}$ qua `BrowserContext`) | Chậm ($> 1500\text{ms}$ mở Browser mới)   | Nhanh trên 1 tab                           |
| **Ngôn ngữ hỗ trợ**     | TS, JS, Python, Java, C#                          | Đa dạng nhất (Java, Python, C#, JS, Ruby) | Chỉ hỗ trợ JavaScript / TypeScript         |

---

## Acceptance Criteria & Definition of Done (DoD Checklist)

- [ ] **Báo cáo Word (`67_Bao_cao.docx`):**
  - [ ] Hoàn thành Mục 4.1B Chương 4: Bảng so sánh 3 công cụ Playwright, Selenium 4 và Cypress.
  - [ ] Phân tích rõ hạn chế của Cypress (In-Browser Sandbox) và Selenium (HTTP Overhead).
  - [ ] Đính kèm sơ đồ 3 trường phái kiến trúc thực thi.
- [ ] **Review & Bàn Giao:**
  - [ ] Nộp bản thảo Word cho Trưởng nhóm nghiệm thu đúng hạn.
