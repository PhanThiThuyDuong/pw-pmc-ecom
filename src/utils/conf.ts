import path from "path";
import fs from "fs";
import merge from "lodash.merge";

export const loadMergeConf = (testFilePath: string, caseId: string, env: string) => {
    // Đọc file conf theo env
    const testDir = path.dirname(testFilePath);
    const testBase = path.basename(testFilePath, '.spec.ts');
    const jsonFile = path.join(testDir, `${testBase}.json`);
    if (!fs.existsSync(jsonFile)) {
        throw new Error(`File ${jsonFile} đã tồn tại, vui lòng đổi tên file conf`);
    }

    const configRaw = JSON.parse(fs.readFileSync(jsonFile, 'utf-8'));

    const commonSuiteConf = configRaw?.common?.suite_config;
    const commonCaseConf = configRaw?.common?.case_config[caseId];

    let envSuiteConf;
    if (configRaw && configRaw?.by_env && configRaw?.by_env[env] && configRaw?.by_env[env]["suite_config"]) {
        envSuiteConf = configRaw?.by_env[env]["suite_config"];
    }

    let envCaseConf;
    if (configRaw && configRaw?.by_env && configRaw?.by_env[env] && configRaw?.by_env[env]["case_config"][caseId]) {
        envCaseConf = configRaw?.by_env[env]["case_config"][caseId];
    }



    const merged = {};
    merge(merged, commonSuiteConf);
    merge(merged, commonCaseConf);
    merge(merged, envSuiteConf);
    merge(merged, envCaseConf);

    if (Object.keys(merged).length === 0) {
        throw new Error(`Không tìm thấy config phù hợp với caseId ${caseId} và env ${env}`);
    }

    return merged;


    // Gộp với defaultConf
    // Trả về config đã gộp
    //return {...defaultConf, ...envConf};
}

export const loadMergeCaseConf = (testFilePath: string, caseId: string, env: string) => {
    // Đọc file conf theo env
    const testDir = path.dirname(testFilePath);
    const testBase = path.basename(testFilePath, '.spec.ts');
    const jsonFile = path.join(testDir, `${testBase}.json`);
    if (!fs.existsSync(jsonFile)) {
        throw new Error(`File ${jsonFile} đã tồn tại, vui lòng đổi tên file conf`);
    }

    const configRaw = JSON.parse(fs.readFileSync(jsonFile, 'utf-8'));

    const commonCaseConf = configRaw?.common?.case_config[caseId];


    let envCaseConf;
    if (configRaw && configRaw?.by_env && configRaw?.by_env[env] && configRaw?.by_env[env]["case_config"][caseId]) {
        envCaseConf = configRaw?.by_env[env]["case_config"][caseId];
    }

    const merged = {};
    merge(merged, commonCaseConf);
    merge(merged, envCaseConf);

    if (Object.keys(merged).length === 0) {
        throw new Error(`Không tìm thấy config phù hợp với caseId ${caseId} và env ${env}`);
    }

    return merged;


    // Gộp với defaultConf
    // Trả về config đã gộp
    //return {...defaultConf, ...envConf};
}

export const loadMergeSuitConf = (testFilePath: string, caseId: string, env: string) => {
    // Đọc file conf theo env
    const testDir = path.dirname(testFilePath);
    const testBase = path.basename(testFilePath, '.spec.ts');
    const jsonFile = path.join(testDir, `${testBase}.json`);
    if (!fs.existsSync(jsonFile)) {
        throw new Error(`File ${jsonFile} đã tồn tại, vui lòng đổi tên file conf`);
    }

    const configRaw = JSON.parse(fs.readFileSync(jsonFile, 'utf-8'));

    const commonSuiteConf = configRaw?.common?.suite_config
    let envSuiteConf;
    if (configRaw && configRaw?.by_env && configRaw?.by_env[env] && configRaw?.by_env[env]["suite_config"]) {
        envSuiteConf = configRaw?.by_env[env]["suite_config"];
    }

    const merged = {};
    merge(merged, commonSuiteConf);
    merge(merged, envSuiteConf);

    if (Object.keys(merged).length === 0) {
        throw new Error(`Không tìm thấy config phù hợp với caseId ${caseId} và env ${env}`);
    }

    return merged;


    // Gộp với defaultConf
    // Trả về config đã gộp
    //return {...defaultConf, ...envConf};
}