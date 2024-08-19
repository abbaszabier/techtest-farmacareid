import { usePokemonStore } from "../../store/pokeStore";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
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

function Home() {
  const { pokemons, setPokemons, search, setSearch } = usePokemonStore();
  const navigate = useNavigate();

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleRowClick = (name: string) => {
    navigate(`/pokemon/${name}`);
  };

  useEffect(() => {
    if (pokemons.length === 0) {
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
    }
  }, [pokemons, setPokemons]);

  return (
    <Container>
      <Title>Stok Pokémon</Title>
      <SearchInput
        type="text"
        placeholder="Cari Pokémon..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Table>
        <thead>
          <tr>
            <th style={{ textAlign: "left" }}>Nama</th>
            <th style={{ textAlign: "right" }}>Stok</th>
          </tr>
        </thead>
        <tbody>
          {filteredPokemons.map((pokemon, index) => (
            <tr
              key={index}
              style={{
                backgroundColor: index % 2 === 0 ? "#f9f9f9" : "white",
                cursor: "pointer",
              }}
              onClick={() => handleRowClick(pokemon.name)}
            >
              <td style={{ textAlign: "left", color: "#006A7A" }}>
                {pokemon.name}
              </td>
              <td style={{ textAlign: "right" }}>{pokemon.stock} pcs</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Home;

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  background-color: "#f9f9f9";
  display: flex;
  flex-direction: column;
  justify-content: start;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-family: "Poppins", sans-serif;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const SearchInput = styled.input`
  width: 400px;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }

  tbody tr:hover {
    background-color: #f1f1f1;
  }

  @media (max-width: 480px) {
    th,
    td {
      padding: 8px;
      font-size: 0.875rem;
    }
  }
`;
