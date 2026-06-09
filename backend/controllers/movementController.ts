import { Request, Response } from "express";
import * as movementService from "../services/movements.js";
import { NotFoundError } from "../exception/NotFoundError.js";

export const getMovimientos = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const movements = await movementService.getMovimientos();
  res.json(movements);
};

export const getMovimientoById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const id = String(req.params.id);
  const movement = await movementService.getMovimientoById(id);
  if (!movement) {
    throw new NotFoundError("Movimiento no encontrado");
  }
  res.json(movement);
};

export const createMovimiento = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const newMovement = await movementService.createMovimiento(req.body);
  res.status(201).json(newMovement);
};

export const updateMovimiento = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const id = String(req.params.id);
  const updatedMovement = await movementService.updateMovimiento(id, req.body);
  if (!updatedMovement) {
    throw new NotFoundError("Movimiento no encontrado");
  }
  res.json(updatedMovement);
};

export const deleteMovimiento = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const id = String(req.params.id);
  const deleted = await movementService.deleteMovimiento(id);
  if (!deleted) {
    throw new NotFoundError("Movimiento no encontrado");
  }
  res.status(204).send();
};
