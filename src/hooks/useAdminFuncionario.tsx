import { gql, useMutation, useQuery } from "@apollo/client";

const GET_ADMIN_USER_BY_OPERADORA = gql`
  query AdminUsuario($adminUsuarioId: ID!) {
    adminUsuario(id: $adminUsuarioId) {
      id
      nome
      email
      senha
      fotoAdminOperadora
      funcao
      statusAdminOperadora
      dataCriacao
      operadora {
        id
        nome
        statusOperadora
      }
    }
  }
`;

const GET_LIST_ADMIN_USER_BY_OPERADORA = gql`
  query AdminUsuariosByOperadora($operadoraId: ID!) {
    adminUsuariosByOperadora(operadoraId: $operadoraId) {
      id
      nome
      email
      senha
      fotoAdminOperadora
      funcao
      statusAdminOperadora
      dataCriacao
      operadora {
        id
        nome
        statusOperadora
      }
    }
  }
`;

interface AdminFuncionario {
  id: string;
  nome: string;
  email: string;
  senha: string;
  fotoAdminOperadora: string;
  funcao: string;
  statusAdminOperadora: string;
  dataCriacao: string;
  operadora: {
    id: string;
    nome: string;
    statusOperadora?: string;
  };
}

export function useAdminFuncionario(adminUsuarioId: string) {
  const { data, loading, error, refetch } = useQuery<{
    adminUsuario: AdminFuncionario;
  }>(GET_ADMIN_USER_BY_OPERADORA, {
    variables: { adminUsuarioId },
    fetchPolicy: "cache-and-network",
  });
  return {
    adminFuncionario: data?.adminUsuario,
    loading,
    error,
    refetch: refetch || (() => Promise.resolve()),
  };
}

export function useListaAdminFuncionario(operadoraId: string) {
  const { data, loading, error, refetch } = useQuery<{
    adminUsuariosByOperadora: AdminFuncionario[];
  }>(GET_LIST_ADMIN_USER_BY_OPERADORA, {
    variables: { operadoraId },
    fetchPolicy: "cache-and-network",
  });
  return {
    listAdminFuncionario: data?.adminUsuariosByOperadora,
    loading,
    error,
    refetch: refetch || (() => Promise.resolve()),
  };
}

const UPDATE_ADMIN_USER = gql`
  mutation UpdateAdminUsuario(
    $updateAdminUsuarioId: ID!
    $data: AdminUsuarioInput!
  ) {
    updateAdminUsuario(id: $updateAdminUsuarioId, data: $data) {
      id
    }
  }
`;

export function useEditarAdminUsuario(operadoraId: string) {
  const [editar, { loading, data, error }] = useMutation(UPDATE_ADMIN_USER, {
    refetchQueries: [
      { query: GET_LIST_ADMIN_USER_BY_OPERADORA, variables: { operadoraId } },
    ],
  });

  const editarAdmin = (updateAdminUsuarioId: string, data: any) => {
    return editar({
      variables: {
        updateAdminUsuarioId,
        data,
      },
    });
  };

  return {
    editarAdmin,
    loading,
    data,
    error,
  };
}
