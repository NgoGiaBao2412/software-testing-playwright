---
tags: [type/concept, topic/testing, layer/quality]
status: permanent
date: 2026-08-14
description: Work Breakdown Structure 4.2 task specifications, slide structure breakdown, visual standards, and Definition of Done for Slide Presentation Design
---

# WBS 4.2: Slide Presentation Design

## TL;DR

Tài liệu đặc tả gói công việc **WBS 4.2** thuộc **Giai đoạn 4.0 (Submission Deliverables)**. Nhiệm vụ trọng tâm là tổng hợp toàn bộ bản thảo nội dung, sơ đồ kiến trúc và kết quả thực nghiệm từ các thành viên (thuộc Giai đoạn 1.0, 2.0, 3.0), sau đó thiết kế bộ slide thuyết trình chuyên nghiệp **`67_Slide.pptx`** (và bản xuất **`67_Slide.pdf`**). Slide được thiết kế tối ưu cho thời lượng trình bày $15 - 20$ phút trước Hội đồng/Giảng viên hướng dẫn, tuân thủ nghiêm ngặt nguyên tắc trực quan hóa kỹ thuật (Visual-First), triệt tiêu các khối văn bản rườm rà.

## 1. Mục Tiêu & Phạm Vi Công Việc (Scope of Work)

1. **Thu thập và tổng hợp tài nguyên đầu vào:**
   - Tiếp nhận bản thảo nội dung slide từ người phụ trách các WBS $1.1 \to 1.6$ (Lý thuyết & Công cụ).
   - Tiếp nhận sơ đồ kiến trúc và log kết quả kiểm thử từ người phụ trách các WBS $2.1 \to 2.4$ (API Automation).
   - Tiếp nhận hình ảnh kịch bản POM, Trace Viewer từ người phụ trách các WBS $3.1 \to 3.3$ (Web UI Automation).
2. **Chuẩn hóa Master Slide Template:**
   - **Tỷ lệ hiển thị:** Khung hình chuẩn Widescreen $16:9$.
   - **Bảng màu chủ đạo:** Màu xanh nhận diện học thuật (Navy/Royal Blue), đen, xám và trắng; điểm nhấn trạng thái kiểm thử bằng màu xanh lá (Pass) và đỏ (Fail/Conflict).
   - **Phông chữ:** Arial, Segoe UI, Roboto hoặc Times New Roman đồng bộ, cỡ chữ tiêu đề $\ge 32\text{pt}$, nội dung $\ge 18\text{pt}$.
3. **Biên tập và cô đọng nội dung:**
   - Áp dụng quy tắc $6 \times 6$: Mỗi slide tối đa 6 dòng, mỗi dòng tối đa 6 từ khóa quan trọng.
   - Thay thế toàn bộ đoạn văn dài bằng sơ đồ luồng (Flowchart), biểu đồ tuần tự (Sequence Diagram), bảng ma trận hoặc ảnh chụp màn hình bằng chứng ($100\%$ Audit Trail).

## 2. Cấu Trúc Khung Slide Chi Tiết (25 - 30 Slides)

```text
SLIDE DECK STRUCTURE: 67_Slide.pptx (Thời lượng: 15 - 20 Phút)
├── 1. MỞ ĐẦU (Slide 1 - 3)
│   ├── Slide 1: Bìa đề tài (Trường, Khoa, Tên đề tài C, Nhóm 67, GVHD ThS. Nguyễn Hoàng Việt)
│   ├── Slide 2: Danh sách 7 thành viên & Bảng phân công nhiệm vụ
│   └── Slide 3: Mục lục tổng quan (Agenda)
├── 2. CƠ SỞ LÝ THUYẾT & KIẾN TRÚC (Slide 4 - 9)
│   ├── Slide 4: Tổng quan Playwright & Lịch sử ra đời
│   ├── Slide 5: Kiến trúc kết nối WebSocket CDP vs HTTP WebDriver
│   ├── Slide 6: Cơ chế Auto-waiting 5 bước (Actionability Checks)
│   ├── Slide 7: Cơ chế Browser Context Isolation & Tối ưu RAM
│   ├── Slide 8: Năng lực Role-based Locators (Accessibility Tree)
│   └── Slide 9: Ranh giới kỹ thuật cứng & Non-goals (Canvas, Cloudflare, Load Testing)
├── 3. HƯỚNG DẪN CÀI ĐẶT & BỘ CÔNG CỤ SDET (Slide 10 - 14)
│   ├── Slide 10: Khởi tạo dự án TypeScript & Cấu hình playwright.config.ts
│   ├── Slide 11: Demo công cụ Playwright CLI (Cờ lệnh chạy song song & Lọc tag)
│   ├── Slide 12: Demo công cụ Playwright Codegen (Sinh mã tự động)
│   ├── Slide 13: Demo công cụ Playwright UI Mode (Watch mode & Time-travel)
│   └── Slide 14: Demo công cụ Playwright Trace Viewer (4 luồng điều tra lỗi hậu kỳ)
├── 4. THỰC NGHIỆM KỊCH BẢN KIỂM THỬ (DEMO) (Slide 15 - 22)
│   ├── Slide 15: Sơ đồ kiến trúc kiểm thử hai tầng (Dual-Engine Framework)
│   ├── Slide 16: API Ca 1 - Auth Lifecycle & Single-use Token Rotation
│   ├── Slide 17: API Ca 2 - Concurrency High-Contention & Redis Redlock (Promise.all)
│   ├── Slide 18: API Ca 3 - Booking Confirmation & Idempotency Key
│   ├── Slide 19: API Ca 4 - Chuẩn hóa mã lỗi RFC 9457 & Rate Limiting Throttler
│   ├── Slide 20: Web UI Ca 1 - Luồng thanh toán E2E Checkout POM & COM (SauceDemo)
│   ├── Slide 21: Web UI Ca 2 - Network Mocking page.route() HTTP 500 & Locked User
│   └── Slide 22: Tích hợp CI/CD Pipeline với GitHub Actions Workflow
└── 5. ĐỐI SÁNH CÔNG CỤ & KẾT LUẬN (Slide 23 - 26)
    ├── Slide 23: Ma trận so sánh 7 tiêu chí (Playwright vs TestComplete, Selenium, Cypress)
    ├── Slide 24: Đúc kết bài học & Phòng chống Anti-patterns trong SDET
    ├── Slide 25: Kết luận & Đánh giá mức độ hoàn thành đồ án
    └── Slide 26: Lời cảm ơn & Phiên hỏi đáp (Q&A)
```

## 3. Quy Chuẩn Trực Quan Hóa (Visual & Technical Guidelines)

1. **Hiển thị đoạn mã nguồn (Code Snippets):**
   - Không chụp ảnh màn hình code mờ, dùng khối code có tô màu cú pháp nền tối (Dark Theme) hoặc nền sáng tương phản cao.
   - Chỉ trích dẫn các dòng code quan trọng ($5 - 10$ dòng), làm nổi bật (Highlight) các hàm chủ chốt như `request.post()`, `Promise.all()`, `page.route()`, `expect()`.
2. **Chèn ảnh chụp bằng chứng kết quả (Test Run Evidence):**
   - Đính kèm ảnh chụp màn hình Terminal chạy pass `$100\%$` (`X passed in Ys`).
   - Đính kèm ảnh chụp giao diện Trace Viewer thể hiện rõ DOM Snapshot và Network Waterfall.
3. **Nhúng Video & Liên Kết Phụ Trợ:**
   - Slide mở đầu hoặc slide demo có nút liên kết trực tiếp mở video YouTube (trích xuất từ `67_Demo.txt`) để phòng ngừa sự cố mạng khi thuyết trình trực tiếp.

## 4. Tiêu Chí Nghiệm Thu & Checklist Bàn Giao (DoD Checklist)

- [ ] **Hoàn tất bộ Slide (`67_Slide.pptx` \& `67_Slide.pdf`):**
  - [ ] Đầy đủ từ $25 \to 28$ slides theo đúng cấu trúc khung 5 phần ở Mục 2.
  - [ ] Đầy đủ thông tin bìa: Trường Cao đẳng Kỹ thuật Cao Thắng, Khoa CNTT, Nhóm 67, GVHD ThS. Nguyễn Hoàng Việt, danh sách 7 thành viên kèm MSSV.
  - [ ] Không có lỗi chính tả kỹ thuật (Playwright, WebSocket, CDP, Redlock, Idempotency, POM, RFC 9457).
  - [ ] Toàn bộ hình ảnh, sơ đồ kiến trúc và ảnh chụp kết quả test hiển thị sắc nét, không vỡ hạt.
- [ ] **Review & Bàn Giao:**
  - [ ] Trình chiếu thử nghiệm toàn bộ slide trên màn hình lớn để kiểm tra tỷ lệ hiển thị $16:9$.
  - [ ] Nộp file `.pptx` và `.pdf` cho Trưởng nhóm nghiệm thu trước hạn chót ghi trên Google Sheets Master WBS.

## Related Notes

- [[WBS_1_1_Playwright_Overview_and_Core_Concepts]]
- [[WBS_1_2_Playwright_Pros_Cons_and_Applications]]
- [[WBS_1_3_Playwright_Installation_and_Tooling_Guide]]
- [[WBS_1_4_Web_UI_and_API_Core_Capabilities]]
- [[WBS_1_5_Playwright_vs_TestComplete_Comparison]]
- [[WBS_1_6_Multi_Project_Framework_Setup_and_CI]]
- [[Team_Work_Breakdown_and_Contribution_Matrix_Template]]
- [[000_Software_Testing_Playwright_MOC]]
