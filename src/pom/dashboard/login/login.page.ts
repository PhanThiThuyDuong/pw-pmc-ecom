import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly menuName: Locator;
  readonly errorText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('//input[@id="user_login"]');
    this.passwordInput = page.locator('//input[@id="user_pass"]');
    this.submitButton = page.locator('//input[@id="wp-submit"]');
    this.menuName = page.locator('//div[@class="wp-menu-name"]').first();
    this.errorText = page.locator('//div[@id="login_error"]');
  }

  async goto(baseUrl: string) {
    await this.page.goto(baseUrl);
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async expectLoginSuccess() {
    await expect(this.menuName).toContainText("Dashboard");
  }

  async expectLoginFail(username: string) {
    await expect(this.errorText).toBeVisible();
    await expect(this.errorText).toContainText(
      `Error: The username ${username} is not registered on this site. If you are unsure of your username, try your email address instead.`
    );
  }
}