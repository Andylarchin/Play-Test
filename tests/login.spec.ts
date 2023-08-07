const { test, expect, chromium, FullConfig } = require('@playwright/test');

test('Succesful Log in', async (FullConfig) => {
  // (1) read the config
  const config = FullConfig;
  // const { storageState, headless } = config.projects[0].use;

  // (2) instantiate
  const browser = await chromium.launch();
  let context = await browser.newContext();
  const page = await context.newPage();
  console.log(
    `\x1b[2m\tSign in started against '${'https://admin-demo.nopcommerce.com/login?returnurl=%2Fadmin%2F'}'\x1b[0m`,
  );

  // (3) navigate to the login page
  await page.goto('https://admin-demo.nopcommerce.com/login?returnurl=%2Fadmin%2F');

  console.log(`\x1b[2m\tSign in as 'username'\x1b[0m`);

  // (4-5) fill in credentials and sign in
  await page.locator('input[name="Email"]').click();
  await page.locator('input[name="Email"]').press('Control+a');
  await page.locator('input[name="Email"]').fill('admin@yourstore.com');
  await page.locator('input[name="Password"]').click();
  await page.locator('input[name="Password"]').press('Control+a');
  await page.locator('input[name="Password"]').fill('admin');
  await page.locator('text=Log in').click();
  await expect(page).toHaveTitle(/admin/);
  console.log(`\x1b[2m\tSign in processed\x1b[0m`);
  await page.locator('#nopSideBarPusher i').click();
  await page.locator('text=Logout').click();
  // (6) persist the authentication state (local storage and cookies)
  // await page.context().storageState({ path: storageState as string });

  // // Save storage state into the file.
  // await context.storageState({ path: 'state.json' });

  // // Create a new context with the saved storage state.
  // context = await browser.newContext({ storageState: 'state.json' });
  // (7) close the browser
  await browser.close();
});


// To start the playwright test use : npx playwright test --headed