import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
interface Developer {
  id: number;
  name: string;
  username: string;
  description: string;
  repos: number;
  followers: number;
  country: string;
}
interface FavoritesContextType {
  favorites: Developer[];
  addFavorite: (dev: Developer) => void;
  removeFavorite: (id: number) => void;
  isFavorited: (id: number) => boolean;
}
const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);
export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Developer[]>([]);

  const addFavorite = (dev: Developer) => {
    setFavorites((prev) => [...prev, dev]);
  };

  const removeFavorite = (id: number) => {
    setFavorites((prev) => prev.filter((d) => d.id !== id));
  };
  const isFavorited = (id: number) => {
    return favorites.some((d) => d.id === id);
  };
  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorited }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
{
  /*Create Custom Hook*/
}
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context)
    throw new Error("useFavorites must be used within FavoritesProvider");
  return context;
};
