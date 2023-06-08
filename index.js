import puppeteer from "puppeteer";
import chalk from "chalk";

const entry = "https://app.triplewhale.com/signin";
const shopId = "my-obvi.myshopify.com";
const forceShop = `https://app.triplewhale.com/summary?shop-id=${shopId}`;
const dashboardId = "M1lpTSEUm8A3ienL7VJJ";
const destination = `https://app.triplewhale.com/willy/${dashboardId}?shop-id=${shopId}`;

const username = "michael@triplewhale.com";
const usernameInput = "#login-email-input";

const password = "TestPassword1";
const passwordInput = "#login-password-input";

const loginButton = ".signup-page-footer button";

const elementToScreenshot = ".willy-dashboard-wrapper";

const log = console.log;

(async () => {
  // Create a browser instance
  const browser = await puppeteer.launch({
    headless: "new",
  });

  // Create a new page
  const page = await browser.newPage();

  // Set viewport width and height
  // await page.setViewport({
  // width: 1280,
  // height: 720
  // });

  // Open URL in current page
  await page.goto(entry);

  // wait for input to appear in page
  await page.$(usernameInput);

  // login
  await page.type(usernameInput, username);
  await page.type(passwordInput, password);
  await page.click(loginButton);
  log(chalk.green(`logged in as ${username}`));

  // wait
  await page.waitForTimeout(3000);

  // go to force shop
  await page.goto(forceShop);
  log(chalk.yellow(`force shop: ${shopId}`));

  // wait
  await page.waitForTimeout(3000);

  // go to willy dashboard
  await page.goto(destination);
  log(chalk.blue(`on willy dashboard: ${dashboardId}`));

  // wait
  await page.waitForTimeout(10000);

  // Wait for the selector to appear in page
  const element = await page.$(elementToScreenshot);

  // Capture screenshot
  log(chalk.cyan("taking screenshot"));
  const screenshotFileName = `willy_${Math.random()
    .toString()
    .replace(".", "")}`;
  await element.screenshot({
    path: `images/${screenshotFileName}.jpg`,
  });
  log(chalk.magenta(`screenshot saved: ${screenshotFileName}`));

  // Close the browser instance
  await browser.close();
})();
