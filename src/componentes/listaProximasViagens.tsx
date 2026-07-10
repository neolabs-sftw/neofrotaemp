import styled from "styled-components";
import { useTema } from "../hooks/temaContext";

interface LinhaVoucherProps {
  $bg: string;
  $bgHover: string;
  $border: string;
  $borderTipo: string;
}

const LinhaVoucher = styled.div<LinhaVoucherProps>`
  width: 100%;
  height: 60px;
  background-color: ${({ $bg }) => $bg + 15};
  border-radius: 12px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid ${({ $border }) => $border};
  border-right: 1px solid ${({ $border }) => $border};
  border-bottom: 1px solid ${({ $border }) => $border};
  border-left: 12px solid ${({ $borderTipo }) => $borderTipo};
  cursor: pointer;

  &:hover {
    background-color: ${({ $bgHover }) => $bgHover};
  }
`;

function ListaProximasViagens({
  v,
  modalPreveiw,
  setModalPreview,
  setVoucherPreview,
}: {
  v: any;
  modalPreveiw: boolean;
  setModalPreview: (visible: boolean) => void;
  setVoucherPreview: (voucher: any) => void;
}) {
  const Cor = useTema().Cor;

  return (
    <LinhaVoucher
      $bg={Cor.texto2 + 20}
      $bgHover={
        v?.natureza === "Fixo"
          ? Cor.textoFixo + "05"
          : v?.natureza === "Turno"
            ? Cor.textoTurno + "05"
            : Cor.textoExtra + "05"
      }
      $border={Cor.texto2 + 20}
      $borderTipo={
        v?.natureza === "Fixo"
          ? Cor.fixo
          : v?.natureza === "Turno"
            ? Cor.turno
            : Cor.extra
      }
      onClick={() => {
        setVoucherPreview(v);
        setModalPreview(!modalPreveiw);
      }}
    >
      <Natureza v={v} />
      <DividerH />
      <Tipo v={v} />
      <DividerH />
      <OrigemDestino v={v} />
      <DividerH />
      <Programação v={v} />
      <DividerH />
      <Motorista v={v} />
      <DividerH />
      <Cliente v={v} />
    </LinhaVoucher>
  );
}

function Natureza({ v }: { v: any }) {
  const Cor = useTema().Cor;

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "5%" }}>
      <p style={{ fontSize: 12, color: Cor.texto2 }}>Natureza</p>
      <p
        style={{
          fontSize: 16,
          fontWeight: "bold",
          color:
            v.natureza === "Fixo"
              ? Cor.textoFixo
              : v?.natureza === "Turno"
                ? Cor.textoTurno
                : Cor.textoExtra,
        }}
      >
        {v.natureza === "Fixo"
          ? "Fixo"
          : v?.natureza === "Turno"
            ? "Turno"
            : "Extra"}
      </p>
    </div>
  );
}

function Tipo({ v }: { v: any }) {
  const Cor = useTema().Cor;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "10%",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <p style={{ fontSize: 12, color: Cor.texto2 }}>Tipo</p>
        <p
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color:
              v.natureza === "Fixo"
                ? Cor.textoFixo
                : v?.natureza === "Turno"
                  ? Cor.textoTurno
                  : Cor.textoExtra,
          }}
        >
          {v.tipoCorrida === "Entrada" ? "Entrada" : "Saida"}
        </p>
      </div>
      <div
        style={{
          width: 35,
          height: 35,
          // backgroundColor: v.natureza === "fixo" ? Cor.fixo : Cor.extra,
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p
          style={{
            fontFamily: "Icone",
            fontWeight: "bold",
            color:
              v.natureza === "Fixo"
                ? Cor.fixo
                : v?.natureza === "Turno"
                  ? Cor.turno
                  : Cor.extra,
            fontSize: 24,
          }}
        >
          {v.tipoCorrida === "Entrada" ? "login" : "logout"}
        </p>
      </div>
    </div>
  );
}

function OrigemDestino({ v }: { v: any }) {
  const Cor = useTema().Cor;
  return (
    <div
      style={{
        width: "25%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
        padding: "10px 15px",
        backgroundColor: Cor.texto2 + 10,
        border: "1px solid " + Cor.texto2 + 30,
        borderRadius: 10,
        boxShadow: Cor.sombra,
      }}
    >
      <div
        style={{
          width: "45%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 5,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p style={{ fontSize: 12, color: Cor.texto2 }}>Origem</p>
          <p
            style={{
              width: 90,
              fontSize: 14,
              fontWeight: "bold",
              color:
                v.natureza === "Fixo"
                  ? Cor.textoFixo
                  : v?.natureza === "Turno"
                    ? Cor.textoTurno
                    : Cor.textoExtra,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "block",
            }}
          >
            {v.origem}
          </p>
        </div>
      </div>
      <p
        style={{
          fontFamily: "Icone",
          fontWeight: "bold",
          color:
            v.natureza === "Fixo"
              ? Cor.textoFixo
              : v?.natureza === "Turno"
                ? Cor.textoTurno
                : Cor.textoExtra,
          fontSize: 24,
        }}
      >
        trending_flat
      </p>
      <div
        style={{
          width: "45%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            justifyContent: "flex-end",
          }}
        >
          <p
            style={{
              fontSize: 12,
              color: Cor.texto2,
              textAlign: "right",
            }}
          >
            Destino
          </p>
          <p
            style={{
              width: 90,
              fontSize: 14,
              fontWeight: "bold",
              color:
                v.natureza === "Fixo"
                  ? Cor.textoFixo
                  : v?.natureza === "Turno"
                    ? Cor.textoTurno
                    : Cor.textoExtra,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "block",
              textAlign: "right",
            }}
          >
            {v.destino}
          </p>
        </div>
      </div>
    </div>
  );
}

function Programação({ v }: { v: any }) {
  const Cor = useTema().Cor;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
      }}
    >
      <p
        style={{
          fontFamily: "Icone",
          fontWeight: "bold",
          color:
            v.natureza === "Fixo"
              ? Cor.fixo
              : v?.natureza === "Turno"
                ? Cor.turno
                : Cor.extra,
          fontSize: 24,
        }}
      >
        timer
      </p>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <p style={{ fontSize: 12, color: Cor.texto2 }}>Programação</p>
        <p
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color:
              v.natureza === "Fixo"
                ? Cor.textoFixo
                : v?.natureza === "Turno"
                  ? Cor.textoTurno
                  : Cor.textoExtra,
          }}
        >
          {new Date(v.dataHoraProgramado).toLocaleString("pt-BR", {
            timeZone: "UTC",
            weekday: "short",
            hour: "2-digit",
            minute: "2-digit",
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
}

function Motorista({ v }: { v: any }) {
  const Cor = useTema().Cor;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "15%",
      }}
    >
      <p style={{ fontSize: 12, color: Cor.texto2 }}>Motorista</p>
      <p
        style={{
          fontSize: 16,
          fontWeight: "bold",
          color: Cor.texto1,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "block",
        }}
      >
        {v?.motorista?.nome || "Sem Motorista"}
      </p>
    </div>
  );
}

function Cliente({ v }: { v: any }) {
  const Cor = useTema().Cor;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "15%",
      }}
    >
      <p style={{ fontSize: 12, color: Cor.texto2 }}>Cliente</p>
      <p
        style={{
          fontSize: 16,
          fontWeight: "bold",
          color: Cor.texto1,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "block",
        }}
      >
        {v.empresaCliente?.nome || "Sem Cliente"}
      </p>
    </div>
  );
}

function DividerH() {
  const Cor = useTema().Cor;
  return (
    <div
      style={{
        height: "100%",
        width: 1,
        backgroundColor: Cor.texto2 + 50,
        margin: 5,
      }}
    />
  );
}

export default ListaProximasViagens;
