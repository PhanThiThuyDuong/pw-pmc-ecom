import {test as base} from '@playwright/test';
import { loadMergeCaseConf } from '@/utils/conf';

export const test = base.extend<{ caseConf: any }>({
    caseConf: async ({}, use: any, testInfo :any) => {
        const testFilePath = testInfo.file;
        console.log("testInfo.title",testInfo.file);

        let caseId = testInfo?.tags?.[0];
        if (!caseId) {
            throw new Error(`Không tìm thấy ${caseId} trong ${testInfo.tag}`);
        }
        
        caseId = caseId.replace('@', '');

        const env = process.env.TEST_ENV || 'dev';
        const conf = loadMergeCaseConf(testFilePath, caseId, env);
        await use(conf);
    }
});