import { IncomingMessage, ServerResponse } from "node:http";
import { readJsonBody } from "../utils/http.js";
import { prepareNewUser, validateUser } from "../services/users.js";
import { insertUser } from "../repositories/users.js";

export async function createUser(
    request: IncomingMessage,
    response: ServerResponse
) {
    const result = await insertUser(await prepareNewUser(validateUser(await readJsonBody(request))));

    response.statusCode = 201;
    response.setHeader("Content-Type", "application/json");
    response.end(JSON.stringify(result));
}