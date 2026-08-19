# WBS 2.1: API Test Suite - Auth Lifecycle and Single-Use Token Rotation

## Metadata

- **WBS Code:** `2.1`
- **Task Name:** API Ca 1: Auth Lifecycle, Token Rotation & Family Revocation
- **Assignee:** Nguyễn Quốc Đương (MSSV: 0306241102)
- **Task Weight:** `7.5%`
- **Deliverable Artifacts:** File mã nguồn `tests/api/auth.spec.ts`, `fixtures/api.fixture.ts`, Pull Request GitHub, Mục 3.2.1 Chương 3 trong `67_Bao_cao.docx` / `67_Bao_cao.tex`.

## TL;DR

- **Bản chất:** Đặc tả nhiệm vụ hiện thực bộ kiểm thử tự động API Ca 1: Toàn bộ vòng đời xác thực tài khoản (Register $\to$ Login $\to$ JWT Issuance $\to$ Single-Use Refresh Token Rotation $\to$ Logout).
- **Mục đích:** Đảm bảo hệ thống phát hiện và vô hiệu hóa toàn bộ chuỗi token (Family Revocation) khi phát hiện tấn công tái sử dụng token cũ (Token Reuse Attack).
- **Điểm mấu chốt:** Tự động hóa kiểm thử các điều kiện biên bảo mật: Token hết hạn, chữ ký bị giả mạo và thu hồi quyền truy cập tức thì.

---

## 1. Mục Tiêu & Bối Cảnh Nghiệp Vụ (Business & Technical Context)

- **Bối cảnh hệ thống:**
  - Hệ thống `ticket-booking` sử dụng cơ chế xác thực JWT kết hợp cặp Token: **Access Token** (thời hạn ngắn: 15 phút) và **Refresh Token** (thời hạn dài: 7 ngày).
  - Để ngăn chặn rủi ro lộ Refresh Token, hệ thống áp dụng cơ chế **Single-Use Refresh Token Rotation (RTR)**: Mỗi lần client gửi Refresh Token $RT_1$ để lấy Access Token mới, backend sẽ cấp $RT_2$ mới và thu hồi ngay lập tức $RT_1$ vào danh sách đen (Blacklist / Invalidation Table).
  - Nếu một kẻ tấn công cố tình gửi lại $RT_1$ đã sử dụng, backend phải kích hoạt cảnh báo xâm nhập (Security Intrusion) và **thu hồi toàn bộ chuỗi Token của User** (Family Revocation).

---

## 2. Các Yêu Cầu Thiết Kế Ca Kiểm Thử (Test Design Specifications)

Người phụ trách cần thiết kế và hiện thực tối thiểu 4 kịch bản kiểm thử tự động trong file `tests/api/auth.spec.ts`:

1. **`TC-AUTH-01: Happy Path Login & JWT Payload Decoding`**
   - **Mục tiêu:** Kiểm tra đăng nhập với thông tin hợp lệ (`email`, `password`).
   - **Kỳ vọng:** Phản hồi HTTP `200 OK`, trả về cặp `accessToken` và `refreshToken`.
   - **Bất biến (Invariants):** Cấu trúc JWT gồm đúng 3 phần phân tách bằng dấu chấm (`header.payload.signature`); giải mã Base64 payload chứa đúng `userId`, `role`, và thời gian hết hạn `exp > iat`.
2. **`TC-AUTH-02: Single-Use Refresh Token Rotation & Family Revocation`**
   - **Mục tiêu:** Kiểm tra cơ chế cấp xoay vòng token và phát hiện tấn công phát lại (Replay Attack).
   - **Các bước:**
     1. Gửi $RT_1$ lên endpoint `/auth/refresh` $\to$ Nhận thành công $RT_2$ và Access Token mới (HTTP `200 OK`).
     2. Gửi lại chính xác $RT_1$ đã sử dụng lên endpoint `/auth/refresh`.
   - **Kỳ vọng:** Backend từ chối với HTTP `401 Unauthorized` hoặc `403 Forbidden`, đồng thời vô hiệu hóa luôn cả $RT_2$ hiện tại (Family Revocation).
3. **`TC-AUTH-03: Tampered Signature & Expired Token Rejection`**
   - **Mục tiêu:** Kiểm tra khả năng từ chối token bị can thiệp trái phép hoặc hết hạn.
   - **Kỳ vọng:**
     - Token bị sửa đổi 1 ký tự trong Signature $\to$ Bị từ chối với HTTP `401 Unauthorized` (Invalid Signature).
     - Token đã quá hạn `exp` $\to$ Bị từ chối với HTTP `401 Unauthorized` (Token Expired).
4. **`TC-AUTH-04: Full Logout & Session Invalidation`**
   - **Mục tiêu:** Kiểm tra cơ chế đăng xuất toàn diện.
   - **Kỳ vọng:** Sau khi gọi endpoint `/auth/logout`, toàn bộ Access Token và Refresh Token hiện tại không thể sử dụng để truy cập các tài nguyên bảo vệ.

---

## 3. Câu Hỏi Cốt Lõi & Kịch Bản Thất Bại Cần Kiểm Chứng (Failure Modes)

- Tại sao Access Token nên có thời hạn ngắn (15 phút) và Refresh Token bắt buộc phải áp dụng cơ chế Single-Use?
- Nếu hệ thống không áp dụng cơ chế Family Revocation, kẻ tấn công đánh cắp được token cũ sẽ duy trì phiên đăng nhập trái phép vĩnh viễn như thế nào?
- Làm thế nào để giải mã Payload của JWT trong Playwright TypeScript mà không cần cài đặt thêm thư viện ngoài nặng nề (`Buffer.from(token.split('.')[1], 'base64').toString()`)?

---

## 4. Tài Liệu Nghiên Cứu Bắt Buộc (Primary Official Sources)

1. **Chuẩn Xác Thực & RFCs:**
   - [IETF RFC 7519 - JSON Web Token (JWT)](https://datatracker.ietf.org/doc/html/rfc7519)
   - [IETF RFC 6749 - The OAuth 2.0 Authorization Framework (Token Refresh)](https://datatracker.ietf.org/doc/html/rfc6749#section-6)
   - [OWASP JSON Web Token Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html)
2. **Tài Liệu Playwright API Testing:**
   - [Playwright API Testing Official Guide](https://playwright.dev/docs/api-testing)
   - [Playwright APIRequestContext API Reference](https://playwright.dev/docs/api/class-apirequestcontext)

---

## 5. Cấu Trúc Báo Cáo & Yêu Cầu Đầu Ra (Required Deliverables)

### Báo Cáo (`67_Bao_cao.docx` / `67_Bao_cao.tex` - Mục 3.2.1 Chương 3)
Người phụ trách soạn thảo theo khung 5 phần học thuật:
1. **Mục tiêu & Cơ chế kỹ thuật:** Phân tích cơ chế Single-Use RTR và Family Revocation.
2. **Đặc tả kịch bản & Dữ liệu kiểm thử:** Bảng thông số test data cho 4 ca test (`TC-AUTH-01` $\to$ `TC-AUTH-04`).
3. **Trích đoạn mã nguồn then chốt:** Trích dẫn 15 - 25 dòng code xử lý kiểm tra token rotation và assertions.
4. **Bằng chứng thực nghiệm & Phân tích log:** Ảnh chụp màn hình terminal chạy pass $100\%$, log JSON phản hồi giải mã JWT payload.
5. **Đánh giá rủi ro & Bài học kỹ thuật:** Phân tích nguy cơ Replay Attack và giải pháp phòng thủ.

---

## 6. Tiêu Chí Nghiệm Thu & Bằng Chứng Bàn Giao (Definition of Done)

- [ ] **Mã Nguồn Kiểm Thử & Chạy Pass ($100\%$):**
  - [ ] Tạo file `tests/api/auth.spec.ts` và cấu hình `fixtures/api.fixture.ts`.
  - [ ] Chạy lệnh `bunx playwright test tests/api/auth.spec.ts --project=api` pass $100\%$ cả 4 kịch bản.
  - [ ] Không sử dụng lệnh chờ tĩnh `sleep()`, code định dạng sạch theo chuẩn TypeScript.
- [ ] **Bằng Chứng Git & Pull Request:**
  - [ ] Tạo nhánh `feat/wbs-2.1-api-auth-lifecycle`.
  - [ ] Tạo Pull Request trên GitHub với mô tả chi tiết, log JSON và ảnh test pass.
- [ ] **Chất Lượng Học Thuật Trong Báo Cáo:**
  - [ ] Hoàn thành đầy đủ 5 phần cho Mục 3.2.1 trong Báo cáo đồ án.
