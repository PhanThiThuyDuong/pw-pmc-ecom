import path from "path";
import dotenv from "dotenv";
import { test } from "@fixtures/dashboard/login/login.page";

const env = process.env.ENV || "dev";
const envPath = path.resolve(process.cwd(), `.env.${env}`);
dotenv.config({ path: envPath });

const baseUrl = (process.env.BASE_URL || "") + "/wp-admin";

const credentials = {
  production: {
    username: "pw101",
    password: "vB30(jIwq2Jn6GloUu&asCKP",
    wrongUsername: "pw101-1",
    wrongPassword: "vB30(jIwq2Jn6GloUu&asCKP-1",
  },
  dev: {
    username: "student-user",
    password: "1GT5WFx&MHlmAmSFH#u1HHn6",
    wrongUsername: "student-user-1",
    wrongPassword: "1GT5WFx&MHlmAmSFH#u1HHn6-1",
  },
}[env as "production" | "dev"];

test.describe("DB_AUTH", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto(baseUrl);
  });

  test(
    "DB_AUTH_001: Login thành công",
    {
      annotation: { type: "lesson-01", description: "Login thành công" },
      tag: ["@DB_AUTH_001", "@UI", "@SMOKE"],
    },
    async ({ loginPage }) => {
      await loginPage.login(credentials.username, credentials.password);
      await loginPage.expectLoginSuccess();
    }
  );

  test(
    "DB_AUTH_002: Login thất bại với sai username",
    {
      annotation: { type: "lesson-01", description: "Login thất bại" },
      tag: ["@DB_AUTH_002", "@UI"],
    },
    async ({ loginPage }) => {
      const wrongUsername = credentials.wrongUsername;
      await loginPage.login(wrongUsername, credentials.password);
      await loginPage.expectLoginFail(wrongUsername);
    }
  );
});