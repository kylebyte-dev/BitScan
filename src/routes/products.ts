import { IncomingMessage, ServerResponse } from "node:http";
import { readJsonBody } from "../utils/http.js";
import { validateProduct } from "../services/products.js"
import { insertProduct } from "../repositories/products.js";

export async function createProduct(
    request: IncomingMessage,
    response: ServerResponse
) {

    const product: any = await readJsonBody(request);
    validateProduct(product);
    const result = await insertProduct(product);

    response.statusCode = 201;
    response.setHeader("Content-Type", "application/json");
    response.end(JSON.stringify(result));
}