import { gql, useQuery } from "@apollo/client";

const GET_FATURAMENTO_MES = gql`
  query ResumoFaturamento($motoristaId: String!, $ano: Float!) {
    resumoFaturamento(motoristaId: $motoristaId, ano: $ano) {
      mes
      totalCorridas
      valorViagemRepasse
      valorDeslocamentoRepasse
      valorHoraParadaRepasse
      valorPedagio
      valorEstacionamento
      faturamentoTotal
    }
  }
`;

interface ResumoFaturamento {
  mes: string;
  totalCorridas: number;
  valorViagemRepasse: number;
  valorDeslocamentoRepasse: number;
  valorHoraParadaRepasse: number;
  valorPedagio: number;
  valorEstacionamento: number;
  faturamentoTotal: number;
}

export function useFaturamentoMes({
  motoristaId,
  ano,
}: {
  motoristaId: string;
  ano: number;
}) {
  const { data, loading, error, refetch } = useQuery<{
    resumoFaturamento: ResumoFaturamento[];
  }>(GET_FATURAMENTO_MES, {
    variables: {
      motoristaId,
      ano,
    },
    fetchPolicy: "cache-and-network",
  });

  return {
    listaMeses: data?.resumoFaturamento || [],
    loading,
    error,
    refetch: refetch || (() => Promise.resolve()),
  };
}
