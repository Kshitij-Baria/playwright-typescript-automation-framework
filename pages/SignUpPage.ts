import { Locator, Page } from "@playwright/test";

export class SignUpPage {
    readonly enterAccountInformationHeader: Locator;
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly dayInput: Locator;
    readonly monthInput: Locator;
    readonly yearInput: Locator;
    readonly signUpForNewsLetterCheckbox: Locator;
    readonly receiveSpecialOffersCheckbox: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly companyInput: Locator;
    readonly address1Input: Locator;
    readonly address2Input: Locator;
    readonly countrySelect: Locator;
    readonly stateInput: Locator;
    readonly cityInput: Locator;
    readonly zipCodeInput: Locator;
    readonly mobileNumberInput: Locator;
    readonly createAccountButton: Locator;
    readonly signUpConfirmationMessage: Locator;
    readonly continueLink: Locator;

    constructor (private page: Page) {
        this.enterAccountInformationHeader = this.page.getByText('Enter Account Information');
        this.nameInput = this.page.getByRole('textbox', { name: 'Name *', exact: true });
        this.emailInput = this.page.getByRole('textbox', { name: 'Email *'});
        this.passwordInput = this.page.getByRole('textbox', { name: 'Password *' });
        this.dayInput = this.page.locator('#days');
        this.monthInput = this.page.locator('#months');
        this.yearInput = this.page.locator('#years');
        this.signUpForNewsLetterCheckbox = this.page.getByRole('checkbox', { name: 'Sign up for our newsletter!' });
        this.receiveSpecialOffersCheckbox = this.page.getByRole('checkbox', { name: 'Receive special offers from' });
        this.firstNameInput = this.page.getByRole('textbox', { name: 'First name *' });
        this.lastNameInput = this.page.getByRole('textbox', { name: 'Last name *' });
        this.companyInput = this.page.getByRole('textbox', { name: 'Company', exact: true });
        this.address1Input = this.page.getByRole('textbox', { name: 'Address * (Street address, P.' });
        this.address2Input = this.page.getByRole('textbox', { name: 'Address 2' });
        this.countrySelect = this.page.getByLabel('Country *');
        this.stateInput = this.page.getByRole('textbox', { name: 'State *' });
        this.cityInput = this.page.getByRole('textbox', { name: 'City * Zipcode *' });
        this.zipCodeInput = this.page.locator('#zipcode');
        this.mobileNumberInput = this.page.getByRole('textbox', { name: 'Mobile Number *' });
        this.createAccountButton = this.page.getByRole('button', { name: 'Create Account' });
        this.signUpConfirmationMessage = this.page.getByText("Congratulations! Your new account has been successfully created!");
        this.continueLink = this.page.getByRole("link", { name: "Continue" });
    }

    async selectTitle(title: "Mr." | "Mrs.") {
        await this.page.getByRole('radio', { name: title }).click();
    }

    async enterPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async selectDay(day: string) {
        await this.dayInput.selectOption({ label: day });
    }

    async selectMonth(month: string) {
        await this.monthInput.selectOption({ label: month });
    }

    async selectYear(year: string) {
        await this.yearInput.selectOption({ label: year });
    }

    async checkSignUpForNewsLetterCheckbox() {
        await this.signUpForNewsLetterCheckbox.check();
    }

    async uncheckSignUpForNewsLetterCheckbox() {
        await this.signUpForNewsLetterCheckbox.uncheck();
    }

    async checkReceiveSpecialOffersCheckbox() {
        await this.receiveSpecialOffersCheckbox.check();
    }

    async uncheckReceiveSpecialOffersCheckbox() {
        await this.receiveSpecialOffersCheckbox.uncheck();
    }

    async enterFirstName(firstName: string) {
        await this.firstNameInput.fill(firstName);
    }

    async enterLastName(lastName: string) {
        await this.lastNameInput.fill(lastName);
    }

    async enterCompany(company: string) {
        await this.companyInput.fill(company);
    }

    async enterAddress1(address1: string) {
        await this.address1Input.fill(address1);
    }

    async enterAddress2(address2: string) {
        await this.address2Input.fill(address2);
    }

    async selectCountry(country: string) {
        await this.countrySelect.selectOption({ label: country });
    }

    async enterState(state: string) {
        await this.stateInput.fill(state);
    }

    async enterCity(city: string) {
        await this.cityInput.fill(city);
    }

    async enterZipCode(zipCode: string) {
        await this.zipCodeInput.fill(zipCode);
    }

    async enterMobileNumber(mobileNumber: string) {
        await this.mobileNumberInput.fill(mobileNumber);
    }

    async clickCreateAccountButton() {
        await this.createAccountButton.click();
    }

    async fillSignUpForm(userData: SignUpUserDetails) {
        // enter password
        await this.enterPassword(userData.password);

        // check/uncheck sign up for news letter
        if (userData.signUpForNewsLetter) {
            await this.checkSignUpForNewsLetterCheckbox();
        } else {
            await this.uncheckSignUpForNewsLetterCheckbox();
        }

        // check/uncheck receive special offers
        if (userData.signUpForNewsLetter) {
            await this.checkReceiveSpecialOffersCheckbox();
        } else {
            await this.uncheckReceiveSpecialOffersCheckbox();
        }

        // enter date of birth
        await this.selectDay(userData.day);
        await this.selectMonth(userData.month);
        await this.selectYear(userData.year);

        // enter first name
        await this.enterFirstName(userData.firstName);

        // enter last name
        await this.enterLastName(userData.lastName);

        // enter company
        await this.enterCompany(userData.company);

        // enter address 1
        await this.enterAddress1(userData.address1);

        // enter address 2
        await this.enterAddress2(userData.address2);

        // select country
        await this.selectCountry(userData.country);

        // select state
        await this.enterState(userData.state);

        // enter zip code
        await this.enterZipCode(userData.zipCode);

        // enter mobile number
        await this.enterMobileNumber(userData.mobileNumber);
    }
}

export type SignUpUserDetails = {
    name?: string;
    email?: string;
    password: string;
    day: string;
    month: string;
    year: string;
    signUpForNewsLetter: boolean;
    receiveSpecialOffers: boolean;
    firstName: string;
    lastName: string;
    company: string;
    address1: string;
    address2: string;
    country: string;
    state: string;
    city: string;
    zipCode: string;
    mobileNumber: string;
}