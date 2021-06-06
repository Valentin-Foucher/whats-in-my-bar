import { ThemeProvider } from '@material-ui/core';
import React from 'react';
import HomePage from './screens/public/HomePage';
import theme from './styles/theme';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <>
        <HomePage />
      </>
    </ThemeProvider>
  );
}

export default App;
