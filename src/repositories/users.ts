import pool from "../config/database.js";
import { ConflictError } from "../errors.js";
import type { NewUser, User } from "../types.js";

export async function insertUser(user: NewUser): Promise<User> {
    try {
        const result = await pool.query(
            `INSERT INTO users
            (email, password_hash)
            VALUES ($1, $2)
            RETURNING id, email, daily_calories, daily_protein, daily_fat, daily_carbs, created_at`,
            [
                user.email,
                user.password_hash
            ]);

        return result.rows[0];
    }
    catch (error: any) {
        if (error.code === "23505") {
            throw new ConflictError("User with this email already exists");
        }
        throw error;
    }
}