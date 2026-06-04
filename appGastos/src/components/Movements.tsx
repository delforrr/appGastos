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
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@mui/material/styles";
import { type Movimiento } from "../services/movimientosService";
import { Link } from "react-router-dom";
import { getCategoryChipStyles } from "../utils/categoryColors";
import { useState } from "react";

interface MovementsProps {
  isRecent: boolean;
  movimientos: Movimiento[];
  canDelete?: boolean;
  onDelete?: (id: string | number) => void;
}

const tableHeadeCells = [
  { id: "Fecha", label: "Fecha", align: "left" },
  { id: "Detalle", label: "Detalle", align: "left" },
  { id: "Categoría", label: "Categoría", align: "left" },
  { id: "Monto", label: "Monto", align: "right" },
  { id: "Acciones", label: "Acciones", align: "right" },
] as const;

const Movements = ({ isRecent, movimientos, canDelete, onDelete }: MovementsProps) => {
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState<string | number | null>(null);

  const headers = canDelete
    ? tableHeadeCells
    : tableHeadeCells.filter((cell) => cell.id !== "Acciones");

  const handleDeleteClick = (id: string | number) => {
    setSelectedId(id);
    setOpenDialog(true);
  };

  const handleConfirmDelete = () => {
    if (selectedId !== null) {
      onDelete?.(selectedId);
      setOpenDialog(false);
      setSelectedId(null);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedId(null);
  };

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
              {headers.map((headCell) => (
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
                {canDelete && (
                  <TableCell align="right">
                    <IconButton
                      onClick={() => handleDeleteClick(movimiento.id)}
                      sx={{ color: "error.main" }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
        slotProps={{
          paper: {
            sx: {
              borderRadius: 5,
              p: 2,
            }
          }
        }}
      >
        <DialogTitle id="delete-dialog-title">
          <Typography sx={{ fontWeight: 700, fontSize: 20 }}>¿Confirmar eliminación?</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            ¿Estás seguro de que deseas eliminar este movimiento? Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Movements;
