import { ReactNode } from "react";
import Modal from "react-modal";
import styled from "styled-components";

const StyledModal = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background: rgba(51, 51, 51, 0.5);

  .modal-content {
    background: white;
    border-radius: 8px;
    padding: 20px;
    width: 400px;
    max-width: 90%;
    border: 1px solid #ddd;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    position: relative;
  }
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  margin-bottom: 10px;
  text-align: center;
`;

const Body = styled.div`
  margin-bottom: 20px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  button {
    padding: 10px 20px;
    margin: 0 5px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;

    &:nth-child(1) {
      background-color: #008080;
      color: white;
    }

    &:nth-child(2) {
      background-color: #e0e0e0;
      color: #333;
    }
  }
`;

Modal.setAppElement("#root");

type DynamicModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  onSave: () => void;
  title: string;
  body: ReactNode;
  saveButtonText?: string;
  cancelButtonText?: string;
};

function DynamicModal({
  isOpen,
  onRequestClose,
  onSave,
  title,
  body,
  saveButtonText = "Simpan",
  cancelButtonText = "Batal",
}: DynamicModalProps) {
  return (
    <StyledModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={title}
    >
      <div className="modal-content">
        <Title>{title}</Title>
        <Body>{body}</Body>
        <ButtonGroup>
          <button onClick={onSave}>{saveButtonText}</button>
          <button onClick={onRequestClose}>{cancelButtonText}</button>
        </ButtonGroup>
      </div>
    </StyledModal>
  );
}

export default DynamicModal;
