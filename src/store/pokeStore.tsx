import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface StockHistory {
  date: Date;
  activity: string;
  change: number;
  totalStock: number;
  note?: string;
}

interface ConfirmedStock {
  pcs: number;
  dozen: number;
  info: string;
  total: number;
  note: string;
}

interface Pokemon {
  name: string;
  stock: number;
  history: StockHistory[];
}

interface PokemonStore {
  pokemons: Pokemon[];
  setPokemons: (pokemons: Pokemon[]) => void;
  updateStock: (
    name: string,
    activity: string,
    change: number,
    totalStock: number,
    note?: string
  ) => void;
  search: string;
  setSearch: (search: string) => void;
}

export const usePokemonStore = create<PokemonStore>()(
  persist(
    (set) => ({
      pokemons: [],
      setPokemons: (pokemons) => set({ pokemons }),
      updateStock: (name, activity, change, totalStock, note) =>
        set((state) => {
          const pokemon = state.pokemons.find((p) => p.name === name);
          if (!pokemon) return state;

          const newStock = pokemon.stock + change;
          const newHistory: StockHistory = {
            date: new Date(),
            activity,
            change,
            totalStock: totalStock,
            note,
          };

          return {
            pokemons: state.pokemons.map((p) =>
              p.name === name
                ? {
                    ...p,
                    stock: newStock,
                    history: [newHistory, ...p.history],
                  }
                : p
            ),
          };
        }),
      search: "",
      setSearch: (search) => set({ search }),
    }),
    {
      name: "pokemon-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useConfirmedStockStore = create<ConfirmedStock>()(
  persist(
    () => ({
      pcs: 0,
      dozen: 0,
      info: "",
      total: 0,
      note: "",
    }),
    {
      name: "confirmed-stock-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
