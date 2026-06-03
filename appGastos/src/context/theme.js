export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: {
            main: '#131b2e',
            contrastText: '#ffffff',
          },
          secondary: {
            main: '#006c49',
            contrastText: '#ffffff',
          },
          accent: {
            main: '#2effbdff',
            dim: '#2effbd82',
            contrastText: '#006132ff',
          },
          tertiary: {
            main: '#570036ff',
            contrastText: '#ffffff',
          },
          error: {
            main: '#ba1a1a',
            contrastText: '#ffffff',
          },
          background: {
            default: '#eff2ffff',
            paper: '#ffffff',
          },
          text: {
            primary: '#0b1c30',
            secondary: '#676872ff',
          },
          surface: {
            low: '#f3f8ffff',
            container: '#f4f7fcff',
          },
          outline: {
            variant: '#c6c6cd',
          }
        }
      : {
          primary: {
            main: '#a2bdff',
            contrastText: '#0c1b3e',
          },
          secondary: {
            main: '#4ef2b2',
            contrastText: '#003824',
          },
          accent: {
            main: '#1a263e',
            dim: '#1a263e82',
            contrastText: '#a2bdff',
          },
          tertiary: {
            main: '#ffb2be',
            contrastText: '#410011',
          },
          error: {
            main: '#ffb4ab',
            contrastText: '#690005',
          },
          background: {
            default: '#0b0f19',
            paper: '#151c2c',
          },
          text: {
            primary: '#f3f4f6',
            secondary: '#9ca3af',
          },
          surface: {
            low: '#0f1625',
            container: '#212d42',
          },
          outline: {
            variant: '#28354c',
          }
        }),
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    h1: {
      fontSize: '32px',
      fontWeight: '700',
      lineHeight: '40px',
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '24px',
      fontWeight: '600',
      lineHeight: '32px',
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '20px',
      fontWeight: '600',
      lineHeight: '28px',
    },
    h4: {
      fontSize: '18px',
      fontWeight: '600',
      lineHeight: '24px',
    },
    h5: {
      fontSize: '16px',
      fontWeight: '600',
      lineHeight: '22px',
    },
    h6: {
      fontSize: '14px',
      fontWeight: '600',
      lineHeight: '20px',
    },
    body1: {
      fontSize: '16px',
      fontWeight: '400',
      lineHeight: '24px',
    },
    body2: {
      fontSize: '14px',
      fontWeight: '400',
      lineHeight: '20px',
    },
    caption: {
      fontSize: '14px',
      fontWeight: '400',
      lineHeight: '18px',
    }
  }
});
