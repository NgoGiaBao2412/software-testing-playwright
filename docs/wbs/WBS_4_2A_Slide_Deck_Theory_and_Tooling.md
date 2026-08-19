# WBS 4.2A: Slide Presentation Design - Theory and Tooling

## Metadata

- **WBS Code:** `4.2A`
- **Task Name:** Thiết kế Slide Mở đầu, Cơ sở lý thuyết & Tooling (Slide 1 $\to$ 14)
- **Assignee:** Nguyễn Quốc Đương (MSSV: 0306241102)
- **Task Weight:** `3.0%`
- **Deliverable Artifacts:** File slide thuyết trình `67_Slide.pptx` (Slide 1 đến 14) và bản xuất `67_Slide.pdf`.

## TL;DR

- **Bản chất:** Thiết kế nửa đầu của bộ Slide thuyết trình chính thức (`67_Slide.pptx` từ Slide 1 đến Slide 14).
- **Mục đích:** Trực quan hóa kiến thức nền tảng (Lịch sử, Triết lý Code-first, WebSocket CDP, Auto-waiting, Browser Context) và bộ công cụ SDET (CLI, Codegen, UI Mode, Trace Viewer).
- **Điểm mấu chốt:** Chuẩn đồ họa Widescreen 16:9, áp dụng quy tắc $6 \times 6$, triệt tiêu văn bản dài.

## Core Architectural Content to Implement

### 1. Cấu Trúc Khung Slide Chi Tiết (Slide 1 $\to$ 14)

```text
SLIDE DECK PHẦN 1: CƠ SỞ LÝ THUYẾT & BỘ CÔNG CỤ (Slide 1 -> 14)
├── 1. MỞ ĐẦU & GIỚI THIỆU (Slide 1 - 3)
│   ├── Slide 1: Trang bìa đề tài (Logo Cao Thắng, Khoa CNTT, Đề tài C, GVHD ThS. Nguyễn Hoàng Việt, Nhóm 67)
│   ├── Slide 2: Danh sách 7 thành viên & Bảng phân công nhiệm vụ (MSSV, Tỷ lệ đóng góp SSOT)
│   └── Slide 3: Mục lục thuyết trình (Agenda 5 phần)
├── 2. CƠ SỞ LÝ THUYẾT & KIẾN TRÚC CỐT LÕI (Slide 4 - 10)
│   ├── Slide 4: Tổng quan Playwright & Lịch sử phát triển (Microsoft, Apache 2.0)
│   ├── Slide 5: Triết lý thiết kế Code-First vs Low-Code/Record-Playback
│   ├── Slide 6: Kiến trúc kết nối WebSocket CDP vs HTTP WebDriver (Sơ đồ trực tiếp)
│   ├── Slide 7: Cơ chế Auto-waiting 5 bước (Attached, Visible, Stable, Enabled, Unobscured)
│   ├── Slide 8: Cơ chế Browser Context Isolation & Tối ưu RAM (Incognito in RAM)
│   ├── Slide 9: Chiến lược định vị Role-Based Locators trên Accessibility Tree
│   └── Slide 10: Ranh giới kỹ thuật cứng & Non-goals của Playwright
└── 3. HƯỚNG DẪN CÀI ĐẶT & BỘ CÔNG CỤ SDET (Slide 11 - 14)
    ├── Slide 11: Khởi tạo dự án Bun / TypeScript & Cấu hình playwright.config.ts
    ├── Slide 12: Demo công cụ Playwright CLI & Codegen sinh mã tự động
    ├── Slide 13: Demo công cụ Playwright UI Mode (Watch mode & Time-travel debugging)
    └── Slide 14: Demo công cụ Playwright Trace Viewer (4 luồng dữ liệu khám nghiệm sự cố)
```

### 2. Tiêu Chuẩn Trực Quan Hóa Kỹ Thuật (Visual Standards)

1. **Quy tắc thiết kế $6 \times 6$:** Mỗi slide tối đa 6 dòng, mỗi dòng tối đa 6 từ khóa quan trọng.
2. **Bảng màu chủ đạo:** Xanh Navy (`#0F2027` / `#203A43`), Nền sáng (`#FFFFFF` / `#F8F9FA`), Điểm nhấn xanh lá (Pass) và đỏ (Fail).
3. **Hình ảnh & Sơ đồ:** Sơ đồ vector sắc nét hoặc ảnh chụp màn hình Full HD ($1920 \times 1080$).

---

## Acceptance Criteria & Definition of Done (DoD Checklist)

- [ ] **Hoàn Tất Slide 1 $\to$ 14:**
  - [ ] Đầy đủ 14 slides theo đúng cấu trúc khung ở Mục 1.
  - [ ] Slide bìa có đầy đủ Logo Trường Cao đẳng Kỹ thuật Cao Thắng và thông tin nhóm 67.
- [ ] **Định Dạng & Đồng Bộ:**
  - [ ] Khung hình chuẩn Widescreen $16:9$.
  - [ ] Phông chữ đồng bộ (Arial, Segoe UI, Roboto), tiêu đề $\ge 32\text{pt}$, nội dung $\ge 18\text{pt}$.
- [ ] **Bàn Giao & Hợp Nhất:**
  - [ ] Ghép nối với Slide 15 $\to$ 26 của WBS 4.2B thành file `67_Slide.pptx` hoàn chỉnh để Trưởng nhóm nghiệm thu.
