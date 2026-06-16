import { Locator, Page } from "@playwright/test";

export class Navbar {
    readonly logo: Locator;
    readonly homeLink: Locator;
    readonly productsLink: Locator;
    readonly cartLink: Locator;
    readonly logoutLink: Locator;
    readonly deleteAccountLink: Locator;
    readonly signUpOrLoginLink: Locator;
    readonly testCaseLink: Locator;
    readonly contactUsLink: Locator;
    readonly loggedInAsUser: Locator;
    readonly continueLink: Locator;

    constructor(private page: Page) {
        this.logo = this.page.getByRole('link', { name: 'Website for automation' });
        this.homeLink = this.page.getByRole("link", { name: "Home" });
        this.productsLink = this.page.getByRole("link", { name: "Products" });
        this.cartLink = this.page.getByRole("link", { name: "Cart" });
        this.logoutLink = this.page.getByRole("link", { name: "Logout" });
        this.deleteAccountLink = this.page.getByRole("link", { name: "Delete Account" });
        this.signUpOrLoginLink = this.page.getByRole("link", { name: "Signup / Login" });
        this.testCaseLink = this.page.locator("ul.navbar-nav a[href='/test_cases']");
        this.contactUsLink = this.page.getByRole("link", { name: "Contact us" });
        this.loggedInAsUser = this.page.getByText('Logged in as');
        this.continueLink = this.page.getByRole("link", { name: "Continue" });
    }

    async clickLogo() {
        await this.logo.click();
    }

    async clickHomeLink() {
        await this.homeLink.click();
    }

    async clickProductsLink() {
        await this.productsLink.click();
        await this.page.waitForURL("**/products");
    }

    async clickCartLink() {
        await this.cartLink.click();
        await this.page.waitForURL("**/view_cart");
    }

    async clickLogoutLink() {
        await this.logoutLink.click();
    }

    async clickDeleteAccountLink() {
        await this.deleteAccountLink.click();
    }

    async clickSignUpOrLoginLink() {
        await this.signUpOrLoginLink.click();
        await this.page.waitForURL("**/login");
    }

    async clickTestCasesLink() {
        await this.testCaseLink.click();
        await this.page.waitForURL("**/test_cases");
    }

    async clickContactUsLink() {
        await this.contactUsLink.click();
        await this.page.waitForURL("**/contact_us");
    }

    async getLoggedInUser(): Promise<string> {
        const textContent = await this.loggedInAsUser.textContent() ?? "";
        return textContent.replaceAll("Logged in as ", "").trim();
    }
}