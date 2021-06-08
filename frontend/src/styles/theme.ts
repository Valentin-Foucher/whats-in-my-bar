import { createMuiTheme } from '@material-ui/core';

export default createMuiTheme({
  palette: {
    primary: {
      main: '#DF1448'
    },
    secondary: {
      main: '#F46A26'
    }
  },
  overrides: {
    MuiTypography: {
      h1: {
        fontWeight: 700,
        textTransform: 'uppercase',
        fontSize: 22,
        letterSpacing: 1
      }
    },
    MuiBackdrop: {
      root: {
        backgroundColor: 'rgba(14, 0, 0, 0.2)',
        backdropFilter: 'blur(1px)'
      }
    },
  },
});