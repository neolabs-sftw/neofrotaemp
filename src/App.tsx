import { BrowserRouter, Routes, Route } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { BoasVindas } from "./telas/boasVindas";
import { Home } from "./telas/home";
import Relatorios from "./telas/relatorios";

const GET_USUARIO = gql`
  query Query($adminUsuarioId: ID!) {
    adminUsuario(id: $adminUsuarioId) {
      id
      nome
      email
      senha
      fotoAdminOperadora
      funcao
      statusAdminOperadora
      dataCriacao
      operadora {
        id
        nome
        slug
        logoOperadora
        cnpj
        rSocial
        endRua
        endNumero
        endBairro
        endCep
        endCidade
        endUf
        statusOperadora
        dataCriacao
      }
    }
  }
`;

function App() {
  const { data } = useQuery(GET_USUARIO, {
    variables: { adminUsuarioId: 1 },
  });

  console.log(data);

  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<BoasVindas />} />
            <Route path="/home" element={<Home />} />
            <Route path="/relatorios" element={<Relatorios />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
