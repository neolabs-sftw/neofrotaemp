import BaseTelas from "../componentes/baseTelas";
import EditPerfil from "../componentes/editPerfil";
import { useTema } from "../hooks/temaContext";
import { useState } from "react";
import BtnProximaViagem from "../componentes/btnProximaViagem";
import ListaProximasViagens from "../componentes/listaProximasViagens";
import { useVoucherPrev } from "../hooks/useVouchers";
import ModalPreviewVoucher from "../componentes/modalPreviewVoucher";
import CircularProgress from "@mui/material/CircularProgress";
import { useSolicitanteLogado } from "../hooks/solicitanteLogado";
import CardInfosMenorExtras from "../componentes/cardInfosMenorExtras";
import CardInfosMenorFixos from "../componentes/cardInfosMenorFIxos";
import CardInfosMenorTurnos from "../componentes/cardInfosMenorTurnos";
import CardInfosMenorTotal from "../componentes/cardInfosMenorTotal";

export function Home() {
  return (
    <BaseTelas
      conteudo={
        <>
          <EditPerfil />
          <OperacaoConteudo />
        </>
      }
    />
  );
}

function OperacaoConteudo() {
  const solicitante = useSolicitanteLogado();

  const [modalPreveiw, setModalPreview] = useState(false);
  const [voucherPreview, setVoucherPreview] = useState<any>(null);

  const formatarData = (isoOrDate: string | Date) => {
    const d = new Date(isoOrDate);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  const hoje = formatarData(new Date());

  const { listaVoucherPrevData, loading } = useVoucherPrev(
    solicitante?.operadoraId.id,
    hoje,
  );

  const listaProximosVouchers = listaVoucherPrevData.filter((v: any) => {
    return v.empresaCliente.id === solicitante?.empresaClienteId.id;
  });
  const listaVoucherDataFiltro = listaProximosVouchers.filter((v: any) => {
    return v.status == "Aberto";
  });

  const Cor = useTema().Cor;

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
      <ModalPreviewVoucher
        setVisivel={setModalPreview}
        visivel={modalPreveiw}
        v={voucherPreview}
      />

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
        <h3 style={{ color: Cor.secundaria, fontSize: "20px" }}>Dashboard</h3>
        <div
          style={{
            width: "75%",
            height: 1,
            backgroundColor: Cor.primaria,
          }}
        />
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 10,
          padding: 10,
        }}
      >
        <CardInfosMenorExtras />
        <CardInfosMenorFixos />
        <CardInfosMenorTurnos />
        <CardInfosMenorTotal />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          // height: 100,
        }}
      >
        <p style={{ color: Cor.texto1 }}>Próximas Corridas</p>
      </div>
      <div
        style={{
          width: "100%",
          height: "70vh",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 10,
          padding: 10,
          borderRadius: 22,
          backgroundColor: Cor.texto2 + 20,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
          }}
        >
          {listaVoucherDataFiltro.slice(0, 15).map((v: any) => (
            <BtnProximaViagem
              v={v}
              key={v.id}
              modalPreveiw={modalPreveiw}
              setModalPreview={setModalPreview}
              setVoucherPreview={setVoucherPreview}
            />
          ))}
        </div>
      </div>
      <div
        style={{
          width: "100%",
          backgroundColor: Cor.base2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "22px",
          padding: 10,
          gap: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
            // height: 100,
          }}
        >
          <p style={{ color: Cor.texto1 }}>Programação do Dia</p>
        </div>
        {loading ? (
          <CircularProgress
            size={40}
            thickness={5}
            sx={{ color: Cor.primaria }}
          />
        ) : (
          listaVoucherDataFiltro
            .slice(15)
            .map((v: any) => (
              <ListaProximasViagens
                v={v}
                key={v.id}
                modalPreveiw={modalPreveiw}
                setModalPreview={setModalPreview}
                setVoucherPreview={setVoucherPreview}
              />
            ))
        )}
      </div>
    </div>
  );
}
