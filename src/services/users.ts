import { ValidationError } from "../errors.js";
import type { StagedUser, NewUser } from "../types.js";
import { hashPassword } from "./passwords.js";

export function validateUser(data: unknown): StagedUser {

    if (typeof data !== "object" || data === null) { throw new ValidationError("Invalid data"); }

    const input = data as Record<string, unknown>;

    const email = validateEmail(input.email);

    if (typeof input.password !== "string") { throw new ValidationError("Invalid password"); }
    if (input.password.length < 8) { throw new ValidationError("Password is too short"); }
    if (input.password.length > 64) { throw new ValidationError("Password is too big"); }

    return { email: email, password: input.password };
}

export function validateEmail(email: unknown) {
    if (typeof email !== "string") { throw new ValidationError("Invalid email"); }
    const normalized = email.trim().toLowerCase();
    if (normalized.length > 255) { throw new ValidationError("Email is too long"); }
    if (!/^[^\s@]+@[^\s@]+$/.test(normalized)) { throw new ValidationError("Invalid email format"); }
    return normalized;
}

export async function prepareNewUser(user: StagedUser): Promise<NewUser> {
    return { email: user.email, password_hash: await hashPassword(user.password) };
}