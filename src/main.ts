import { createServer } from "node:http";
import { createProduct, getProduct } from "./routes/products.js";
import { createUser } from "./routes/users.js";
import { ValidationError, ConflictError, NotFoundError } from "./errors.js";

const server = createServer(async (request, response) => {

    const url = new URL(request.url ?? "", "http://localhost");
    const path = url.pathname;

    try {
        if (request.method === "POST" && path === "/products") {
            await createProduct(request, response);
            return;
        }
        if (request.method === "GET" && path.startsWith("/products/")) {
            const barcode = path.slice("/products/".length);
            await getProduct(response, barcode);
            return;
        }
        if (request.method === "POST" && path === "/register") {
            await createUser(request, response);
            return;
        }
        response.statusCode = 404;
        response.end("Not Found!");
    }
    catch (error: any) {
        if (error instanceof ValidationError) {
            response.statusCode = 400;
            response.setHeader("Content-Type", "text/plain");
            response.end("Error occurred: " + error.message);
        }
        else if (error instanceof NotFoundError) {
            response.statusCode = 404;
            response.setHeader("Content-Type", "text/plain");
            response.end("Error occurred: " + error.message);
        }
        else if (error instanceof ConflictError) {
            response.statusCode = 409;
            response.setHeader("Content-Type", "text/plain");
            response.end("Error occurred: " + error.message);
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