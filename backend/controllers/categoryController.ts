import { Request, Response } from "express";
import * as categoryService from "../services/categories.js";
import { NotFoundError } from "../exception/NotFoundError.js";

export const getCategorias = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const categories = await categoryService.getCategorias();
  res.json(categories);
};

export const getCategoriaById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const id = String(req.params.id);
  const category = await categoryService.getCategoriaById(id);
  if (!category) {
    throw new NotFoundError("Categoría no encontrada");
  }
  res.json(category);
};
