import pool from "../config/database.js";
import { ConflictError, NotFoundError } from "../errors.js";

export async function insertProduct(product: any) {
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

        return result.rows[0];
    }
    catch (error: any) {
        if (error.code === "23505") {
            throw new ConflictError("Product with this barcode already exists");
        }
        throw error;
    }
}

export async function pullProduct(barcode: string) {
    const result = await pool.query(
        `SELECT * 
            FROM products
            WHERE products.barcode = ($1)`,
        [barcode]);

    return result.rows[0];
}
