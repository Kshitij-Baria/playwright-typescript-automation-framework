import { expect, test } from "@playwright/test";
import { ProductsPage } from "../pages/products-page/ProductsPage";
import { LoginPage } from "../pages/LoginPage";
import { Navbar } from "../pages/Navbar";
import { SignUpPage } from "../pages/SignUpPage";
import { UserAPI, UserData } from "../api/UserAPI";
import { ContactUsPage } from "../pages/ContactUsPage";
import { TestCasesPage } from "../pages/TestCasePage";
import { ProductCard } from "../pages/products-page/ProductCard";
import { ProductPage } from "../pages/products-page/ProductPage";
import { Footer } from "../pages/Footer";
import { ProductAddedToCartDialog } from "../pages/products-page/ProductAddedToCartDialog";
import { CartPage } from "../pages/cart-page/CartPage";
import { ProductRow } from "../pages/cart-page/ProductRow";
import { CheckoutDialog } from "../pages/cart-page/CheckoutDialog";
import { CheckoutPage } from "../pages/CheckoutPage";
import { PaymentPage } from "../pages/PaymentPage";

test("Test Case 1: Register User", async ({ page }) => {
    // navigate to URL
    await page.goto("https://automationexercise.com/");

    // check visibility of products
    const productsPage: ProductsPage = new ProductsPage(page);
    expect((await productsPage.getAllProducts()).length).toBeGreaterThan(0);

    // click sign up / login link
    const navbar: Navbar = new Navbar(page);
    await navbar.clickSignUpOrLoginLink();

    // check visibility of New User Sign Up header
    const loginPage: LoginPage = new LoginPage(page);
    await expect(loginPage.newUserSignUpHeader).toBeVisible();

    // enter name
    await loginPage.enterName("testUser");

    // enter email
    await loginPage.enterSignUpEmail(`test.user.${Math.floor(Math.random() * 100)}@gmail.com`);

    // click sign up button
    await loginPage.clickSignUpButton();

    // check visibility of Enter Account Information header
    const signUpPage: SignUpPage = new SignUpPage(page);
    await expect(signUpPage.enterAccountInformationHeader).toBeVisible();

    // select title
    await signUpPage.selectTitle("Mr.");

    // enter password
    await signUpPage.enterPassword("password");

    // enter date of birth
    await signUpPage.selectDay("1");
    await signUpPage.selectMonth("January");
    await signUpPage.selectYear("2000");

    // check sign up for news letter checkbox
    await signUpPage.checkSignUpForNewsLetterCheckbox();

    // check receive special offers checkbox
    await signUpPage.checkReceiveSpecialOffersCheckbox();

    // enter first name
    await signUpPage.enterFirstName("test");

    // enter last name
    await signUpPage.enterLastName("user");

    // enter company
    await signUpPage.enterCompany("company");

    // enter address 1
    await signUpPage.enterAddress1("address 1");

    // enter address 2
    await signUpPage.enterAddress2("address 2");

    // select country
    await signUpPage.selectCountry("India");

    // enter state
    await signUpPage.enterState("state");

    // enter city
    await signUpPage.enterCity("city");

    // enter zip code
    await signUpPage.enterZipCode("000000");

    // enter mobile number
    await signUpPage.enterMobileNumber("0123456789");

    // click create account button
    await signUpPage.clickCreateAccountButton();

    // check visibility of Account Created message
    await expect(signUpPage.signUpConfirmationMessage).toBeVisible();

    // click continue link
    await signUpPage.continueLink.click();

    // click delete account link
    await navbar.clickDeleteAccountLink();

    // check visibility of Account Deleted message
    await expect(page.getByText("Account Deleted!")).toBeVisible();

    // click continue link
    await signUpPage.continueLink.click();
});

test("Test Case 2: Login User with correct email and password", async ({ page, request }) => {
    // create a user
    const name = "testUser";
    const email = `test.user.${Math.floor(Math.random() * 100)}@gmail.com`;
    const password = "password"
    const userData: UserData = {
        "name": name,
        "email": email,
        "password": password,
        "title": "Mr.",
        "birth_date": "1",
        "birth_month": "January",
        "birth_year": "2000",
        "firstname": "test",
        "lastname": "user",
        "company": "company",
        "address1": "address 1",
        "address2": "address 2",
        "country": "India",
        "zipcode": "000000",
        "state": "state",
        "city": "city",
        "mobile_number": "0123456789",
    };
    const authenticationAPI: UserAPI = new UserAPI(request);
    let response = await authenticationAPI.createAccount(userData);

    // check response status
    await expect(response.ok()).toBeTruthy();

    // navigate to URL
    await page.goto("https://automationexercise.com/");

    // check visibility of products
    const productsPage: ProductsPage = new ProductsPage(page);
    expect((await productsPage.getAllProducts()).length).toBeGreaterThan(0);

    // click sign up / login link
    const navbar: Navbar = new Navbar(page);
    await navbar.clickSignUpOrLoginLink();

    // check visibility of Login to your account header
    const loginPage: LoginPage = new LoginPage(page);
    await expect(loginPage.loginToYourAccountHeader).toBeVisible();

    // enter email
    await loginPage.enterLoginEmail(email);

    // enter password
    await loginPage.enterPassword(password);

    // click login button
    await loginPage.clickLoginButton();

    // verify logged in user
    expect(await navbar.getLoggedInUser()).toBe(name);

    // click delete account link
    await navbar.clickDeleteAccountLink();

    // check visibility of Account Deleted message
    await expect(page.getByText("Account Deleted!")).toBeVisible();

    // click continue link
    await navbar.continueLink.click();
});

test("Test Case 3: Login User with incorrect email and password", async ({ page }) => {
    const email = `test.user.${Math.floor(Math.random() * 100)}@gmail.com`;
    const password = "password"

    // navigate to URL
    await page.goto("https://automationexercise.com/");

    // check visibility of products
    const productsPage: ProductsPage = new ProductsPage(page);
    expect((await productsPage.getAllProducts()).length).toBeGreaterThan(0);

    // click sign up / login link
    const navbar: Navbar = new Navbar(page);
    await navbar.clickSignUpOrLoginLink();

    // check visibility of Login to your account header
    const loginPage: LoginPage = new LoginPage(page);
    await expect(loginPage.loginToYourAccountHeader).toBeVisible();

    // enter email
    await loginPage.enterLoginEmail(email);

    // enter password
    await loginPage.enterPassword(password);

    // click login button
    await loginPage.clickLoginButton();

    // check visibility of Your email or password is incorrect! message
    await expect(loginPage.invalidEmailOrPasswordError).toBeVisible();
});

test("Test Case 4: Logout User", async ({ page }) => {
    const email = process.env.APPLICATION_EMAIL!;
    const password = process.env.APPLICATION_PASSWORD!;
    const name = process.env.APPLICATION_USER_NAME!;

    // navigate to URL
    await page.goto("https://automationexercise.com/");

    // check visibility of products
    const productsPage: ProductsPage = new ProductsPage(page);
    expect((await productsPage.getAllProducts()).length).toBeGreaterThan(0);

    // click sign up / login link
    const navbar: Navbar = new Navbar(page);
    await navbar.clickSignUpOrLoginLink();

    // check visibility of Login to your account header
    const loginPage: LoginPage = new LoginPage(page);
    await expect(loginPage.loginToYourAccountHeader).toBeVisible();

    // enter email
    await loginPage.enterLoginEmail(email);

    // enter password
    await loginPage.enterPassword(password);

    // click login button
    await loginPage.clickLoginButton();

    // verify logged in user
    expect(await navbar.getLoggedInUser()).toBe(name);

    // click logout link
    await navbar.clickLogoutLink();

    // check visibility of Login to your account header
    await expect(loginPage.loginToYourAccountHeader).toBeVisible();
});

test("Test Case 5: Register User with existing email", async ({ page }) => {
    const name = "testUser";
    const email = "test.user.01@example.com";

    // navigate to URL
    await page.goto("https://automationexercise.com/");

    // check visibility of products
    const productsPage: ProductsPage = new ProductsPage(page);
    expect((await productsPage.getAllProducts()).length).toBeGreaterThan(0);

    // click sign up / login link
    const navbar: Navbar = new Navbar(page);
    await navbar.clickSignUpOrLoginLink();

    // check visibility of New User Sign Up header
    const loginPage: LoginPage = new LoginPage(page);
    await expect(loginPage.newUserSignUpHeader).toBeVisible();

    // enter name
    await loginPage.enterName(name);

    // enter email
    await loginPage.enterSignUpEmail(email);

    // click sign up button
    await loginPage.clickSignUpButton();

    // check visibility of Email Address already exist! error
    await expect(loginPage.emailAlreadyExistsError).toBeVisible();
});

test("Test Case 6: Contact Us Form", async ({ page }) => {
    const name = "testUser";
    const email = "test.user.01@example.com";
    const subject = "subject";
    const message = "message";
    const file = "./test-data/test.txt";

    // navigate to URL
    await page.goto("https://automationexercise.com/");

    // check visibility of products
    const productsPage: ProductsPage = new ProductsPage(page);
    expect((await productsPage.getAllProducts()).length).toBeGreaterThan(0);

    // click contact us link
    const navbar: Navbar = new Navbar(page);
    await navbar.clickContactUsLink();

    // check visibility of Get In Touch header
    const contactUsPage: ContactUsPage = new ContactUsPage(page);
    await expect(contactUsPage.getInTouchHeader).toBeVisible();

    // enter name
    await contactUsPage.enterName(name);

    // enter email
    await contactUsPage.enterEmail(email);

    // enter subject
    await contactUsPage.enterSubject(subject);

    // enter message
    await contactUsPage.enterMessage(message);

    // select file
    await contactUsPage.selectFile(file);

    page.once('dialog', async dialog => {
        await dialog.accept();
    });

    // click submit button
    await contactUsPage.clickSubmitButton();

    // check visibility of success message
    await expect(contactUsPage.successMessage).toBeVisible();

    // click home button
    await contactUsPage.clickHomeButton();
});

test("Test Case 7: Verify Test Cases Page", async ({ page }) => {
    // navigate to URL
    await page.goto("https://automationexercise.com/");

    // check visibility of products
    const productsPage: ProductsPage = new ProductsPage(page);
    expect((await productsPage.getAllProducts()).length).toBeGreaterThan(0);

    // click test cases link
    const navbar: Navbar = new Navbar(page);
    await navbar.clickTestCasesLink();

    // check visibility of Test Cases header
    const testCasePage: TestCasesPage = new TestCasesPage(page);
    await expect(testCasePage.testCaseHeader).toBeVisible();
});

test("Test Case 8: Verify All Products and product detail page", async ({ page }) => {
    // navigate to URL
    await page.goto("https://automationexercise.com/");

    // check visibility of products
    const productsPage: ProductsPage = new ProductsPage(page);
    expect((await productsPage.getAllProducts()).length).toBeGreaterThan(0);

    // click products link
    const navbar: Navbar = new Navbar(page);
    await navbar.clickProductsLink();

    // check visibility of All Products header
    await expect(productsPage.allProductsHeader).toBeVisible();

    // check visibility of products
    expect((await productsPage.getAllProducts()).length).toBeGreaterThan(0);

    // click view product link for first product
    const firstProductCard: ProductCard = (await productsPage.getAllProducts())[0];
    await firstProductCard.clickViewProductButton();
    await page.waitForURL(/\/product_details\//);

    // check visibility of product details
    const productPage: ProductPage = new ProductPage(page);
    await expect(productPage.productName).toBeVisible();
    await expect(productPage.productCategory).toBeVisible();
    await expect(productPage.productPrice).toBeVisible();
    await expect(productPage.addToCartButton).toBeVisible();
    await expect(productPage.productAvailability).toBeVisible();
    await expect(productPage.productCondition).toBeVisible();
    await expect(productPage.productBrand).toBeVisible();
});

test("Test Case 9: Search Product", async ({ page }) => {
    const searchKey = "Jeans";

    // navigate to URL
    await page.goto("https://automationexercise.com/");

    // check visibility of products
    const productsPage: ProductsPage = new ProductsPage(page);
    expect((await productsPage.getAllProducts()).length).toBeGreaterThan(0);

    // click products link
    const navbar: Navbar = new Navbar(page);
    await navbar.clickProductsLink();

    // check visibility of All Products header
    await expect(productsPage.allProductsHeader).toBeVisible();

    // check visibility of products
    expect((await productsPage.getAllProducts()).length).toBeGreaterThan(0);

    // enter search key
    await productsPage.enterSearch(searchKey);
    
    // click search button
    await productsPage.clickSearchSubmitButton();
    await page.waitForURL(`**/products?search=${searchKey}`);

    // check if Searched Products header is visible
    await expect(productsPage.searchedProductsHeader).toBeVisible();

    // check products
    const products: ProductCard[] = await productsPage.getAllProducts();
    for (const product of products) {
        expect(await product.getProductName()).toContain(searchKey);
    }
});

test("Test Case 10: Verify Subscription in home page", async ({ page }) => {
    const email = "test.user.01@example.com";

    // navigate to URL
    await page.goto("https://automationexercise.com/");

    // check visibility of products
    const productsPage: ProductsPage = new ProductsPage(page);
    expect((await productsPage.getAllProducts()).length).toBeGreaterThan(0);

    // check visibility of Subscription header
    const footer: Footer = new Footer(page);
    await expect(footer.subscriptionHeader).toBeVisible();

    // enter subscription email
    await footer.enterSubscriptionEmail(email);

    // click subscribe button
    await footer.clickSubscribeButton();

    // check visibility of subscription successful message
    await expect(footer.subscriptionSuccessMessage).toBeVisible();
});

test("Test Case 11: Verify Subscription in Cart page", async ({ page }) => {
    const email = "test.user.01@example.com";

    // navigate to URL
    await page.goto("https://automationexercise.com/");

    // check visibility of products
    const productsPage: ProductsPage = new ProductsPage(page);
    expect((await productsPage.getAllProducts()).length).toBeGreaterThan(0);

    // click cart link
    const navbar: Navbar = new Navbar(page);
    await navbar.clickCartLink();

    // check visibility of Subscription header
    const footer: Footer = new Footer(page);
    await expect(footer.subscriptionHeader).toBeVisible();

    // enter subscription email
    await footer.enterSubscriptionEmail(email);

    // click subscribe button
    await footer.clickSubscribeButton();

    // check visibility of subscription successful message
    await expect(footer.subscriptionSuccessMessage).toBeVisible();
});

test("Test Case 12: Add Products in Cart", async ({ page }) => {
    // navigate to URL
    await page.goto("https://automationexercise.com/");

    // click products link
    const navbar: Navbar = new Navbar(page);
    await navbar.clickProductsLink();

    // check visibility of All Products header
    const productsPage: ProductsPage = new ProductsPage(page);
    await expect(productsPage.allProductsHeader).toBeVisible();

    // check visibility of products
    expect((await productsPage.getAllProducts()).length).toBeGreaterThan(0);

    // get first and second product
    const firstProduct: ProductCard = (await productsPage.getAllProducts())[0];
    const secondProduct: ProductCard = (await productsPage.getAllProducts())[1];

    // note down name and size of both products
    const expectedProductDetails: { name: string; price: string }[] = [
        {
            name: await firstProduct.getProductName(),
            price: await firstProduct.getProductPrice()
        },
        {
            name: await secondProduct.getProductName(),
            price: await secondProduct.getProductPrice()
        }
    ];

    // click add to cart on first product
    await firstProduct.clickAddToCartButton();

    // click continue shopping button
    const productAddedToCartDialog: ProductAddedToCartDialog = new ProductAddedToCartDialog(page);
    await productAddedToCartDialog.clickContinueShoppingButton();

    // click add to cart on second product
    await secondProduct.clickAddToCartButton();
    
    // click view cart link
    await productAddedToCartDialog.clickViewCartLink();

    // check if both products are visible in cart
    const cartPage: CartPage = new CartPage(page);
    for (const expectedProduct of expectedProductDetails) {
        const actualProduct: ProductRow = cartPage.getProductByName(expectedProduct.name);

        const actualProductName = await actualProduct.getProductName();
        const actualProductPrice = await actualProduct.getProductPrice();
        const actualProductQuantity = await actualProduct.getProductQuantity();
        const actualProductTotalPrice = await actualProduct.getTotalPrice();

        expect(actualProductName).toBe(expectedProduct.name);
        expect(actualProductPrice).toBe(expectedProduct.price);
        expect(actualProductQuantity).toBe("1");
        expect(actualProductTotalPrice).toBe(actualProductPrice);
    }
});

test("Test Case 13: Verify Product quantity in Cart", async ({ page }) => {
    // navigate to URL
    await page.goto("https://automationexercise.com/");

    // click products link
    const navbar: Navbar = new Navbar(page);
    await navbar.clickProductsLink();

    // check visibility of All Products header
    const productsPage: ProductsPage = new ProductsPage(page);
    await expect(productsPage.allProductsHeader).toBeVisible();

    // check visibility of products
    expect((await productsPage.getAllProducts()).length).toBeGreaterThan(0);

    // click view product button
    const firstProduct: ProductCard = (await productsPage.getAllProducts())[0];
    await firstProduct.clickViewProductButton();

    // note down product name and price
    const productPage: ProductPage = new ProductPage(page);
    const expectedProductName = await productPage.getProductName();
    const expectedProductPrice = await productPage.getProductPrice();

    // enter quantity
    await productPage.enterQuantity("4");

    // click add to cart button
    await productPage.clickAddToCartButton();
    
    // click view cart link
    const productAddedToCartDialog: ProductAddedToCartDialog = new ProductAddedToCartDialog(page);
    await productAddedToCartDialog.clickViewCartLink();

    // check if expected product is added
    const cartPage: CartPage = new CartPage(page);
    const actualProduct: ProductRow = await cartPage.getProductByName(expectedProductName); 

    const actualProductName = await actualProduct.getProductName();
    const actualProductQuantity = await actualProduct.getProductQuantity();

    // check product name
    expect(actualProductName).toBe(expectedProductName);

    // check product quantity
    expect(actualProductQuantity).toBe("4");
});

test("Test Case 14: Place Order: Register while Checkout", async ({ page }) => {
    // navigate to URL
    await page.goto("https://automationexercise.com/");

    // click products link
    const navbar: Navbar = new Navbar(page);
    await navbar.clickProductsLink();

    // check visibility of products
    const productsPage: ProductsPage = new ProductsPage(page);
    expect((await productsPage.getAllProducts()).length).toBeGreaterThan(0);

    // click add to cart on first product
    const firstProduct: ProductCard = (await productsPage.getAllProducts())[0];
    const expectedProductName = await firstProduct.getProductName();
    await firstProduct.clickAddToCartButton();
    
    // click view cart link
    const productAddedToCartDialog: ProductAddedToCartDialog = new ProductAddedToCartDialog(page);
    await productAddedToCartDialog.clickViewCartLink();

    // check if expected product is added
    const cartPage: CartPage = new CartPage(page);
    const actualProduct: ProductRow = await cartPage.getProductByName(expectedProductName);
    await expect(actualProduct).toBeTruthy();
    
    // click proceed to checkout button
    await cartPage.clickProceedToCheckoutButton();

    // click register or login link
    const checkoutDialog: CheckoutDialog = new CheckoutDialog(page);
    await checkoutDialog.clickRegisterOrLoginLink();

    // check visibility of New User Sign Up header
    const loginPage: LoginPage = new LoginPage(page);
    await expect(loginPage.newUserSignUpHeader).toBeVisible();

    // enter name
    await loginPage.enterName("testUser");

    // enter email
    await loginPage.enterSignUpEmail(`test.user.${Math.floor(Math.random() * 100)}@gmail.com`);

    // click sign up button
    await loginPage.clickSignUpButton();

    // check visibility of Enter Account Information header
    const signUpPage: SignUpPage = new SignUpPage(page);
    await expect(signUpPage.enterAccountInformationHeader).toBeVisible();

    // select title
    await signUpPage.selectTitle("Mr.");

    // enter password
    await signUpPage.enterPassword("password");

    // enter date of birth
    await signUpPage.selectDay("1");
    await signUpPage.selectMonth("January");
    await signUpPage.selectYear("2000");

    // check sign up for news letter checkbox
    await signUpPage.checkSignUpForNewsLetterCheckbox();

    // check receive special offers checkbox
    await signUpPage.checkReceiveSpecialOffersCheckbox();

    // enter first name
    await signUpPage.enterFirstName("test");

    // enter last name
    await signUpPage.enterLastName("user");

    // enter company
    await signUpPage.enterCompany("company");

    // enter address 1
    await signUpPage.enterAddress1("address 1");

    // enter address 2
    await signUpPage.enterAddress2("address 2");

    // select country
    await signUpPage.selectCountry("India");

    // enter state
    await signUpPage.enterState("state");

    // enter city
    await signUpPage.enterCity("city");

    // enter zip code
    await signUpPage.enterZipCode("000000");

    // enter mobile number
    await signUpPage.enterMobileNumber("0123456789");

    // click create account button
    await signUpPage.clickCreateAccountButton();

    // check visibility of Account Created message
    await expect(signUpPage.signUpConfirmationMessage).toBeVisible();

    // click continue link
    await signUpPage.continueLink.click();

    // verify logged in user
    expect(await navbar.getLoggedInUser()).toBe(process.env.APPLICATION_USER_NAME!);

    // click cart link
    await navbar.clickCartLink();
    
    // click proceed to checkout button
    await cartPage.clickProceedToCheckoutButton();

    // click place order button
    const checkoutPage: CheckoutPage = new CheckoutPage(page);
    await checkoutPage.clickPlaceOrderButton();

    // enter name
    const paymentPage: PaymentPage = new PaymentPage(page);
    await paymentPage.enterName("testUser");

    // enter card number
    await paymentPage.enterCardNumber("123456789");

    // enter cvv
    await paymentPage.enterCVV("123");

    // enter expiry month
    await paymentPage.enterExpirationMonth("01");

    // enter expiry year
    await paymentPage.enterExpirationYear("2000");

    // click pay and confirm order button
    await paymentPage.clickPayAndConfirmOrder();

    // check if order placed message is visible
    await expect(paymentPage.orderPlacedMessage).toBeVisible();

    // click continue button
    await paymentPage.clickContinueButton();

    // click delete account link
    await navbar.clickDeleteAccountLink();

    // check visibility of Account Deleted message
    await expect(page.getByText("Account Deleted!")).toBeVisible();

    // click continue link
    await signUpPage.continueLink.click();
});

test("Test Case 15: Place Order: Register before Checkout", async ({ page }) => {
    const name = "testUser";

    // navigate to URL
    await page.goto("https://automationexercise.com/");

    // check visibility of products
    const productsPage: ProductsPage = new ProductsPage(page);
    expect((await productsPage.getAllProducts()).length).toBeGreaterThan(0);

    // click sign up / login link
    const navbar: Navbar = new Navbar(page);
    await navbar.clickSignUpOrLoginLink();

    // check visibility of New User Sign Up header
    const loginPage: LoginPage = new LoginPage(page);
    await expect(loginPage.newUserSignUpHeader).toBeVisible();

    // enter name
    await loginPage.enterName(name);

    // enter email
    await loginPage.enterSignUpEmail(`test.user.${Math.floor(Math.random() * 100)}@gmail.com`);

    // click sign up button
    await loginPage.clickSignUpButton();

    // check visibility of Enter Account Information header
    const signUpPage: SignUpPage = new SignUpPage(page);
    await expect(signUpPage.enterAccountInformationHeader).toBeVisible();

    // select title
    await signUpPage.selectTitle("Mr.");

    // enter password
    await signUpPage.enterPassword("password");

    // enter date of birth
    await signUpPage.selectDay("1");
    await signUpPage.selectMonth("January");
    await signUpPage.selectYear("2000");

    // check sign up for news letter checkbox
    await signUpPage.checkSignUpForNewsLetterCheckbox();

    // check receive special offers checkbox
    await signUpPage.checkReceiveSpecialOffersCheckbox();

    // enter first name
    await signUpPage.enterFirstName("test");

    // enter last name
    await signUpPage.enterLastName("user");

    // enter company
    await signUpPage.enterCompany("company");

    // enter address 1
    await signUpPage.enterAddress1("address 1");

    // enter address 2
    await signUpPage.enterAddress2("address 2");

    // select country
    await signUpPage.selectCountry("India");

    // enter state
    await signUpPage.enterState("state");

    // enter city
    await signUpPage.enterCity("city");

    // enter zip code
    await signUpPage.enterZipCode("000000");

    // enter mobile number
    await signUpPage.enterMobileNumber("0123456789");

    // click create account button
    await signUpPage.clickCreateAccountButton();

    // check visibility of Account Created message
    await expect(signUpPage.signUpConfirmationMessage).toBeVisible();

    // click continue link
    await signUpPage.continueLink.click();

    // verify logged in user
    expect(await navbar.getLoggedInUser()).toBe(name);

    // click products link
    await navbar.clickProductsLink();

    // check visibility of products
    expect((await productsPage.getAllProducts()).length).toBeGreaterThan(0);

    // click add to cart on first product
    const firstProduct: ProductCard = (await productsPage.getAllProducts())[0];
    const expectedProductName = await firstProduct.getProductName();
    await firstProduct.clickAddToCartButton();
    
    // click view cart link
    const productAddedToCartDialog: ProductAddedToCartDialog = new ProductAddedToCartDialog(page);
    await productAddedToCartDialog.clickViewCartLink();

    // check if expected product is added
    const cartPage: CartPage = new CartPage(page);
    const actualProduct: ProductRow = await cartPage.getProductByName(expectedProductName);
    await expect(actualProduct).toBeTruthy();
    
    // click proceed to checkout button
    await cartPage.clickProceedToCheckoutButton();

    // click place order button
    const checkoutPage: CheckoutPage = new CheckoutPage(page);
    await checkoutPage.clickPlaceOrderButton();

    // enter name
    const paymentPage: PaymentPage = new PaymentPage(page);
    await paymentPage.enterName("testUser");

    // enter card number
    await paymentPage.enterCardNumber("123456789");

    // enter cvv
    await paymentPage.enterCVV("123");

    // enter expiry month
    await paymentPage.enterExpirationMonth("01");

    // enter expiry year
    await paymentPage.enterExpirationYear("2000");

    // click pay and confirm order button
    await paymentPage.clickPayAndConfirmOrder();

    // check if order placed message is visible
    await expect(paymentPage.orderPlacedMessage).toBeVisible();

    // click continue button
    await paymentPage.clickContinueButton();

    // click delete account link
    await navbar.clickDeleteAccountLink();

    // check visibility of Account Deleted message
    await expect(page.getByText("Account Deleted!")).toBeVisible();

    // click continue link
    await signUpPage.continueLink.click();
});

test("Test Case 16: Place Order: Login before Checkout", async ({ page, request }) => {
    // create a user
    const name = "testUser";
    const email = `test.user.${Math.floor(Math.random() * 100)}@gmail.com`;
    const password = "password"
    const userData: UserData = {
        "name": name,
        "email": email,
        "password": password,
        "title": "Mr.",
        "birth_date": "1",
        "birth_month": "January",
        "birth_year": "2000",
        "firstname": "test",
        "lastname": "user",
        "company": "company",
        "address1": "address 1",
        "address2": "address 2",
        "country": "India",
        "zipcode": "000000",
        "state": "state",
        "city": "city",
        "mobile_number": "0123456789",
    };
    const authenticationAPI: UserAPI = new UserAPI(request);
    let response = await authenticationAPI.createAccount(userData);

    // check response status
    await expect(response.ok()).toBeTruthy();

    // navigate to URL
    await page.goto("https://automationexercise.com/");

    // check visibility of products
    const productsPage: ProductsPage = new ProductsPage(page);
    expect((await productsPage.getAllProducts()).length).toBeGreaterThan(0);

    // click sign up / login link
    const navbar: Navbar = new Navbar(page);
    await navbar.clickSignUpOrLoginLink();

    // check visibility of Login to your account header
    const loginPage: LoginPage = new LoginPage(page);
    await expect(loginPage.loginToYourAccountHeader).toBeVisible();

    // enter email
    await loginPage.enterLoginEmail(email);

    // enter password
    await loginPage.enterPassword(password);

    // click login button
    await loginPage.clickLoginButton();

    // verify logged in user
    expect(await navbar.getLoggedInUser()).toBe(name);

    // click products link
    await navbar.clickProductsLink();

    // check visibility of products
    expect((await productsPage.getAllProducts()).length).toBeGreaterThan(0);

    // click add to cart on first product
    const firstProduct: ProductCard = (await productsPage.getAllProducts())[0];
    const expectedProductName = await firstProduct.getProductName();
    await firstProduct.clickAddToCartButton();
    
    // click view cart link
    const productAddedToCartDialog: ProductAddedToCartDialog = new ProductAddedToCartDialog(page);
    await productAddedToCartDialog.clickViewCartLink();

    // check if expected product is added
    const cartPage: CartPage = new CartPage(page);
    const actualProduct: ProductRow = await cartPage.getProductByName(expectedProductName);
    await expect(actualProduct).toBeTruthy();
    
    // click proceed to checkout button
    await cartPage.clickProceedToCheckoutButton();

    // click place order button
    const checkoutPage: CheckoutPage = new CheckoutPage(page);
    await checkoutPage.clickPlaceOrderButton();

    // enter name
    const paymentPage: PaymentPage = new PaymentPage(page);
    await paymentPage.enterName("testUser");

    // enter card number
    await paymentPage.enterCardNumber("123456789");

    // enter cvv
    await paymentPage.enterCVV("123");

    // enter expiry month
    await paymentPage.enterExpirationMonth("01");

    // enter expiry year
    await paymentPage.enterExpirationYear("2000");

    // click pay and confirm order button
    await paymentPage.clickPayAndConfirmOrder();

    // check if order placed message is visible
    await expect(paymentPage.orderPlacedMessage).toBeVisible();

    // click continue button
    await paymentPage.clickContinueButton();

    // click delete account link
    await navbar.clickDeleteAccountLink();

    // check visibility of Account Deleted message
    await expect(page.getByText("Account Deleted!")).toBeVisible();

    // click continue link
    await navbar.continueLink.click();
});

test("Test Case 17: Remove Products From Cart", async ({ page }) => {
    // navigate to URL
    await page.goto("https://automationexercise.com/");

    // click products link
    const navbar: Navbar = new Navbar(page);
    await navbar.clickProductsLink();

    // check visibility of products
    const productsPage: ProductsPage = new ProductsPage(page);
    expect((await productsPage.getAllProducts()).length).toBeGreaterThan(0);

    // click add to cart on first product
    const firstProduct: ProductCard = (await productsPage.getAllProducts())[0];
    const expectedProductName = await firstProduct.getProductName();
    await firstProduct.clickAddToCartButton();
    
    // click view cart link
    const productAddedToCartDialog: ProductAddedToCartDialog = new ProductAddedToCartDialog(page);
    await productAddedToCartDialog.clickViewCartLink();

    // check if expected product is added
    const cartPage: CartPage = new CartPage(page);
    const actualProduct: ProductRow = await cartPage.getProductByName(expectedProductName);
    await expect(actualProduct).toBeTruthy();

    // remove product from cart
    await actualProduct.clickDeleteButton();

    // check if product is removed from cart
    await expect(cartPage.productByName(expectedProductName)).not.toBeVisible();
});

test("Test Case 18: View Category Products", async ({ page }) => {
    let category = "Women";
    let subCategory = "Tops";

    // navigate to URL
    await page.goto("https://automationexercise.com/");

    // click products link
    const navbar: Navbar = new Navbar(page);
    await navbar.clickProductsLink();

    // check visibility of products
    const productsPage: ProductsPage = new ProductsPage(page);
    expect((await productsPage.getAllProducts()).length).toBeGreaterThan(0);

    // check visibility of category header
    await expect(productsPage.categoryHeader).toBeVisible();

    // click category dropdown
    await productsPage.clickCategoryDropdownButton(category);

    // click sub category link
    await productsPage.clickSubCategoryLink(subCategory);

    // check if category - sub category header is visible
    await expect(page.getByRole('heading', { name: `${category} - ${subCategory} Products` })).toBeVisible();

    category = "Men";
    subCategory = "Jeans";

    // click category dropdown
    await productsPage.clickCategoryDropdownButton(category);

    // click sub category link
    await productsPage.clickSubCategoryLink(subCategory);

    // check if category - sub category header is visible
    await expect(page.getByRole('heading', { name: `${category} - ${subCategory} Products` })).toBeVisible();
});

test("Test Case 19: View & Cart Brand Products", async ({ page }) => {
    let brand = "Polo";

    // navigate to URL
    await page.goto("https://automationexercise.com/");

    // click products link
    const navbar: Navbar = new Navbar(page);
    await navbar.clickProductsLink();

    // check visibility of products
    const productsPage: ProductsPage = new ProductsPage(page);
    expect((await productsPage.getAllProducts()).length).toBeGreaterThan(0);

    // check visibility of category header
    await expect(productsPage.categoryHeader).toBeVisible();

    // click brand link
    await productsPage.clickBrandLink(brand);

    // check if brand header is visible
    await expect(page.getByRole('heading', { name: `Brand - ${brand} Products` })).toBeVisible();

    brand = "Kookie Kids";

    // click brand link
    await productsPage.clickBrandLink(brand);

    // check if brand header is visible
    await expect(page.getByRole('heading', { name: `Brand - ${brand} Products` })).toBeVisible();
});