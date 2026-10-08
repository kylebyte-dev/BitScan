import { ValidationError, NotFoundError } from "../errors.js";

export function validateProduct(data: any) {

    if (typeof data !== "object" || data === null) { throw new ValidationError("Invalid data"); }

    if (typeof data.barcode === "string") { data.barcode = data.barcode.trim(); }
    validateBarcode(data.barcode);

    if (typeof data.name === "string") { data.name = data.name.trim(); }
    if (data.name === "" || typeof data.name !== "string") { throw new ValidationError("Invalid name of product"); }

    if (typeof data.calories !== "number" || data.calories < 0) { throw new ValidationError("Invalid calories data"); }

    if (typeof data.protein !== "number" || data.protein < 0) { throw new ValidationError("Invalid protein data"); }

    if (typeof data.fat !== "number" || data.fat < 0) { throw new ValidationError("Invalid fat data"); }

    if (typeof data.carbs !== "number" || data.carbs < 0) { throw new ValidationError("Invalid carbs data"); }

}

export function validateBarcode(barcode: string) {
    if (typeof barcode !== "string" || !/^\d{8,13}$/.test(barcode)) { throw new ValidationError("Invalid barcode"); }
}

export function requireProduct(data: any) {
    if (data === undefined) { throw new NotFoundError("Product not found"); }
    return data;
}