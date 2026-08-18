import { test, expect } from "@playwright/test";

/**
 * Kịch bản dự phòng cho Web UI Testing (nếu giảng viên yêu cầu bắt buộc demo cả Web UI)
 * Trang mục tiêu: https://www.saucedemo.com/ (Trang sandbox tiêu chuẩn của QA)
 */
// test.describe("SauceDemo E2E Web UI Tests (Fallback / Bonus)", () => {
//   test.beforeEach(async ({ page }) => {
//     // TODO: Mở trang web https://www.saucedemo.com/
//     // await page.goto('https://www.saucedemo.com/');
//   });
//
//   test("TC10: Đăng nhập giao diện thành công và hiển thị danh sách sản phẩm", async ({
//     page,
//   }) => {
//     // TODO: 1. Điền username: standard_user, password: secret_sauce
//     // TODO: 2. Click nút Login
//     // TODO: 3. Verify URL chuyển đến /inventory.html
//     // TODO: 4. Verify hiển thị danh sách sản phẩm
//   });
//
//   test("TC11: Luồng mua hàng hoàn chỉnh (E2E Purchase Flow)", async ({
//     page,
//   }) => {
//     // TODO: 1. Đăng nhập
//     // TODO: 2. Thêm sản phẩm vào giỏ hàng (Add to cart)
//     // TODO: 3. Mở giỏ hàng -> Click Checkout
//     // TODO: 4. Điền thông tin giao hàng (First name, Last name, Zip code)
//     // TODO: 5. Click Finish và verify thông báo "Thank you for your order!"
//   });
// });

test("TC10: Thử nghiệm gửi lệnh CDP", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await page.waitForTimeout(2000);
});
