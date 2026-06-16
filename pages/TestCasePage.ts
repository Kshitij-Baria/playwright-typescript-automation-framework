import { Locator, Page } from "@playwright/test";

export class TestCasesPage {

    readonly testCaseHeader: Locator;

    constructor(private page: Page) {
        this.testCaseHeader = this.page.getByRole('heading', { name: 'Test Cases', exact: true });
    }

}