import './App.css';
import Sidebar from './components/Sidebar';
import { Box } from '@mui/material';
import Appbar from './components/Appbar';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Gastos from './pages/Gastos';
import Categorias from './pages/Categorias';
import { useState } from 'react';

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar mobileOpen={mobileOpen} onClose={handleDrawerToggle} />
      <Box sx={{ component: "main", flexGrow: 1, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Appbar onDrawerToggle={handleDrawerToggle} />
        <Box sx={{ p: 4, flexGrow: 1, bgcolor: "background.default" }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/gastos" element={<Gastos />} />
            <Route path="/categorias" element={<Categorias />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
