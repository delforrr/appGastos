import { Request, Response, NextFunction } from "express";
import { AppError } from "../exception/AppError.js";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.message });
    return;
  }

  console.error("Internal Server Error:", err);
  res.status(500).json({ error: "Ocurrió un error inesperado" });
};
