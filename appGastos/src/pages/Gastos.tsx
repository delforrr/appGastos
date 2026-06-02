import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const Gastos = () => {
  const transactions = [
    { id: 1, detail: "Supermercado", category: "Alimentos", amount: 4500.00, date: "2026-06-02" },
    { id: 2, detail: "Carga de combustible", category: "Transporte", amount: 8200.00, date: "2026-06-01" },
    { id: 3, detail: "Suscripción Netflix", category: "Entretenimiento", amount: 1500.00, date: "2026-05-28" },
  ];

  return (
    <Box>
      <Typography variant="h2" sx={{ mb: 4, fontWeight: 700 }}>
        Mis Gastos
      </Typography>

      <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid", borderColor: "outline.variant", borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ bgcolor: "surface.low" }}>
            <TableRow>
              <TableCell>Detalle</TableCell>
              <TableCell>Categoría</TableCell>
              <TableCell align="right">Monto</TableCell>
              <TableCell>Fecha</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((t) => (
              <TableRow key={t.id} sx={{ '&:hover': { bgcolor: "surface.container" } }}>
                <TableCell sx={{ fontWeight: 500 }}>{t.detail}</TableCell>
                <TableCell>{t.category}</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600, color: "error.main" }}>
                  ${t.amount.toFixed(2)}
                </TableCell>
                <TableCell>{t.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Gastos;
