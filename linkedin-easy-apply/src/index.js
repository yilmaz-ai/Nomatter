import { chromium } from 'playwright';

const profileDir = process.env.LINKEDIN_PROFILE_DIR || './.linkedin-profile';
const maxApplications = Number(process.env.MAX_APPLICATIONS || 1);

const browser = await chromium.launchPersistentContext(profileDir, {
  headless: false,
  viewport: { width: 1440, height: 1000 },
});

const page = browser.pages()[0] || await browser.newPage();
await page.goto('https://www.linkedin.com/jobs/', { waitUntil: 'domcontentloaded' });

console.log(`LinkedIn worker started. Max applications this run: ${maxApplications}`);
console.log('If login is required, sign in once in this browser profile.');

// MVP guardrails:
// - no CAPTCHA or verification bypass
// - no credential storage in source
// - no submit until form parsing/answer rules are implemented and validated
// - persistent browser profile is local/runtime-only

await page.waitForTimeout(60_000);
await browser.close();
