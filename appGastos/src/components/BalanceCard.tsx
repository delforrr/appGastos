import { Paper, Typography, Box, Stack } from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

interface BalanceCardProps {
  type: "balance" | "gastos" | "ingresos";
}

const BalanceCard = ({ type }: BalanceCardProps) => {

  const title = type === "balance" ? "Balance Total" : type === "gastos" ? "Gastos" : "Ingresos";
  
  return (
    <Paper
      elevation={0}
      sx={{
        p: 5,
        borderRadius: type === "balance" ? 4 : 2,
        background: type === "balance"
          ? "linear-gradient(135deg, #32394f 0%, #1e2230 100%)"
          : "background.paper",
        color: type === "balance" ? "#ffffff" : "text.primary",
        boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.15)",
        border: type === "balance" ? "none" : "2px solid",
        borderColor: "outline.variant",
      }}
    >
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Stack spacing={1.5}>
          <Typography
            variant="caption"
            sx={{
              fontWeight: 700,
              fontSize: "0.75rem",
              letterSpacing: "0.08em",
              color: "#a0aec0", // Gris/azul atenuado para el texto secundario
              textTransform: "uppercase",
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              fontSize: "2.25rem",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            $24,562.00
          </Typography>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            spacing={0.5}
          >
            <TrendingUpIcon sx={{ fontSize: 16, color: "#48bb78" }} />
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: "#48bb78", // Verde para porcentaje positivo
                fontSize: "0.85rem",
              }}
            >
              +2.4% from last month
            </Typography>
          </Stack>
        </Stack>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 1.2,
            borderRadius: 2,
            border: "1.5px solid rgba(255, 255, 255, 0.2)",
            color: "#ffffff",
            opacity: 0.9,
          }}
        >
          <AccountBalanceWalletIcon sx={{ fontSize: 20 }} />
        </Box>
      </Stack>
    </Paper>
  );
};

export default BalanceCard;
