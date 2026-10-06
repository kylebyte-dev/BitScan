import { IncomingMessage } from "node:http";
import { ValidationError } from "../errors.js";

export function readJsonBody(request: IncomingMessage) {
    return new Promise((resolve, reject) => {
        let body = "";

        request.on("data", (chunk) => { body += chunk; });

        request.on("end", () => {
            try {
                const parsedJSON = JSON.parse(body);
                resolve(parsedJSON);
            }

            catch { reject(new ValidationError("Invalid JSON")) }

        });
    }

    )
}

