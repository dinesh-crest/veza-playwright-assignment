import { test as setup, expect } from '../src/fixtures/pages.fixture';
import path from 'path';
import { env } from '../src/config/env';

export const STORAGE_STATE: string = path.resolve(
  __dirname,
  '..',
  'playwright',
  '.auth',
  'user.json',
);

setup('authenticate as standard user', async ({ page, loginPage, inventoryPage }) => {

  await loginPage.goto();
  await loginPage.login(env.standardUser.username, env.standardUser.password);
  await inventoryPage.expectLoaded();

  await page.context().storageState({ path: STORAGE_STATE });
  expect(STORAGE_STATE).toContain('user.json');
});
