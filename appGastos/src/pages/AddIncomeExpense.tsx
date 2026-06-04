import {
  Typography,
  Container,
  Stack,
  Divider,
  IconButton,
  TextField,
  Box,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Button,
} from "@mui/material";
import {
  Close as CloseIcon,
  AttachMoney as AttachMoneyIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getCategorias,
  type Categoria,
  createMovimiento,
} from "../services/movimientosService";

interface Props {
  type: "ingreso" | "gasto";
}

const AddIncomeExpense = ({ type }: Props) => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState<string>("0.00");
  const [description, setDescription] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0],
  );
  const [categories, setCategories] = useState<Categoria[]>([]);

  const filteredCategories = categories.filter(
    (cat) => cat.tipoCategoria === type,
  );

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const digits = val.replace(/\D/g, "");

    if (!digits) {
      setAmount("0.00");
      return;
    }

    // Limite de 11 dígitos
    const limitedDigits = digits.slice(0, 11);
    const parsedValue = parseInt(limitedDigits, 10) / 100;
    setAmount(parsedValue.toFixed(2));
  };

  const handleSubmit = async ({ type }: { type: "ingreso" | "gasto" }) => {
    try {
      // Parse date locally to prevent timezone shifting
      const [year, month, day] = date.split("-").map(Number);
      const localDate = new Date(year, month - 1, day);

      const response = await createMovimiento({
        concepto: description,
        categoria: selectedCategory,
        monto: parseFloat(amount),
        fecha: localDate,
        tipo: type,
      });
      console.log("Movimiento creado:", response);
      navigate("/");
    } catch (error) {
      console.error("Error al crear el movimiento:", error);
    }
  };

  useEffect(() => {
    getCategorias().then((categories) => {
      setCategories(categories);
    });
  }, []);

  return (
    <Container maxWidth="md" sx={{ bgcolor: "background.paper", p: 5 }}>
      <Stack
        direction="row"
        sx={{ mb: 1, alignItems: "center", justifyContent: "space-between" }}
      >
        <Box>
          <Typography variant="h2" sx={{ fontWeight: 700 }}>
            Agregar {type === "ingreso" ? "Ingreso" : "Gasto"}
          </Typography>
          <Typography // Limit to 11 digits to prevent integer overflow
            variant="body1"
            sx={{ fontSize: 14, mb: 2, color: "text.secondary" }}
          >
            Ingresa los datos del movimiento
          </Typography>
        </Box>

        <IconButton sx={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          <CloseIcon />
        </IconButton>
      </Stack>

      <Divider sx={{ mb: 5 }} />

      <Typography variant="body1" sx={{ fontWeight: 600, pl: 2 }}>
        Monto
      </Typography>
      <Stack direction="row" sx={{ alignItems: "center", gap: 2, mb: 5 }}>
        <AttachMoneyIcon sx={{ color: "text.primary", fontSize: 50 }} />
        <TextField
          fullWidth
          value={amount}
          onChange={handleAmountChange}
          variant="standard"
          slotProps={{
            input: {
              disableUnderline: true,
              style: {
                fontSize: "1.5rem",
                fontWeight: 600,
                color: "text.secondary",
              },
            },
            htmlInput: {
              step: "0.01",
              min: "0",
              inputMode: "numeric",
            },
          }}
          sx={{
            "& .MuiInput-underline:before": { borderBottom: "none" },
            "& .MuiInput-underline:after": { borderBottom: "none" },
            "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
              borderBottom: "none",
            },
          }}
        />
      </Stack>

      <TextField
        fullWidth
        variant="outlined"
        label="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Stack
        direction="row"
        sx={{
          gap: 2,
          mt: 2,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <FormControl variant="outlined" sx={{ width: "50%" }}>
          <InputLabel id="categoria-label">Categoría</InputLabel>
          <Select
            labelId="categoria-label"
            id="categoria-select"
            value={selectedCategory}
            label="Categoría"
            onChange={(e) => setSelectedCategory(e.target.value as string)}
          >
            <MenuItem value="">
              <em>Seleccionar categoría</em>
            </MenuItem>
            {filteredCategories.map((categoria) => (
              <MenuItem key={categoria.id} value={categoria.nombre}>
                {categoria.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          type="date"
          label="Fecha"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          sx={{ width: "50%" }}
        />
      </Stack>

      <Divider sx={{ mt: 10, mb: 3 }} />

      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
        <Button
          variant="outlined"
          sx={{
            borderRadius: 2,
            px: 3,
            py: 1,
            textTransform: "capitalize",
            fontWeight: 600,
            letterSpacing: "1px",
          }}
          onClick={() => navigate("/")}
        >
          Mover al Borrador
        </Button>
        <Button
          variant="contained"
          sx={{
            borderRadius: 2,
            px: 3,
            py: 1,
            textTransform: "capitalize",
            fontWeight: 600,
            letterSpacing: "1px",
          }}
          onClick={() => {
            handleSubmit({ type });
          }}
        >
          Guardar Movimiento
        </Button>
      </Box>
    </Container>
  );
};

export default AddIncomeExpense;
