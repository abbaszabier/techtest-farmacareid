import { usePokemonStore } from "../../store/pokeStore";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function Home() {
  const { pokemons, search, setSearch } = usePokemonStore();
  const navigate = useNavigate();

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleRowClick = (name: string) => {
    navigate(`/pokemon/${name}`);
  };

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
