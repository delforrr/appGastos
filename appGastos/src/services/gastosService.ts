import axios from "axios";

export interface Gasto {
  id: number;
  concepto: string;
  categoria: string;
  monto: number;
  fecha: string;
}

export interface Categoria {
  id: number;
  nombre: string;
  descripcion: string;
}

const BASE_URL = "http://localhost:3001";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// TODO: Ver como implementar esto sin backend
export const getIngresos = async (): Promise<Gasto[]> => {
  const response = await api.get<Gasto[]>("/gastos");
  return response.data;
};

export const getGastos = async (): Promise<Gasto[]> => {
  const response = await api.get<Gasto[]>("/gastos");
  return response.data;
};

export const getGastoById = async (id: number): Promise<Gasto> => {
  const response = await api.get<Gasto>(`/gastos/${id}`);
  return response.data;
};

export const createGasto = async (gasto: Gasto): Promise<Gasto> => {
  const response = await api.post<Gasto>("/gastos", gasto);
  return response.data;
};

export const deleteGasto = async (id: number): Promise<void> => {
  await api.delete(`/gastos/${id}`);
};

export const updateGasto = async (gasto: Gasto): Promise<Gasto> => {
  const response = await api.put<Gasto>(`/gastos/${gasto.id}`, gasto);
  return response.data;
};

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
