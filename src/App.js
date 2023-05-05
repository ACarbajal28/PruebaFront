import React, { useState } from "react";
import styled from "styled-components";
import Modal from "./componentes/Modal";
import { gql} from "@apollo/client";
import { useQuery } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";


const client = new ApolloClient({
  uri:'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache(),
});

 const OBTENER_PERSONAJE = gql`
    query obtenerPersonaje($id: ID!) {
      character(id: $id) {
        name
        status
        species
        type
        gender
        origin {
          name
        }
        location {
          name
        }
        image
      }
    }
  `;


const App = () => {
  const [estadoModal, cambiarEstadoModal] = useState(false);
  const [id, setId] = useState(Math.floor(Math.floor(Math.random() * 671) + 1));
  const { data, loading, error } = useQuery(OBTENER_PERSONAJE, {
    variables: { id },
    client, 
  }
  );



  const generarIdAleatorio = () => {
    const nuevoId = (Math.floor(Math.random() * 671) + 1);
    setId(nuevoId);
  };


  if (loading) return <div style={{ display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'}}><img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjIxY2NkYWYxNGU4MDAzOTcxODY2M2MwMDU0M2M1MTAxODE2ZDA4ZCZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PXM/3o7aD2d7hy9ktXNDP2/giphy.gif" alt="Cargando"></img></div>;
  if (error) return <p>Error</p>;

  const {name, image, status, species, type, gender, origin, location} = data.character;

  return (
    <div>
      <ContenedorBotones>
        <ImageContenedor>
          <StyledImagen src="https://www.freepnglogos.com/uploads/rick-and-morty-png/rick-and-morty-portal-shoes-white-clothing-zavvi-23.png" alt="Rick and Morty"/>
        </ImageContenedor>
        <BotonAbrir onClick={() => {cambiarEstadoModal(!estadoModal); generarIdAleatorio();}}>Generar Personaje</BotonAbrir>     
      <Modal  estado={estadoModal} cambiarEstado={cambiarEstadoModal}>
        <ImageContainer>
          <StyledImage src={image} alt={name}/>
        </ImageContainer>
        <TextContainer>
          <Title>{name}</Title>
          <Description>Status:{status}</Description>
          <Description>Especie:{species}</Description>
          <Description>Tipo:{type}</Description>
          <Description>Genero:{gender}</Description>
          <Description>Origen:{origin.name}</Description>
          <Description>Ubicación:{location.name}</Description>
        </TextContainer>
      </Modal>
      <TitleHistorial>Historial</TitleHistorial>
      
      </ContenedorBotones>
    </div>
  );
};

export default App;

const ContenedorBotones = styled.div`
  font-family: monospace;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

const BotonAbrir = styled.button`
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
const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const StyledImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;
const Description = styled.p`
  font-size: 16px;
`;
const ImageContenedor= styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
`;
const StyledImagen= styled.img`
    width: 300px;
`;
const TitleHistorial = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 50px;
  color: #169FB7;
`;

