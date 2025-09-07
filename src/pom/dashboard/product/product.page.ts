import { Page } from "@playwright/test";
import { DashboardBasePage } from "@pom/dashboard/dashboard-base.page";

export class ProductPage extends DashboardBasePage {
    constructor(page: Page) {
        super(page);
    }

    // Add product page specific methods and locators here
}