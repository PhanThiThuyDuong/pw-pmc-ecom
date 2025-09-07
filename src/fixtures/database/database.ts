import { test as base } from "@playwright/test";
import { DataSource } from "typeorm";

// Tạo DataSource (config kết nối database)
const APP_DATA_SOURCE = new DataSource({
  type: "mysql", // hoặc "mysql"
  host: process.env.DB_HOST || "betterbytesvn.com",
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || "xwxhnkgb_pwa101db",
  password: process.env.DB_PASS || "sJQ0d9>9)1[c",
  database: process.env.DB_NAME || "xwxhnkgb_pwa101db",
});

// Fixture mở rộng từ Playwright test
export const test = base.extend<{
  db: DataSource;
}>({
  db: async ({}, use) => {
    if (!APP_DATA_SOURCE.isInitialized) {
      await APP_DATA_SOURCE.initialize();
    }
    await use(APP_DATA_SOURCE);
    await APP_DATA_SOURCE.destroy();
  },
});

export { expect } from "@playwright/test";