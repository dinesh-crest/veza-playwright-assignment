import { Page } from '@playwright/test';

export abstract class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  abstract readonly path: string;

  async goto(): Promise<void> {
    await this.page.goto(this.path);
  }
}
