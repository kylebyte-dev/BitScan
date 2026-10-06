import { createServer } from "node:http";
import { createProduct } from "./routes/products.js";
import { ValidationError, ConflictError } from "./errors.js";
import pool from "./config/database.js";

pool.query("SELECT NOW()")

    .then(result => {
        console.log(result.rows);
    })

    .catch(error => {
        console.error(error);
    });

const server = createServer(async (request, response) => {

    try {
        if (request.method === "POST" && request.url === "/products") {
            await createProduct(request, response);
            return;
        }
        response.statusCode = 404;
        response.end("Not Found!");
    }
    catch (error: any) {
        if (error instanceof ValidationError) {
            response.statusCode = 400;
            response.setHeader("Content-Type", "text/plain");
            response.end("Error occured: " + error.message);
        }
        else if (error instanceof ConflictError) {
            response.statusCode = 409;
            response.setHeader("Content-Type", "text/plain");
            response.end("Error occured: " + error.message);
        }
        else {
            console.error(error);
            response.statusCode = 500;
            response.setHeader("Content-Type", "text/plain");
            response.end("Internal Server Error");
        }
    }

});

server.listen(3000);