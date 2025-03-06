import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePageHero";
import RankingsPage from "./pages/RankingsPage";
import News from "./pages/NewsPage";
import CurrencyPage from "./pages/CurrencyPage";
import FavoritesPage from "./pages/FavoritesPage";
import FavoritesContextProvider from "./contexts/FavoritesContext";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <>
      <FavoritesContextProvider>
        <Toaster />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/rankings" element={<RankingsPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/news" element={<News />} />
          <Route path="/currency/:id" element={<CurrencyPage />} />
        </Routes>
      </FavoritesContextProvider>
    </>
  );
}

export default App;
