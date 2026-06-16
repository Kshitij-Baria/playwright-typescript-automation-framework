import { Locator, Page } from "@playwright/test";

export class PaymentPage {
    readonly nameInput: Locator;
    readonly cardNumberInput: Locator;
    readonly cvvInput: Locator;
    readonly monthInput: Locator;
    readonly yearInput: Locator;
    readonly payAndConfirmOrderButton: Locator;
    readonly orderPlacedMessage: Locator;
    readonly downloadInvoiceButton: Locator;
    readonly continueButton: Locator;

    constructor(private page: Page) {
        this.nameInput = this.page.locator('input[name="name_on_card"]');
        this.cardNumberInput = this.page.locator('input[name="card_number"]');
        this.cvvInput = this.page.getByRole('textbox', { name: 'ex.' });
        this.monthInput = this.page.getByRole('textbox', { name: 'MM' });
        this.yearInput = this.page.getByRole('textbox', { name: 'YYYY' });
        this.payAndConfirmOrderButton = this.page.getByRole('button', { name: 'Pay and Confirm Order' });
        this.orderPlacedMessage = this.page.getByText('Congratulations! Your order');
        this.downloadInvoiceButton = this.page.getByRole('link', { name: 'Download Invoice' });
        this.continueButton = this.page.getByRole('link', { name: 'Continue' });
    }

    async enterName(name: string) {
        await this.nameInput.fill(name);
    }

    async enterCardNumber(cardNumber: string) {
        await this.cardNumberInput.fill(cardNumber);
    }

    async enterCVV(cvv: string) {
        await this.cvvInput.fill(cvv);
    }

    async enterExpirationMonth(month: string) {
        await this.monthInput.fill(month);
    }

    async enterExpirationYear(year: string) {
        await this.yearInput.fill(year);
    }

    async clickPayAndConfirmOrder() {
        await this.payAndConfirmOrderButton.click();
    }

    async clickDownloadInvoiceButton() {
        await this.downloadInvoiceButton.click();
    }

    async clickContinueButton() {
        await this.continueButton.click();
    }
}