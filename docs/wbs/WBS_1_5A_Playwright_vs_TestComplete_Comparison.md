# WBS 1.5A: Playwright vs TestComplete Architectural Comparison

## Metadata

- **WBS Code:** `1.5A`
- **Task Name:** So sánh đối sánh Playwright vs TestComplete (Kiến trúc & Chi phí TCO)
- **Assignee:** Ngô Gia Bảo (MSSV: 0306241090)
- **Task Weight:** `2.0%`
- **Deliverable Artifacts:** Mục 4.1A Chương 4 trong `67_Bao_cao.docx` và các Slide tương ứng trong `67_Slide.pptx`.

## TL;DR

- **Bản chất:** Ma trận so sánh trực diện giữa Playwright (Microsoft) và TestComplete (SmartBear).
- **Mục đích:** Cung cấp luận cứ bảo vệ đồ án trước hội đồng giảng viên về kiến trúc điều khiển, chi phí bản quyền (TCO) và năng lực tích hợp CI/CD.
- **Điểm mấu chốt:** Playwright vượt trội về tốc độ, chi phí $0$ license, và khả năng chạy Headless trên Linux Docker.

## Core Architectural Content to Document

### 1. Ma Trận Đối Soát Trực Diện: Playwright vs TestComplete

| Tiêu Chí So Sánh             | Playwright (Microsoft)                                           | TestComplete (SmartBear)                                           |
| ---------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------ |
| **Kiến trúc điều khiển**     | **WebSocket CDP / Pipe** trực tiếp vào lõi trình duyệt.          | **OS Native Hooks / COM** cấp hệ điều hành.                        |
| **Tốc độ thực thi**          | **Rất nhanh** (Vài mili-giây mỗi action, tối ưu RAM).            | **Chậm & Nặng nề** (Phụ thuộc GUI Windows).                        |
| **Chi phí bản quyền (TCO)**  | **Miễn phí $100\%$** (Mã nguồn mở Apache 2.0).                   | **Thương mại rất đắt** (~$2,000 - $4,000 / seat / năm).            |
| **Hạ tầng CI/CD & Headless** | Chạy xuất sắc trên **Linux Docker Containers**, hỗ trợ Sharding. | Đòi hỏi **máy ảo Windows đầy đủ (GUI Desktop)** có license server. |
| **Kiểm thử đa tầng**         | Hợp nhất **Web UI + API Automation** trong 1 codebase.           | Phải cấu hình module riêng hoặc mua thêm ReadyAPI.                 |
| **Cơ chế chống Flaky**       | **Auto-waiting 5 bước** & Web-first Assertions tích hợp sẵn.     | Cấu hình timeout thủ công hoặc viết hàm chờ phức tạp.              |
| **Phương thức tiếp cận**     | **Code-First (TypeScript / JS / Python / C# / Java)**.           | **Low-Code / Record-Playback / Scripting cũ** (VBScript).          |

### 2. 3 Luận Điểm Then Chốt Trước Hội Đồng Giảng Viên

1. **Chi Phí Đầu Tư & Rào Cản Doanh Nghiệp:** TestComplete đặt gánh nặng tài chính lớn về license hàng năm, Playwright hoàn toàn miễn phí và được Microsoft bảo trợ dài hạn.
2. **Khả Năng Mở Rộng Cloud & Containerization:** Playwright đóng gói vào Docker Linux siêu nhẹ (~$500\text{MB}$) chạy song song hàng nghìn test trên GitHub Actions/GitLab CI mà không cần máy ảo Windows đắt đỏ.
3. **Tính Thống Nhất Codebase:** Đội ngũ SDET và Developer dùng chung TypeScript, chia sẻ types và luồng test từ API đến UI.

---

## Acceptance Criteria & Definition of Done (DoD Checklist)

- [ ] **Báo cáo Word (`67_Bao_cao.docx`):**
  - [ ] Hoàn thành Mục 4.1A Chương 4: Bảng ma trận so sánh 7 tiêu chí giữa Playwright và TestComplete.
  - [ ] Phân tích sâu 3 luận điểm chứng minh tính vượt trội của Playwright trong môi trường doanh nghiệp.
- [ ] **Review & Bàn Giao:**
  - [ ] Nộp bản thảo Word cho Trưởng nhóm nghiệm thu đúng hạn.
