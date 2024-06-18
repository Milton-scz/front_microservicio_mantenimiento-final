import './App.css';
import { useRoutes } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Router from './routes/Router';
import { baselightTheme } from "./theme/DefaultColors";

function App() {
  const routing = useRoutes(Router);
  const theme = baselightTheme;
  return (

    <ThemeProvider theme={theme}>

      <CssBaseline />
      {routing}

    </ThemeProvider>

  );
}

export default App;
