import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  readonly path: string = '/inventory.html';

  private readonly title: Locator;
  private readonly cartLink: Locator;
  private readonly cartBadge: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.getByTestId('title');
    this.cartLink = page.getByTestId('shopping-cart-link');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/inventory\.html$/);
    await expect(this.title).toHaveText('Products');
  }

  private itemCard(productName: string): Locator {
    return this.page.locator('.inventory_item', { hasText: productName });
  }

  async addProductToCart(productName: string): Promise<void> {
    const card: Locator = this.itemCard(productName);
    await card.getByRole('button', { name: 'Add to cart' }).click();
    await expect(card.getByRole('button', { name: 'Remove' })).toBeVisible();
  }

  async expectCartCount(count: number): Promise<void> {
    await expect(this.cartBadge).toHaveText(String(count));
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }
}
