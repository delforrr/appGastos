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
  return db.movimientos.find((m) => String(m.id) === String(id));
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
    ...movimientoData,
    id,
  };

  db.movimientos.push(nuevoMovimiento);
  await writeDb(db);
  return nuevoMovimiento;
};

const validateMovement = (movement: Omit<Movimiento, "id">): boolean => {
  if (!movement.concepto) return false;
  if (movement.monto <= 0) return false;
  
  // Parseo y validacion de fecha
  const movementDate = new Date(movement.fecha);
  if (isNaN(movementDate.getTime())) return false;
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  if (movementDate > today) return false;

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
  const index = db.movimientos.findIndex((m) => String(m.id) === String(id));
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
  db.movimientos = db.movimientos.filter((m) => String(m.id) !== String(id));
  if (db.movimientos.length === initialLength) return false;

  if (!id) {
    throw new ValueError("ID requerido");
  }

  await writeDb(db);
  return true;
};
