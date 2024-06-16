import { ThemeProvider } from '@mui/material/styles';
import { theme } from './utils/ThemeProvider';
import Dashboard from './page/Dashboard/Dashboard';
import './App.css';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Dashboard />
    </ThemeProvider>
  );
}

export default App