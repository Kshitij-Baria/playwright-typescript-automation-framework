import { APIRequestContext, APIResponse } from "@playwright/test";

export class UserAPI {
    constructor(private request: APIRequestContext) { }

    async createAccount(userData: UserData): Promise<APIResponse> {
        return await this.request.post("https://automationexercise.com/api/createAccount", {
            form: userData
        });
    }

    async getUserDetailsByEmail(email: string): Promise<APIResponse> {
        return await this.request.get(`https://automationexercise.com/api/getUserDetailByEmail?email=${email}`);
    }

    async updateAccount(userData: UserData): Promise<APIResponse> {
        return await this.request.put("https://automationexercise.com/api/updateAccount", {
            form: userData
        });
    }

    async deleteAccount(email: string, password: string): Promise<APIResponse> {
        return await this.request.delete("https://automationexercise.com/api/deleteAccount", {
            form: {
                "email": email,
                "password": password
            }
        });
    }

    async verifyLogin(email: string, password: string): Promise<APIResponse> {
        return await this.request.post("https://automationexercise.com/api/verifyLogin", {
            form: {
                "email": email,
                "password": password
            }
        });
    }
}

export type UserData = {
    "name": string;
    "email": string;
    "password": string;
    "title": string;
    "birth_date": string;
    "birth_month": string;
    "birth_year": string;
    "firstname": string;
    "lastname": string;
    "company": string;
    "address1": string;
    "address2": string;
    "country": string;
    "zipcode": string;
    "state": string;
    "city": string;
    "mobile_number": string;
}