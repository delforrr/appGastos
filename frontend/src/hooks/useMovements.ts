import { useMovementsContext } from "../context/MovementsContext";

const useMovements = () => {
  return useMovementsContext();
};

export default useMovements;
