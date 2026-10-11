import pool from "../config/database.js";
import { ConflictError } from "../errors.js";
import type { NewProduct, Product } from "../types.js";

export async function insertProduct(product: NewProduct): Promise<Product> {
    try {
        const result = await pool.query(
            `INSERT INTO products
            (barcode, name, calories, protein, fat, carbs)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *`,
            [
                product.barcode,
                product.name,
                product.calories,
                product.protein,
                product.fat,
                product.carbs
            ]);

        return result.rows[0] as Product;
    }
    catch (error: any) {
        if (error.code === "23505") {
            throw new ConflictError("Product with this barcode already exists");
        }
        throw error;
    }
}

export async function pullProduct(barcode: string): Promise<Product | undefined> {
    const result = await pool.query(
        `SELECT * 
            FROM products
            WHERE products.barcode = ($1)`,
        [barcode]);

    return result.rows[0];
}