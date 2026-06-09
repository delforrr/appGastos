import { AppError } from "./AppError.ts";

export class ValueError extends AppError {
  constructor(message: string) {
    super(400, message);
  }
}
