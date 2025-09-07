import { FullConfig, FullResult, Reporter, Suite, TestCase, TestResult } from "@playwright/test/reporter";
import dotenv from 'dotenv';
import path from "path";

dotenv.config({
    path: path.resolve(
        '.env'
    ),
});

export default class SlackReporter implements Reporter {

    totalTest: number = 0;
    totalPassed: number = 0;
    passedCase: Record<string, boolean> = {};
    totalFailed: number = 0;
    failedCase: Record<string, boolean> = {};
    flakyCase: Record<string, boolean> = {};
    totalSkipped: number = 0;
    totalTimedOut: number = 0;
    totalInterrupt: number = 0;

    async onBegin(config: FullConfig, suite: Suite): Promise<void> {
        this.totalTest = suite.allTests().length;
    }

    onTestBegin(test: TestCase, result: TestResult): void {

    }

    onTestEnd(test: TestCase, result: TestResult): void {
        switch (result.status) {
            case 'passed':
                this.totalPassed++;
                // this.passedCase.push(`${test.title} (${result.duration / 1000})s`)
                this.passedCase[test.title] = true;
                break;
            case 'failed':
                this.totalFailed++;
                this.failedCase[test.title] = true;
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
        const tobeDelete: Record<string, boolean> = {};
        const passedTest = Object.keys(this.passedCase);
        const failedTest = Object.keys(this.failedCase);

        for (let i = 0; i < passedTest.length; i++) {
            for (let j = 0; j < failedTest.length; j++) {
                const firstTest = passedTest[i];
                const secondTest = failedTest[j];

                if (firstTest == secondTest) {
                    tobeDelete[firstTest] = true;
                }

            }
        }

        const deleteKeys = Object.keys(tobeDelete);
        for (let i = 0; i < deleteKeys.length; i++) {
            const key = deleteKeys[i];
            delete this.passedCase[key];
            delete this.failedCase[key];
            this.flakyCase[key] = true;
        }

        const reportingTime = new Date(Date.now()).toLocaleString();
        console.log(`- Reporting time: ${reportingTime}`)
        console.log('failed test:', this.failedCase);
        console.log('pased test:', this.passedCase);
        console.log('flaky test:', this.flakyCase);

        const resultPassTest = Object.keys(this.passedCase);
        const resultfailTest = Object.keys(this.failedCase);
        const resultflakyTest = Object.keys(this.flakyCase);

        const executionTemplate = {
            "blocks": [
                {
                    "type": "header",
                    "text": {
                        "type": "plain_text",
                        "text": "🚀 Test Execution Report"
                    }
                },
                {
                    "type": "section",
                    "fields": [
                        {
                            "type": "mrkdwn",
                            "text": "*Environment:*\nStaging"
                        },
                        {
                            "type": "mrkdwn",
                            "text": `*Duration:*\n ${this.totalTimedOut}`
                        },
                        {
                            "type": "mrkdwn",
                            "text": `*Total Tests:*\n ${this.totalTest}`
                        },
                        {
                            "type": "mrkdwn",
                            "text": `*Success Rate:*\n${(resultPassTest.length / this.totalTest) * 100}%`
                        }
                    ]
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "*Test Results Summary:*"
                    }
                },
                {
                    "type": "section",
                    "fields": [
                        {
                            "type": "mrkdwn",
                            "text": `✅ *Passed:* ${resultPassTest.length}`
                        },
                        {
                            "type": "mrkdwn",
                            "text": `❌ *Failed:* ${resultfailTest.length}`
                        },
                        {
                            "type": "mrkdwn",
                            "text": `⏭️ *Skipped:* ${this.totalSkipped}`
                        },
                        {
                            "type": "mrkdwn",
                            "text": `🔄 *flaky:* ${resultflakyTest.length}`
                        }
                    ]
                },
                {
                    "type": "divider"
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "*Failed Test Cases:*"
                    }
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "• 'test_login_invalid_credentials' - Authentication error\n• 'test_checkout_payment_failure' - Payment gateway timeout\n• 'test_search_special_characters' - Element not found"
                    }
                },
                {
                    "type": "actions",
                    "elements": [
                        {
                            "type": "button",
                            "text": {
                                "type": "plain_text",
                                "text": "View Full Report"
                            },
                            "style": "primary",
                            "url": "https://jenkins.company.com/job/automation-tests/123/"
                        },
                        {
                            "type": "button",
                            "text": {
                                "type": "plain_text",
                                "text": "Download Logs"
                            },
                            "url": "https://jenkins.company.com/job/automation-tests/123/artifact/"
                        }
                    ]
                }
            ]
        };

        const performanceTemplate = {
            "blocks": [
                {
                    "type": "header",
                    "text": {
                        "type": "plain_text",
                        "text": "⚡ Performance Test Results"
                    }
                },
                {
                    "type": "context",
                    "elements": [
                        {
                            "type": "mrkdwn",
                            "text": "Test Plan: E-commerce Load Test | Duration: 15 minutes | Tool: JMeter"
                        }
                    ]
                },
                {
                    "type": "section",
                    "fields": [
                        {
                            "type": "mrkdwn",
                            "text": `*Total Requests:*\n${this.totalTest}`
                        },
                        {
                            "type": "mrkdwn",
                            "text": `*Success Rate:*\n${(resultPassTest.length / this.totalTest) * 100}%`
                        },
                        {
                            "type": "mrkdwn",
                            "text": "*Avg Response Time:*\n245ms"
                        },
                        {
                            "type": "mrkdwn",
                            "text": "*Throughput:*\n125.5 req/sec"
                        }
                    ]
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "*Performance Metrics:*"
                    }
                },
                {
                    "type": "section",
                    "fields": [
                        {
                            "type": "mrkdwn",
                            "text": "📈 *95th Percentile:* 890ms"
                        },
                        {
                            "type": "mrkdwn",
                            "text": "🔺 *Max Response Time:* 3.2s"
                        },
                        {
                            "type": "mrkdwn",
                            "text": "🔻 *Min Response Time:* 89ms"
                        },
                        {
                            "type": "mrkdwn",
                            "text": "❌ *Error Rate:* 1.5%"
                        }
                    ]
                },
                {
                    "type": "divider"
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "*Top Slow Endpoints:*\n• `/api/search` - 1.2s avg\n• `/api/checkout` - 890ms avg\n• `/api/recommendations` - 650ms avg"
                    }
                },
                {
                    "type": "actions",
                    "elements": [
                        {
                            "type": "button",
                            "text": {
                                "type": "plain_text",
                                "text": "View Charts"
                            },
                            "style": "primary",
                            "url": "https://grafana.company.com/performance-dashboard"
                        }
                    ]
                }
            ]
        };

        const securityTemplate = {
            "blocks": [
                {
                    "type": "header",
                    "text": {
                        "type": "plain_text",
                        "text": "🔒 Security Scan Results"
                    }
                },
                {
                    "type": "context",
                    "elements": [
                        {
                            "type": "mrkdwn",
                            "text": "OWASP ZAP Security Scan | Target: https://staging.company.com"
                        }
                    ]
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "*Vulnerability Summary:*"
                    }
                },
                {
                    "type": "section",
                    "fields": [
                        {
                            "type": "mrkdwn",
                            "text": "🔴 *High:* 0"
                        },
                        {
                            "type": "mrkdwn",
                            "text": "🟡 *Medium:* 2"
                        },
                        {
                            "type": "mrkdwn",
                            "text": "🟢 *Low:* 5"
                        },
                        {
                            "type": "mrkdwn",
                            "text": "ℹ️ *Info:* 12"
                        }
                    ]
                },
                {
                    "type": "divider"
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "*Medium Risk Issues:*"
                    }
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "• `Missing CSRF Protection` on `/api/user/update`\n• `Weak SSL/TLS Configuration` - TLS 1.1 detected"
                    }
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "*Recommendations:*\n• Implement CSRF tokens for all state-changing operations\n• Upgrade to TLS 1.2+ and disable weak ciphers\n• Add security headers (HSTS, CSP, X-Frame-Options)"
                    }
                },
                {
                    "type": "actions",
                    "elements": [
                        {
                            "type": "button",
                            "text": {
                                "type": "plain_text",
                                "text": "Full Security Report"
                            },
                            "style": "danger",
                            "url": "https://security.company.com/reports/latest"
                        }
                    ]
                }
            ]
        }

        const apiTemplate = {
            "blocks": [
                {
                    "type": "header",
                    "text": {
                        "type": "plain_text",
                        "text": "🔌 API Test Results"
                    }
                },
                {
                    "type": "section",
                    "fields": [
                        {
                            "type": "mrkdwn",
                            "text": "*Test Suite:*\nUser Management API"
                        },
                        {
                            "type": "mrkdwn",
                            "text": "*Environment:*\nStaging"
                        },
                        {
                            "type": "mrkdwn",
                            "text": "*Total Endpoints:*\n25"
                        },
                        {
                            "type": "mrkdwn",
                            "text": "*Success Rate:*\n100%"
                        }
                    ]
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "*Test Categories:*"
                    }
                },
                {
                    "type": "section",
                    "fields": [
                        {
                            "type": "mrkdwn",
                            "text": "✅ *Authentication:* 8/8"
                        },
                        {
                            "type": "mrkdwn",
                            "text": "✅ *CRUD Operations:* 12/12"
                        },
                        {
                            "type": "mrkdwn",
                            "text": "✅ *Input Validation:* 15/15"
                        },
                        {
                            "type": "mrkdwn",
                            "text": "✅ *Error Handling:* 10/10"
                        }
                    ]
                },
                {
                    "type": "divider"
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "*Response Time Analysis:*"
                    }
                },
                {
                    "type": "section",
                    "fields": [
                        {
                            "type": "mrkdwn",
                            "text": "🚀 *Fastest:* GET /users (45ms)"
                        },
                        {
                            "type": "mrkdwn",
                            "text": "🐌 *Slowest:* POST /users/bulk (890ms)"
                        }
                    ]
                },
                {
                    "type": "actions",
                    "elements": [
                        {
                            "type": "button",
                            "text": {
                                "type": "plain_text",
                                "text": "Postman Collection"
                            },
                            "url": "https://postman.com/collections/api-tests"
                        },
                        {
                            "type": "button",
                            "text": {
                                "type": "plain_text",
                                "text": "API Documentation"
                            },
                            "url": "https://docs.company.com/api"
                        }
                    ]
                }
            ]
        }

        const template = process.env.SLACK_TEMPLATE;
        let payload;
        switch (template) {
            case 'execution': {
                payload = executionTemplate;
                break;
            }
            case 'performance': {
                payload = performanceTemplate
                break;
            }
            case 'security': {
                payload = securityTemplate
                break;
            }
            case 'api': {
                payload = apiTemplate;
                break;
            }
            default: {
                payload = apiTemplate
                break;
            }
        }

        const slackUrl = process.env.SLACK_WEBHOOK_URL;
        if (!slackUrl) {
            console.log('Slack webhook URL not found. Skipping reporting.');
            return;
        }
        await sendToSlack(slackUrl, JSON.stringify(payload));
    }
}

async function sendToSlack(webhookUrl: string, bodyStr: string) {
    const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: bodyStr
    });
    if (!response.ok) {
        const errText = await response.text();
        console.error(`Slack webhook failed: ${response.status} - ${errText}`);
    }
}