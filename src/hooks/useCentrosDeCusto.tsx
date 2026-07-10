import { gql, useMutation, useQuery } from "@apollo/client";

const GET_CENTROS_CUSTO_BY_EMPRESA = gql`
  query CentroCustoEmpresaClienteId($centroCustoEmpresaClienteId: ID!) {
    centroCustoEmpresaClienteId(id: $centroCustoEmpresaClienteId) {
      id
      nome
      codigo
    }
  }
`;

export function useCentroCustoByEmpresa(id: string) {
  const { data, loading, error } = useQuery(GET_CENTROS_CUSTO_BY_EMPRESA, {
    variables: {
      centroCustoEmpresaClienteId: id,
    },
  });

  return {
    listaCentrosCustos: data?.centroCustoEmpresaClienteId || [],
    loading,
    error,
  };
}

const UPDATE_CENTRO_CUSTO = gql`
  mutation UpdateCentroCusto(
    $updateCentroCustoId: ID!
    $input: CentroCustoInput!
  ) {
    updateCentroCusto(id: $updateCentroCustoId, input: $input) {
      id
    }
  }
`;

export function useEditarCentrosCusto(id: any) {
  const [editar, { data, loading, error }] = useMutation(UPDATE_CENTRO_CUSTO, {
    refetchQueries: [
      {
        query: GET_CENTROS_CUSTO_BY_EMPRESA,
        variables: { centroCustoEmpresaClienteId: id },
      },
    ],
  });

  const editarCentroCusto = (updateCentroCustoId: any, input: any) => {
    return editar({
      variables: {
        updateCentroCustoId,
        input,
      },
    });
  };

  return {
    editarCentroCusto,
    data,
    loading,
    error,
  };
}
