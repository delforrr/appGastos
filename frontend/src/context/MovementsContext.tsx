/* eslint-disable react-refresh/only-export-components */
import React, { createContext, use, useState, useEffect, useTransition, useCallback, useMemo } from "react";
import {
  getMovimientos,
  getCategorias,
  deleteMovimiento as apiDeleteMovimiento,
  createMovimiento as apiCreateMovimiento,
  updateMovimiento as apiUpdateMovimiento,
  type Movimiento,
  type Categoria,
} from "../services/movimientosService";

interface MovementsContextType {
  movimientos: Movimiento[];
  categorias: Categoria[];
  loading: boolean;
  error: string | null;
  setError: (err: string | null) => void;
  fetchMovimientos: () => Promise<void>;
  handleDelete: (id: string | number) => Promise<void>;
  handleCreate: (movimiento: Omit<Movimiento, "id">) => Promise<Movimiento>;
  handleUpdate: (movimiento: Movimiento) => Promise<Movimiento>;
}

const MovementsContext = createContext<MovementsContextType | undefined>(undefined);

export const useMovementsContext = () => {
  const context = use(MovementsContext);
  if (!context) {
    throw new Error("useMovementsContext debe usarse dentro de un MovementsContextProvider");
  }
  return context;
};

export const MovementsContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [movimientos, setMovimientos] = useState<Movimiento[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const fetchMovimientos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [movs, cats] = await Promise.all([
        getMovimientos(),
        getCategorias(),
      ]);
      startTransition(() => {
        setMovimientos(movs);
        setCategorias(cats);
      });
    } catch (err) {
      console.error("Error al cargar datos globales:", err);
      setError(
        "No se pudo establecer conexión con el servidor. Intente de nuevo más tarde.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchMovimientos();
  }, [fetchMovimientos]);

  const handleDelete = useCallback(async (id: string | number) => {
    try {
      await apiDeleteMovimiento(id);
      startTransition(() => {
        setMovimientos((prev) => prev.filter((m) => m.id !== id));
      });
    } catch (err) {
      console.error("Error al eliminar el movimiento:", err);
      setError("No se pudo eliminar el movimiento. Verifique su conexión de red.");
      throw err;
    }
  }, []);

  const handleCreate = useCallback(async (movimientoData: Omit<Movimiento, "id">): Promise<Movimiento> => {
    try {
      const newMov = await apiCreateMovimiento(movimientoData);
      startTransition(() => {
        setMovimientos((prev) => [...prev, newMov]);
      });
      return newMov;
    } catch (err) {
      console.error("Error al crear el movimiento:", err);
      setError("No se pudo crear el movimiento. Verifique su conexión de red.");
      throw err;
    }
  }, []);

  const handleUpdate = useCallback(async (movimientoData: Movimiento): Promise<Movimiento> => {
    try {
      const updatedMov = await apiUpdateMovimiento(movimientoData);
      startTransition(() => {
        setMovimientos((prev) =>
          prev.map((m) => (m.id === updatedMov.id ? updatedMov : m))
        );
      });
      return updatedMov;
    } catch (err) {
      console.error("Error al actualizar el movimiento:", err);
      setError("No se pudo actualizar el movimiento. Verifique su conexión de red.");
      throw err;
    }
  }, []);

  const contextValue = useMemo(() => ({
    movimientos,
    categorias,
    loading: loading || isPending,
    error,
    setError,
    fetchMovimientos,
    handleDelete,
    handleCreate,
    handleUpdate,
  }), [
    movimientos,
    categorias,
    loading,
    isPending,
    error,
    fetchMovimientos,
    handleDelete,
    handleCreate,
    handleUpdate,
  ]);

  return (
    <MovementsContext.Provider value={contextValue}>
      {children}
    </MovementsContext.Provider>
  );
};
