import { Locator, Page } from "@playwright/test";

export class ProductPage {
    readonly productName: Locator;
    readonly productCategory: Locator;
    readonly productPrice: Locator;
    readonly quantityInput: Locator;
    readonly addToCartButton: Locator;
    readonly productAvailability: Locator;
    readonly productCondition: Locator;
    readonly productBrand: Locator;
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly reviewTextarea: Locator;
    readonly submitButton: Locator;

    constructor(private page: Page) {
        this.productName = this.page.locator("div.product-details h2");
        this.productCategory = this.page.locator("div.product-details p").filter({ hasText: 'Category' });
        this.productPrice = this.page.getByText('Rs.');
        this.quantityInput = this.page.locator('#quantity');
        this.addToCartButton = this.page.getByRole('button', { name: 'Add to cart' });
        this.productAvailability = this.page.locator("//b[contains(text(), 'Availability')]/parent::p");
        this.productCondition = this.page.locator("//b[contains(text(), 'Condition')]/parent::p");
        this.productBrand = this.page.locator("//b[contains(text(), 'Brand')]/parent::p");
        this.nameInput = this.page.getByRole('textbox', { name: 'Your Name' });
        this.emailInput = this.page.getByRole('textbox', { name: 'Email Address', exact: true });
        this.reviewTextarea = this.page.getByRole('textbox', { name: 'Add Review Here!' });
        this.submitButton = this.page.getByRole('button', { name: 'Submit' });
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

    async enterQuantity(quantity: string) {
        return await this.quantityInput.fill(quantity);
    }

    async clickAddToCartButton() {
        await this.addToCartButton.click();
    }
}