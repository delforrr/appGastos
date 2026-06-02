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
            contrastText: '#006132ff',
          },
          tertiary: {
            main: '#311432',
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
            main: '#dae2fd',
            contrastText: '#131b2e',
          },
          secondary: {
            main: '#6cf8bb',
            contrastText: '#002113',
          },
          accent: {
            main: '#005236',
            contrastText: '#6ffbbe',
          },
          tertiary: {
            main: '#ffb2b7',
            contrastText: '#40000d',
          },
          error: {
            main: '#ffb4ab',
            contrastText: '#690005',
          },
          background: {
            default: '#0b1c30',
            paper: '#131b2e',
          },
          text: {
            primary: '#eaf1ff',
            secondary: '#7c839b',
          },
          surface: {
            low: '#1a243a',
            container: '#212d47',
          },
          outline: {
            variant: '#3f465c',
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
