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

let dbQueue: Promise<any> = Promise.resolve();

const queueTask = <T>(task: () => Promise<T>): Promise<T> => {
  return new Promise((resolve, reject) => {
    dbQueue = dbQueue.then(async () => {
      try {
        const result = await task();
        resolve(result);
      } catch (err) {
        reject(err);
      }
    }).catch(() => {});
  });
};

// Maneja el mockup de bd escribiendo en db.json de forma secuencial
export async function readDb(): Promise<DatabaseSchema> {
  return queueTask(async () => {
    try {
      const data = await fs.readFile(DB_PATH, "utf-8");
      return JSON.parse(data) as DatabaseSchema;
    } catch (error) {
      console.error("Error reading database file, returning empty schema:", error);
      return { tiposMovimientos: [], categorias: [], movimientos: [] };
    }
  });
}

export async function writeDb(data: DatabaseSchema): Promise<void> {
  return queueTask(async () => {
    try {
      await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
    } catch (error) {
      console.error("Error writing to database file:", error);
      throw error;
    }
  });
}
