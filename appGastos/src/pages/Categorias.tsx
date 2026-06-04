import { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Alert,
  Button,
  Skeleton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { getCategoryColor } from "../utils/categoryColors";
import useMovements from "../hooks/useMovements";
import { type Categoria } from "../services/movimientosService";
import Movements from "../components/Movements";

const Categorias = () => {
  const {
    movimientos,
    categorias: categories,
    loading,
    error,
    fetchMovimientos,
  } = useMovements();
  const [selectedCategoryId, setSelectedCategoryId] = useState<
    string | number | null
  >(null);
  const theme = useTheme();

  const getCategoryTotal = (category: Categoria) => {
    const isIngreso = category.tipoCategoria === "ingreso";
    return movimientos
      .filter(
        (m) =>
          m.tipo === (isIngreso ? "ingreso" : "gasto") &&
          String(m.categoriaId) === String(category.id),
      )
      .reduce((sum, m) => sum + m.monto, 0);
  };

  const filteredMovimientos = selectedCategoryId
    ? movimientos.filter(
        (m) => String(m.categoriaId) === String(selectedCategoryId),
      )
    : movimientos;

  return (
    <Box>
      <Typography variant="h2" sx={{ mb: 4, fontWeight: 700 }}>
        Categorías de Gastos
      </Typography>

      {error && (
        <Alert
          severity="error"
          sx={{ mb: 4, borderRadius: 2 }}
          action={
            <Button color="inherit" size="small" onClick={fetchMovimientos}>
              Reintentar
            </Button>
          }
        >
          {error}
        </Alert>
      )}

      <Paper
        elevation={0}
        sx={{
          border: "1px solid",
          borderColor: "outline.variant",
          borderRadius: 3,
          overflow: "hidden",
          boxShadow:
            theme.palette.mode === "light"
              ? "0 4px 20px rgba(0, 0, 0, 0.05)"
              : "0 4px 20px rgba(0, 0, 0, 0.3)",
        }}
      >
        <List disablePadding>
          {loading
            ? Array.from({ length: 5 }).map((_, index) => (
                <ListItem
                  key={index}
                  sx={{
                    px: 3,
                    py: 2.5,
                    borderBottom: "1px solid",
                    borderColor: "outline.variant",
                    "&:last-child": { borderBottom: "none" },
                  }}
                >
                  <Skeleton
                    variant="circular"
                    width={12}
                    height={12}
                    sx={{ mr: 2.5 }}
                  />
                  <ListItemText
                    primary={<Skeleton width="40%" />}
                    secondary={<Skeleton width="60%" />}
                  />
                  <Box sx={{ ml: "auto", textAlign: "right" }}>
                    <Skeleton width={80} height={24} />
                    <Skeleton width={60} height={16} />
                  </Box>
                </ListItem>
              ))
            : categories.map((category) => {
                const catColor = getCategoryColor(category.nombre);
                const totalAmount = getCategoryTotal(category);
                const isSelected = selectedCategoryId === category.id;
                const isIngreso = category.tipoCategoria === "ingreso";

                return (
                  <ListItem
                    key={category.id}
                    onClick={() =>
                      setSelectedCategoryId(isSelected ? null : category.id)
                    }
                    sx={{
                      px: 3,
                      py: 2.5,
                      cursor: "pointer",
                      transition: "0.2s ease-in-out",
                      borderBottom: "1px solid",
                      borderColor: "outline.variant",
                      borderLeft: `6px solid ${catColor.base}`,
                      bgcolor: isSelected ? "action.selected" : "transparent",
                      "&:last-child": { borderBottom: "none" },
                      "&:hover": {
                        bgcolor: isSelected
                          ? "action.selected"
                          : "action.hover",
                        pl: 3.5,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        bgcolor: catColor.base,
                        mr: 2.5,
                        boxShadow: `0 0 8px ${catColor.base}bb`,
                        flexShrink: 0,
                      }}
                    />
                    <ListItemText
                      primary={category.nombre}
                      slotProps={{
                        primary: {
                          variant: "h5",
                          sx: { fontWeight: 600 },
                        },
                      }}
                      secondary={category.descripcion}
                    />
                    <Box sx={{ ml: "auto", textAlign: "right", pl: 2 }}>
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 700,
                          color: isIngreso ? "success.dark" : "text.primary",
                        }}
                      >
                        $
                        {totalAmount.toLocaleString("es-AR", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {isIngreso ? "Total Ingresado" : "Total Gastado"}
                      </Typography>
                    </Box>
                  </ListItem>
                );
              })}
        </List>
      </Paper>

      <Box sx={{ mt: 5 }}>
        {selectedCategoryId && (
          <Alert
            severity="info"
            sx={{ mb: 3, borderRadius: 2 }}
            action={
              <Button
                color="inherit"
                size="small"
                onClick={() => setSelectedCategoryId(null)}
              >
                Limpiar filtro
              </Button>
            }
          >
            Filtrando por categoría:{" "}
            <strong>
              {
                categories.find(
                  (c) => String(c.id) === String(selectedCategoryId),
                )?.nombre
              }
            </strong>
          </Alert>
        )}

        <Movements
          isRecent={false}
          movimientos={filteredMovimientos}
          categorias={categories}
          canDelete={false}
          loading={loading}
        />
      </Box>
    </Box>
  );
};

export default Categorias;
