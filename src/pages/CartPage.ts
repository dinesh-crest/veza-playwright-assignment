import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly path: string = '/cart.html';

  private readonly title: Locator;
  private readonly cartItems: Locator;
  private readonly checkoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator('.title');
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/cart\.html$/);
    await expect(this.title).toHaveText('Your Cart');
  }

  async expectItemCount(count: number): Promise<void> {
    await expect(this.cartItems).toHaveCount(count);
  }

  async expectProductVisible(productName: string): Promise<void> {
    const row: Locator = this.cartItems.filter({ hasText: productName });
    await expect(row).toHaveCount(1);
    await expect(row.locator('.inventory_item_name')).toHaveText(productName);
  }

  async expectCheckoutEnabled(): Promise<void> {
    await expect(this.checkoutButton).toBeEnabled();
  }
}
