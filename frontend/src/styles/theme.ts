import { createMuiTheme } from '@material-ui/core';

export default createMuiTheme({
  palette: {
    primary: {
      main: '#4fc3f7'
    },
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