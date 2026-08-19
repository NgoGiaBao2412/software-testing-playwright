# WBS 4.2B: Slide Presentation Design - Demo and Synthesis

## Metadata

- **WBS Code:** `4.2B`
- **Task Name:** Thiết kế Slide Thực nghiệm Demo, So sánh & Tổng kết (Slide 15 $\to$ 26)
- **Assignee:** Trần Văn Ngọc (MSSV: 0306241131)
- **Task Weight:** `3.0%`
- **Deliverable Artifacts:** File slide thuyết trình `67_Slide.pptx` (Slide 15 đến 26) và bản xuất `67_Slide.pdf`.

## TL;DR

- **Bản chất:** Thiết kế nửa sau của bộ Slide thuyết trình chính thức (`67_Slide.pptx` từ Slide 15 đến Slide 26).
- **Mục đích:** Trực quan hóa kết quả thực nghiệm 8 ca kiểm thử (4 API + 4 Web UI), CI/CD Pipeline trên GitHub Actions, ma trận so sánh công cụ và bài học kinh nghiệm.
- **Điểm mấu chốt:** Nêu bật bằng chứng thực nghiệm ($100\%$ Pass) và bảng đối soát 7 tiêu chí kỹ thuật.

## Core Architectural Content to Implement

### 1. Cấu Trúc Khung Slide Chi Tiết (Slide 15 $\to$ 26)

```text
SLIDE DECK PHẦN 2: THỰC NGHIỆM DEMO & TỔNG KẾT (Slide 15 -> 26)
├── 4. THỰC NGHIỆM BỘ KIỂM THỬ TỰ ĐỘNG (DEMO) (Slide 15 - 23)
│   ├── Slide 15: Sơ đồ kiến trúc kiểm thử hai tầng (Dual-Engine Framework: API & UI)
│   ├── Slide 16: API Ca 1 - Auth Lifecycle, JWT & Single-use Token Rotation
│   ├── Slide 17: API Ca 2 - High-Contention Concurrency & Redis Redlock (Promise.all)
│   ├── Slide 18: API Ca 3 - Booking Transaction & Idempotency Key (UUID v4 Header)
│   ├── Slide 19: API Ca 4 - Chuẩn hóa mã lỗi RFC 9457 & Rate Limiting Throttler
│   ├── Slide 20: Web UI Ca 1 - Luồng mua hàng E2E Checkout POM & COM trên SauceDemo
│   ├── Slide 21: Web UI Ca 2 - Network Mocking page.route() HTTP 500 & Locked-out User
│   ├── Slide 22: Web UI Ca 3 & 4 - Trace Viewer Post-Mortem Diagnostics & Visual Regression
│   └── Slide 23: Tích hợp CI/CD Pipeline với GitHub Actions Workflow & Bun
└── 5. ĐỐI SÁNH CÔNG CỤ & TỔNG KẾT ĐỒ ÁN (Slide 24 - 26)
    ├── Slide 24: Ma trận đối soát 7 tiêu chí: Playwright vs TestComplete, Selenium, Cypress
    ├── Slide 25: Đúc kết bài học & Phòng chống Anti-patterns trong SDET
    └── Slide 26: Kết luận mức độ hoàn thành, Lời cảm ơn & Phiên hỏi đáp (Q&A)
```

### 2. Quy Chuẩn Trực Quan Hóa Bằng Chứng Thực Nghiệm

1. **Hiển thị đoạn mã nguồn then chốt:** Trích dẫn $5 - 8$ dòng code quan trọng theo Dark Theme (`Promise.all()`, `page.route()`, `toHaveScreenshot()`, `zod`).
2. **Ảnh chụp kết quả thực thi ($100\%$ Pass):** Ảnh Terminal chạy pass toàn bộ test suite, biểu đồ delay $5\text{s}$ trong Trace Viewer và ảnh Visual Diff.
3. **Bảng so sánh công cụ:** Nêu bật ưu thế miễn phí, tốc độ và Linux Docker headless của Playwright.

---

## Acceptance Criteria & Definition of Done (DoD Checklist)

- [ ] **Hoàn Tất Slide 15 $\to$ 26:**
  - [ ] Đầy đủ 12 slides theo đúng cấu trúc khung ở Mục 1.
  - [ ] Trực quan hóa đầy đủ kết quả 8 ca kiểm thử (4 API + 4 UI).
  - [ ] Bảng ma trận so sánh đầy đủ 7 tiêu chí kỹ thuật.
- [ ] **Hợp Nhất Bộ Slide Toàn Diện:**
  - [ ] Ghép nối với Slide 1 $\to$ 14 của WBS 4.2A tạo file `67_Slide.pptx` hoàn chỉnh gồm $26$ slides chuẩn.
- [ ] **Bàn Giao & Nghiệm Thu:**
  - [ ] Trình chiếu thử nghiệm toàn bộ slide trên màn hình tỷ lệ $16:9$.
