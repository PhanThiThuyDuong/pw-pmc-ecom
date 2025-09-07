import { expect, test } from '@playwright/test';

test("Setup things", async ({ page }) => {
    // Login
    await page.goto("https://e-commerce.betterbytesvn.com/wp-admin");
    await page.getByLabel(/Username/).fill("admin");
    await page.getByLabel(/Password/).fill("xyH2BJzX$C");
    await page.locator('#wp-submit').click();
    await expect(page.locator('body')).toContainText('Dashboard');

    // Luu thogn tin vao file auth.json
    await page.context().storageState({ path: 'auth.json'});
});