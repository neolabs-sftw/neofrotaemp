import { gql, useQuery } from "@apollo/client";

const GET_FATU_PARCIAL = gql`
  query FaturamentoParcialOperadoraID(
    $inicio: DateTime!
    $fim: DateTime!
    $operadoraId: ID!
    $natureza: String!
    $status: String!
  ) {
    faturamentoParcialOperadoraID(
      inicio: $inicio
      fim: $fim
      operadoraId: $operadoraId
      natureza: $natureza
      status: $status
    ) {
      operadoraId
      qtdVouchers
      totalFaturado
    }
  }
`;

interface Fatu_Parcial_Mes {
  faturamentoParcialOperadoraID: {
    operadoraId: String;
    qtdVouchers: String;
    totalFaturado: String;
  };
}

export function useFaturamentoParcialMes(
  inicio: string,
  fim: string,
  operadoraId: string,
  status: string,
  natureza: string,
) {
  const { data, loading, error } = useQuery<Fatu_Parcial_Mes>(
    GET_FATU_PARCIAL,
    {
      variables: {
        inicio,
        fim,
        operadoraId,
        status,
        natureza,
      },
    },
  );

  return {
    data: data?.faturamentoParcialOperadoraID,
    loading,
    error,
  };
}

const GET_FATU_TOTAL = gql`
  query FaturamentoTotalOperadoraID(
    $inicio: DateTime!
    $fim: DateTime!
    $operadoraId: ID!
    $status: String
  ) {
    faturamentoTotalOperadoraID(
      inicio: $inicio
      fim: $fim
      operadoraId: $operadoraId
      status: $status
    ) {
      operadoraId
      qtdVouchers
      totalFaturado
    }
  }
`;

interface Fatu_Total_Mes {
  faturamentoTotalOperadoraID: {
    operadoraId: String;
    qtdVouchers: String;
    totalFaturado: String;
  };
}

export function useFaturamentoTotalMes(
  inicio: string,
  fim: string,
  operadoraId: string,
  status: string,
) {
  const { data, loading, error } = useQuery<Fatu_Total_Mes>(GET_FATU_TOTAL, {
    variables: {
      inicio,
      fim,
      operadoraId,
      status,
    },
  });

  return {
    faturamentoTotal: data?.faturamentoTotalOperadoraID,
    loading,
    error,
  };
}

const GET_FATURAMENTO_DIARIO = gql`
  query FaturamentoDiarioOperadora(
    $inicio: DateTime!
    $fim: DateTime!
    $operadoraId: ID!
  ) {
    faturamentoDiarioOperadora(
      inicio: $inicio
      fim: $fim
      operadoraId: $operadoraId
    ) {
      dia
      valor
    }
  }
`;

export function useFaturamentoDiario(
  inicio: string,
  fim: string,
  operadoraId: string,
) {
  const { data, loading, error } = useQuery(GET_FATURAMENTO_DIARIO, {
    variables: {
      inicio,
      fim,
      operadoraId,
    },
  });

  return {
    faturamentoDiario: data?.faturamentoDiarioOperadora,
    loading,
    error,
  };
}
