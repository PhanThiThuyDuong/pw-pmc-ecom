import { Page } from "@playwright/test";
import { StoreFrontBasePage } from "@pom/storefront/storefront-base.page";

export class CartPage extends StoreFrontBasePage {
    constructor(page: Page) {
        super(page);
    }

    // Add account page specific methods and locators here
}