import { Box, Typography, Grid } from "@mui/material";
import MainCard from "../components/MainCard";
import RecentTransactions from "../components/Movements";
import { useEffect, useState } from "react";
import {
  getMovimientos,
  type Movimiento,
} from "../services/movimientosService";

const Dashboard = () => {
  // Esto va al backend
  const [movimientos, setMovimientos] = useState<Movimiento[]>([]);

  useEffect(() => {
    getMovimientos().then((data) => {
      setMovimientos(data);
    });
  }, []);

  const totalIngresos = movimientos
    .filter((m) => m.tipo === "ingreso")
    .reduce((sum, m) => sum + m.monto, 0);

  const totalGastos = movimientos
    .filter((m) => m.tipo === "gasto")
    .reduce((sum, m) => sum + m.monto, 0);

  const balance = totalIngresos - totalGastos;
  // Hasta acá

  return (
    <Box>
      <Typography variant="h2" sx={{ mb: 4, fontWeight: 700 }}>
        Resumen Financiero
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <MainCard
            type="balance"
            amount={balance}
            percentage="+12.4%"
            isPositive={true}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <MainCard
            type="ingresos"
            amount={totalIngresos}
            percentage="+8.2%"
            isPositive={true}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <MainCard
            type="gastos"
            amount={totalGastos}
            percentage="-3.2%"
            isPositive={false}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <RecentTransactions isRecent={true} movimientos={movimientos} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}></Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
