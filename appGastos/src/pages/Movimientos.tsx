import { Box } from "@mui/material";
import Transactions from "../components/Movements";

const Movimientos = () => {
  return (
    <Box>
      <Transactions isRecent={false} />
    </Box>
  );
};

export default Movimientos;
