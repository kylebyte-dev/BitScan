import dotenv from "dotenv";
import { Pool, types } from "pg";

dotenv.config({ path: ".env" });

types.setTypeParser(1700, (value) => parseFloat(value));

const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

export default pool;