import { loadMergeSuitConf , loadMergeCaseConf, loadMergeConf } from "@/utils/conf";
import { getRandomString } from "@/utils/random";
import {test} from "@/fixtures";


test.describe('Demo test', () => {
  test('Demo pass case',
    {
      tag: ['@demo-pass']
    }, async ({ page }) => {
      const randomStr = getRandomString(5);
      console.log(`Random string: ${randomStr}`);
    });

    test("Test config",
        {
            tag: ['@CASE_01']
        },
        async ({ page, caseConf }) => {
            console.log(caseConf);
        }
    );
});