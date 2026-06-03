import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Table,
  Typography,
  Stack,
  Button,
  Box,
  Chip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { getMovimientos, type Movimiento } from "../services/gastosService";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategoryChipStyles } from "../utils/categoryColors";

const Movements = ({ isRecent }: { isRecent: boolean }) => {
  const [movimientos, setMovimientos] = useState<Movimiento[]>([]);
  const theme = useTheme();

  useEffect(() => {
    async function fetchMovimientos() {
      const movimientos = await getMovimientos();
      setMovimientos(movimientos);
    }
    fetchMovimientos();
  }, []);

  const sortedMovimientos = movimientos.toSorted((a, b) => {
    const dateDiff = b.fecha.localeCompare(a.fecha);
    if (dateDiff !== 0) return dateDiff;
    return Number(b.id) - Number(a.id);
  });

  const movimientosAMostrar = isRecent
    ? sortedMovimientos.slice(0, 5)
    : sortedMovimientos;

  const tableHeadeCells = [
    { id: "Fecha", label: "Fecha", align: "left" },
    { id: "Detalle", label: "Detalle", align: "left" },
    { id: "Categoría", label: "Categoría", align: "left" },
    { id: "Monto", label: "Monto", align: "right" },
  ] as const;

  return (
    <Box sx={{ width: "100%" }}>
      <Stack
        direction="row"
        sx={{
          width: "100%",
          mb: 2,
          px: 1,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 700 }}>
          {isRecent ? "Movimientos Recientes" : "Todos los Movimientos"}
        </Typography>
        {isRecent && (
          <Button
            component={Link}
            to="/movimientos"
            variant="text"
            sx={{ fontWeight: 600 }}
          >
            Ver todos
          </Button>
        )}
      </Stack>

      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          border: "1px solid",
          borderColor: "outline.variant",
          borderRadius: 2,
        }}
      >
        <Table>
          <TableHead
            sx={{
              bgcolor: (theme) =>
                theme.palette.mode === "light" ? "#dfe7ffff" : "surface.low",
            }}
          >
            <TableRow>
              {tableHeadeCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  sx={{
                    fontSize: 16,
                    textTransform: "uppercase",
                    fontWeight: 700,
                  }}
                  align={headCell.align}
                >
                  {headCell.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {movimientosAMostrar.map((movimiento) => (
              <TableRow
                key={movimiento.id}
                sx={{ "&:hover": { bgcolor: "surface.container" } }}
              >
                <TableCell>{movimiento.fecha}</TableCell>
                <TableCell sx={{ fontWeight: 500 }}>
                  {movimiento.concepto}
                </TableCell>
                <TableCell>
                  <Chip
                    label={movimiento.categoria}
                    sx={{
                      textTransform: "uppercase",
                      fontWeight: 600,
                      ...getCategoryChipStyles(movimiento.categoria, theme.palette.mode),
                    }}
                  />
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ fontWeight: 600, color: movimiento.tipo === "ingreso" ? "success.dark" : "error.main" }}
                >
                  ${movimiento.monto.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Movements;
