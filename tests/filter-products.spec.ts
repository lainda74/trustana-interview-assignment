import { test, expect } from '@playwright/test';

test('should filter products by attribute', async ({ page }) => {
  // test data
  const ATTRIBUTE_LABEL = 'Batch';
  const ATTRIBUTE_VALUE = '_basicInfoBatch';

  await page.goto('/dashboard');

  await expect(page.locator('table > tbody')).toBeVisible({ timeout: 10000 });

  const filterTrigger = page.getByRole('button', { name: /Filter : All/i });
  await expect(filterTrigger).toBeVisible();
  await filterTrigger.click();

  const attributeOption = page.getByRole('menuitem', { name: ATTRIBUTE_LABEL });
  await expect(attributeOption).toBeVisible();

  await attributeOption.click();

  await expect(page.locator('tbody tr > td > div.animate-pulse').first()).toBeVisible();

  await expect(page.getByRole('button', { name: new RegExp(`Filter : ${ATTRIBUTE_LABEL}`, 'i') })).toBeVisible();

  await expect(page).toHaveURL(new RegExp(`.*[?&]attribute=${ATTRIBUTE_VALUE}`));

  await expect(page.locator('tbody tr > td > div.animate-pulse')).toHaveCount(0);

  const tableBodyRows = page.locator('table > tbody > tr');
  await expect(tableBodyRows).not.toHaveCount(0);
});
