import { Locator, Page } from "@playwright/test";
import { ProductRow } from "./cart-page/ProductRow";

export class CheckoutPage {
    readonly totalAmount: Locator;
    readonly commentTextarea: Locator;
    readonly placeOrderButton: Locator;

    constructor (private page: Page) {
        this.totalAmount = this.page.locator("table tbody tr").last().getByText("Rs.");
        this.commentTextarea = this.page.locator('textarea[name="message"]');
        this.placeOrderButton = this.page.getByRole('link', { name: 'Place Order' })
    }

    getProductByName(name: string): ProductRow {
        const root = this.page
            .locator('table tbody tr')
            .filter({ has: this.page.getByText(name) });

        return new ProductRow(root);
    }

    async getAllProducts(): Promise<ProductRow[]> {
        const elements = this.page.locator('table tbody tr');
        const count = await elements.count();

        const products: ProductRow[] = [];

        for (let i = 0; i < count - 1; i++) {
            products.push(new ProductRow(elements.nth(i)));
        }

        return products;
    }

    async getTotalAmount(): Promise<string> {
        return await this.totalAmount.textContent() ?? "";
    }

    async enterComment(comment: string) {
        await this.commentTextarea.fill(comment);
    }

    async clickPlaceOrderButton() {
        await this.placeOrderButton.click();
        await this.page.waitForURL("**/payment");
    }
}