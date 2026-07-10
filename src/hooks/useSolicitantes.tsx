import { gql, useMutation, useQuery } from "@apollo/client";

const GET_SOLICITANTES_EMPRESA_ID = gql`
  query SolicitantesEmpresaClienteId($solicitantesEmpresaClienteId: ID!) {
    solicitantesEmpresaClienteId(id: $solicitantesEmpresaClienteId) {
      id
      nome
      email
      senha
      funcao
      telefone
      operadoraId {
        id
      }
      statusSolicitante
      empresaClienteId {
        id
      }
      fotoUrlSolicitante
    }
  }
`;

export function useSolicitante(solicitantesEmpresaClienteId: any) {
  const { data, loading, error, refetch } = useQuery(
    GET_SOLICITANTES_EMPRESA_ID,
    {
      variables: { solicitantesEmpresaClienteId },
      fetchPolicy: "cache-and-network",
    },
  );
  return {
    solicitantes: data?.solicitantesEmpresaClienteId,
    loading,
    error,
    refetch: refetch || Promise.resolve(),
  };
}

const UPDATE_SOLICITANTE = gql`
  mutation UpdateSolicitante(
    $updateSolicitanteId: ID!
    $input: SolicitanteInput!
  ) {
    updateSolicitante(id: $updateSolicitanteId, input: $input) {
      id
    }
  }
`;

export function useEditarSolicitante(solicitantesEmpresaClienteId: any) {
  const [edit, { data, loading, error }] = useMutation(UPDATE_SOLICITANTE, {
    refetchQueries: [
      {
        query: GET_SOLICITANTES_EMPRESA_ID,
        variables: { solicitantesEmpresaClienteId },
      },
    ],
  });

  const editarSolicitante = (updateSolicitanteId: any, input: any) => {
    return edit({
      variables: {
        updateSolicitanteId,
        input,
      },
    });
  };

  return {
    editarSolicitante,
    data,
    loading,
    error,
  };
}
