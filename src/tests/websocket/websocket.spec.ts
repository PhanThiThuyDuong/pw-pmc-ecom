import { test, expect } from '@playwright/test';

test("websocket", async ({ page }) => {
    await test.step("B1: Verify Màn hình hiển thị [info] connected", async () => {
        await page.goto('https://echo.websocket.org/.ws');
        await page.waitForSelector(`//div[normalize-space()='connected']`, { timeout: 10_000 });
        //await expect (page.locator("//div[@id='status']")).toHaveText("connected");
    });

    await test.step("B2: Verify gửi và nhận message", async () => {
        page.on('websocket', ws => {
            ws.on('framereceived', data => {
                expect.poll(() => {
                    return data.payload;
                }).toEqual("Hello from PWA101");
            });

        });
        await page.locator("//textarea[@id='msg']").fill("Hello from PWA101");
        await page.click("//button[@id='send']");
    });

    await test.step("B3: Verify disconnect thành công", async () => {
        await page.click("//button[@id='disconnect']")
        await page.waitForSelector(`//div[normalize-space()='disconnected']`, { timeout: 10_000 });
    });

});