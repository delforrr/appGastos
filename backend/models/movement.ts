export interface Movimiento {
  id: string;
  concepto: string;
  monto: number;
  fecha: string;
  tipo: string;
  categoriaId: number | string;
}
