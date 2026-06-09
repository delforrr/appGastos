import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { Movimiento } from "../models/movement.js";
import { Categoria, TipoMovimiento } from "../models/category.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.resolve(__dirname, "../db.json");

export interface DatabaseSchema {
  tiposMovimientos: TipoMovimiento[];
  categorias: Categoria[];
  movimientos: Movimiento[];
}

// Maneja el mockup de bd escribiendo en db.json
export async function readDb(): Promise<DatabaseSchema> {
  try {
    const data = await fs.readFile(DB_PATH, "utf-8");
    return JSON.parse(data) as DatabaseSchema;
  } catch (error) {
    console.error("Error reading database file:", error);
    return { tiposMovimientos: [], categorias: [], movimientos: [] };
  }
}

export async function writeDb(data: DatabaseSchema): Promise<void> {
  try {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing to database file:", error);
    throw error;
  }
}
