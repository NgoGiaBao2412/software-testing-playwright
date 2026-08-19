# WBS 1.2A: Auto-Waiting and Actionability Checks Mechanics

## Metadata

- **WBS Code:** `1.2A`
- **Task Name:** Cơ chế Auto-waiting 5 bước & Actionability Checks
- **Assignee:** Đặng Duy Lam (MSSV: 0306241125)
- **Task Weight:** `2.5%`
- **Deliverable Artifacts:** Mục 1.3 Chương 1 trong `67_Bao_cao.docx` và các Slide tương ứng trong `67_Slide.pptx`.

## TL;DR

- **Bản chất:** Cơ chế tự động đồng bộ hóa (Auto-waiting) và 5 bước kiểm tra khả năng hành động (Actionability Checks) của Playwright.
- **Mục đích:** Triệt tiêu hoàn toàn Flaky Tests và loại bỏ các lệnh chờ tĩnh (`sleep()`) lãng phí tài nguyên.
- **Điểm mấu chốt:** Tự động thăm dò trạng thái DOM và animation frame trước khi kích hoạt hành vi người dùng.

## Core Architectural Content to Document

### 1. Vấn Đề Flaky Tests & Bất Đồng Bộ Trong Single Page Applications (SPA)

- **Nguyên nhân cốt lõi:**
  - Cây DOM thay đổi động theo React/Vue/Angular renders.
  - Độ trễ mạng (Network Latency) và hiệu ứng CSS Transitions/Animations.
  - Tương tác khi phần tử chưa sẵn sàng gây lỗi `ElementNotInteractable` hoặc `StaleElementReference`.
- **Hạn chế của phương pháp cũ:**
  - Dùng `sleep(3000)`: Gây lãng phí tài nguyên, dễ fail khi mạng nghẽn $> 3000\text{ms}$.
  - Dùng `WebDriverWait`: Đòi hỏi code thủ công phức tạp, dễ bỏ sót điều kiện che khuất (Overlay).

### 2. 5 Bước Kiểm Tra Actionability Checks Của Playwright

Trước khi thực hiện mọi action (Click, Fill, Check, Select), Playwright tự động kiểm tra 5 điều kiện:

```text
+----------------------------------------------------------------------------------------------------+
|                         5 BƯỚC KIỂM TRA ACTIONABILITY CHECKS TRƯỚC KHI CLICK                       |
+----------------------------------------------------------------------------------------------------+
| 1. Attached   : Phần tử đã tồn tại trong cây DOM của Document / Iframe?                            |
| 2. Visible    : Có kích thước hình học > 0, không bị display:none, visibility:hidden, opacity:0?   |
| 3. Stable     : Bounding box không bị di chuyển qua 2 animation frames liên tiếp?                  |
| 4. Enabled    : Thuộc tính disabled của thẻ HTML là false?                                         |
| 5. Unobscured : Điểm tâm (Center point) trực tiếp nhận pointer events, không bị Modal/Backdrop che?|
+----------------------------------------------------------------------------------------------------+
```

1. **Attached:** Phần tử phải gắn vào DOM hoặc iframe hợp lệ.
2. **Visible:** Kích thước `width > 0`, `height > 0`, không mang `display: none`, `visibility: hidden`, `opacity: 0`.
3. **Stable:** Tọa độ không đổi qua $\ge 2$ khung hình `requestAnimationFrame` liên tiếp (hoàn tất animation).
4. **Enabled:** Phần tử không có thuộc tính `disabled`.
5. **Editable & Unobscured:** Tọa độ tâm nhận `pointer-events`, không bị Modal/Spinner che khuất (`document.elementFromPoint(x, y)`).

### 3. Cơ Chế Web-First Assertions

- Các hàm assertion (`await expect(locator).toHaveText()`, `toBeVisible()`) không kiểm tra 1 lần tức thì.
- Playwright tự động polling chu kỳ $100\text{ms}$ cho đến khi đạt kỳ vọng hoặc hết timeout ($5000\text{ms}$).

---

## Acceptance Criteria & Definition of Done (DoD Checklist)

- [ ] **Báo cáo Word (`67_Bao_cao.docx`):**
  - [ ] Hoàn thành Mục 1.3 Chương 1: Cơ chế Auto-waiting, chi tiết 5 bước Actionability Checks và Web-first Assertions.
  - [ ] Bảng so sánh giữa `sleep()` tĩnh, `WebDriverWait` thủ công và Auto-waiting của Playwright.
  - [ ] Đính kèm sơ đồ luồng kiểm tra Actionability.
- [ ] **Review & Bàn Giao:**
  - [ ] Nộp bản thảo Word cho Trưởng nhóm nghiệm thu đúng hạn.
