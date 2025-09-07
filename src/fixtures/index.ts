import { mergeTests } from "@playwright/test";
import { test as t1} from './conf';

export const test = mergeTests(t1);