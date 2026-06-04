import { Box } from "@mui/material";
import Movements from "../components/Movements";
import { useEffect, useState } from "react";
import { getMovimientos, type Movimiento } from "../services/movimientosService";

const Movimientos = () => {
  const [movimientos, setMovimientos] = useState<Movimiento[]>([]);

  useEffect(() => {
    getMovimientos().then((data) => {
      setMovimientos(data);
    });
  }, []);

  return (
    <Box>
      <Movements isRecent={false} movimientos={movimientos} />
    </Box>
  );
};

export default Movimientos;
