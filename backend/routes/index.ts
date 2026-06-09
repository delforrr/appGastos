import { Router } from "express";
import * as movementController from "../controllers/movementController.js";
import * as categoryController from "../controllers/categoryController.js";
import * as movementTypeController from "../controllers/movementTypeController.js";

const router = Router();

router.get("/", (_, res) => res.send("Aplicacion de Gastos"));

// Movimientos
router.get("/movimientos", movementController.getMovimientos);
router.get("/movimientos/:id", movementController.getMovimientoById);
router.post("/movimientos", movementController.createMovimiento);
router.put("/movimientos/:id", movementController.updateMovimiento);
router.delete("/movimientos/:id", movementController.deleteMovimiento);

// Categorias
router.get("/categorias", categoryController.getCategorias);
router.get("/categorias/:id", categoryController.getCategoriaById);

// Tipos de Movimiento
router.get("/tiposMovimientos", movementTypeController.getTiposMovimientos);

export default router;
