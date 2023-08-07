// const { test, expect } = require('@playwright/test');

// test('Login Test', async ({ page }) => {
//   await page.goto('https://admin-demo.nopcommerce.com/login?returnurl=%2Fadmin%2F');
//   await page.locator('input[name="Email"]').click();
//   await page.locator('input[name="Email"]').press('Control+a');
//   await page.locator('input[name="Email"]').fill('admin@yourstore.com');
//   await page.locator('input[name="Password"]').click();
//   await page.locator('input[name="Password"]').press('Control+a');
//   await page.locator('input[name="Password"]').fill('admin');
//   await page.locator('text=Log in').click();
//   await page.locator('#nopSideBarPusher i').click();
//   await page.locator('text=Logout').click();
//   await page.waitForURL('https://admin-demo.nopcommerce.com/login?returnurl=%2Fadmin%2F');
// });

// eslint-disable-next-line no-undef
const { chromium } = require('playwright');

async function runLoginTest() {
  // Launch the browser (You can change 'chromium' to 'firefox' or 'webkit' for other browsers)
  const browser = await chromium.launch();

  // Create a new browser context (page)
  const context = await browser.newContext();

  // Create a new page
  const page = await context.newPage();

  // Navigate to the login page of your website
  await page.goto('https://admin-demo.nopcommerce.com/login?returnurl=%2Fadmin%2F');

  // Fill in the login form with your credentials
  await page.fill('input[name="username"]', 'your_username');
  await page.fill('input[name="password"]', 'your_password');

  // Click the login button
  await page.click('button[type="submit"]');

  // Wait for the login to complete or detect a successful login state
  // For example, you can wait for a specific element on the dashboard page to appear.
  // Replace 'your_dashboard_element_selector' with an actual element selector on your dashboard.
  await page.waitForSelector('your_dashboard_element_selector', { timeout: 5000 });

  // Check if the login was successful
  const isLoggedIn = await page.isVisible('your_dashboard_element_selector');

  if (isLoggedIn) {
    console.log('Login test successful. User is logged in.');
  } else {
    console.error('Login test failed. User failed to log in.');
  }

  // Close the browser
  await browser.close();
}

runLoginTest();
