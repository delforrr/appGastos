import { Box, Typography } from "@mui/material";

interface Props {
    type: "ingreso" | "gasto";
}

const AddIncomeExpense = ({ type }: Props) => {

    return (
        <Box>
            <Typography variant="h2" sx={{ mb: 4, fontWeight: 700 }}>
                Agregar {type === "ingreso" ? "Ingreso" : "Gasto"}
            </Typography>
        </Box>
    );
};

export default AddIncomeExpense;