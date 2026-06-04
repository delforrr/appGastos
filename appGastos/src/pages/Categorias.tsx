import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { getCategorias, type Categoria } from "../services/movimientosService";
import { getCategoryColor } from "../utils/categoryColors";

const Categorias = () => {
  const [categories, setCategories] = useState<Categoria[]>([]);
  const theme = useTheme();

  useEffect(() => {
    getCategorias().then((categorias) => {
      setCategories(categorias);
    });
  }, []);

  return (
    <Box>
      <Typography variant="h2" sx={{ mb: 4, fontWeight: 700 }}>
        Categorías de Gastos
      </Typography>

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
          {categories.map((category) => {
            const catColor = getCategoryColor(category.nombre);
            return (
              <ListItem
                key={category.id}
                sx={{
                  px: 3,
                  py: 2.5,
                  transition: "0.2s ease-in-out",
                  borderBottom: "1px solid",
                  borderColor: "outline.variant",
                  borderLeft: `6px solid ${catColor.base}`,
                  "&:last-child": { borderBottom: "none" },
                  "&:hover": {
                    bgcolor: "surface.container",
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
                      sx: { fontWeight: 600 }
                    }
                  }}
                  secondary={category.descripcion}
                />
              </ListItem>
            );
          })}
        </List>
      </Paper>
    </Box>
  );
};

export default Categorias;
