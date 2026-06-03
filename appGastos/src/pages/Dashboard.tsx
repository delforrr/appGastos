import { Box, Typography, Grid } from "@mui/material";
import BalanceCard from "../components/BalanceCard";
import RecentTransactions from "../components/Movements";

const Dashboard = () => {
  return (
    <Box>
      <Typography variant="h2" sx={{ mb: 4, fontWeight: 700 }}>
        Resumen Financiero
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <BalanceCard type="balance" />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <BalanceCard type="gastos" />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <BalanceCard type="ingresos" />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <RecentTransactions isRecent={true} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}></Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
