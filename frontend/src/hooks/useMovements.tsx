import { useState, useEffect } from "react";
import {
  getMovimientos,
  deleteMovimiento,
  getCategorias,
  type Movimiento,
  type Categoria,
} from "../services/movimientosService";

const useMovements = () => {
  const [movimientos, setMovimientos] = useState<Movimiento[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMovimientos = async () => {
    setLoading(true);
    setError(null);
    try {
      const [movs, cats] = await Promise.all([
        getMovimientos(),
        getCategorias(),
      ]);
      setMovimientos(movs);
      setCategorias(cats);
    } catch (err: any) {
      console.error("Error al cargar datos:", err);
      setError(
        "No se pudo establecer conexión con el servidor. Intente de nuevo más tarde.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovimientos();
  }, []);

  const handleDelete = async (id: string | number) => {
    try {
      await deleteMovimiento(id);
      setMovimientos((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      console.error("Error al eliminar el movimiento:", err);
      setError(
        "No se pudo eliminar el movimiento. Verifique su conexión de red.",
      );
    }
  };

  return {
    movimientos,
    setMovimientos,
    categorias,
    loading,
    error,
    handleDelete,
    fetchMovimientos,
  };
};

export default useMovements;
