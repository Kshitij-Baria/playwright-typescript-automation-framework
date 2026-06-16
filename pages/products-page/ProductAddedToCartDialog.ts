import { Locator, Page } from "@playwright/test";

export class ProductAddedToCartDialog {
    readonly dialog: Locator;
    readonly viewCartLink: Locator;
    readonly continueShoppingButton: Locator;

    constructor(private page: Page) {
        this.dialog = this.page.getByText('Added! Your product has been added to cart');
        this.viewCartLink = this.page.getByRole('link', { name: 'View Cart' });
        this.continueShoppingButton = this.page.getByRole('button', { name: 'Continue Shopping' });
    }

    async clickViewCartLink() {
        await this.viewCartLink.click();
        await this.page.waitForURL("**/view_cart");
    }

    async clickContinueShoppingButton() {
        await this.continueShoppingButton.click();
    }
}