import { test, expect, request, APIRequestContext } from "@playwright/test";
import dotenv from 'dotenv';
import path from "path";

dotenv.config({
    path: path.resolve('.env'),
});

let adminRequestContext: APIRequestContext;

test.beforeEach(async () => {
    adminRequestContext = await request.newContext({
        baseURL: process.env.BASE_URL,
        extraHTTPHeaders: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${process.env.WORDPRESS_TOKEN}`
        }
    });
});

test.describe("Add product", () => {
    let productId: number | undefined;

    test("Add product 01", async () => {
        const response = await adminRequestContext.post('/wp-json/wc/v3/products', {
            data: JSON.stringify({
                "name": "PW010 - product duong",
                "type": "simple",
                "regular_price": "21.99",
                "description": "desc",
                "short_description": "short desc"
            })
        });
        console.log("Status:", response.status());
        console.log(await response.json());
        productId = (await response.json()).id;
        console.log("Product ID:", productId);
        expect(response.status()).toBe(201);
    });

    test.afterEach(async() => {
        if (productId) {
            const responseDelete = await adminRequestContext.delete(`/wp-json/wc/v3/products/${productId}`, {
            });
            console.log("Delete status:", responseDelete.status());
        }
    })
});