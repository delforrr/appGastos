import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";
import { getCategorias } from "../services/gastosService";

const Categorias = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      const categorias = await getCategorias();
      setCategories(categorias);
    };
    fetchCategorias();
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
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <List disablePadding>
          {categories.map((category) => (
            <ListItem
              key={category.id}
              sx={{
                px: 3,
                py: 2,
                transition: "0.3s",
                borderBottom: "1px solid",
                borderColor: "outline.variant",
                "&:last-child": { borderBottom: "none" },
                "&:hover": { bgcolor: "surface.container" },
              }}
            >
              <ListItemText
                primary={category.nombre}
                secondary={category.descripcion}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default Categorias;
