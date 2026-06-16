import { Locator, Page } from "@playwright/test";

export class LoginPage {
    readonly loginToYourAccountHeader: Locator;
    readonly loginEmailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly invalidEmailOrPasswordError: Locator;
    readonly newUserSignUpHeader: Locator;
    readonly nameInput: Locator;
    readonly signUpEmailInput: Locator;
    readonly signUpButton: Locator;
    readonly emailAlreadyExistsError: Locator;

    constructor(private page: Page) {
        this.loginToYourAccountHeader = this.page.getByText("Login to your account");
        this.loginEmailInput = this.page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address');
        this.passwordInput = this.page.getByRole('textbox', { name: 'Password' });
        this.loginButton = this.page.getByRole('button', { name: 'Login' });
        this.invalidEmailOrPasswordError = this.page.getByText("Your email or password is incorrect!");
        this.newUserSignUpHeader = this.page.getByText("New User Signup!");
        this.nameInput = this.page.getByRole('textbox', { name: 'Name' });
        this.signUpEmailInput = this.page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address');
        this.signUpButton = this.page.getByRole('button', { name: 'Signup' });
        this.emailAlreadyExistsError = this.page.getByText("Email Address already exist!");
    }

    async enterLoginEmail(email: string) {
        await this.loginEmailInput.fill(email);
    }

    async enterPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async enterName(name: string) {
        await this.nameInput.fill(name);
    }

    async enterSignUpEmail(email: string) {
        await this.signUpEmailInput.fill(email);
    }

    async clickSignUpButton() {
        await this.signUpButton.click();
    }
}