import { gql, useMutation, useQuery } from "@apollo/client";

const GET_UNIDADE_CLIENTE = gql`
  query ListaUnidadesEmpresaClienteId($listaUnidadesEmpresaClienteId: ID!) {
    listaUnidadesEmpresaClienteId(id: $listaUnidadesEmpresaClienteId) {
      id
      nome
      cnpj
      endRua
      endNumero
      endBairro
      endCep
      endCidade
      endComplemento
      endUf
      statusUnidadeCliente
      matriz
      empresaClienteId {
        id
      }
      operadoraId {
        id
      }
    }
  }
`;

export function useUnidadeCliente(listaUnidadesEmpresaClienteId: any) {
  const { data, loading, error, refetch } = useQuery(GET_UNIDADE_CLIENTE, {
    variables: { listaUnidadesEmpresaClienteId },
    fetchPolicy: "cache-and-network",
  });
  return {
    listaUnidades: data?.listaUnidadesEmpresaClienteId,
    loading,
    error,
    refetch: refetch || Promise.resolve(),
  };
}

const GET_UNIDADE_CLIENTE_ID = gql`
  query UnidadeEmpresaClienteId($unidadeEmpresaClienteId: ID!) {
    unidadeEmpresaClienteId(id: $unidadeEmpresaClienteId) {
      id
      nome
      cnpj
      endRua
      endNumero
      endBairro
      endCep
      endCidade
      endComplemento
      endUf
      statusUnidadeCliente
      matriz
    }
  }
`;

export function useUnidadeId(unidadeEmpresaClienteId: string) {
  const { data, loading, error } = useQuery(GET_UNIDADE_CLIENTE_ID, {
    variables: {
      unidadeEmpresaClienteId,
    },
  });
  return {
    unidade: data?.unidadeEmpresaClienteId || "",
    loading,
    error,
  };
}

const CRIAR_UNIDADE_CLIENTE = gql`
  mutation CreateUnidadeEmpresaCliente($input: UnidadeEmpresaClienteInput!) {
    createUnidadeEmpresaCliente(input: $input) {
      id
    }
  }
`;

export function useCriarUnidadeCliente(listaUnidadesEmpresaClienteId: string) {
  const [criarMut, { data, loading, error }] = useMutation(
    CRIAR_UNIDADE_CLIENTE,
    {
      refetchQueries: [
        {
          query: GET_UNIDADE_CLIENTE,
          variables: { listaUnidadesEmpresaClienteId },
        },
      ],
    },
  );

  const criarUnidade = (input: any) => {
    return criarMut({
      variables: { input },
    });
  };

  return {
    criarUnidade,
    data,
    loading,
    error,
  };
}

const UPDATE_UNIDADE = gql`
  mutation UpdateUnidadeEmpresaCliente(
    $input: UnidadeEmpresaClienteInput!
    $updateUnidadeEmpresaClienteId: ID!
  ) {
    updateUnidadeEmpresaCliente(
      input: $input
      id: $updateUnidadeEmpresaClienteId
    ) {
      id
    }
  }
`;

export function useUpdateUnidade(listaUnidadesEmpresaClienteId: string) {
  const [editMutation, { data, loading, error }] = useMutation(UPDATE_UNIDADE, {
    refetchQueries: [
      {
        query: GET_UNIDADE_CLIENTE,
        variables: { listaUnidadesEmpresaClienteId },
      },
    ],
  });
  const editarUnidade = (id: any, input: Partial<any>) => {
    return editMutation({
      variables: { updateUnidadeEmpresaClienteId: id, input },
    });
  };

  return {
    editarUnidade,
    data,
    loading,
    error,
  };
}

const DEFINIR_MATRIZ = gql`
  mutation DefinirUnidadeMatriz($unidadeId: ID!) {
    definirUnidadeMatriz(unidadeId: $unidadeId) {
      id
    }
  }
`;

export function useDefinirMatriz(listaUnidadesEmpresaClienteId: string) {
  const [edit, { data, loading, error }] = useMutation(DEFINIR_MATRIZ, {
    refetchQueries: [
      {
        query: GET_UNIDADE_CLIENTE,
        variables: { listaUnidadesEmpresaClienteId },
      },
    ],
  });

  const definirMatriz = (unidadeId: string) => {
    return edit({
      variables: { unidadeId },
    });
  };

  return {
    definirMatriz,
    data,
    loading,
    error,
  };
}
