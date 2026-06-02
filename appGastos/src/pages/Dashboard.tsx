import { Box, Typography, Grid, Card, CardContent } from "@mui/material";

const Dashboard = () => {
  return (
    <Box>
      <Typography variant="h2" sx={{ mb: 4, fontWeight: 700 }}>
        Resumen Financiero
      </Typography>
      
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ borderLeft: "4px solid", borderColor: "secondary.main" }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Ingresos del Mes
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 700, color: "secondary.main" }}>
                $120,500.00
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ borderLeft: "4px solid", borderColor: "error.main" }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Gastos del Mes
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 700, color: "error.main" }}>
                $45,320.00
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ borderLeft: "4px solid", borderColor: "primary.main" }}>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Balance Total
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 700, color: "primary.main" }}>
                $75,180.00
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
