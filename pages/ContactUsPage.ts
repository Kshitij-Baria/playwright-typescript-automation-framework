import { Locator, Page } from "@playwright/test";

export class ContactUsPage {
    readonly getInTouchHeader: Locator;
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly subjectInput: Locator;
    readonly messageTextarea: Locator;
    readonly chooseFile: Locator;
    readonly submitButton: Locator;
    readonly successMessage: Locator;
    readonly homeButton: Locator;

    constructor(private page: Page) {
        this.getInTouchHeader = this.page.getByText("Get In Touch");
        this.nameInput = this.page.getByRole('textbox', { name: 'Name' });
        this.emailInput = this.page.getByRole('textbox', { name: 'Email', exact: true });
        this.subjectInput = this.page.getByRole('textbox', { name: 'Subject' });
        this.messageTextarea = this.page.getByRole('textbox', { name: 'Your Message Here' });
        this.chooseFile = this.page.locator("input[type='file']");
        this.submitButton = this.page.locator("input[name='submit']");
        this.successMessage = this.page.locator('#contact-page').getByText('Success! Your details have');
        this.homeButton = this.page.locator('#contact-page').locator("a.btn-success");
    }

    async enterName(name: string) {
        await this.nameInput.fill(name);
    }

    async enterEmail(email: string) {
        await this.emailInput.fill(email);
    }

    async enterSubject(subject: string) {
        await this.subjectInput.fill(subject);
    }

    async enterMessage(message: string) {
        await this.messageTextarea.fill(message);
    }

    async selectFile(file: string) {
        await this.chooseFile.setInputFiles(file);
    }

    async clickSubmitButton() {
        await this.submitButton.click();
    }

    async clickHomeButton() {
        await this.homeButton.click();
    }
}