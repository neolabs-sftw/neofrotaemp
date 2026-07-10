import { gql, useMutation, useQuery } from "@apollo/client";

const GET_MOTORISTAS = gql`
  query MotoristasOperadora(
    $motoristasOperadoraId: ID!
    $orderBy: MotoristaOrderByInput
  ) {
    motoristasOperadora(id: $motoristasOperadoraId, orderBy: $orderBy) {
      id
      nome
      email
      senha
      fotoMotorista
      cpf
      cnh
      vCnh
      statusMotorista
      tipoMotorista
      dataCriacao
      statusCnh
    }
  }
`;

export function useMotorista(motoristasOperadoraId: any) {
  const { data, loading, error, refetch } = useQuery(GET_MOTORISTAS, {
    variables: {
      motoristasOperadoraId,
      orderBy: {
        direction: "asc",
        field: "nome",
      },
    },
    fetchPolicy: "cache-and-network",
  });
  return {
    listaMotoristas: data?.motoristasOperadora,
    loading,
    error,
    refetch: refetch || Promise.resolve(),
  };
}

const GET_MOTORISTA = gql`
  query Motorista($motoristaId: ID!) {
    motorista(id: $motoristaId) {
      id
      nome
      email
      senha
      fotoMotorista
      cpf
      cnh
      vCnh
      operadoraId{
        id
        nome
      }
      statusMotorista
      tipoMotorista
      dataCriacao
      statusCnh
    }
  }
`;

export function useMotoristaId(motoristaId: any) {
  const { data, loading, error, refetch } = useQuery(GET_MOTORISTA, {
    variables: { motoristaId },
    fetchPolicy: "cache-and-network",
  });
  return {
    motorista: data?.motorista,
    loading,
    error,
    refetch: refetch || Promise.resolve(),
  };
}

const UPDATE_MOTORISTA = gql`
  mutation UpdateMotorista($updateMotoristaId: ID!, $input: MotoristaInput!) {
    updateMotorista(id: $updateMotoristaId, input: $input) {
      id
    }
  }
`;

export function useUpdateMotorista() {
  const [updateMotorista, { loading, error }] = useMutation(UPDATE_MOTORISTA);
  return {
    updateMotorista,
    loading,
    error,
  };
}