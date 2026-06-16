import { Locator, Page } from "@playwright/test";

export class CheckoutDialog {
    readonly dialog: Locator;
    readonly registerOrLoginLink: Locator;
    readonly continueOnCartButton: Locator;

    constructor(private page: Page) {
        this.dialog = this.page.getByText('Register / Login account to proceed on checkout.');
        this.registerOrLoginLink = this.page.getByRole('link', { name: 'Register / Login' });
        this.continueOnCartButton = this.page.getByRole('button', { name: 'Continue On Cart' });
    }

    async clickRegisterOrLoginLink() {
        await this.registerOrLoginLink.click();
        await this.page.waitForURL("**/login");
    }

    async clickContinueOnCartButton() {
        await this.continueOnCartButton.click();
    }
}