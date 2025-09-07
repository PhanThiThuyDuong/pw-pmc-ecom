import {Page} from "@playwright/test";
import {BasePage} from "@pom/base.page";

export class StoreFrontBasePage extends BasePage {
    constructor(page: Page) {
        super(page);
    }
}