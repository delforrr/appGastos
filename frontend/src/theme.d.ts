import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    accent: Palette["primary"];
    tertiary: Palette["primary"];
    surface: {
      low: string;
      container: string;
    };
    outline: {
      variant: string;
    };
  }

  interface PaletteOptions {
    accent?: PaletteOptions["primary"];
    tertiary?: PaletteOptions["primary"];
    surface?: {
      low?: string;
      container?: string;
    };
    outline?: {
      variant?: string;
    };
  }
}
