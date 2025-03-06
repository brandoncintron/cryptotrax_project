// Manage local storage for favorites
import { createContext, useState } from "react";

export const FavoritesContext = createContext();

const FavoritesContextProvider = (props) => {
  // Initialize state from local storage
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem("crypto");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  const addFavorite = (crypto) =>
    setFavorites((prev) => {
      if (prev.includes(crypto.id)) return prev; // Avoid duplicates
      const updatedFavorites = [...prev, crypto.id];
      localStorage.setItem("crypto", JSON.stringify(updatedFavorites));
      //console.log("Favorites updated:", updatedFavorites); debug
      return updatedFavorites;
    });

  const removeFavorite = (cryptoId) =>
    setFavorites((prev) => {
      const updatedFavorites = prev.filter((id) => id !== cryptoId);
      localStorage.setItem("crypto", JSON.stringify(updatedFavorites));
      //console.log("Favorites updated:", updatedFavorites); debug
      return updatedFavorites;
    });

  /* Debug
  useEffect(() => {
    console.log("Current favorites:", favorites);
  }, [favorites]); 
  */

  return (
    <FavoritesContext.Provider
      value={{ addFavorite, removeFavorite, favorites }}
    >
      {props.children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContextProvider;
