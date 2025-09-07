import { test } from "@/fixtures";
import { HomePage } from "@pom/storefront/home/home.page";

test.describe("Home page", () => {
    test(
        "Home_01: verify home page",
        {
            annotation: [
                { type: "test_id", description: "HOME_001" },
                { type: "module_id", description: "HOME" },
            ],
            tag: ["@HOME_01", "@HOME", "@UI"],
        },
        async ({ page, caseConf }) => {
            const baseURL = process.env.BASE_URL || "";
            const homePage = new HomePage(page);
            const expectedTitle = caseConf?.title_case;
            const expectedHeading = caseConf?.heading;
            const numberOfProducts = caseConf?.number;
            const headingWeb = page.locator("//a[@rel='home']");

            await test.step('Navigate to home page"', async () => {
                await homePage.goto(baseURL);
            });

            await test.step("Verify title of page", async () => {
                await homePage.verifyTitle(expectedTitle || "");
            });

            await test.step("Verify heading of page", async () => {
                await homePage.verifyHeading(expectedHeading || "");
            });

            await test.step("Verify number of products", async () => {
                await homePage.verifyNumberOfProducts(numberOfProducts || 0);
            });
        }
    );
});
