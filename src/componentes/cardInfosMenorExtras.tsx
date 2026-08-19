import { useSolicitanteLogado } from "../hooks/solicitanteLogado";
import { useTema } from "../hooks/temaContext";
import { useFaturamentoClienteId } from "../hooks/useFaturamento";

export default function CardInfosMenorExtras() {
  const Cor = useTema().Cor;

  const valorAnterior = 0;

  function getMonthRangeISO() {
    const now = new Date();

    const start = new Date(
      Date.UTC(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0),
    );
    const end = new Date(
      Date.UTC(now.getFullYear(), now.getMonth() + 1, 1, 0, 0, 0, 0) - 1,
    );

    return {
      inicioISO: start.toISOString(),
      fimISO: end.toISOString(),
    };
  }

  const empresaClienteId = useSolicitanteLogado()?.empresaClienteId.id;

  const { data: dataExtraAbertos } = useFaturamentoClienteId(
    getMonthRangeISO().inicioISO,
    getMonthRangeISO().fimISO,
    String(empresaClienteId),
    "Aberto",
    "Extra",
  );

  const { data: dataExtraConcluidos } = useFaturamentoClienteId(
    getMonthRangeISO().inicioISO,
    getMonthRangeISO().fimISO,
    String(empresaClienteId),
    "Concluido",
    "Extra",
  );

  return (
    <div
      style={{
        width: "25%",
        height: 150,
        borderRadius: "22px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: "5px",
        padding: "15px",
        borderBottom: `1px solid ${Cor.extra + 35}`,
        borderRight: `1px solid ${Cor.extra + 35}`,
        backgroundColor: Cor.base2,
        boxShadow: `2px 2px 4px ${Cor.textoExtra + 10}`,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "start",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 5,
          }}
        >
          <div
            style={{
              width: "20px",
              height: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: Cor.extra,
              borderRadius: 5,
            }}
          >
            <p
              style={{
                fontFamily: "Icone",
                fontWeight: "bold",
                color: Cor.base2,
                fontSize: 14,
              }}
            >
              car_tag
            </p>
          </div>
          <p
            style={{
              fontSize: 14,
              color: Cor.extra,
              fontWeight: "bold",
            }}
          >
            Extra
          </p>
        </div>
        <p
          style={{
            textAlign: "end",
            fontSize: "12px",
            color: Cor.texto2,
          }}
        >
          Total :{" "}
          <strong style={{ fontSize: 14 }}>
            {Number(dataExtraAbertos?.qntVouchers || 0) +
              Number(dataExtraConcluidos?.qntVouchers || 0)}
          </strong>
        </p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          height: 80,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            height: 30,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            gap: 5,
          }}
        >
          <h1
            style={{
              color: Cor.texto1 + "CC",
              fontSize: 25,
            }}
          >
            {dataExtraAbertos?.qntVouchers || 0}
          </h1>
          <h1
            style={{
              color: Cor.texto1,
            }}
          >
            /
          </h1>
          <h1
            style={{
              color: Cor.textoExtra + "BB",
            }}
          >
            {dataExtraConcluidos?.qntVouchers || 0}
          </h1>
        </div>
        <div
          style={{
            display: "flex",
            height: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            gap: 5,
          }}
        >
          <p
            style={{
              color: Cor.texto1 + "CC",
              fontSize: 12,
              textWrap: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            {Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(Number(dataExtraAbertos?.totalFaturado)) || "R$ -"}
          </p>
          <p
            style={{
              color: Cor.texto1,
              fontWeight: "bold",
            }}
          >
            /
          </p>
          <p
            style={{
              color: Cor.textoExtra + "BB",
              fontSize: 14,
              fontWeight: "bold",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(Number(dataExtraConcluidos?.totalFaturado)) || "R$ -"}
          </p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
        }}
      >
        <div
          style={{
            padding: 2,
            paddingLeft: 5,
            paddingRight: 5,
            backgroundColor:
              valorAnterior < 0 ? Cor.inativo + 30 : Cor.ativo + 30,
            borderRadius: 5,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <p
            style={{
              color: valorAnterior < 0 ? Cor.inativo : Cor.ativo,
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            {valorAnterior}
          </p>
          <p
            style={{
              color: valorAnterior < 0 ? Cor.inativo : Cor.ativo,
              fontSize: "12px",
            }}
          >
            %
          </p>
        </div>
        <p
          style={{
            textAlign: "end",
            fontSize: "12px",
            color: Cor.texto2,
          }}
        >
          mês anterior
        </p>
      </div>
    </div>
  );
}
