import { Locator, Page } from "@playwright/test";

export class Footer {
    readonly subscriptionHeader: Locator;
    readonly subscriptionEmailInput: Locator;
    readonly subscribeButton: Locator;
    readonly subscriptionSuccessMessage: Locator;

    constructor(private page: Page) {
        this.subscriptionHeader = this.page.getByText("Subscription");
        this.subscriptionEmailInput = this.page.locator("input#susbscribe_email");
        this.subscribeButton = this.page.locator("button#subscribe");
        this.subscriptionSuccessMessage = this.page.getByText("You have been successfully subscribed!");
    }

    async enterSubscriptionEmail(email: string) {
        await this.subscriptionEmailInput.fill(email);
    }

    async clickSubscribeButton() {
        await this.subscribeButton.click();
    }
}