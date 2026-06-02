import { AppBar, Toolbar, Box, Typography, IconButton } from "@mui/material";
import { Menu as MenuIcon, LightMode, DarkMode } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import { useColorMode } from "../context/ThemeContext";

interface AppbarProps {
    onDrawerToggle: () => void;
}

const Appbar = ({ onDrawerToggle }: AppbarProps) => {
    const location = useLocation();
    const { mode, toggleColorMode } = useColorMode();

    const getTitle = (path: string) => {
        switch (path) {
            case "/":
                return "Dashboard";
            case "/gastos":
                return "Mis Gastos";
            case "/categorias":
                return "Categorías";
            default:
                return "FinTrack";
        }
    };

    return (
        <AppBar position="static" elevation={0} sx={{ backgroundColor: "background.default", color: "text.primary", borderBottom: "1px solid", borderColor: "outline.variant" }}>
            <Toolbar>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={onDrawerToggle}
                            sx={{ mr: 2, display: { md: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h2">{getTitle(location.pathname)}</Typography>
                    </Box>
                    <IconButton onClick={toggleColorMode} color="inherit">
                        {mode === 'dark' ? <LightMode /> : <DarkMode />}
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Appbar;