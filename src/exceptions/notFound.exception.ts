import { baseException } from "./base.exception";

export class NotFoundError extends baseException {
  
    constructor(message: string) {
        super(message, "NotFoundError", 404);
    }
  }
  