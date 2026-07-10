import { gql, useMutation, useQuery } from "@apollo/client";

const GET_LIST_PASSAGEIROS_BY_EMPRESA_CLIENTE = gql`
  query PassageirosByEmpresaCliente($empresaClienteId: ID!) {
    passageirosByEmpresaCliente(empresaClienteId: $empresaClienteId) {
      id
      nome
      matricula
      telefone
      email
      ativo
      fotoPerfilPassageiro
      endRua
      endNumero
      endBairro
      endCidade
      pontoApanha
      horarioEmbarque
      centroCustoClienteId {
        id
        nome
        codigo
      }
      empresaClienteId {
        id
        nome
      }
    }
  }
`;

interface Passageiro {
  id: string;
  nome: string;
  matricula: string;
  telefone: string;
  email: string;
  ativo: boolean;
  fotoPerfilPassageiro: string;
  endRua: string;
  endNumero: string;
  endBairro: string;
  endCidade: string;
  pontoApanha: string;
  horarioEmbarque: string;
  centroCustoClienteId: {
    id: string;
    nome: string;
    codigo: string;
  };
  empresaClienteId: {
    id: string;
    nome: string;
  };
}

interface UsePassageirosResult {
  passageirosByEmpresaCliente: Passageiro[] | undefined;
  loading: boolean;
  error: any;
  refetch: () => Promise<any>;
}

export function usePassageiros(empresaClienteId: string) {
  const { data, loading, error, refetch } = useQuery<UsePassageirosResult>(
    GET_LIST_PASSAGEIROS_BY_EMPRESA_CLIENTE,
    {
      variables: { empresaClienteId },
      fetchPolicy: "cache-and-network",
    },
  );
  return {
    listaPassageiro: data?.passageirosByEmpresaCliente,
    loading,
    error,
    refetch: refetch || Promise.resolve(),
  };
}

const GET_PASSAGEIRO_ID = gql`
  query Passageiro($passageiroId: ID!) {
    passageiro(id: $passageiroId) {
      id
      nome
      matricula
      telefone
      email
      ativo
      fotoPerfilPassageiro
      endRua
      endNumero
      endBairro
      endCidade
      pontoApanha
      horarioEmbarque
      centroCustoClienteId {
        id
        nome
        codigo
      }
      empresaClienteId {
        id
        nome
      }
    }
  }
`;

interface PassageiroIdResult {
  passageiro: Passageiro | null;
}

export function usePassageiroId(passageiroId: string) {
  const { data, loading, error, refetch } = useQuery<PassageiroIdResult>(
    GET_PASSAGEIRO_ID,
    {
      variables: { passageiroId },
      fetchPolicy: "cache-and-network",
    },
  );
  return {
    passageiro: data?.passageiro,
    loading,
    error,
    refetch: refetch || Promise.resolve(),
  };
}

const CREATE_PASSAGEIRO = gql`
  mutation CreatePassageiro($input: PassageiroInput!) {
    createPassageiro(input: $input) {
      id
      nome
      matricula
    }
  }
`;

interface CreatePassageiroInput {
  nome: string;
  matricula: string;
  telefone: string;
  email: string;
  endRua: string;
  endNumero: string;
  endBairro: string;
  endCidade: string;
  pontoApanha: string;
  horarioEmbarque: string;
  fotoPerfilPassageiro: string;
  centroCustoClienteId: number;
  empresaClienteId: number;
  ativo: Boolean;
}

export function useCreatePassageiro() {
  const [criar, { data, loading, error }] = useMutation(CREATE_PASSAGEIRO);

  const criarPassageiro = (input: CreatePassageiroInput) => {
    return criar({
      variables: { input },
    });
  };

  return {
    criarPassageiro,
    data,
    loading,
    error,
  };
}

const UPDATE_PASSAGEIRO = gql`
  mutation UpdatePassageiro($updatePassageiroId: ID!, $data: PassageiroInput!) {
    updatePassageiro(id: $updatePassageiroId, data: $data) {
      id
    }
  }
`;

interface PassageiroInput {
  nome: string;
  matricula: string;
  telefone: string;
  email: string;
  endRua: string;
  endNumero: string;
  endBairro: string;
  endCidade: string;
  pontoApanha: string;
  horarioEmbarque: string;
  fotoPerfilPassageiro: string;
  centroCustoClienteId: number;
  empresaClienteId: number;
  ativo: Boolean;
}

export function useUpdatePassageiro() {
  const [update, { data, loading, error }] = useMutation(UPDATE_PASSAGEIRO);

  const atualizarPassageiro = (
    id: string,
    data: Partial<PassageiroInput>,
  ) => {
    return update({
      variables: {
        updatePassageiroId: id,
        data,
      },
    });
  };

  return {
    atualizarPassageiro,
    data,
    loading,
    error,
  };
}
