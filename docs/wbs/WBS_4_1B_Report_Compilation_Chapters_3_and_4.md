# WBS 4.1B: Report Compilation - Chapters 3 and 4

## Metadata

- **WBS Code:** `4.1B`
- **Task Name:** Biên soạn & Format Báo cáo môn học Chương 3 & 4 (`67_Bao_cao.docx`)
- **Assignee:** Nguyễn Hoài Linh (MSSV: 0306241126)
- **Task Weight:** `3.5%`
- **Deliverable Artifacts:** File tài liệu Word `67_Bao_cao.docx` (Phần Chương 3, Chương 4, Kết Luận, Tài Liệu Tham Khảo và Phụ Lục).

## TL;DR

- **Bản chất:** Tổng hợp, biên tập và chuẩn hóa định dạng học thuật cho nửa sau của Báo cáo đồ án (`67_Bao_cao.docx`).
- **Mục đích:** Tiếp nhận bản thảo thực nghiệm 8 ca kiểm thử (4 API + 4 UI) từ WBS $2.1 \to 2.4$ và $3.1 \to 3.4$, phân tích so sánh từ WBS $1.5\text{A}$ và $1.5\text{B}$.
- **Điểm mấu chốt:** Chuẩn hóa code blocks, hình ảnh bằng chứng test pass $100\%$ và tài liệu tham khảo chuẩn IEEE.

## Core Architectural Content to Implement

### 1. Phạm Vi Biên Soạn & Nguồn Dữ Liệu Đầu Vào

- **Chương 3: Thực Nghiệm Xây Dựng Bộ Kiểm Thử Tự Động:**
  - Mục 3.1: API Ca 1 - Auth Lifecycle, JWT & Single-use Token Rotation (WBS 2.1).
  - Mục 3.2: API Ca 2 - High-Contention Concurrency & Redis Redlock (WBS 2.2).
  - Mục 3.3: API Ca 3 - Booking Transaction & Idempotency Key (WBS 2.3).
  - Mục 3.4: API Ca 4 - Chuẩn Hóa Lỗi RFC 9457 & Rate Limiting Throttler (WBS 2.4).
  - Mục 3.5: Web UI Ca 1 - Luồng Mua Hàng E2E Checkout POM & COM trên SauceDemo (WBS 3.1).
  - Mục 3.6: Web UI Ca 2 - Network Mocking `page.route()` HTTP 500 & Locked-out User (WBS 3.2).
  - Mục 3.7: Web UI Ca 3 - Chẩn Đoán Hậu Kỳ với Trace Viewer & Performance Glitch User (WBS 3.3).
  - Mục 3.8: Web UI Ca 4 - Kiểm Thử Hồi Quy Trực Quan Visual Regression & Data Masking (WBS 3.4).
- **Chương 4: Đánh Giá Đối Sánh & Tổng Kết Đồ Án:**
  - Mục 4.1: So sánh đối kháng trực diện Playwright vs TestComplete (WBS 1.5A).
  - Mục 4.2: So sánh kỹ thuật Playwright vs Selenium 4 & Cypress (WBS 1.5B).
  - Mục 4.3: Đúc kết bài học kinh nghiệm và phòng chống Anti-patterns trong SDET.
- **Phần Kết Luận & Tài Liệu Tham Khảo:**
  - Đánh giá mức độ hoàn thành mục tiêu đồ án.
  - Định dạng danh mục Tài liệu tham khảo chuẩn IEEE.

### 2. Quy Chuẩn Định Dạng Mã Nguồn & Bằng Chứng Test

1. **Khối mã nguồn (Code Blocks):** Phông `Consolas` `10pt`, khung viền xám, nền xám nhạt (`#F4F4F4`), giãn dòng đơn; trích dẫn $10 - 20$ dòng quan trọng.
2. **Hình ảnh bằng chứng thực nghiệm:** Ảnh Terminal chạy pass `$100\%`, ảnh Trace Viewer, DOM Snapshot và Visual Diff.

---

## Acceptance Criteria & Definition of Done (DoD Checklist)

- [ ] **Hợp Nhất Đầy Đủ Nội Dung:**
  - [ ] Thu thập đầy đủ 100% bản thảo từ WBS 2.1-2.4, 3.1-3.4, 1.5A, 1.5B.
  - [ ] Đầy đủ 8 ca test thực nghiệm kèm code mẫu và ảnh test pass.
- [ ] **Chuẩn Hóa Format Học Thuật & Khối Code:**
  - [ ] Toàn bộ code blocks được format đồng bộ theo chuẩn ở Mục 2.
  - [ ] Danh mục tài liệu tham khảo đúng định dạng IEEE.
- [ ] **Review & Hợp Nhất File Hoàn Chỉnh:**
  - [ ] Hợp nhất với Chương 1 & 2 của WBS 4.1A tạo file `67_Bao_cao.docx` hoàn chỉnh nộp cho Trưởng nhóm nghiệm thu.
