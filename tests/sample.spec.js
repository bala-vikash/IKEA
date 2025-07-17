import {test,expect} from '@playwright/test';

// Use specific Browser
// test.use({ browserName: 'chromium' }); 

test('Navigation test', async({page}) =>{
    // Navigate to URL
    await page.goto('https://www.ikea.com/in/en/', { waitUntil: 'domcontentloaded' });

    // Assertions 
    await expect(page).toHaveTitle(/IKEA/);
    await expect(page).toHaveURL('https://www.ikea.com/in/en/');
});


test('login test', async({page}) => {
    // Navigate to URL
    await page.goto('https://www.ikea.com/in/en/');

    // Using XPath with playwright locator
    const loginElement = page.locator('//span[contains(text(), "Hej! Log in")]');
    await loginElement.click();  

    const login = await page.getByRole('link', { name: 'Log in' });
    await login.click();


    await page.pause();
});