---
tags: [type/method, topic/project-management, layer/quality]
status: permanent
date: 2026-08-14
description: Comprehensive comparative analysis matrix between Playwright, TestComplete, Selenium, and Cypress with Definition of Done for WBS 1.5
---

# WBS 1.5: Playwright vs TestComplete and Competitive Comparison

## Metadata

- **WBS Code:** `1.5`
- **Task Name:** So Sánh Chi Tiết Playwright vs TestComplete và Các Công Cụ Khác
- **Total Task Weight:** `4.0%`
- **Deliverable Artifacts:** Mục 1.3 Chương 1 trong `STT nhom_Bao cao.docx` và các Slide so sánh tương ứng trong `STT nhom_Slide.pptx`.

## TL;DR

Tài liệu hướng dẫn 2 thành viên phụ trách xây dựng bảng ma trận so sánh chuyên sâu giữa Playwright và đối tượng trọng tâm trong đề tài là **TestComplete** (cùng 2 công cụ phổ biến Selenium và Cypress) theo 8 tiêu chí kỹ thuật: Giao thức điều khiển, Tốc độ, Bản quyền, Đa luồng/Đa tab, Kiểm thử API, Xử lý đồng bộ Auto-waiting, Ngôn ngữ hỗ trợ và Tích hợp CI/CD.

## Core Content to Document

### 1. Ma Trận So Sánh Kỹ Thuật 4 Công Cụ (Playwright vs TestComplete vs Selenium vs Cypress)

| Tiêu Chí So Sánh | Playwright (Microsoft) | TestComplete (SmartBear) | Selenium WebDriver (W3C) | Cypress |
|---|---|---|---|---|
| **Giao Thức Điều Khiển** | **WebSocket / CDP** (1 kết nối hai chiều liên tục) | COM API / OS Native Hook / Accessibility API | **HTTP REST JSON Wire** (Gửi request HTTP từng lệnh) | **In-Browser Execution** (Chạy bên trong iframe DOM) |
| **Tốc Độ Thực Thi** | **Rất nhanh** (Vài mili-giây / action) | Trung bình (Nặng nề do giao diện GUI cồng kềnh) | Chậm (Độ trễ HTTP round-trip cao) | Nhanh trên 1 tab, chậm khi chuyển domain |
| **Chi Phí Bản Quyền** | **$100\%$ Open Source** (Miễn phí hoàn toàn) | **Thương mại rất đắt** (~$2,000 - $4,000 / license/năm) | $100\%$ Open Source | Open Source lõi, tính phí Cloud Dashboard |
| **Hỗ Trợ Đa Tab & Đa Domain** | **Hỗ trợ hoàn hảo** qua `BrowserContext` | Hỗ trợ tốt trên Desktop | Hỗ trợ qua chuyển đổi Window Handle | **Bị giới hạn nghiêm ngặt** (Không hỗ trợ đa tab thật) |
| **Tích Hợp Kiểm Thử API** | **Có sẵn native** (`APIRequestContext`) | Hỗ trợ qua module riêng (cần license) | **Không có** (Phải dùng thêm RestAssured / Axios) | Có sẵn (`cy.request`) nhưng hiệu năng trung bình |
| **Cơ Chế Auto-Waiting** | **Tự động 5 Actionability Checks** | Cần cấu hình timeout tĩnh | **Không có** (Phải viết thủ công `WebDriverWait`) | Tự động chờ DOM cơ bản |
| **Hỗ Trợ CI/CD & Headless** | **Xuất sắc** (Tối ưu cho Docker, GitHub Actions, Sharding) | Cồng kềnh (Đòi hỏi máy ảo Windows có GUI License) | Tốt (Cần setup Selenium Grid phức tạp) | Tốt |
| **Đối Tượng Phù Hợp** | **Kỹ sư SDET, Lập trình viên Fullstack/Backend** | Doanh nghiệp truyền thống, Manual QA muốn Record/Playback | Doanh nghiệp lớn duy trì hệ thống cũ (Legacy) | Frontend Developers viết Unit/E2E nhanh |

### 2. Luận Điểm Then Chốt Trước Hội Đồng: Vì Sao Playwright Vượt Trội Hơn TestComplete?

1. **Về Chi Phí & Tính Mở:** TestComplete là phần mềm đóng gói thương mại đắt đỏ của SmartBear, không phù hợp cho các dự án Startup hoặc hệ thống CI/CD linh hoạt. Playwright là mã nguồn mở hiện đại được Microsoft bảo trợ.
2. **Về Khả Năng Mở Rộng (Scalability):** Playwright có thể chạy hàng trăm bài test song song trên các container Linux Docker siêu nhẹ không cần màn hình đồ họa (Headless), trong khi TestComplete bắt buộc phải chạy trên Windows có giao diện desktop.
3. **Về Kiểm Thử Đa Tầng:** Playwright hợp nhất cả Web UI và API Automation trong cùng một codebase duy nhất.

---

## Acceptance Criteria & Definition of Done (DoD Checklist)

- [ ] **Báo cáo Word (`STT nhom_Bao cao.docx`):**
  - [ ] Soạn thảo đầy đủ Mục 1.3 Chương 1: Bảng ma trận so sánh 4 công cụ và phân tích 3 luận điểm vượt trội của Playwright so với TestComplete.
  - [ ] Bảng biểu được định dạng đẹp mắt, canh giữa, chữ rõ ràng.
- [ ] **Slide Thuyết Trình (`STT nhom_Slide.pptx`):**
  - [ ] Thiết kế 1 - 2 slide trình bày trực quan bảng ma trận so sánh (làm nổi bật các điểm xanh của Playwright và điểm đỏ của TestComplete).
- [ ] **Review & Bàn Giao:**
  - [ ] Nộp bản thảo cho Trưởng nhóm review đúng hạn.

## Related Notes

- [[Playwright_vs_TestComplete_Architectural_Comparison]]
- [[Playwright_vs_Cypress_Architectural_Comparison]]
- [[Playwright_vs_Selenium_and_Puppeteer_Comparison]]
- [[Team_Work_Breakdown_and_Contribution_Matrix_Template]]
