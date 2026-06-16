import { APIRequestContext, APIResponse } from "@playwright/test";
import z from "zod";

export class ProductsAPI {
    constructor(private request: APIRequestContext) { }

    async getProducts(): Promise<APIResponse> {
        return await this.request.get("https://automationexercise.com/api/productsList");
    }

    async getBrands(): Promise<APIResponse> {
        return await this.request.get("https://automationexercise.com/api/brandsList");
    }

    async searchProducts(productName: string): Promise<APIResponse> {
        return await this.request.post("https://automationexercise.com/api/searchProduct", {
            form: {
                search_product: productName
            }
        });
    }
}

export const ProductSchema = z.object({
    id: z.number(),
    name: z.string(),
    price: z.string(),
    brand: z.string(),
    category: z.object({
        usertype: z.object({
            usertype: z.string()
        }),
        category: z.string()
    })
});

export const BrandSchema = z.object({
    id: z.number(),
    brand: z.string()
});