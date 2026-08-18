---
tags: [type/method, topic/project-management, layer/quality]
status: permanent
date: 2026-08-14
description: Task specification, pros and cons matrix, enterprise application scenarios, and Definition of Done for WBS 1.2
---

# WBS 1.2: Playwright Pros, Cons, and Enterprise Applications

## Metadata

- **WBS Code:** `1.2`
- **Task Name:** Phân tích Ưu Nhược Điểm & Tính Ứng Dụng của Playwright
- **Total Task Weight:** `4.0%`
- **Deliverable Artifacts:** Mục 1.2 Chương 1 trong `STT nhom_Bao cao.docx` và các Slide tương ứng trong `STT nhom_Slide.pptx`.

## TL;DR

Tài liệu hướng dẫn chi tiết cho 2 thành viên phụ trách phân tích bảng so sánh Ưu và Nhược điểm của Playwright theo 5 tiêu chí cốt lõi (Hiệu năng, Độ ổn định, Đa nền tảng, Hỗ trợ đa tầng Web/API, Chi phí bản quyền) và phân tích 3 trường hợp ứng dụng thực tế trong quy trình phát triển phần mềm doanh nghiệp (CI/CD, E-commerce regression, API Contract testing).

## Core Content to Document

### 1. Ma Trận Đánh Giá Ưu & Nhược Điểm (Pros & Cons Matrix)

| Tiêu Chí Đánh Giá | Ưu Điểm Nổi Bật Của Playwright | Nhược Điểm & Giới Hạn Cần Lưu Ý |
|---|---|---|
| **Hiệu Năng & Tốc Độ** | Giao tiếp trực tiếp qua WebSocket/CDP (1 kết nối duy nhất), khởi tạo `BrowserContext` trong RAM siêu nhanh (vài ms). | Tiêu tốn RAM đáng kể nếu mở quá nhiều Worker song song trên máy tính cấu hình yếu. |
| **Độ Ổn Định (Anti-Flaky)** | Tự động hóa hoàn toàn việc chờ phần tử qua cơ chế **Auto-waiting** (5 actionability checks) và **Web-first Assertions** tự động retry. | Lập trình viên phải nắm vững cú pháp bất đồng bộ `async/await` và TypeScript để tránh bẫy race condition. |
| **Đa Nền Tảng & Trình Duyệt** | Hỗ trợ trọn vẹn cả 3 browser engines lớn: Chromium (Chrome, Edge), Firefox, WebKit (Safari); hỗ trợ đa ngôn ngữ (TypeScript, JS, Python, Java, C#). | **Không hỗ trợ trình duyệt Internet Explorer (IE11)** và các trình duyệt di động native (chỉ hỗ trợ Mobile Web emulation). |
| **Hỗ Trợ Đa Tầng (Multi-Layer)** | **Tích hợp sẵn cả Web UI Automation VÀ API Testing** (`APIRequestContext`) trong cùng một framework duy nhất. | Hệ sinh thái plugin bên thứ 3 chưa dày dặn bằng Selenium (nhưng Playwright đã tích hợp sẵn hầu hết tính năng cốt lõi). |
| **Chi Phí Bản Quyền** | **Mã nguồn mở $100\%$ miễn phí** (Apache 2.0 do Microsoft phát triển và bảo trợ dài hạn). | So với các công cụ kéo thả Low-code (như TestComplete), Playwright đòi hỏi đội ngũ QA/SDET phải có kỹ năng lập trình. |

### 2. 3 Trường Hợp Ứng Dụng Thực Tế (Enterprise Use Cases)

1. **Kiểm Thử Hồi Quy Tự Động Trong Hệ Thống E-Commerce (E-Commerce Regression):**
   - Tự động hóa toàn bộ luồng mua hàng đa bước: Thêm hàng vào giỏ, tính thuế, áp mã giảm giá, kiểm tra tính toán tổng tiền và tạo đơn hàng.
2. **Tích Hợp Đường Ống CI/CD Phân Tán (Distributed CI/CD Pipeline):**
   - Chạy hàng nghìn bài test song song trên GitHub Actions hoặc GitLab CI qua cơ chế Sharding (chia nhỏ tải trên nhiều máy chủ) và hợp nhất báo cáo HTML Blob Report.
3. **Kiểm Thử Hợp Đồng & Luồng Dữ Liệu Lai (Hybrid API & UI Testing):**
   - Sử dụng `APIRequestContext` để khởi tạo dữ liệu mẫu và đăng nhập lấy Authentication State trong $50\text{ms}$, sau đó tiêm `storageState` vào trình duyệt để test giao diện mà không cần lặp lại bước đăng nhập trên UI.

---

## Acceptance Criteria & Definition of Done (DoD Checklist)

- [ ] **Báo cáo Word (`STT nhom_Bao cao.docx`):**
  - [ ] Soạn thảo đầy đủ Mục 1.2 Chương 1: Bảng phân tích Ưu/Nhược điểm và 3 trường hợp ứng dụng thực tế.
  - [ ] Có biểu đồ hoặc sơ đồ minh họa quy trình CI/CD tích hợp Playwright.
  - [ ] Định dạng chuẩn font chữ, bảng biểu canh đều lề.
- [ ] **Slide Thuyết Trình (`STT nhom_Slide.pptx`):**
  - [ ] Thiết kế 2 slide: Slide 1 (Bảng tóm tắt Ưu/Nhược điểm trực quan), Slide 2 (3 Ứng dụng thực tế nổi bật).
- [ ] **Review & Bàn Giao:**
  - [ ] Nộp bản thảo cho Trưởng nhóm nghiệm thu đúng thời hạn quy định.

## Related Notes

- [[Playwright_Hard_Technical_Boundaries_and_Non_Goals]]
- [[Production_SDET_Anti_Patterns_and_Flaky_Test_Traps]]
- [[Distributed_CI_CD_Sharding_and_Blob_Report_Merging]]
- [[Team_Work_Breakdown_and_Contribution_Matrix_Template]]
