const { test, expect } = require('@playwright/test');

test('dummy end to end flow', async ({ page }) => {
  const html = `
    <html><body>
      <form id="form">
        <input type="text" id="name" />
        <button id="submit">Submit</button>
      </form>
      <div id="result"></div>
      <script>
        document.getElementById('form').addEventListener('submit', e => {
          e.preventDefault();
          document.getElementById('result').textContent = document.getElementById('name').value;
        });
      </script>
    </body></html>`;
  await page.goto('data:text/html,' + encodeURIComponent(html));
  await page.fill('#name', 'Alice');
  await page.click('#submit');
  await expect(page.locator('#result')).toHaveText('Alice');
});
