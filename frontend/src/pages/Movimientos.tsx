import { Box, Alert, Button } from "@mui/material";
import Movements from "../components/Movements";
import useMovements from "../hooks/useMovements";

const Movimientos = () => {
  const { movimientos, categorias, loading, error, handleDelete, fetchMovimientos } = useMovements();

  return (
    <Box>
      {error && (
        <Alert
          severity="error"
          sx={{ mb: 3, borderRadius: 2 }}
          action={
            <Button color="inherit" size="small" onClick={fetchMovimientos}>
              Reintentar
            </Button>
          }
        >
          {error}
        </Alert>
      )}

      <Movements
        isRecent={false}
        movimientos={movimientos}
        categorias={categorias}
        canDelete
        onDelete={handleDelete}
        loading={loading}
      />
    </Box>
  );
};

export default Movimientos;
