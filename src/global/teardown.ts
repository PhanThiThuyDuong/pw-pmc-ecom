import { expect, test } from '@playwright/test';
import { promises as fs } from 'fs';

test("Delete things", async ({ page }) => {
   // Remove file auth.json
   await fs.unlink('auth.json');
});