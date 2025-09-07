import { test,expect} from "../../fixtures/database/database";

test.describe("API testing - Database integrate", () => {
    let categoryId: number | undefined;
    let productId: number | undefined;
    const BASE_URL = "https://betterbytesvn.com/pwa101";


    test.beforeEach("API Testing", async ({ request }) => {
        const rawResponseCategory = await request.post(`${BASE_URL}/category/create.php`, {
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                "name": "Category API 01",
                "description": "Description API 01"
            })
        });

        const  responseCategory = await rawResponseCategory.json();
        categoryId = responseCategory.category.id;
        expect(responseCategory).toBeTruthy();
        expect(categoryId).toBeTruthy();
        expect(responseCategory.category.name).toBe("Category API 01");
        expect(responseCategory.category.description).toBe("Description API 01");

        const rawResponseProduct = await request.post(`${BASE_URL}/product/create.php`, {
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                "name": "iPhone 15 Pro",
                "description": "Latest Apple smartphone with advanced features",
                "price": 29990000,
                "quantity": 50,
                "category_id": categoryId,
                "is_active": true
            })
        });

        const responseProduct = await rawResponseProduct.json();
        productId = responseProduct.product.id;
        expect(responseProduct).toBeTruthy();
        expect(responseProduct.product.id).toBeTruthy();
        expect(responseProduct.product.name).toBe("iPhone 15 Pro");
        expect(responseProduct.product.description).toBe("Latest Apple smartphone with advanced features");
    });

    test("Update product and verify in database", async ({ request ,db}) => {
        //step 1: Update product
        const rawResponseUpProduct = await request.put(`${BASE_URL}/product/update.php`, {
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                "name": "PWA101 product",
                "id": productId,
                "description": "Latest Apple smartphone with advanced features",
                "price": 3000,
                "quantity": 50,
                "category_id": categoryId,
                "is_active": true
            })

        });

        // Step 2: Verify in DB
        const rows = await db.query("SELECT * FROM product WHERE id = ?", [
            productId,
        ]);
        expect(rows.length).toBeGreaterThan(0);
        const product = rows[0];
        expect(product.name).toBe("PWA101 product");
        expect(Number(product.price)).toBe(3000);
    });

    test.afterEach(async ({ request }) => {
        // Teardown: delete product
        console.log(productId);
        if (productId) {
            await request.delete(
                `${BASE_URL}/product/delete.php?id=${productId}`
            );
        }
        // Teardown: delete category
        if (categoryId) {
            await request.delete(
                `${BASE_URL}/category/delete.php?id=${categoryId}`
            );
        }
    });
});