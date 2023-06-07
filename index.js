const puppeteer = require("puppeteer");

const entry = "https://app.triplewhale.com/signin";
const forceShop =
  "https://app.triplewhale.com/summary?shop-id=my-obvi.myshopify.com";
const destination =
  "https://app.triplewhale.com/willy/sOPMfwMa3yytlFrxEPAi?shop-id=my-obvi.myshopify.com";

const username = "michael@triplewhale.com";
const usernameInput = "#login-email-input";

const password = "TestPassword1";
const passwordInput = "#login-password-input";

const loginButton = ".signup-page-footer button";

const elementToScreenshot = ".willy-dashboard-wrapper";

(async () => {
  // Create a browser instance
  const browser = await puppeteer.launch({
    headless: false,
  });

  // Create a new page
  const page = await browser.newPage();

  // Set viewport width and height
  await page.setViewport({ width: 1280, height: 720 });

  // Open URL in current page
  await page.goto(entry);

  // wait for input to appear in page
  await page.$(usernameInput);

  // login
  await page.type(usernameInput, username);
  await page.type(passwordInput, password);
  await page.click(loginButton);

  // wait
  await page.waitForTimeout(3000);

  // go to force shop
  await page.goto(forceShop);

  // wait
  await page.waitForTimeout(3000);

  // go to willy dashboard
  await page.goto(destination);

  // wait
  await page.waitForTimeout(10000);

  // Wait for the selector to appear in page
  const element = await page.$(elementToScreenshot);

  // Capture screenshot
  await element.screenshot({
    path: `images/willy_${Math.random().toString().replace(".", "")}.jpg`,
  });

  // Close the browser instance
  await browser.close();
})();
