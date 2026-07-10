import { gql, useQuery } from "@apollo/client";

const GET_PEGADIOS_OPER_ID = gql`
  query PedagioOperadoraId($pedagioOperadoraId: ID!) {
    pedagioOperadoraId(id: $pedagioOperadoraId) {
      id
      nome
      valor
    }
  }
`;

interface PedagiosData {
  pedagioOperadoraId: [{ id: string; nome: string; valor: number }];
}

export function usePedagios(id: string) {
  const { data, loading, error, refetch } = useQuery<PedagiosData>(
    GET_PEGADIOS_OPER_ID,
    {
      variables: { pedagioOperadoraId: id },
      fetchPolicy: "cache-and-network",
    },
  );

  return {
    listaPedagios: data?.pedagioOperadoraId || [],
    loading,
    error,
    refetch: refetch || Promise.resolve(),
  };
}
