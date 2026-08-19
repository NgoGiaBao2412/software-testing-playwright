# WBS 4.3B: Video Demo Production - Web UI Automation Suite

## Metadata

- **WBS Code:** `4.3B`
- **Task Name:** Sản xuất Video Clip Thuyết minh & Demo Bộ Test Web UI (Thời lượng: 6 - 9 Phút)
- **Assignee:** Ngô Gia Bảo (MSSV: 0306241090)
- **Task Weight:** `3.0%`
- **Deliverable Artifacts:** File video demo `67_Demo_UI.mp4` (Full HD 1080p), đường link video YouTube trong file `67_Demo.txt`.

## TL;DR

- **Bản chất:** Sản xuất video clip demo thực tế bộ kiểm thử tự động Web UI Automation Suite trên hệ sinh thái SauceDemo.
- **Mục đích:** Thuyết minh chi tiết 4 ca kiểm thử Web UI (E2E Checkout POM/COM, Network Mocking HTTP 500, Trace Viewer Diagnostics, Visual Regression Testing).
- **Điểm mấu chốt:** Minh chứng tính ổn định của cơ chế Auto-waiting, khả năng can thiệp mạng và công cụ khám nghiệm Trace Viewer.

## Core Architectural Content to Implement

### 1. Kịch Bản Quay & Lời Thuyết Minh Chi Tiết (6 - 9 Phút)

```text
TIMELINE VIDEO DEMO WEB UI (Thời lượng: 6 - 9 Phút)
├── 00:00 - 01:00 | Phần 1: Giới thiệu cấu trúc thư mục POM, COM và môi trường thực thi
├── 01:00 - 02:45 | Phần 2: UI Ca 1 - Luồng mua hàng E2E Checkout Flow trên SauceDemo (--headed)
├── 02:45 - 04:30 | Phần 3: UI Ca 2 - Network Mocking page.route() HTTP 500 & Locked-out User
├── 04:30 - 06:30 | Phần 4: UI Ca 3 - Post-Mortem Diagnostics với Trace Viewer & Performance Glitch
├── 06:30 - 08:00 | Phần 5: UI Ca 4 - Visual Regression Testing (toHaveScreenshot & Dynamic Masking)
└── 08:00 - 08:30 | Phần 6: Tổng kết báo cáo HTML Report & Tích hợp CI/CD Pipeline
```

- **Phần 1: Giới thiệu cấu trúc:** Trình bày cấu trúc thư mục `pages/` (POM & COM) và `tests/e2e/`, nhấn mạnh tính tách biệt giữa Locators và kịch bản test.
- **Phần 2: Demo Ca 1 (Checkout Flow):** Chạy `bunx playwright test tests/e2e/checkout.spec.ts --headed`, quay màn hình Chromium tự động đăng nhập, lọc giá, thêm 2 món vào giỏ, điền form thanh toán và đặt hàng thành công.
- **Phần 3: Demo Ca 2 (Network Mocking):** Chạy `bunx playwright test tests/e2e/network_mock.spec.ts --headed`, chỉ ra thông báo lỗi khi đăng nhập `locked_out_user` và Error Banner khi mạng bị can thiệp HTTP 500.
- **Phần 4: Demo Ca 3 (Trace Viewer):** Chạy `tests/e2e/glitch_diagnostics.spec.ts`, sau đó mở Trace Viewer (`bunx playwright show-trace`), kéo thanh trượt Filmstrip và tab Network chứng minh request bị treo đúng $5000\text{ms}$.
- **Phần 5: Demo Ca 4 (Visual Regression):** Chạy `tests/e2e/visual_regression.spec.ts`, giải thích cơ chế so khớp ảnh Snapshot và kỹ thuật Masking che phần tử biến đổi động.

### 2. Quy Chuẩn Kỹ Thuật Video

1. **Chất lượng hình ảnh:** Full HD ($1920 \times 1080$), 60fps. Trình duyệt chạy ở chế độ Headed với kích thước chuẩn Desktop ($1280 \times 720$ hoặc $1920 \times 1080$).
2. **Chất lượng âm thanh:** Lồng tiếng mạch lạc, giải thích rõ ràng từng thao tác đang diễn ra, không để khoảng lặng chết (Dead Air).
3. **Hiển thị giao diện:** Phóng to các khu vực thao tác quan trọng (giỏ hàng, popup lỗi, tab Network trong Trace Viewer).

---

## Acceptance Criteria & Definition of Done (DoD Checklist)

- [ ] **Sản Xuất & Biên Tập Video:**
  - [ ] Hoàn thành video thời lượng từ $6 - 9$ phút theo kịch bản ở Mục 1.
  - [ ] Video có âm thanh thuyết minh rõ ràng, hình ảnh sắc nét Full HD 1080p 60fps.
- [ ] **Xuất Bản & Bàn Giao:**
  - [ ] Đăng tải video lên YouTube ở chế độ Không công khai (Unlisted) hoặc Công khai.
  - [ ] Cập nhật link vào file `67_Demo.txt` và nộp file video gốc `67_Demo_UI.mp4` cho Trưởng nhóm.
