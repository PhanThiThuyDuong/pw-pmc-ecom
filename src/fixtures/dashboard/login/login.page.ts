import { test as base } from "@playwright/test";
import { LoginPage } from "@pom/dashboard/login/login.page";

type PagesFixture = {
  loginPage: LoginPage;
};

export const test = base.extend<PagesFixture>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
});

export { expect } from "@playwright/test";