import { Box, Typography, List, ListItem, ListItemText, Paper, Divider } from "@mui/material";

const Categorias = () => {
  const categories = [
    { id: 1, name: "Alimentos", description: "Compras de supermercado y comida rápida" },
    { id: 2, name: "Transporte", description: "Subte, colectivos, taxi y combustible" },
    { id: 3, name: "Servicios", description: "Luz, gas, internet, agua, etc." },
    { id: 4, name: "Entretenimiento", description: "Salidas, cine, suscripciones online" }
  ];

  return (
    <Box>
      <Typography variant="h2" sx={{ mb: 4, fontWeight: 700 }}>
        Categorías de Gastos
      </Typography>

      <Paper elevation={0} sx={{ border: "1px solid", borderColor: "outline.variant", borderRadius: 2, overflow: "hidden" }}>
        <List disablePadding>
          {categories.map((c, index) => (
            <Box key={c.id}>
              <ListItem sx={{ py: 2, px: 3 }}>
                <ListItemText 
                  primary={
                    <Typography sx={{ fontWeight: 600, color: "text.primary" }}>
                      {c.name}
                    </Typography>
                  } 
                  secondary={
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      {c.description}
                    </Typography>
                  }
                />
              </ListItem>
              {index < categories.length - 1 && <Divider sx={{ borderColor: "outline.variant" }} />}
            </Box>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default Categorias;
