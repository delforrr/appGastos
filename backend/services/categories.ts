import { readDb } from "./db.js";
import { Categoria } from "../models/category.js";

export const getCategorias = async (): Promise<Categoria[]> => {
  const db = await readDb();
  return db.categorias;
};

export const getCategoriaById = async (id: string): Promise<Categoria | undefined> => {
  const db = await readDb();
  return db.categorias.find((c) => c.id === id);
};
