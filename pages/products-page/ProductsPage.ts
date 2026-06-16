import { Locator, Page } from "@playwright/test";
import { ProductCard } from "./ProductCard";

export class ProductsPage {
    readonly searchInput: Locator;
    readonly searchSubmitButton: Locator;
    readonly allProductsHeader: Locator;
    readonly searchedProductsHeader: Locator;
    readonly categoryHeader: Locator;
    readonly categoryDropdownButton: (category: string) => Locator;
    readonly subCategoryLink: (subCategory: string) => Locator;
    readonly brandLink: (brand: string) => Locator;

    constructor(private page: Page) {
        this.searchInput = this.page.getByRole('textbox', { name: 'Search Product' });
        this.searchSubmitButton = this.page.locator('#submit_search');
        this.allProductsHeader = this.page.getByRole('heading', { name: 'All Products' });
        this.searchedProductsHeader = this.page.getByRole('heading', { name: 'Searched Products' });
        this.categoryHeader = this.page.getByRole('heading', { name: 'Category' });
        this.categoryDropdownButton = (category: string) => this.page.locator(`a[href='#${category}']`);
        this.subCategoryLink = (subCategory: string) => this.page.getByRole('link', { name: `${subCategory}` });
        this.brandLink = (brand: string) => this.page.getByRole('link', { name: `${brand}` });
    }

    getProductByName(name: string): ProductCard {
        const root = this.page
            .locator('.product-image-wrapper')
            .filter({ has: this.page.getByText(name) });

        return new ProductCard(root);
    }

    async getAllProducts(): Promise<ProductCard[]> {
        const elements = this.page.locator('.product-image-wrapper');
        const count = await elements.count();

        const products: ProductCard[] = [];

        for (let i = 0; i < count; i++) {
            products.push(new ProductCard(elements.nth(i)));
        }

        return products;
    }

    async enterSearch(text: string) {
        await this.searchInput.fill(text);
    }

    async clickSearchSubmitButton() {
        await this.searchSubmitButton.click();
    }

    async clickCategoryDropdownButton(category: string) {
        await this.categoryDropdownButton(category).click();
    }

    async clickSubCategoryLink(subCategory: string) {
        await this.subCategoryLink(subCategory).click();
    }

    async clickBrandLink(brand: string) {
        await this.brandLink(brand).click();
    }
}