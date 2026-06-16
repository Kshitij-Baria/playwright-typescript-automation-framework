# Automation Exercise Playwright Test Automation

A Playwright + TypeScript automation framework built to demonstrate UI and API test automation practices.

This project automates the public practice application [**Automation Exercise**](https://automationexercise.com/) and contains both UI and API test coverage.

---

## Tech Stack

- Playwright
- TypeScript
- Node.js
- Jenkins (CI)
- Docker (Jenkins runtime)

---

## Project Goals

This project demonstrates:

- UI automation using Playwright
- API automation using Playwright APIRequestContext
- Page Object Model design
- Component-based UI abstractions
- Reusable test utilities
- API request/response handling
- CI execution using Jenkins

---

## Project Structure

```text
.
|   .env
|   .gitignore
|   package-lock.json
|   package.json
|   playwright.config.ts
|   README.md
|   structure.txt
|   tsconfig.json
|   
+---api
|       ProductsAPI.ts
|       UserAPI.ts
|                
+---pages
|   |   CheckoutPage.ts
|   |   ContactUsPage.ts
|   |   Footer.ts
|   |   LoginPage.ts
|   |   Navbar.ts
|   |   OrderPlacedPage.ts
|   |   PaymentPage.ts
|   |   SignUpPage.ts
|   |   TestCasePage.ts
|   |   
|   +---cart-page
|   |       CartPage.ts
|   |       CheckoutDialog.ts
|   |       ProductRow.ts
|   |       
|   \---products-page
|           ProductAddedToCartDialog.ts
|           ProductCard.ts
|           ProductPage.ts
|           ProductsPage.ts
|           
+---test-data
|       test.txt
|           
\---tests
        AutomationExerciseAPI.spec.ts
        AutomationExerciseUI.spec.ts
```

---

# Test Coverage

## UI Tests

### Authentication

- User registration
- User login
- Invalid login scenarios
- Logout
- Account deletion

### Products

- View all products
- Search products
- Filter products by category
- Filter products by brand
- View product details

### Cart

- Add products to cart
- Remove products from cart
- Verify cart contents

### Checkout

- Complete checkout flow
- Place orders
- Verify order details

---

## API Tests

### Products

- Get all products
- Search products

### Brands

- Get all brands

### Users

- Create user
- Verify user login
- Get user details
- Update user details
- Delete user

---

# Environment Setup

The project uses environment variables for configuration.

Create a local `.env` file using the provided example:

```bash
cp .env.example .env
```

Update the values in `.env` as required.

Example:

```env
BASE_URL=https://automationexercise.com
API_BASE_URL=https://automationexercise.com/api

TEST_USER_EMAIL=
TEST_USER_PASSWORD=
```

The `.env` file is intentionally excluded from version control.  
Only `.env.example` is committed to the repository.

# Running Tests Locally

## Install dependencies

```bash
npm install
```

---

## Install Playwright browsers

```bash
npx playwright install
```

---

## Run all tests

```bash
npx playwright test
```

---

## Run UI tests only

```bash
npx playwright test tests/ui
```

---

## Run API tests only

```bash
npx playwright test tests/api
```

---

# Test Reports

After execution, open the Playwright report:

```bash
npx playwright show-report
```

---

# CI Execution

The project can be executed using Jenkins.

Jenkins runs inside Docker and executes the following pipeline:

```text
Checkout Repository
        |
        v
Install Dependencies
        |
        v
Install Playwright Browsers
        |
        v
Execute Test Suite
        |
        v
Publish Test Report
```

---

# Framework Design

## UI Layer

The UI automation follows a Page Object + Component based approach.

Pages contain:

- Page specific locators
- User actions
- Business-level interactions

Reusable UI elements are extracted into components.

Example:

```text
ProductsPage
      |
      └── Product Component
```

---

## API Layer

The API automation follows a client-based approach.

API clients are responsible for:

- Building requests
- Calling endpoints
- Returning responses

Example:

```text
UsersClient
ProductsClient
BrandsClient
```

---

# Known Limitations

The Automation Exercise website is a publicly hosted practice application.

Because it depends on an external environment, occasional instability may occur due to:

- Third-party advertisements
- Website changes
- External dependencies

The framework attempts to reduce flakiness by using:

- Stable Playwright locators
- Page abstractions
- Component-based design
- Test isolation
- API setup and cleanup

---

# Future Improvements

Potential improvements:

- Add API response schema validation
- Add richer test data factories
- Add Allure reporting
- Add Dockerized test execution
- Improve CI pipeline reporting
- Add parallel execution optimization

---

## Author

Built as a personal automation engineering project to demonstrate Playwright + TypeScript testing practices.