import { Locator, Page } from "@playwright/test";

export class OrderPlacedPage {
    readonly orderPlacedMessage: Locator;
    readonly downloadInvoiceLink: Locator;
    readonly continueLink: Locator;

    constructor(private page: Page) {
        this.orderPlacedMessage = this.page.getByText('Congratulations! Your order');
        this.downloadInvoiceLink = this.page.getByRole('link', { name: 'Download Invoice' });
        this.continueLink = this.page.getByRole('link', { name: 'Continue' });
    }
}