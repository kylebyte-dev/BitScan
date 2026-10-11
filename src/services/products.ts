import { ValidationError, NotFoundError } from "../errors.js";
import type { NewProduct, Product } from "../types.js";

export function validateProduct(data: unknown): NewProduct {

    if (typeof data !== "object" || data === null) { throw new ValidationError("Invalid data"); }

    const input = data as Record<string, unknown>;

    if (typeof input.barcode === "string") { input.barcode = input.barcode.trim(); }
    validateBarcode(input.barcode);

    if (typeof input.name === "string") { input.name = input.name.trim(); }
    if (input.name === "" || typeof input.name !== "string") { throw new ValidationError("Invalid name of product"); }

    if (typeof input.calories !== "number" || input.calories < 0) { throw new ValidationError("Invalid calories data"); }

    if (typeof input.protein !== "number" || input.protein < 0) { throw new ValidationError("Invalid protein data"); }

    if (typeof input.fat !== "number" || input.fat < 0) { throw new ValidationError("Invalid fat data"); }

    if (typeof input.carbs !== "number" || input.carbs < 0) { throw new ValidationError("Invalid carbs data"); }

    return input as NewProduct;
}

export function validateBarcode(barcode: unknown) {
    if (typeof barcode !== "string" || !/^\d{8,13}$/.test(barcode)) { throw new ValidationError("Invalid barcode"); 
    }
}

export function requireProduct(data: Product | undefined) {
    if (data === undefined) { throw new NotFoundError("Product not found"); }
    return data;
}