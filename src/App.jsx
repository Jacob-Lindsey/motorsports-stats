import { ThemeProvider, createTheme } from "@mui/material/styles";
import Chart from "./components/Chart/Chart";
import Search from "./components/Search/Search";
import './App.css';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <Search />
      </div>
    </ThemeProvider>
  );
};

export default App;
