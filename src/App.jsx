import { ThemeProvider, createTheme } from "@mui/material/styles";
import Chart from "./components/Chart/Chart";
import Search from "./components/Search/Search";
import './App.css';

const darkTheme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 769,
      laptop: 1024,
      desktop: 1200,
    },
  },
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
