import styled from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";
import { useTema } from "../hooks/temaContext";
import { usePassageiros, useUpdatePassageiro } from "../hooks/usePassageiros";
import { useSolicitanteLogado } from "../hooks/solicitanteLogado";

interface PassageiroProps {
  passageiro: {
    id: string;
    nome: string;
    matricula: string;
    telefone: string;
    email: string;
    ativo: boolean;
    fotoPerfilPassageiro: string;
    endRua: string;
    endNumero: string;
    endBairro: string;
    endCidade: string;
    pontoApanha: string;
    horarioEmbarque: string;
    centroCustoClienteId: {
      id: string;
      nome: string;
      codigo: string;
    };
    empresaClienteId: {
      id: string;
      nome: string;
    };
  };
}

interface LinhaPasageiro {
  $bg: string;
  $cor: string;
}

const LinhaPassageiro = styled.div<LinhaPasageiro>`
  width: 100%;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px;
  color: ${({ $cor }) => $cor};
  background-color: ${({ $bg }) => $bg}10;
  border-bottom: 1px solid ${({ $cor }) => $cor}10;

  &:hover {
    background-color: ${({ $cor }) => $cor}20;
  }

  &: active;
`;

function LinhaTabelaPassageiro({
  par,
  passageiro,
  setPassageiro,
  setCxVerPassageiro,
}: PassageiroProps & {
  par: boolean;
  setPassageiro: any;
  setCxVerPassageiro: any;
  cxVerPassageiro: boolean;
}) {
  const { Cor } = useTema();

  const clienteId = useSolicitanteLogado()?.empresaClienteId.id;

  const { refetch } = usePassageiros(clienteId!);
  const { atualizarPassageiro, loading } = useUpdatePassageiro();

  async function alterarStatusFunc() {
    await atualizarPassageiro(passageiro.id, { ativo: !passageiro.ativo });
    refetch();
  }
  return (
    <LinhaPassageiro
      $cor={Cor.texto1}
      $bg={par ? Cor.texto1 : Cor.base}
      key={passageiro.id}
      onClick={() => {
        setCxVerPassageiro(true);
        setPassageiro(passageiro);
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "5%",
        }}
      >
        <img
          src={
            passageiro?.fotoPerfilPassageiro ||
            "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1906669723.jpg"
          }
          style={{ width: 40, height: 40, borderRadius: 8, objectFit: "cover" }}
        />
      </div>
      <p style={{ width: "10%", textAlign: "center" }}>
        {passageiro.matricula}
      </p>
      <p style={{ width: "25%", textAlign: "left" }}>{passageiro.nome} </p>
      <p style={{ width: "5%", textAlign: "center", fontWeight: 700 }}>
        {passageiro.horarioEmbarque}h
      </p>
      <div style={{ width: "25%", textAlign: "left" }}>
        <p>
          {passageiro.endRua}, {passageiro.endBairro}, {passageiro.endCidade}
        </p>
      </div>
      <p
        title={`${passageiro.centroCustoClienteId.nome} / ${passageiro.centroCustoClienteId.codigo}`}
        style={{
          width: "15%",
          textAlign: "center",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow:"ellipsis"
        }}
      >
        {passageiro.centroCustoClienteId.nome} /{" "}
        {passageiro.centroCustoClienteId.codigo}
      </p>
      <p style={{ width: "10%", textAlign: "center" }}>{passageiro.telefone}</p>
      <BtnAlterarStatus
        $cor={passageiro.ativo ? Cor.ativo : Cor.inativo}
        onClick={(e) => {
          e.stopPropagation();
          console.log(passageiro.nome, passageiro.ativo);
          alterarStatusFunc();
        }}
      >
        {loading ? (
          <CircularProgress
            size={18}
            thickness={8}
            sx={{
              color: passageiro.ativo ? Cor.ativo : Cor.inativo,
              "& .MuiCircularProgress-circle": {
                strokeLinecap: "round",
              },
            }}
          />
        ) : (
          <p style={{ userSelect: "none" }}>
            {passageiro.ativo ? "Ativo" : "Inativo"}
          </p>
        )}
      </BtnAlterarStatus>
    </LinhaPassageiro>
  );
}

interface BtnAlterarStatus {
  $cor: string;
}

const BtnAlterarStatus = styled.div<BtnAlterarStatus>`
  width: 5%;
  height: 30px;
  border-radius: 12px;
  background-color: ${({ $cor }) => $cor}20;
  border: 1px solid ${({ $cor }) => $cor}40;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ $cor }) => $cor};
  cursor: pointer;
  transition: ease-in-out all 0.1s;

  &:hover {
    scale: 1.05;
    background-color: ${({ $cor }) => $cor}40;
    border: 1px solid ${({ $cor }) => $cor}80;
  }

  &:active {
    scale: 0.98;
    background-color: ${({ $cor }) => $cor}60;
    border: 1px solid ${({ $cor }) => $cor}CC;
  }
`;

export default LinhaTabelaPassageiro;
