import { FullConfig, FullResult, Reporter, Suite, TestCase, TestResult } from '@playwright/test/reporter';

export default class CustomReporter implements Reporter {
    totalTest: number = 0;
    totalPassed: number = 0;
    passedCase: string[] = [];
    totalFailed: number = 0;
    failedCase: string[] = [];
    totalSkipped: number = 0;
    totalTimedOut: number = 0;
    totalInterrupt: number = 0;

    async onBegin(config: FullConfig, suite: Suite): Promise<void> {
        this.totalTest = suite.allTests().length;
    }

    // Thu thap ket qua
    onTestBegin(test: TestCase, result: TestResult): void {

    }

    // "passed"|"failed"|"timedOut"|"skipped"|"interrupted"
    onTestEnd(test: TestCase, result: TestResult): void {
        switch (result.status) {
            case 'passed':
                this.totalPassed++;
                this.passedCase.push(`${test.title} (${result.duration / 1000})s`)
                break;
            case 'failed':
                this.totalFailed++;
                break;
            case 'timedOut':
                this.totalTimedOut++;
                break;
            case 'skipped':
                this.totalSkipped++;
                break;
            case 'interrupted':
                this.totalInterrupt++;
                break;
        }
    }

    async onEnd(result: FullResult): Promise<void | { status?: FullResult["status"]; } | undefined> {
        const reportingTime = new Date(Date.now()).toLocaleString();
        console.log(`- Reporting time: ${reportingTime}`)
        console.log(`- Passed: ${this.totalPassed}`);
        for (let i = 0; i < this.passedCase.length; i++) {
            console.log(`  - ${this.passedCase[i]}`)
        }
        console.log(`- Failed: ${this.totalFailed}`);
        console.log(`- Skipped: ${this.totalSkipped}`);
        console.log(`- TimedOut: ${this.totalTimedOut}`);

        const contents = [];
        contents.push(`Tổng số test chạy: ${this.totalTest}`);
        contents.push(`- Passed cases: ${this.totalPassed}`);
        for (let i = 0; i < this.passedCase.length; i++) {
            contents.push(`  - ${this.passedCase[i]}`);
        }
        contents.push(`- Failed cases: ${this.totalFailed}`);

        const discordUrl = "https://discord.com/api/webhooks/1393966080933892246/NkKqnUtxz_YG1bvfdwqGg8mIgyPolYOkMSprFI-r-KiJO2jaFGkwxToRu-j6nBX4kC2U";
        const slackUrl = "https://hooks.slack.com/services/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";
        await sendToDiscord(discordUrl, contents.join('\n'));
        await sendToSlack(slackUrl, contents.join('\n'));
    }

}

async function sendToDiscord(webhookUrl: string, bodyStr: string) {
    const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "content": bodyStr
        })
    });

    console.log(`status code: ${response.status}`);
}

async function sendToSlack(webhookUrl: string, bodyStr: string) {
    const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "text": bodyStr
        })
    });

    console.log(`status code: ${response.status}`);
}