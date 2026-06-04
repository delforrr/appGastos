import { Box, Typography, Grid, Alert, Button } from "@mui/material";
import MainCard from "../components/MainCard";
import RecentTransactions from "../components/Movements";
import useMovements from "../hooks/useMovements";

const Dashboard = () => {
  const { movimientos, categorias, loading, error, fetchMovimientos } =
    useMovements();

  const totalIngresos = movimientos
    .filter((m) => m.tipo === "ingreso")
    .reduce((sum, m) => sum + m.monto, 0);

  const totalGastos = movimientos
    .filter((m) => m.tipo === "gasto")
    .reduce((sum, m) => sum + m.monto, 0);

  const balance = totalIngresos - totalGastos;

  const gastos = movimientos.filter((m) => m.tipo === "gasto");
  const gastoMasAlto =
    gastos.length > 0
      ? gastos.reduce((max, m) => (m.monto > max.monto ? m : max), gastos[0])
      : null;

  return (
    <Box>
      <Typography variant="h2" sx={{ mb: 4, fontWeight: 700 }}>
        Resumen Financiero
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

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <MainCard
            type="balance"
            amount={balance}
            percentage="+12.4%"
            isPositive={true}
            loading={loading}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <MainCard
            type="ingresos"
            amount={totalIngresos}
            percentage="+8.2%"
            isPositive={true}
            loading={loading}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <MainCard
            type="gastos"
            amount={totalGastos}
            percentage="-3.2%"
            isPositive={false}
            loading={loading}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <MainCard
            type="gasto_max"
            amount={gastoMasAlto?.monto || 0}
            concept={gastoMasAlto?.concepto || "Sin gastos registrados"}
            isPositive={false}
            loading={loading}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <RecentTransactions
            isRecent={true}
            movimientos={movimientos}
            categorias={categorias}
            loading={loading}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}></Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
