import { Locator, Page } from "@playwright/test";
import { ProductRow } from "../cart-page/ProductRow";

export class CartPage {
    readonly proceedToCheckoutButton: Locator;
    readonly productByName: (name: string) => Locator;

    constructor(private page: Page) {
        this.proceedToCheckoutButton = this.page.getByText('Proceed To Checkout');
        this.productByName = (name: string) => this.page
            .locator('table tbody tr')
            .filter({ has: this.page.getByText(name) });
    }

    getProductByName(name: string): ProductRow {
        const root = this.productByName(name);
        return new ProductRow(root);
    }

    async getAllProducts(): Promise<ProductRow[]> {
        const elements = this.page.locator('table tbody tr');
        const count = await elements.count();

        const products: ProductRow[] = [];

        for (let i = 0; i < count; i++) {
            products.push(new ProductRow(elements.nth(i)));
        }

        return products;
    }

    async clickProceedToCheckoutButton() {
        await this.proceedToCheckoutButton.click();
    }
}