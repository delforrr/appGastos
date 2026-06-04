import { Box } from "@mui/material";
import Movements from "../components/Movements";
import useMovements from "../hooks/useMovements";

const Movimientos = () => {
  const { movimientos, handleDelete } = useMovements();

  return (
    <Box>
      <Movements
        isRecent={false}
        movimientos={movimientos}
        canDelete
        onDelete={handleDelete}
      />
    </Box>
  );
};

export default Movimientos;
