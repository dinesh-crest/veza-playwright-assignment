import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

export interface PageFixtures {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
}

export const test = base.extend<PageFixtures>({
  loginPage: async ({ page }, use): Promise<void> => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use): Promise<void> => {
    await use(new InventoryPage(page));
  },
  cartPage: async ({ page }, use): Promise<void> => {
    await use(new CartPage(page));
  },
});

export const expect = test.expect;
