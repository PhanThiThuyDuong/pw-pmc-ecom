import {Page} from "@playwright/test";
import {BasePage} from "@pom/base.page";

export class DashboardBasePage extends BasePage {
    constructor(page: Page) {
        super(page);
    }
}
