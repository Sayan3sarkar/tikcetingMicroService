import { errorType } from "../types/errorType";
import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
  statusCode = 404;
  constructor() {
    super("Route Not Found");
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors(): errorType[] {
    return [
      {
        message: "Route Not found",
      },
    ];
  }
}
