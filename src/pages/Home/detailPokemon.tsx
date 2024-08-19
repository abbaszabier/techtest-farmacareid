import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { usePokemonStore, useConfirmedStockStore } from "../../store/pokeStore";
import styled from "styled-components";
import DynamicModal from "../../components/Modal/Modal";
import { formatDate } from "../../utils/formatter";

function DetailPokemon() {
  const { name } = useParams<{ name: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pcs, setPcs] = useState(0);
  const [dozen, setDozen] = useState(0);
  const navigate = useNavigate();
  const pokemon = usePokemonStore((state) =>
    state.pokemons?.find((p) => p.name === name)
  );

  const handleSave = () => {
    setIsModalOpen(false);

    useConfirmedStockStore.setState({
      pcs: pcs,
      dozen: dozen,
      info: `${pcs} pcs, ${dozen} lusin (${dozen * 12} pcs)`,
      total: pcs + dozen * 12,
      note: "",
    });

    navigate(`/pokemon/${name}/konfirmasi-update-stok`);
  };

  const modalBody = (
    <div>
      <p style={{ textAlign: "center", marginBottom: "10px" }}>
        Masukkan jumlah stok yang tersedia di rak saat ini.
      </p>
      <div style={{ marginBottom: "15px", fontWeight: 600 }}>
        <label>Kemasan</label>
        <label style={{ marginLeft: "60px" }}>Jumlah</label>
        <label style={{ float: "right" }}>Stok</label>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <span>Pcs</span>
        <span>1 x</span>
        <input
          type="number"
          min={0}
          value={pcs}
          onChange={(e) => setPcs(parseInt(e.target.value) || 0)}
          style={{ width: "60px", textAlign: "center" }}
        />
        <span>= {pcs}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Lusin</span>
        <span>12 x</span>
        <input
          type="number"
          min={0}
          value={dozen}
          onChange={(e) => setDozen(parseInt(e.target.value) || 0)}
          style={{ width: "60px", textAlign: "center" }}
        />
        <span>= {dozen * 12}</span>
      </div>
      <p style={{ textAlign: "center", marginTop: "20px" }}>
        Total stok (dalam pcs): {pcs + dozen * 12}
      </p>
    </div>
  );

  return (
    <Container>
      <HeaderContainer>
        <BackLink onClick={() => navigate("/")}>← Stok Pokémon</BackLink>
        <Button onClick={() => setIsModalOpen(true)}>Update stok</Button>
      </HeaderContainer>
      <Title>{pokemon?.name}</Title>
      <StockContainer>
        <StockText>Sisa stok</StockText>
        <StockValue>{pokemon?.stock} pcs</StockValue>
      </StockContainer>
      <StockContainer>
        <Subtitle>Riwayat stok</Subtitle>
        <NoteText>Satuan stok dalam pcs</NoteText>
      </StockContainer>
      <Table>
        <thead>
          <tr>
            <th>Waktu</th>
            <th>Kegiatan</th>
            <th>Catatan</th>
            <th>Jmlh</th>
            <th>Stok</th>
          </tr>
        </thead>
        <tbody>
          {pokemon?.history
            .map((entry) => ({
              ...entry,
              date: new Date(entry.date),
            }))
            .sort((a, b) => b.date.getTime() - a.date.getTime())
            .map((entry, idx) => (
              <tr key={idx}>
                <td>{formatDate(entry.date)}</td>
                <td style={{ color: idx === 0 ? "#006A7A" : "inherit" }}>
                  {entry.activity}
                </td>
                <td>{entry.note || "-"}</td>
                <td
                  style={{
                    color: entry.change > 0 ? "green" : "red",
                  }}
                >
                  {entry.change > 0 ? "+" : ""}
                  {entry.change}
                </td>
                <td>{entry.totalStock} pcs</td>
              </tr>
            ))}
        </tbody>
      </Table>
      <DynamicModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        title="Update Stok"
        body={modalBody}
        saveButtonText="Simpan"
        cancelButtonText="Batal"
      />
    </Container>
  );
}

export default DetailPokemon;

const Container = styled.div`
  width: 90%;
  max-width: 640px;
  margin: 0 auto;
  font-family: "Poppins", sans-serif;

  @media (max-width: 768px) {
    padding: 0 15px;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: baseline;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const BackLink = styled.div`
  color: #006a7a;
  cursor: pointer;
  margin-bottom: 20px;
  font-weight: 600;
  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 20px;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const StockContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  align-items: flex-start;
`;

const StockText = styled.p`
  font-size: 0.875rem;
  padding: 0;
  margin: 0;
`;

const StockValue = styled.p`
  font-size: 1.25rem;
  font-weight: 600;
  padding: 0;
  margin: 0;
`;

const Subtitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  padding: 0;
  margin: 0;
`;

const NoteText = styled.p`
  font-size: 0.875rem;
  color: #666;
  padding: 0;
  margin: 0;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  overflow-x: auto;

  th,
  td {
    padding: 15px 10px;
    border-bottom: 1px solid #ddd;
    font-size: 0.875rem;
    word-wrap: break-word;
  }

  th {
    text-align: left;
    color: #666;
    font-weight: 600;
  }

  td {
    text-align: left;
    &:first-child {
      width: 180px;
      font-weight: 600;
    }
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  margin-top: 20px;
  font-size: 1rem;
  border: 1px solid #006a7a;
  border-radius: 4px;
  background-color: white;
  color: #006a7a;
  cursor: pointer;

  &:hover {
    background-color: #e7f5f7;
  }
`;
