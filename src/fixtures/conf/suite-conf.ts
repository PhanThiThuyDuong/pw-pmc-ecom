import {test as base} from '@playwright/test';
import { loadMergeSuitConf } from '@/utils/conf';

export const test = base.extend<{ suiteConf: any }>({
    suiteConf: async ({}, use: any, testInfo :any) => {
        const testFilePath = testInfo.file;

        let caseId = testInfo?.tags?.[0];
        if (!caseId) {
            throw new Error(`Không tìm thấy ${caseId} trong ${testInfo.tag}`);
        }
        
        caseId = caseId.replace('@', '');

        const env = process.env.TEST_ENV || 'dev';
        const conf = loadMergeSuitConf(testFilePath, caseId, env);
        await use(conf);
    }
});