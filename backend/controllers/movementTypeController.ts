import { Request, Response } from "express";
import * as movementTypeService from "../services/movementTypes.js";

export const getTiposMovimientos = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const types = await movementTypeService.getTiposMovimientos();
  res.json(types);
};
