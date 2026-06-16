import test, { expect } from "@playwright/test";
import { BrandSchema, ProductsAPI, ProductSchema } from "../api/ProductsAPI";
import z from "zod";
import { UserAPI, UserData } from "../api/UserAPI";

test("API 1: Get All Products List", async ({ request }) => {
    // send request to products list API
    const productsAPI: ProductsAPI = new ProductsAPI(request);
    const response = await productsAPI.getProducts();

    // check if status code is 200
    await expect(response.status()).toBe(200);

    // check response shape
    const responseSchema = z.object({
        responseCode: z.number(),
        products: z.array(ProductSchema).nonempty()
    });
    responseSchema.parse(await response.json());
});

test("API 2: POST To All Products List", async ({ request }) => {
    // send request to products list API
    const response = await request.post("https://automationexercise.com/api/productsList");

    // check response body
    const responseBody = await response.json();
    expect(responseBody).toMatchObject({
        responseCode: 405,
        message: "This request method is not supported."
    });
});

test("API 3: Get All Brands List", async ({ request }) => {
    // send request to brands list API
    const productsAPI: ProductsAPI = new ProductsAPI(request);
    const response = await productsAPI.getBrands();

    // check if status code is 200
    await expect(response.status()).toBe(200);

    // check response shape
    const responseSchema = z.object({
        responseCode: z.number(),
        brands: z.array(BrandSchema).nonempty()
    });
    responseSchema.parse(await response.json());
});

test("API 4: PUT To All Brands List", async ({ request }) => {
    // send request to brands list API
    const response = await request.put("https://automationexercise.com/api/brandsList");

    // check response body
    const responseBody = await response.json();
    expect(responseBody).toMatchObject({
        responseCode: 405,
        message: "This request method is not supported."
    });
});

test("API 5: POST To Search Product", async ({ request }) => {
    // send request to search products API
    const productsAPI: ProductsAPI = new ProductsAPI(request);
    const response = await productsAPI.searchProducts("Jeans");

    // check if status code is 200
    await expect(response.status()).toBe(200);

    // check response shape
    const responseSchema = z.object({
        responseCode: z.number(),
        products: z.array(ProductSchema).nonempty()
    });
    responseSchema.parse(await response.json());
});

test("API 6: POST To Search Product without search_product parameter", async ({ request }) => {
    // send request to search products API
    const response = await request.post("https://automationexercise.com/api/searchProduct");

    // check response body
    const responseBody = await response.json();
    expect(responseBody).toMatchObject({
        responseCode: 400,
        message: "Bad request, search_product parameter is missing in POST request."
    });
});

test("API 7: POST To Verify Login with valid details", async ({ request }) => {
    // send request to verify login API
    const userAPI: UserAPI = new UserAPI(request);
    const response = await userAPI.verifyLogin(process.env.APPLICATION_EMAIL!, process.env.APPLICATION_PASSWORD!);

    // check response body
    const responseBody = await response.json();
    expect(responseBody).toMatchObject({
        responseCode: 200,
        message: "User exists!"
    });
});

test("API 8: POST To Verify Login without email parameter", async ({ request }) => {
    // send request to verify login API
    const userAPI: UserAPI = new UserAPI(request);
    const response = await request.post("https://automationexercise.com/api/verifyLogin", {
        form: {
            password: process.env.APPLICATION_PASSWORD!
        }
    });

    // check response body
    const responseBody = await response.json();
    expect(responseBody).toMatchObject({
        responseCode: 400,
        message: "Bad request, email or password parameter is missing in POST request."
    });
});

test("API 9: DELETE To Verify Login", async ({ request }) => {
    // send request to verify login API
    const userAPI: UserAPI = new UserAPI(request);
    const response = await request.delete("https://automationexercise.com/api/verifyLogin", {
        form: {
            email: process.env.APPLICATION_EMAIL!,
            password: process.env.APPLICATION_PASSWORD!
        }
    });

    // check response body
    const responseBody = await response.json();
    expect(responseBody).toMatchObject({
        "responseCode": 405,
        "message": "This request method is not supported."
    });
});

test("API 10: POST To Verify Login with invalid details", async ({ request }) => {
    // send request to verify login API
    const userAPI: UserAPI = new UserAPI(request);
    const response = await userAPI.verifyLogin(`unknown.user.${Math.floor(Math.random() * 100)}@example.com`, process.env.APPLICATION_PASSWORD!);

    // check response body
    const responseBody = await response.json();
    expect(responseBody).toMatchObject({
        "responseCode": 404,
        "message": "User not found!"
    });
});

test("API 11: POST To Create/Register User Account", async ({ request }) => {
    // create a user
    const name = "testUser";
    const email = `test.user.${Math.floor(Math.random() * 100)}@example.com`;
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
    const userAPI: UserAPI = new UserAPI(request);
    let response = await userAPI.createAccount(userData);

    // check response status
    await expect(response.ok()).toBeTruthy();

    // check response body
    let responseBody = await response.json();
    await expect(responseBody).toMatchObject({
        responseCode: 201,
        message: "User created!"
    });

    // delete account
    response = await userAPI.deleteAccount(email, password);

    // check response status
    await expect(response.ok()).toBeTruthy();

    // check response body
    responseBody = await response.json();
    await expect(responseBody).toMatchObject({
        responseCode: 200,
        message: "Account deleted!"
    });
});

test("API 12: PUT METHOD To Update User Account", async ({ request }) => {
    // update a user
    const name = "testUser";
    const email = process.env.APPLICATION_EMAIL!;
    const password = process.env.APPLICATION_PASSWORD!;
    const updatedUserData: UserData = {
        "name": name,
        "email": email,
        "password": password,
        "title": "Mrs.",
        "birth_date": "02",
        "birth_month": "February",
        "birth_year": "2001",
        "firstname": "updated",
        "lastname": "test user",
        "company": "updated company",
        "address1": "updated address 1",
        "address2": "updated address 2",
        "country": "India",
        "zipcode": "111111",
        "state": "updated state",
        "city": "updated city",
        "mobile_number": "9999999999",
    }
    const userAPI: UserAPI = new UserAPI(request);
    let response = await userAPI.updateAccount(updatedUserData);

    // check response status
    await expect(response.ok()).toBeTruthy();

    // check response body
    let responseBody = await response.json();
    await expect(responseBody).toMatchObject({
        "responseCode": 200,
        "message": "User updated!"
    });

    // check updated details
    response = await userAPI.getUserDetailsByEmail(email);
    responseBody = await response.json();
    await expect(responseBody).toMatchObject({
        "responseCode": 200,
        "user": {
            "id": 1686976,
            "name": "testUser",
            "email": "test.user.01@example.com",
            "title": "Mrs.",
            "birth_day": "02",
            "birth_month": "February",
            "birth_year": "2001",
            "first_name": "updated",
            "last_name": "test user",
            "company": "updated company",
            "address1": "updated address 1",
            "address2": "updated address 2",
            "country": "India",
            "state": "updated state",
            "city": "updated city",
            "zipcode": "111111"
        }
    });

    // switch back updated details
    const userData: UserData = {
        "name": name,
        "email": email,
        "password": password,
        "title": "Mr.",
        "birth_date": "01",
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

    response = await userAPI.updateAccount(userData);

    // check response status
    await expect(response.ok()).toBeTruthy();

    // check response body
    responseBody = await response.json();
    await expect(responseBody).toMatchObject({
        "responseCode": 200,
        "message": "User updated!"
    });

    // check updated details
    response = await userAPI.getUserDetailsByEmail(email);
    responseBody = await response.json();
    await expect(responseBody).toMatchObject({
        "responseCode": 200,
        "user": {
            "id": 1686976,
            "name": "testUser",
            "email": "test.user.01@example.com",
            "title": "Mr.",
            "birth_day": "01",
            "birth_month": "January",
            "birth_year": "2000",
            "first_name": "test",
            "last_name": "user",
            "company": "company",
            "address1": "address 1",
            "address2": "address 2",
            "country": "India",
            "state": "state",
            "city": "city",
            "zipcode": "000000"
        }
    });
});

test("API 14: GET user account detail by email", async ({ request }) => {
    // send request to get user data
    const userAPI: UserAPI = new UserAPI(request);
    const response = await userAPI.getUserDetailsByEmail(process.env.APPLICATION_EMAIL!);

    // check response body
    const responseBody = await response.json();
    await expect(responseBody).toMatchObject({
        "responseCode": 200,
        "user": {
            "id": 1686976,
            "name": "testUser",
            "email": "test.user.01@example.com",
            "title": "Mr.",
            "birth_day": "01",
            "birth_month": "January",
            "birth_year": "2000",
            "first_name": "test",
            "last_name": "user",
            "company": "company",
            "address1": "address 1",
            "address2": "address 2",
            "country": "India",
            "state": "state",
            "city": "city",
            "zipcode": "000000"
        }
    });
});