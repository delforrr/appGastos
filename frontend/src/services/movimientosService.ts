import axios from "axios";

export interface Movimiento {
  id: number | string;
  concepto: string;
  categoriaId: number | string;
  monto: number;
  fecha: string;
  tipo: string;
}

export interface Categoria {
  id: number | string;
  nombre: string;
  descripcion: string;
  tipoCategoria: string;
}

export interface TipoMovimiento {
  id: number;
  nombre: string;
}

const BASE_URL = "http://localhost:3001";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Movimientos

export const getMovimientos = async (): Promise<Movimiento[]> => {
  const response = await api.get<Movimiento[]>("/movimientos");
  return response.data;
};

export const getMovimientoById = async (id: number | string): Promise<Movimiento> => {
  const response = await api.get<Movimiento>(`/movimientos/${id}`);
  return response.data;
};

export const createMovimiento = async (movimiento: Omit<Movimiento, "id">): Promise<Movimiento> => {
  const response = await api.post<Movimiento>("/movimientos", movimiento);
  return response.data;
};

export const deleteMovimiento = async (id: number | string): Promise<void> => {
  await api.delete(`/movimientos/${id}`);
};

export const updateMovimiento = async (movimiento: Movimiento): Promise<Movimiento> => {
  const response = await api.put<Movimiento>(`/movimientos/${movimiento.id}`, movimiento);
  return response.data;
};

// Tipo de Movimiento

export const getTiposMovimientos = async (): Promise<TipoMovimiento[]> => {
  const response = await api.get<TipoMovimiento[]>("/tiposMovimientos");
  return response.data;
};

export const getTipoMovimientoById = async (id: number): Promise<TipoMovimiento> => {
  const response = await api.get<TipoMovimiento>(`/tiposMovimientos/${id}`);
  return response.data;
};

// Categorias

export const getCategoriaById = async (id: number): Promise<Categoria> => {
  const response = await api.get<Categoria>(`/categorias/${id}`);
  return response.data;
};

export const getCategorias = async (): Promise<Categoria[]> => {
  const response = await api.get<Categoria[]>("/categorias");
  return response.data;
};

export const createCategoria = async (categoria: Categoria): Promise<Categoria> => {
  const response = await api.post<Categoria>("/categorias", categoria);
  return response.data;
};

export const deleteCategoria = async (id: number): Promise<void> => {
  await api.delete(`/categorias/${id}`);
};

export const updateCategoria = async (categoria: Categoria): Promise<Categoria> => {
  const response = await api.put<Categoria>(`/categorias/${categoria.id}`, categoria);
  return response.data;
};
