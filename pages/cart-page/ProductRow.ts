import { Locator } from "@playwright/test";

export class ProductRow {
    readonly productName: Locator;
    readonly productCategory: Locator;
    readonly productPrice: Locator;
    readonly productQuantity: Locator;
    readonly totalPrice: Locator;
    readonly deleteButton: Locator;
    
    constructor(private root: Locator) {
        this.productName = this.root.locator("td.cart_description h4");
        this.productCategory = this.root.locator("td.cart_description p");
        this.productPrice = this.root.getByText('Rs.').first();
        this.productQuantity = this.root.locator("td.cart_quantity button");
        this.totalPrice = this.root.getByText('Rs.').last();
        this.deleteButton = this.root.locator('.cart_quantity_delete');
    }

    async getProductName(): Promise<string> {
        return await this.productName.textContent() ?? "";
    }

    async getProductCategory(): Promise<string> {
        return await this.productCategory.textContent() ?? "";
    }

    async getProductPrice(): Promise<string> {
        return await this.productPrice.textContent() ?? "";
    }

    async getProductQuantity(): Promise<string> {
        return await this.productQuantity.textContent() ?? "";
    }

    async getTotalPrice(): Promise<string> {
        return await this.totalPrice.textContent() ?? "";
    }

    async clickDeleteButton() {
        return await this.deleteButton.click();
    }
}