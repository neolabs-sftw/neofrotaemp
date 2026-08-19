import { useParams } from "react-router-dom";
import { useState } from "react";
import { useTema } from "../hooks/temaContext";
import BaseTelas from "../componentes/baseTelas";
import EditPerfil from "../componentes/editPerfil";
import ListaPassageiros from "../componentes/listaPassageiros";
import BtnCriarPassageiro from "../componentes/criarPassageiro";
import { useCentroCustoByEmpresa } from "../hooks/useCentrosDeCusto";
import { useSolicitanteLogado } from "../hooks/solicitanteLogado";

function Passageiros() {
  return BaseTelas({
    conteudo: (
      <>
        <EditPerfil />
        <PassageirosConteudo />
      </>
    ),
  });
}

export default Passageiros;

function PassageirosConteudo() {
  const [bNome, setbNome] = useState<string>("");
  const [bCentro, setbCentro] = useState<string>("");
  const { Cor } = useTema();
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        padding: "25px 15px 15px 15px",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 20,
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 10,
        }}
      >
        <h3 style={{ color: Cor.secundaria, fontSize: "20px" }}>Passageiros</h3>
        <div
          style={{
            width: "75%",
            height: 1,
            backgroundColor: Cor.primaria,
          }}
        />
      </div>
      <CadastrarNovoCliente setbNome={setbNome} setbCentro={setbCentro} />
      <ListaPassageiros bNome={bNome} bCentro={bCentro} />
    </div>
  );
}

function CadastrarNovoCliente({
  setbNome,
  setbCentro,
}: {
  setbNome: any;
  setbCentro: any;
}) {
  const Cor = useTema().Cor;

  const clienteId = useSolicitanteLogado()?.empresaClienteId.id 

  return (
    <div
      style={{
        backgroundColor: Cor.base2,
        width: "100%",
        borderRadius: 22,
        padding: 15,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: Cor.sombra,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 15,
          alignItems: "center",
        }}
      >
        <p style={{ color: Cor.texto2, fontSize: 14 }}>
          Pesquisar por <br /> passageiros:
        </p>
        <CampoBuscasPassageiros setbNome={setbNome} />
        <p style={{ color: Cor.texto2, fontSize: 14 }}>
          Pesquisar por <br /> Centro de Custo:
        </p>
        <SelectCentroCusto setbCentro={setbCentro} />
      </div>
      <BtnCriarPassageiro clienteId={String(clienteId)} />
    </div>
  );
}

function CampoBuscasPassageiros({ setbNome }: { setbNome: any }) {
  const Cor = useTema().Cor;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: Cor.texto1 + 10,
        borderRadius: 22,
        height: 40,
        marginRight: 50,
      }}
    >
      <input
        style={{
          padding: "15px 0 15px 15px",
          border: "none",
          outline: "none",
          width: 350,
          borderRadius: "22px 0 0 22px",
          color: Cor.texto1,
          backgroundColor: "transparent",
          fontSize: 16,
        }}
        onChange={(e) => setbNome(e.target.value)}
      />
    </div>
  );
}

function SelectCentroCusto({ setbCentro }: { setbCentro: any }) {
  const { Cor } = useTema();

  const { clienteId } = useParams();

  const { listaCentrosCustos } = useCentroCustoByEmpresa(String(clienteId));

  return (
    <select
      style={{
        width: 250,
        borderRadius: 22,
        padding: 10,
        border: "none",
        outline: "none",
        backgroundColor: Cor.texto1 + 10,
        color: Cor.texto1,
        fontSize: 16,
      }}
      onChange={(e) => setbCentro(e.target.value)}
    >
      <option value="" style={{ backgroundColor: Cor.base, color: Cor.texto1 }}>
        Todos
      </option>
      {listaCentrosCustos.map((c: any) => {
        return (
          <option
            key={c.id}
            value={c.nome}
            style={{ backgroundColor: Cor.base, color: Cor.texto1 }}
          >
            {c?.nome || ""}
          </option>
        );
      })}
    </select>
  );
}
