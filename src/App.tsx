import Navbar from "./components/Navbar";
import { ThemeProvider } from "./context/ThemeContext";
import PokemonList from "./components/Pokemon/PokemonList";

const App = () => (
  <ThemeProvider>
    <Navbar />
    <div className="main-container">
      <PokemonList />
    </div>
  </ThemeProvider>
);

export default App;
