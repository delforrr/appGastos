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
import {
  type Movimiento,
} from "../services/movimientosService";
import { Link } from "react-router-dom";
import { getCategoryChipStyles } from "../utils/categoryColors";

interface MovementsProps {
  isRecent: boolean;
  movimientos: Movimiento[];
}

const tableHeadeCells = [
  { id: "Fecha", label: "Fecha", align: "left" },
  { id: "Detalle", label: "Detalle", align: "left" },
  { id: "Categoría", label: "Categoría", align: "left" },
  { id: "Monto", label: "Monto", align: "right" },
] as const;

const Movements = ({ isRecent, movimientos }: MovementsProps) => {
  const theme = useTheme();

  const sortedMovimientos = movimientos.toSorted((a, b) => {
    const dateA = new Date(a.fecha);
    const dateB = new Date(b.fecha);
    const dateDiff = dateB.getTime() - dateA.getTime();
    if (dateDiff !== 0) return dateDiff;
    return String(b.id).localeCompare(String(a.id));
  });

  const movimientosAMostrar = isRecent
    ? sortedMovimientos.slice(0, 5)
    : sortedMovimientos;

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
                <TableCell>
                  {new Date(movimiento.fecha).toLocaleDateString("es-AR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </TableCell>
                <TableCell sx={{ fontWeight: 500 }}>
                  {movimiento.concepto}
                </TableCell>
                <TableCell>
                  <Chip
                    label={movimiento.categoria}
                    sx={{
                      textTransform: "uppercase",
                      fontWeight: 600,
                      ...getCategoryChipStyles(
                        movimiento.categoria,
                        theme.palette.mode,
                      ),
                    }}
                  />
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    fontWeight: 600,
                    color:
                      movimiento.tipo === "ingreso"
                        ? "success.dark"
                        : "error.main",
                  }}
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
