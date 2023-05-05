import React from "react";
import styled from "styled-components";

const Modal = ({children, estado, cambiarEstado }) => {
  return (
    <>
      {estado && (
        <Overlay>
          <ContenedorModal>
            <ButtonCerrar onClick={() => cambiarEstado(false)}>
              Cerrar
            </ButtonCerrar>
            {children}
          </ContenedorModal> 
        </Overlay>
      )}
    </>
  );
};

export default Modal;

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContenedorModal = styled.div`
  font-family: monospace;
  width: 700px;
  min-height: 100px;
  background: white;
  position: relative;
  border-radius: 5px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 20px;
`;

const ButtonCerrar = styled.button`
  font-family: monospace;
  position: absolute;
  top: 20px;
  right: 20px;
  display: block;
  padding: 10px 30px;
  border-radius: 100px;
  color: #fff;
  border: none;
  background: #1766dc;
  cursor: pointer;
  font-family: monospace;
  font-weight: 500;
  transition: 0.3s ease all;
  &:hover {
    background: #0066ff;
  }
`;
