import { Locator } from "@playwright/test";

export class ProductCard {
    readonly productName: Locator;
    readonly productPrice: Locator;
    readonly addToCartButton: Locator;
    readonly viewProductButton: Locator;
    
    constructor(private root: Locator) {
        this.productPrice = this.root.locator("div.productinfo > h2");
        this.productName = this.root.locator("div.productinfo > p");
        this.addToCartButton = this.root.locator("a.add-to-cart");
        this.viewProductButton = this.root.getByRole('link', { name: 'View Product' }).first();
    }

    async getProductName(): Promise<string> {
        return await this.productName.textContent() ?? "";
    }

    async getProductPrice(): Promise<string> {
        return await this.productPrice.textContent() ?? "";
    }

    async clickAddToCartButton() {
        await this.addToCartButton.first().click();
    }

    async clickViewProductButton() {
        await this.viewProductButton.click();
    }
}