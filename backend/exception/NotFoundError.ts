import { AppError } from "./AppError.ts";

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(404, message);
  }
}
