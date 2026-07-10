import styled from "styled-components";
import { useTema } from "../hooks/temaContext";
import { useMotoristaId } from "../hooks/useMotorista";

interface BtnProximaViagemProps {
  $bg: string;
  $hover: string;
  $active: string;
}

const BtnProximaViagemStyled = styled.div<BtnProximaViagemProps>`
  width: 19.5%;
  height: 30%;
  border-radius: 18px;
  background-color: ${({ $bg }) => $bg};
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2px;
  cursor: pointer;
  transition: all 0.2s ease-in;
  box-shadow: 2px 2px 3px #00000030;

  &:hover {
    background-color: ${({ $hover }) => $hover};
  }

  &:active {
    background-color: ${({ $active }) => $active};
  }
`;

function BtnProximaViagem({
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
  const bg = Cor.base;
  const hover =
    v.natureza === "Fixo"
      ? Cor.fixo + 10
      : v.natureza === "Extra"
      ? Cor.extra + 10
      : v.natureza === "Turno"
      ? Cor.turno + 10
      : Cor.extra + 10;
  const active =
    v.natureza === "Fixo"
      ? Cor.fixo + 90
      : v.natureza === "Extra"
      ? Cor.extra + 90
      : v.natureza === "Turno"
      ? Cor.turno + 90
      : Cor.extra + 90;
  const { motorista } = useMotoristaId(v?.motorista?.id || 0);
  return (
    <>
      <BtnProximaViagemStyled
        $bg={bg}
        $active={active}
        $hover={hover}
        onClick={() => {
          setVoucherPreview(v);
          setModalPreview(!modalPreveiw);
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <p
            style={{
              color:
                v.natureza === "Fixo"
                  ? Cor.textoFixo
                  : v.natureza === "Turno"
                  ? Cor.textoTurno
                  : Cor.textoExtra,
            }}
          >
            ID: <strong>{v.id.toString().slice(0, 5)}</strong>...
          </p>
          <div
            style={{
              width: 30,
              height: 30,
              backgroundColor:
                v.natureza === "Fixo"
                  ? Cor.fixo
                  : v.natureza === "Turno"
                  ? Cor.turno
                  : Cor.extra,
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
                fontSize: "1.5rem",
                color: Cor.base,
              }}
            >
              {v.tipoCorrida === "Entrada" ? "login" : "logout"}
            </p>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 5,
          }}
        >
          <p style={{ fontSize: 12, color: Cor.texto2 }}>Cliente: </p>
          <p
            style={{
              fontWeight: "bold",
              color:
                v.natureza === "Fixo"
                  ? Cor.textoFixo
                  : v.natureza === "Turno"
                  ? Cor.textoTurno
                  : Cor.textoExtra,
              maxLines: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontSize: 15,
            }}
          >
            {v.empresaCliente?.nome || "Sem Cliente"}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 5,
          }}
        >
          <p style={{ fontSize: 12, color: Cor.texto2 }}>Motorista: </p>
          <p
            style={{
              fontWeight: "bold",
              color:
                v.natureza === "Fixo"
                  ? Cor.textoFixo
                  : v.natureza === "Turno"
                  ? Cor.textoTurno
                  : Cor.textoExtra,
              maxLines: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontSize: 15,
            }}
          >
            {motorista?.nome || "Sem Motorista"}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 5,
          }}
        >
          <p
            style={{
              fontWeight: "bold",
              color:
                v.natureza === "Fixo"
                  ? Cor.textoFixo
                  : v.natureza === "Turno"
                  ? Cor.textoTurno
                  : Cor.textoExtra,
              maxLines: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              textAlign: "center",
              fontSize: 12,
              width: "40%",
            }}
          >
            {v.origem}
          </p>
          <p style={{ fontSize: 12, color: Cor.texto2 }}>x</p>
          <p
            style={{
              fontWeight: "bold",
              color:
                v.natureza === "Fixo"
                  ? Cor.textoFixo
                  : v.natureza === "Turno"
                  ? Cor.textoTurno
                  : Cor.textoExtra,
              maxLines: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              textAlign: "center",
              fontSize: 12,
              width: "40%",
            }}
          >
            {v.destino}
          </p>
        </div>
        <div
          style={{ width: "100%", height: 1, backgroundColor: Cor.texto2 + 90 }}
        >
          <p style={{ color: "transparent" }}>s</p>
        </div>
        <p
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 24,
            color:
              v.natureza === "Fixo"
                ? Cor.textoFixo
                : v.natureza === "Turno"
                ? Cor.textoTurno
                : Cor.textoExtra,
          }}
        >
          {new Date(v.dataHoraProgramado).toLocaleTimeString("pt-BR", {
            timeZone: "UTC",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </BtnProximaViagemStyled>
    </>
  );
}

export default BtnProximaViagem;
