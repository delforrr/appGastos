import { Paper, Typography, Box, Stack, Skeleton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  AccountBalanceWallet as AccountBalanceWalletIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
} from "@mui/icons-material";

interface BalanceCardProps {
  type: "balance" | "gastos" | "ingresos" | "gasto_max";
  amount?: number;
  percentage?: string;
  isPositive?: boolean;
  concept?: string;
  loading?: boolean;
}

const MainCard = ({
  type,
  amount = 0,
  percentage = "+0.0%",
  isPositive = true,
  concept,
  loading = false,
}: BalanceCardProps) => {
  const theme = useTheme();
  const title =
    type === "balance"
      ? "Balance Total"
      : type === "gastos"
        ? "Gastos"
        : type === "ingresos"
          ? "Ingresos"
          : "Gasto Más Alto";

  const trendColor = isPositive ? "#48bb78" : "#f56565";

  const isLight = theme.palette.mode === "light";

  const getIconBgColor = () => {
    if (type === "balance") return "transparent";
    if (type === "gastos") return isLight ? "#ffcdcdff" : "rgba(255, 180, 171, 0.15)";
    if (type === "gasto_max") return isLight ? "#fff3cd" : "rgba(255, 178, 190, 0.15)";
    return isLight ? "#c9ebffff" : "rgba(78, 242, 178, 0.15)";
  };

  const getIconColor = () => {
    if (type === "balance") return "#ffffff";
    if (type === "gastos") return isLight ? "#ff2d2dff" : "#ffb4ab";
    if (type === "gasto_max") return isLight ? "#856404" : "#ffb2be";
    return isLight ? "#00457aff" : "#4ef2b2";
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 5,
        borderRadius: type === "balance" ? 4 : 2,
        background:
          type === "balance"
            ? "linear-gradient(135deg, #32394f 0%, #1e2230 100%)"
            : "background.paper",
        color: type === "balance" ? "#ffffff" : "text.primary",
        boxShadow:
          type === "balance" ? "0px 10px 25px rgba(0, 0, 0, 0.15)" : "none",
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
        <Stack spacing={1.5} sx={{ flexGrow: 1 }}>
          <Typography
            variant="caption"
            sx={{
              fontWeight: 700,
              fontSize: "0.75rem",
              letterSpacing: "0.08em",
              color: type === "balance" ? "#a0aec0" : "text.secondary",
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
            {loading ? (
              <Skeleton width="80%" />
            ) : (
              `$${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
            )}
          </Typography>
          {loading ? (
            <Skeleton width="60%" height={20} />
          ) : type !== "gasto_max" ? (
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
              spacing={0.5}
            >
              {isPositive ? (
                <TrendingUpIcon sx={{ fontSize: 16, color: trendColor }} />
              ) : (
                <TrendingDownIcon sx={{ fontSize: 16, color: trendColor }} />
              )}
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  color: trendColor,
                  fontSize: "0.85rem",
                }}
              >
                {percentage} desde el mes pasado
              </Typography>
            </Stack>
          ) : (
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: "text.secondary",
                fontSize: "0.85rem",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: "200px",
              }}
              title={concept}
            >
              {concept || "Sin gastos registrados"}
            </Typography>
          )}
        </Stack>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 1.2,
            borderRadius: type === "balance" ? 2 : 5,
            bgcolor: getIconBgColor(),
            border: "1.5px solid rgba(255, 255, 255, 0.2)",
            color: getIconColor(),
            opacity: 0.9,
            flexShrink: 0,
          }}
        >
          {type === "balance" ? (
            <AccountBalanceWalletIcon sx={{ fontSize: 20 }} />
          ) : type === "ingresos" ? (
            <ArrowDownwardIcon sx={{ fontSize: 20 }} />
          ) : type === "gastos" ? (
            <ArrowUpwardIcon sx={{ fontSize: 20 }} />
          ) : (
            <TrendingDownIcon sx={{ fontSize: 20 }} />
          )}
        </Box>
      </Stack>
    </Paper>
  );
};

export default MainCard;
