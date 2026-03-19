import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Results from "./pages/Results";
import Analytics from "./pages/Analytics";
import { FavoritesProvider } from "./context/FavoritesContext";

function App() {
  return (
    <>
      <FavoritesProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/results" element={<Results />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </FavoritesProvider>
    </>
  );
}

export default App;
