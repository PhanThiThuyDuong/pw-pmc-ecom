import { Page } from "@playwright/test";
import { DashboardBasePage } from "@pom/dashboard/dashboard-base.page";

export class CouponPage extends DashboardBasePage {
    constructor(page: Page) {
        super(page);
    }

}