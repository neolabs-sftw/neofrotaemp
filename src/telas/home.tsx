import BaseTelas from "../componentes/baseTelas";
import EditPerfil from "../componentes/editPerfil";
import { useTema } from "../hooks/temaContext";
import { useState } from "react";
import BtnProximaViagem from "../componentes/btnProximaViagem";
import ListaProximasViagens from "../componentes/listaProximasViagens";
import { useVoucherPrev } from "../hooks/useVouchers";
import ModalPreviewVoucher from "../componentes/modalPreviewVoucher";
import styled from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";
import { useSolicitante } from "../hooks/useSolicitante";

export function Home() {
  const { solicitantes } = useSolicitante(1);
  console.log(solicitantes);
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

interface BtnProps {
  $cor: string;
}

const BtnAtualizarStyle = styled.button<BtnProps>`
  padding: 6px 10px;
  border-radius: 60px;
  outline: none;
  border: 1px solid ${({ $cor }) => $cor};
  background-color: ${({ $cor }) => $cor + "BB"};
  position: absolute;
  bottom: 15px;
  right: 15px;
  backdrop-filter: blur(3px);
  cursor: pointer;
  transition: all ease-in-out 0.1s;

  &:hover {
    background-color: ${({ $cor }) => $cor + 90};
    scale: 1.01;
  }
  &:active {
    scale: 0.9;
  }
`;

function OperacaoConteudo() {
  //   const token = localStorage.getItem("token");

  //   interface JwtPayload {
  //     adminUsuarioId?: string;
  //     operadoraId?: string;
  //   }

  //   const decoded = token ? jwtDecode<JwtPayload>(token) : null;
  //   const operadoraId = decoded?.operadoraId || "";

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

  const {
    listaVoucherPrevData,
    refetch: refetchVouchers,
    loading,
  } = useVoucherPrev(7, hoje);

  console.log(listaVoucherPrevData);

  const listaVoucherDataFiltro = listaVoucherPrevData.filter((v: any) => {
    return v.status == "Concluido";
  });

  //   useEffect(() => {
  //     const atualizarOperacao = () => {
  //       refetchVouchers();
  //     };

  //     atualizarOperacao();

  //     const intervalId = setInterval(atualizarOperacao, 300000);

  //     return () => clearInterval(intervalId);
  //   }, []);

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
      <BtnAtualizarStyle
        $cor={Cor.primaria}
        onClick={() => {
          refetchVouchers();
        }}
      >
        <p
          style={{
            fontFamily: "Icone",
            fontWeight: "bold",
            fontSize: 40,
            color: Cor.primariaTxt,
          }}
        >
          refresh
        </p>
      </BtnAtualizarStyle>
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
        {/* <div
          style={{
            width: "20%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            gap: 5,
          }}
        >
          <BtnNovoVoucher
            $cor={Cor.primaria}
            onClick={() => {
              navigate("/modelosvouchersfixos");
            }}
          >
            <p
              style={{
                fontFamily: "Icone",
                fontWeight: "bold",
                fontSize: 40,
                color: Cor.primaria,
              }}
            >
              history
            </p>
            <p
              style={{
                textAlign: "center",
                fontSize: 16,
                color: Cor.secundaria,
              }}
            >
              Roteiros Fixos
            </p>
          </BtnNovoVoucher>
          <BtnNovoVoucher $cor={Cor.primaria}>
            <p
              style={{
                fontFamily: "Icone",
                fontWeight: "bold",
                fontSize: 40,
                color: Cor.primaria,
              }}
            >
              cycle
            </p>
            <p
              style={{
                textAlign: "center",
                fontSize: 16,
                color: Cor.secundaria,
              }}
            >
              Roteiros Turno
            </p>
          </BtnNovoVoucher>
          <BtnNovoVoucher
            $cor={Cor.primaria}
            onClick={() => {
              navigate("/novovoucher");
            }}
          >
            <p
              style={{
                fontFamily: "Icone",
                fontWeight: "bold",
                fontSize: 40,
                color: Cor.primaria,
              }}
            >
              car_tag
            </p>
            <p
              style={{
                textAlign: "center",
                fontSize: 16,
                color: Cor.secundaria,
              }}
            >
              Novo Voucher
            </p>
          </BtnNovoVoucher>
        </div> */}
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
            height: 100,
          }}
        >
          <p>Próximos Vouchers</p>
        </div>
        {loading ? (
          <CircularProgress
            size={40}
            thickness={5}
            sx={{ color: Cor.primaria }}
          />
        ) : (
          listaVoucherPrevData.map((v: any) => (
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
