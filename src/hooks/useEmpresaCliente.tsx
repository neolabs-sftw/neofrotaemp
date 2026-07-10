import { gql, useMutation, useQuery } from "@apollo/client";

const GET_EMPRESA_CLIENTE = gql`
  query EmpresaClienteId($empresaClienteId: ID!) {
    empresaClienteId(id: $empresaClienteId) {
      id
      nome
      rSocial
      cnpj
      fotoLogoCliente
      operadoraId {
        id
        nome
      }
      statusCliente
    }
  }
`;

export function useEmpresaCliente(empresaClienteId: string) {
  const { data, loading, error, refetch } = useQuery(GET_EMPRESA_CLIENTE, {
    variables: { empresaClienteId },
  });
  return {
    empresaCliente: data?.empresaClienteId,
    loading,
    error,
    refetch: refetch || Promise.resolve(),
  };
}

const GET_LISTA_EMPRESA_CLIENTES = gql`
  query EmpresaClienteOper($operadoraId: String) {
    empresaClienteOper(operadoraId: $operadoraId) {
      id
      nome
      rSocial
      cnpj
      fotoLogoCliente
      operadoraId {
        id
      }
      statusCliente
    }
  }
`;

export function useListaClientes(operadoraId: string) {
  const { data, loading, error, refetch } = useQuery(
    GET_LISTA_EMPRESA_CLIENTES,
    {
      variables: { operadoraId },
      fetchPolicy: "cache-and-network",
    },
  );
  return {
    listaClientes: data?.empresaClienteOper,
    loading,
    error,
    refetch: refetch || Promise.resolve(),
  };
}

const UPDATE_EMPRESA = gql`
  mutation UpdateEmpresaCliente(
    $updateEmpresaClienteId: ID!
    $data: EmpresaClienteInput!
  ) {
    updateEmpresaCliente(id: $updateEmpresaClienteId, data: $data) {
      id
    }
  }
`;

interface EmpresaClienteInput {
  nome: string;
  rSocial: string;
  cnpj: string;
  fotoLogoCliente: string;
  operadoraId: number;
  statusCliente: boolean;
}

export function useEditarEmpresaCliente(operadoraId: string) {
  const [editar, { data, loading, error }] = useMutation(UPDATE_EMPRESA, {
    refetchQueries: [
      { query: GET_LISTA_EMPRESA_CLIENTES, variables: { operadoraId } },
    ],
    awaitRefetchQueries: true,
  });

  const editarEmpresa = async (
    updateEmpresaClienteId: string,
    data: Partial<EmpresaClienteInput>,
  ) => {
    return await editar({
      variables: {
        updateEmpresaClienteId,
        data,
      },
    });
  };

  return {
    editarEmpresa,
    data,
    loading,
    error,
  };
}
