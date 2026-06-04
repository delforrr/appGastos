import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItemButton,
  ListItemText,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import {
  getTiposMovimientos,
  type TipoMovimiento,
} from "../services/movimientosService";
import {
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
} from "@mui/icons-material";

interface Props {
  type?: "ingreso" | "gasto";
  typeAction?: (type: "ingreso" | "gasto") => void;
  open: boolean;
  onClose: () => void;
}

const ChooseTypeDialog = ({ typeAction, open, onClose }: Props) => {
  const [tiposMovimientos, setTiposMovimientos] = useState<TipoMovimiento[]>(
    [],
  );
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    getTiposMovimientos().then((tiposMovimientos) => {
      setTiposMovimientos(tiposMovimientos);
    });
  }, []);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      slotProps={{ paper: { sx: { borderRadius: 5, width: 500, p: 2 } } }}
    >
      <DialogTitle>
        <Typography variant="h6" sx={{ fontWeight: 700, fontSize: 22 }}>
          Seleccionar tipo de movimiento
        </Typography>
      </DialogTitle>
      <DialogContent>
        <List>
          {tiposMovimientos.map((tipo) => {
            const isIngreso =
              tipo.nombre.toLowerCase() === "ingreso" || Number(tipo.id) === 1;

            const itemBg = isIngreso
              ? theme.palette.mode === "light"
                ? "rgba(0, 69, 122, 0.08)"
                : "rgba(201, 235, 255, 0.12)"
              : theme.palette.mode === "light"
                ? "rgba(255, 45, 45, 0.08)"
                : "rgba(255, 138, 128, 0.12)";

            const iconBg = isIngreso ? "#00457aff" : "#ff2d2dff";

            const textColor = isIngreso
              ? theme.palette.mode === "light"
                ? "#00457aff"
                : "#c9ebffff"
              : theme.palette.mode === "light"
                ? "#ff2d2dff"
                : "#ff8a80";

            return (
              <ListItemButton
                key={tipo.id}
                onClick={() => {
                  onClose();
                  const selectedType = isIngreso ? "ingreso" : "gasto";
                  typeAction?.(selectedType);
                  navigate(
                    selectedType === "ingreso" ? "/add-ingreso" : "/add-gasto",
                  );
                }}
                sx={{
                  borderRadius: 3,
                  mb: 2,
                  p: 2,
                  cursor: "pointer",
                  transition: "0.2s ease-in-out",
                  border: "2px solid",
                  borderColor: "outline.variant",
                  bgcolor: "background.paper",
                  "&:hover": {
                    bgcolor: itemBg,
                    borderColor: isIngreso ? "#00457aff" : "#ff2d2dff",
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    bgcolor: iconBg,
                    color: "#ffffff",
                    mr: 3,
                    boxShadow: `0 0px 10px ${isIngreso ? "#00457aff" : "#ff2d2dff"}`,
                    flexShrink: 0,
                  }}
                >
                  {isIngreso ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                </Box>
                <ListItemText
                  primary={tipo.nombre}
                  sx={{
                    fontWeight: 600,
                    fontSize: 18,
                    color: textColor,
                  }}
                  secondary={
                    isIngreso
                      ? "Registrar una entrada de dinero"
                      : "Registrar una salida de dinero"
                  }
                />
              </ListItemButton>
            );
          })}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChooseTypeDialog;
