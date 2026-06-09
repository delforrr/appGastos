import { readDb, writeDb } from "./db.js";
import { Movimiento } from "../models/movement.js";
import crypto from "crypto";
import { ValueError } from "../exception/ValueError.js";

export const getMovimientos = async (): Promise<Movimiento[]> => {
  const db = await readDb();
  return db.movimientos;
};

export const getMovimientoById = async (
  id: string,
): Promise<Movimiento | undefined> => {
  const db = await readDb();
  return db.movimientos.find((m) => m.id === id);
};

export const createMovimiento = async (
  movimientoData: Omit<Movimiento, "id">,
): Promise<Movimiento> => {
  const db = await readDb();

  // json-server IDs
  const id = crypto.randomBytes(6).toString("base64url").slice(0, 11);

  if (!validateMovement(movimientoData)) {
    throw new ValueError("Datos invalidos para crear movimiento");
  }

  const nuevoMovimiento: Movimiento = {
    id,
    ...movimientoData,
  };

  db.movimientos.push(nuevoMovimiento);
  await writeDb(db);
  return nuevoMovimiento;
};

const validateMovement = (movement: Omit<Movimiento, "id">): boolean => {
  if (!movement.concepto) return false;
  if (movement.monto <= 0) return false;
  
  // Robust date parsing and checking
  const movementDate = new Date(movement.fecha);
  if (isNaN(movementDate.getTime())) return false;
  // If the date is in the future compared to today, it's invalid
  const today = new Date();
  today.setHours(23, 59, 59, 999); // allow today
  if (movementDate > today) return false;

  // Case-insensitive check supporting gasto, egreso, ingreso
  const tipoLower = movement.tipo?.toLowerCase();
  if (tipoLower !== "ingreso" && tipoLower !== "gasto" && tipoLower !== "egreso") return false;

  if (!movement.categoriaId) return false;
  return true;
};

export const updateMovimiento = async (
  id: string,
  movimientoData: Movimiento,
): Promise<Movimiento | null> => {
  const db = await readDb();
  const index = db.movimientos.findIndex((m) => m.id === id);
  if (index === -1) return null;

  if (!validateMovement(movimientoData)) {
    throw new ValueError("Datos invalidos para actualizar movimiento");
  }

  db.movimientos[index] = { ...movimientoData, id };
  await writeDb(db);
  return db.movimientos[index];
};

export const deleteMovimiento = async (id: string): Promise<boolean> => {
  const db = await readDb();
  const initialLength = db.movimientos.length;
  db.movimientos = db.movimientos.filter((m) => m.id !== id);
  if (db.movimientos.length === initialLength) return false;

  if (!id) {
    throw new ValueError("ID requerido");
  }

  await writeDb(db);
  return true;
};
