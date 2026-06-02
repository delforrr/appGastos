import {
    Box,
    Typography,
    Button,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Drawer
} from "@mui/material";
import { AccountBalanceWallet, Category, Dashboard, Add } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
    mobileOpen: boolean;
    onClose: () => void;
}

const Sidebar = ({ mobileOpen, onClose }: SidebarProps) => {
    const WIDTH = 300;
    const location = useLocation();

    const items = [
        {
            label: "Dashboard",
            icon: Dashboard,
            path: "/"
        },
        {
            label: "Gastos",
            icon: AccountBalanceWallet,
            path: "/gastos"
        },
        {
            label: "Categorías",
            icon: Category,
            path: "/categorias"
        }
    ];

    const sidebarContent = (
        <Box sx={{
            width: WIDTH,
            height: "100%",
            backgroundColor: "surface.low",
            borderRight: "2px solid",
            borderColor: "outline.variant",
            display: "flex",
            flexDirection: "column",
            py: 3,
            boxSizing: "border-box"
        }}>
            <Typography variant="h2" sx={{ px: 3, pt: 2, pb: 0.5, letterSpacing: '-0.02em', color: "text.secondary" }}>
                FinTrack
            </Typography>
            <Typography variant="caption" sx={{ px: 3, letterSpacing: '-0.02em', color: "text.primary" }}>
                Administración de Gastos
            </Typography>
            <Button variant="contained" size="large" sx={{
                mt: 8, mx: 4, borderRadius: 2.5, textTransform: "capitalize"
            }} startIcon={<Add />}>
                <Box component="span" sx={{
                    display: "block"
                }}>Nuevo Gasto</Box>
            </Button>

            <List sx={{ px: 3, mt: 3 }}>
                {items.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <ListItemButton
                            key={item.path}
                            component={Link}
                            to={item.path}
                            selected={isActive}
                            onClick={onClose}
                            sx={{
                                borderRadius: '8px',
                                mb: 1.5,
                                color: 'text.secondary',
                                '&:hover': {
                                    backgroundColor: 'accent.main',
                                    color: 'accent.contrastText',
                                    '& .MuiListItemIcon-root': {
                                        color: 'accent.contrastText',
                                    }
                                },
                                '&.Mui-selected': {
                                    backgroundColor: 'accent.main',
                                    color: 'accent.contrastText',
                                    '& .MuiListItemIcon-root': {
                                        color: 'accent.contrastText',
                                    },
                                    '&:hover': {
                                        backgroundColor: 'accent.main',
                                        color: 'accent.contrastText',
                                        '& .MuiListItemIcon-root': {
                                            color: 'accent.contrastText',
                                        }
                                    }
                                },
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
                                <item.icon />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <Typography sx={{ fontWeight: isActive ? 600 : 500, fontSize: "14px" }}>
                                        {item.label}
                                    </Typography>
                                }
                            />
                        </ListItemButton>
                    );
                })}
            </List>
        </Box>
    );

    return (
        <>
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={onClose}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { width: WIDTH, backgroundImage: 'none' }
                }}
            >
                {sidebarContent}
            </Drawer>

            <Box sx={{
                display: { xs: 'none', md: 'block' },
                width: WIDTH,
                height: '100vh',
                flexShrink: 0,
                borderRight: "2px solid",
                borderColor: "outline.variant",
            }}>
                {sidebarContent}
            </Box>
        </>
    );
};

export default Sidebar;