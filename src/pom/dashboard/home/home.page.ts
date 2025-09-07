import { Page } from "@playwright/test";
import { DashboardBasePage } from "@pom/dashboard/dashboard-base.page";


export class HomePage extends DashboardBasePage {
    constructor(page: Page) {
        super(page);
    }

    // Add account page specific methods and locators here
}