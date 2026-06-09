import { readDb } from "./db.js";
import { TipoMovimiento } from "../models/category.js";

export const getTiposMovimientos = async (): Promise<TipoMovimiento[]> => {
  const db = await readDb();
  return db.tiposMovimientos;
};
