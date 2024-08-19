import { useState } from "react";
import { useConfirmedStockStore, usePokemonStore } from "../../store/pokeStore";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import DynamicModal from "../../components/Modal/Modal";
import Edit from "../../assets/edit.svg";

function ConfirmationUpdatesStock() {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const { pcs, dozen, info, total } = useConfirmedStockStore();
  const [noteValue, setNoteValue] = useState<string>("");
  const updateStock = usePokemonStore((state) => state.updateStock);
  const pokemon = usePokemonStore((state) =>
    state.pokemons?.find((p) => p.name === name)
  );

  const handleSave = () => {
    updateStock(
      pokemon?.name ?? "",
      "Update Stok",
      total,
      total + (pokemon?.stock ?? 0),
      noteValue
    );
    navigate(`/pokemon/${name}`);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const [localPcs, setLocalPcs] = useState(pcs);
  const [localDozen, setLocalDozen] = useState(dozen);
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
          value={localPcs}
          onChange={(e) => setLocalPcs(parseInt(e.target.value) || 0)}
          style={{ width: "60px", textAlign: "center" }}
        />
        <span>= {localPcs}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Lusin</span>
        <span>12 x</span>
        <input
          type="number"
          min={0}
          value={localDozen}
          onChange={(e) => setLocalDozen(parseInt(e.target.value) || 0)}
          style={{ width: "60px", textAlign: "center" }}
        />
        <span>= {localDozen * 12}</span>
      </div>
      <p style={{ textAlign: "center", marginTop: "20px" }}>
        Total stok (dalam pcs): {localPcs + localDozen * 12}
      </p>
    </div>
  );

  return (
    <Container>
      <Title>Konfirmasi update stok</Title>
      <DifferenceContainer>
        <DifferenceTitle>Selisih</DifferenceTitle>
        <Difference>+{total} pcs</Difference>
      </DifferenceContainer>
      <DifferenceContainerSystem>
        <SystemStock>Di sistem: {pokemon?.stock ?? 0} pcs</SystemStock>
        <UpdatedStock>
          Hasil update stok: {total + (pokemon?.stock ?? 0)} pcs
        </UpdatedStock>
      </DifferenceContainerSystem>

      <StockTable>
        <thead>
          <tr>
            <th>Keterangan</th>
            <th>Detail</th>
            <th>Jumlah</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Hasil update stok</td>
            <td>{info}</td>
            <td>
              {total + (pokemon?.stock ?? 0)} pcs
              <EditButton onClick={openModal}>
                <img
                  src={Edit}
                  alt="edit"
                  style={{
                    width: "20px",
                    height: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
              </EditButton>
            </td>{" "}
          </tr>
          <tr>
            <td>Total hasil stok opname</td>
            <td></td>
            <td>{total + (pokemon?.stock ?? 0)} pcs</td>
          </tr>
        </tbody>
      </StockTable>

      <NoteContainer>
        <label style={{ textAlign: "left" }}>Catatan</label>
        <textarea
          value={noteValue}
          onChange={(e) => setNoteValue(e.target.value)}
        />
      </NoteContainer>

      <ButtonContainer>
        <Button onClick={handleSave}>Simpan</Button>
        <Button onClick={() => navigate("/")}>Batal</Button>
      </ButtonContainer>

      <DynamicModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onSave={() => {
          useConfirmedStockStore.setState({
            pcs: localPcs,
            dozen: localDozen,
            total: localPcs + localDozen * 12,
            info: `Stok di rak: ${localPcs} pcs, ${localDozen} lusin`,
          });
          setIsModalOpen(false);
        }}
        title="Edit Stok"
        body={modalBody}
      />
    </Container>
  );
}

export default ConfirmationUpdatesStock;

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 0.85rem
  margin-bottom: 20px;
`;

const EditButton = styled.button`
  font-size: 10px;
  background: transparent;
  border: none;
  cursor: pointer;
  margin-left: 10px;
  color: #008080;

  &:hover {
    color: #005555;
  }
`;

const DifferenceContainer = styled.div`
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: flex-start;
    flex-wrap: wrap;
    align-content: stretch;
    padding: 0;
]`;

const DifferenceContainerSystem = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
`;

const Difference = styled.div`
  align-items: left;
  font-size: 28px;
  color: green;
`;
const DifferenceTitle = styled.div`
  align-items: left;
  font-size: 16px;
`;

const SystemStock = styled.div`
  font-size: 16px;
  margin-bottom: 10px;
`;

const UpdatedStock = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const StockTable = styled.table`
  width: 100%;
  margin-bottom: 20px;
  border-collapse: collapse;

  th,
  td {
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }

  th,
  td {
    text-align: left;
  }
`;

const NoteContainer = styled.div`
  margin-bottom: 20px;

  label {
    display: block;
    margin-bottom: 5px;
  }

  textarea {
    width: 100%;
    height: 100px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #006a7a;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #004c57;
  }
`;
