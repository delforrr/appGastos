import { useState, useEffect } from "react";
import { getMovimientos, deleteMovimiento, type Movimiento } from "../services/movimientosService";

const useMovements = () => {
  const [movimientos, setMovimientos] = useState<Movimiento[]>([]);

  const fetchMovimientos = async () => {
    try {
      const data = await getMovimientos();
      setMovimientos(data);
    } catch (error) {
      console.error("Error al cargar movimientos:", error);
    }
  };

  useEffect(() => {
    fetchMovimientos();
  }, []);

  const handleDelete = async (id: string | number) => {
    try {
      await deleteMovimiento(id);
      setMovimientos((prev) => prev.filter((m) => m.id !== id));
    } catch (error) {
      console.error("Error al eliminar el movimiento:", error);
    }
  };

  return { movimientos, setMovimientos, handleDelete, fetchMovimientos };
};

export default useMovements;