import { mergeTests } from "@playwright/test";
import { test as t1} from '@/fixtures/conf/case-conf';
import { test as t2} from '@/fixtures/conf/conf';
import { test as t3} from '@/fixtures/conf/suite-conf';

export const test = mergeTests(t1,t2,t3);
