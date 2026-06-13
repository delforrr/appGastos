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
  Skeleton,
  TableSortLabel,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useTheme } from "@mui/material/styles";
import { type Movimiento, type Categoria } from "../services/movimientosService";
import { Link } from "react-router-dom";
import { getCategoryChipStyles } from "../utils/categoryColors";
import { useState } from "react";

interface MovementsProps {
  isRecent: boolean;
  movimientos: Movimiento[];
  categorias?: Categoria[];
  canDelete?: boolean;
  onDelete?: (id: string | number) => void;
  loading?: boolean;
}

const tableHeadeCells = [
  { id: "Fecha", label: "Fecha", align: "left" },
  { id: "Detalle", label: "Detalle", align: "left" },
  { id: "Categoría", label: "Categoría", align: "left" },
  { id: "Monto", label: "Monto", align: "right" },
  { id: "Acciones", label: "Acciones", align: "right" },
] as const;

const EMPTY_CATEGORIAS: Categoria[] = [];

const Movements = ({
  isRecent,
  movimientos,
  categorias = EMPTY_CATEGORIAS,
  canDelete,
  onDelete,
  loading = false,
}: MovementsProps) => {
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState<string | number | null>(null);

  const [orderBy, setOrderBy] = useState<"fecha" | "monto">("fecha");
  const [order, setOrder] = useState<"asc" | "desc">("desc");

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

  const handleRequestSort = (property: "fecha" | "monto") => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const getCategoryName = (catId: string | number) => {
    const cat = categorias.find((c) => String(c.id) === String(catId));
    return cat ? cat.nombre : "Otros";
  };

  const sortedMovimientos = movimientos.toSorted((a, b) => {
    let valA, valB;
    if (orderBy === "fecha") {
      valA = new Date(a.fecha).getTime();
      valB = new Date(b.fecha).getTime();
    } else {
      valA = a.monto;
      valB = b.monto;
    }

    if (valA < valB) return order === "asc" ? -1 : 1;
    if (valA > valB) return order === "asc" ? 1 : -1;
    
    // Fallback sort by ID if same date/amount
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
              {headers.map((headCell) => {
                const isSortable = headCell.id === "Fecha" || headCell.id === "Monto";
                const propKey = headCell.id === "Fecha" ? "fecha" : "monto";
                return (
                  <TableCell
                    key={headCell.id}
                    sx={{
                      fontSize: 16,
                      textTransform: "uppercase",
                      fontWeight: 700,
                    }}
                    align={headCell.align}
                    sortDirection={orderBy === propKey ? order : false}
                  >
                    {isSortable ? (
                      <TableSortLabel
                        active={orderBy === propKey}
                        direction={orderBy === propKey ? order : "asc"}
                        onClick={() => handleRequestSort(propKey)}
                      >
                        {headCell.label}
                      </TableSortLabel>
                    ) : (
                      headCell.label
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton variant="text" width="60%" />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="text" width="80%" />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="rounded" width={80} height={24} />
                  </TableCell>
                  <TableCell align="right">
                    <Skeleton variant="text" width="50%" sx={{ ml: "auto" }} />
                  </TableCell>
                  {canDelete && (
                    <TableCell align="right">
                      <Skeleton variant="circular" width={24} height={24} sx={{ ml: "auto" }} />
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : movimientosAMostrar.length === 0 ? (
              <TableRow>
                <TableCell colSpan={headers.length} align="center" sx={{ py: 3 }}>
                  <Typography variant="body1" color="text.secondary">
                    No hay movimientos registrados
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              movimientosAMostrar.map((movimiento) => {
                const catName = getCategoryName(movimiento.categoriaId);
                return (
                  <TableRow
                    key={movimiento.id}
                    sx={{ "&:hover": { bgcolor: "surface.container" } }}
                  >
                    <TableCell>
                      {new Date(movimiento.fecha).toLocaleDateString("es-AR", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        timeZone: "UTC",
                      })}
                    </TableCell>
                    <TableCell sx={{ fontWeight: 500 }}>
                      {movimiento.concepto}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={catName}
                        sx={{
                          textTransform: "uppercase",
                          fontWeight: 600,
                          ...getCategoryChipStyles(
                            catName,
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
                          component={Link}
                          to={`/edit/${movimiento.id}`}
                          sx={{ color: "primary.main", mr: 1 }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDeleteClick(movimiento.id)}
                          sx={{ color: "error.main" }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })
            )}
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
