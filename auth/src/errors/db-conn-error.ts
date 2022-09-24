import { errorType } from "../types/errorType";
import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
  reason = "Error Connecting to DB";
  statusCode = 500;
  constructor() {
    super("Error Connecting to DB"); //  message passed just for super
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [
      {
        message: this.reason,
      },
    ];
  }
}
