import { useEffect } from "react";
import axios from "axios";
import { usePokemonStore } from "../store/pokeStore";

interface StockHistory {
  date: Date;
  activity: string;
  change: number;
  note?: string;
}

interface Pokemon {
  name: string;
  stock: number;
  history: StockHistory[];
}

export const useFetchPokemons = () => {
  const { setPokemons } = usePokemonStore((state) => state);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=10"
        );
        const pokemons = response.data.results.map((pokemon: Pokemon) => ({
          ...pokemon,
          stock: 10,
          history: [
            {
              date: new Date().toLocaleString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }),
              activity: "Stok Awal",
              change: 10,
              totalStock: 10,
            },
          ],
        }));
        setPokemons(pokemons);
      } catch (error) {
        console.error("Failed to fetch pokemons", error);
      }
    };

    fetchPokemons();
  }, [setPokemons]);
};
