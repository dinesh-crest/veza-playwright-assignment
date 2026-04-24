import { test, expect } from '../src/fixtures/pages.fixture';

const PRODUCT_NAME: string = 'Sauce Labs Backpack';

test.describe('Cart workflow', () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.goto();
    await inventoryPage.expectLoaded();
  });

  test('user can add a product on inventory and see it in the cart', async ({
    inventoryPage,
    cartPage,
  }) => {
    await inventoryPage.addProductToCart(PRODUCT_NAME);
    await inventoryPage.expectCartCount(1);

    await inventoryPage.openCart();

    await cartPage.expectLoaded();
    await cartPage.expectItemCount(1);
    await cartPage.expectProductVisible(PRODUCT_NAME);
    await cartPage.expectCheckoutEnabled();

    expect(new URL(cartPage.path, 'https://www.saucedemo.com').pathname).toBe('/cart.html');
  });
});
