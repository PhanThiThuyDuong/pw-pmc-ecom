import { Page, Locator, expect } from "@playwright/test";
import { StoreFrontBasePage } from "@pom/storefront/storefront-base.page";

export class HomePage extends StoreFrontBasePage {
    readonly page: Page;
    readonly headingWeb: Locator;
    readonly productLocator: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.headingWeb = page.locator("//a[@rel='home']");
        this.productLocator = page.locator("//li[contains(@class, 'product')]");
    }
    async goto(baseURL: string) {
        await this.page.goto(baseURL);
    }

    async verifyTitle(expectedTitle: string) {
        await expect(this.page).toHaveTitle(expectedTitle);
    }

    async verifyHeading(expectedHeading: string) {
        await expect(this.headingWeb).toContainText(expectedHeading || "");
    }

    async verifyNumberOfProducts(expectedNumber: number) {
        const actualCount = await this.productLocator.count();
        console.log("👉 Expected numberOfProducts:", expectedNumber);
        console.log("👉 Actual numberOfProducts:", actualCount);
        await expect(this.productLocator).toHaveCount(expectedNumber);
    }
}