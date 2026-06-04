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
  Alert,
  Skeleton,
} from "@mui/material";
import {
  Close as CloseIcon,
  AttachMoney as AttachMoneyIcon,
} from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getCategorias,
  type Categoria,
  createMovimiento,
  getMovimientoById,
  updateMovimiento,
} from "../services/movimientosService";

interface Props {
  type?: "ingreso" | "gasto";
}

const AddIncomeExpense = ({ type = "gasto" }: Props) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [currentType, setCurrentType] = useState<"ingreso" | "gasto">(type);
  const [amount, setAmount] = useState<string>("0.00");
  const [description, setDescription] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0],
  );
  const [categories, setCategories] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const filteredCategories = categories.filter(
    (cat) => cat.tipoCategoria === currentType,
  );

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const digits = val.replace(/\D/g, "");

    if (!digits) {
      setAmount("0.00");
      return;
    }

    const limitedDigits = digits.slice(0, 11);
    const parsedValue = parseInt(limitedDigits, 10) / 100;
    setAmount(parsedValue.toFixed(2));
  };

  const handleSubmit = async () => {
    setError(null);
    if (!description.trim()) {
      setError("Por favor, ingrese una descripción.");
      return;
    }
    if (!selectedCategory) {
      setError("Por favor, seleccione una categoría.");
      return;
    }
    if (parseFloat(amount) <= 0) {
      setError("Por favor, ingrese un monto válido mayor a 0.");
      return;
    }

    try {
      const [year, month, day] = date.split("-").map(Number);
      const localDate = new Date(year, month - 1, day);

      if (id) {
        await updateMovimiento({
          id,
          concepto: description,
          categoriaId: selectedCategory,
          monto: parseFloat(amount),
          fecha: localDate,
          tipo: currentType,
        });
      } else {
        await createMovimiento({
          concepto: description,
          categoriaId: selectedCategory,
          monto: parseFloat(amount),
          fecha: localDate,
          tipo: currentType,
        });
      }
      navigate("/");
    } catch (err) {
      console.error("Error al guardar el movimiento:", err);
      setError(
        "No se pudo guardar el movimiento. Verifique la conexión con el servidor.",
      );
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const cats = await getCategorias();
        setCategories(cats);

        if (id) {
          const mov = await getMovimientoById(id);
          setCurrentType(mov.tipo as "ingreso" | "gasto");
          setAmount(mov.monto.toFixed(2));
          setDescription(mov.concepto);
          setSelectedCategory(String(mov.categoriaId));
          const movDate = new Date(mov.fecha);
          const formattedDate = movDate.toISOString().split("T")[0];
          setDate(formattedDate);
        }
      } catch (err) {
        console.error("Error al cargar datos:", err);
        setError(
          "Error al obtener los datos del servidor. Verifique su conexión de red.",
        );
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  if (loading && id) {
    return (
      <Container maxWidth="md" sx={{ bgcolor: "background.paper", p: 5 }}>
        <Stack spacing={4}>
          <Skeleton variant="text" width="40%" height={50} />
          <Divider />
          <Skeleton variant="text" width="20%" />
          <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="rectangular" width="40%" height={40} />
          </Stack>
          <Skeleton variant="rectangular" width="100%" height={56} />
          <Stack direction="row" spacing={2}>
            <Skeleton variant="rectangular" width="50%" height={56} />
            <Skeleton variant="rectangular" width="50%" height={56} />
          </Stack>
          <Skeleton
            variant="rectangular"
            width="100%"
            height={60}
            sx={{ mt: 5 }}
          />
        </Stack>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ bgcolor: "background.paper", p: 5 }}>
      <Stack
        direction="row"
        sx={{ mb: 1, alignItems: "center", justifyContent: "space-between" }}
      >
        <Box>
          <Typography variant="h2" sx={{ fontWeight: 700 }}>
            {id ? "Editar" : "Agregar"}{" "}
            {currentType === "ingreso" ? "Ingreso" : "Gasto"}
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontSize: 14, mb: 2, color: "text.secondary" }}
          >
            {id
              ? "Modifica los datos del movimiento existente"
              : "Ingresa los datos del nuevo movimiento"}
          </Typography>
        </Box>

        <IconButton sx={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          <CloseIcon />
        </IconButton>
      </Stack>

      <Divider sx={{ mb: 5 }} />

      {error && (
        <Alert severity="error" sx={{ mb: 4, borderRadius: 2 }}>
          {error}
        </Alert>
      )}

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
              <MenuItem key={categoria.id} value={String(categoria.id)}>
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
          Cancelar
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
          onClick={handleSubmit}
        >
          {id ? "Guardar Cambios" : "Guardar Movimiento"}
        </Button>
      </Box>
    </Container>
  );
};

export default AddIncomeExpense;
