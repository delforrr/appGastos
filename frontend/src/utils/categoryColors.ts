export interface CategoryColor {
  base: string;     // Primary hex color representing the category
  bgLight: string;  // Light mode background for chip (low opacity)
  textLight: string;// Light mode text color
  bgDark: string;   // Dark mode background for chip (medium-low opacity)
  textDark: string; // Dark mode text color
}

export const CATEGORY_COLORS: Record<string, CategoryColor> = {
  comida: {
    base: "#ff9800",
    bgLight: "rgba(255, 152, 0, 0.12)",
    textLight: "#b26a00",
    bgDark: "rgba(255, 183, 77, 0.15)",
    textDark: "#ffb74d",
  },
  transporte: {
    base: "#03a9f4",
    bgLight: "rgba(3, 169, 244, 0.12)",
    textLight: "#01579b",
    bgDark: "rgba(129, 212, 250, 0.15)",
    textDark: "#81d4fa",
  },
  servicios: {
    base: "#9c27b0",
    bgLight: "rgba(156, 39, 176, 0.12)",
    textLight: "#6a1b9a",
    bgDark: "rgba(224, 64, 251, 0.15)",
    textDark: "#e040fb",
  },
  entretenimiento: {
    base: "#e91e63",
    bgLight: "rgba(233, 30, 99, 0.12)",
    textLight: "#ad1457",
    bgDark: "rgba(244, 143, 177, 0.15)",
    textDark: "#f48fb1",
  },
  sueldo: {
    base: "#4caf50",
    bgLight: "rgba(76, 175, 80, 0.12)",
    textLight: "#2e7d32",
    bgDark: "rgba(129, 199, 132, 0.15)",
    textDark: "#81c784",
  },
  venta: {
    base: "#009688",
    bgLight: "rgba(0, 150, 136, 0.12)",
    textLight: "#00695c",
    bgDark: "rgba(128, 203, 196, 0.15)",
    textDark: "#80cbc4",
  },
  "ayuda económica": {
    base: "#8bc34a",
    bgLight: "rgba(139, 195, 74, 0.12)",
    textLight: "#558b2f",
    bgDark: "rgba(197, 225, 165, 0.15)",
    textDark: "#c5e1a5",
  },
  "ayuda economica": {
    base: "#8bc34a",
    bgLight: "rgba(139, 195, 74, 0.12)",
    textLight: "#558b2f",
    bgDark: "rgba(197, 225, 165, 0.15)",
    textDark: "#c5e1a5",
  },
  "material de estudio": {
    base: "#ffeb3b",
    bgLight: "rgba(251, 192, 45, 0.12)",
    textLight: "#f57f17",
    bgDark: "rgba(255, 245, 157, 0.15)",
    textDark: "#fff59d",
  },
  otros: {
    base: "#78909c",
    bgLight: "rgba(120, 144, 156, 0.12)",
    textLight: "#37474f",
    bgDark: "rgba(176, 190, 197, 0.15)",
    textDark: "#b0bec5",
  },
};

export const getCategoryColor = (categoryName: string): CategoryColor => {
  const normalized = categoryName.trim().toLowerCase();
  return CATEGORY_COLORS[normalized] || CATEGORY_COLORS.otros;
};

export const getCategoryChipStyles = (categoryName: string, mode: "light" | "dark") => {
  const colors = getCategoryColor(categoryName);
  return {
    backgroundColor: mode === "light" ? colors.bgLight : colors.bgDark,
    color: mode === "light" ? colors.textLight : colors.textDark,
    border: `1px solid ${mode === "light" ? colors.textLight + "22" : colors.textDark + "22"}`,
  };
};
