# WBS 4.1A: Report Compilation - Chapters 1 and 2

## Metadata

- **WBS Code:** `4.1A`
- **Task Name:** Biên soạn & Format Báo cáo môn học Chương 1 & 2 (`67_Bao_cao.docx`)
- **Assignee:** Đặng Duy Lam (MSSV: 0306241125)
- **Task Weight:** `3.5%`
- **Deliverable Artifacts:** File tài liệu Word `67_Bao_cao.docx` (Phần Trang Bìa, Mục Lục, Chương 1 và Chương 2).

## TL;DR

- **Bản chất:** Tổng hợp, biên tập và chuẩn hóa định dạng học thuật cho nửa đầu của Báo cáo đồ án môn học (`67_Bao_cao.docx`).
- **Mục đích:** Tiếp nhận bản thảo từ WBS $1.1\text{A} \to 1.4\text{B}$, chuẩn hóa văn phong, căn lề, mục lục tự động và đánh số bảng biểu.
- **Điểm mấu chốt:** Đảm bảo tính nhất quán định dạng trước khi ghép nối với Chương 3 & 4.

## Core Architectural Content to Implement

### 1. Phạm Vi Biên Soạn & Nguồn Dữ Liệu Đầu Vào

- **Trang Bìa & Đầu Báo Cáo:**
  - Bìa chính thức có logo Trường Cao đẳng Kỹ thuật Cao Thắng.
  - Trang nhận xét của GVHD ThS. Nguyễn Hoàng Việt.
  - Lời cảm ơn, Bảng phân công nhiệm vụ và tỷ lệ đóng góp của 7 thành viên.
  - Danh mục viết tắt, Danh mục hình ảnh và Danh mục bảng biểu.
- **Chương 1: Tổng Quan Về Playwright & Cơ Sở Kiến Trúc:**
  - Mục 1.1: Tổng quan Playwright, Lịch sử & Triết lý Code-first (WBS 1.1A).
  - Mục 1.2: Kiến trúc kết nối WebSocket CDP vs HTTP WebDriver (WBS 1.1B).
  - Mục 1.3: Cơ chế Auto-waiting 5 bước & Actionability Checks (WBS 1.2A).
  - Mục 1.4: Cơ chế Browser Context Isolation & Tối ưu RAM (WBS 1.2B).
- **Chương 2: Hướng Dẫn Cài Đặt & Năng Lực Cốt Lõi Của Playwright:**
  - Mục 2.1: Quy trình cài đặt môi trường Bun & TypeScript (WBS 1.3A).
  - Mục 2.2: Hướng dẫn sử dụng CLI, Codegen, UI Mode & Trace Viewer (WBS 1.3A & 1.3B).
  - Mục 2.3: Phân tích Năng lực Web UI với POM, COM & `page.route()` (WBS 1.4A).
  - Mục 2.4: Phân tích Năng lực API với `APIRequestContext`, Hybrid Auth & SOM (WBS 1.4B).

### 2. Quy Chuẩn Định Dạng Học Thuật (Academic Formatting Rules)

1. **Khổ giấy & Căn lề:** A4 ($210\text{mm} \times 297\text{mm}$); Top $2.0\text{cm}$, Bottom $2.0\text{cm}$, Left $3.0\text{cm}$, Right $2.0\text{cm}$.
2. **Phông chữ & Giãn dòng:** `Times New Roman`, cỡ chữ `13pt`, Regular, Justified; Giãn dòng `1.5 lines`, Spacing `Before 3pt`, `After 3pt`.
3. **Tiêu đề phân cấp:** `Heading 1` `16pt` In hoa đậm giữa; `Heading 2` `14pt` Đậm; `Heading 3` `13pt` Đậm nghiêng.
4. **Hình ảnh & Bảng biểu:** Hình ảnh canh giữa kèm chú thích bên dưới (*Hình 1.1: ...*); Bảng biểu có tiêu đề bên trên (*Bảng 1.1: ...*).

---

## Acceptance Criteria & Definition of Done (DoD Checklist)

- [ ] **Hợp Nhất Đầy Đủ Nội Dung:**
  - [ ] Thu thập đầy đủ 100% bản thảo từ các thành viên phụ trách WBS 1.1A, 1.1B, 1.2A, 1.2B, 1.3A, 1.3B, 1.4A, 1.4B.
  - [ ] Không bỏ sót các sơ đồ ASCII / hình chụp minh họa quan trọng.
- [ ] **Chuẩn Hóa Format Học Thuật:**
  - [ ] Canh lề, phông chữ, giãn dòng tuân thủ nghiêm ngặt quy định ở Mục 2.
  - [ ] Mục lục tự động cập nhật đúng số trang.
- [ ] **Review & Bàn Giao:**
  - [ ] Gửi file bản thảo Word cho Trưởng nhóm nghiệm thu và ghép nối với WBS 4.1B.
