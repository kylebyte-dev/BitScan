import { IncomingMessage, ServerResponse } from "node:http";
import { readJsonBody } from "../utils/http.js";
import { ConflictError } from "../errors.js";
import { validateProduct } from "../services/products.js"
import pool from "../config/database.js";

export async function createProduct(
    request: IncomingMessage,
    response: ServerResponse
) {
    const product: any = await readJsonBody(request);

    let result: any;

    try {
        validateProduct(product);
        result = await pool.query(
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
            ]
        );
    }
    catch (error: any) {
        if (error.code === "23505") {
            throw new ConflictError("Product with this barcode already exists");
        }
        throw error;
    }

    response.statusCode = 201;
    response.setHeader("Content-Type", "application/json");
    response.end(JSON.stringify(result.rows[0]));
}