import { gql, useMutation, useQuery } from "@apollo/client";

const GET_CARRO = gql`
  query CarroMotoristaId($idMotorista: ID!) {
    carroMotoristaId(idMotorista: $idMotorista) {
      id
      placa
      marca
      modelo
      cor
      crlv
      vCrlv
      chassi
      ano
      agregadoId {
        id
      }
      motoristaId {
        id
      }
      operadoraId {
        id
      }
    }
  }
`;

interface Carro {
  id: string;
  placa: string;
  marca: string;
  modelo: string;
  cor: string;
  crlv: string;
  chassi: string;
  ano: string;
  agregadoId: number;
  motoristaId: number;
  operadoraId: number;
}

interface CarroResposta {
  carroMotoristaId: Carro[];
}

export function useCarros(idMotorista: string) {
  const { data, loading, error, refetch } = useQuery<CarroResposta>(GET_CARRO, {
    variables: {
      idMotorista,
    },
    fetchPolicy: "cache-and-network",
  });

  return {
    listaCarros: data?.carroMotoristaId,
    loading,
    error,
    refetch: refetch || Promise.resolve(),
  };
}

const GET_CARRO_ID = gql`
  query CarroId($carroId: ID!) {
    carroId(id: $carroId) {
      id
      placa
      marca
      modelo
      cor
      crlv
      vCrlv
      chassi
      ano
      motoristaId
      agregadoId
      operadoraId
    }
  }
`;

export function useCarroId(carroId: string) {
  const { data, loading, error } = useQuery(GET_CARRO_ID, {
    variables: {
      carroId,
    },
  });
  return {
    carro: data?.carroId || "",
    loading,
    error,
  };
}
const GET_MARCAS_MODELOS = gql`
  query Marcas {
    marcas {
      id
      nome
    }
    modelos {
      id
      nome
      marcaId {
        id
        nome
      }
    }
  }
`;

export function useMarcaModelos() {
  const { data, loading, error } = useQuery(GET_MARCAS_MODELOS);
  return {
    carros: data,
    loading,
    error,
  };
}

const CREATE_CARRO = gql`
  mutation CreateCarro($data: CarroInput!) {
    createCarro(data: $data) {
      id
    }
  }
`;

interface NovoCarroInput {
  placa: string;
  marca: string;
  modelo: string;
  cor: string;
  crlv: string;
  chassi: string;
  ano: string;
  agregadoId: number;
  operadoraId: number;
}

export function useCreateCarro() {
  const [createCarro, { loading, error }] = useMutation(CREATE_CARRO);

  const criar = (data: NovoCarroInput) => {
    return createCarro({
      variables: { data },
    });
  };
  return { criar, loading, error };
}

const GET_CARRO_ATRELADO = gql`
  query CarroMotoristaId($idMotorista: ID!) {
    carroMotoristaId(idMotorista: $idMotorista) {
      id
      marca
      modelo
      crlv
      cor
      chassi
      ano
      placa
      vCrlv
    }
  }
`;

export function useCarroAtrelado(id: string) {
  const { data, loading, error, refetch } = useQuery(GET_CARRO_ATRELADO, {
    variables: {
      idMotorista: id,
    },
  });

  return {
    carroAtrelado: data?.carroMotoristaId,
    loading,
    error,
    refetch: refetch || Promise.resolve(),
  };
}

const GET_LISTA_VEICULOS_PROPRIEDADE = gql`
  query CarrosAgregadoId($id: ID!) {
    carrosAgregadoId(id: $id) {
      id
      placa
      marca
      modelo
      cor
      crlv
      vCrlv
      chassi
      ano
      agregadoId {
        id
        nome
      }
      motoristaId {
        id
        nome
      }
    }
  }
`;

export function useListaCarrosAgregado(id: string) {
  const { data, loading, error, refetch } = useQuery(
    GET_LISTA_VEICULOS_PROPRIEDADE,
    {
      variables: {
        id,
      },
    },
  );

  return {
    listaCarrosAgregado: data?.carrosAgregadoId,
    loading,
    error,
    refetch: refetch || Promise.resolve(),
  };
}

const DEFINIR_MOTORISTA = gql`
  mutation UpdateCarro($updateCarroId: ID!, $data: CarroInput!) {
    updateCarro(id: $updateCarroId, data: $data) {
      id
    }
  }
`;

export function useDefinirMotorista() {
  const [atualizar, { data, loading, error }] = useMutation(DEFINIR_MOTORISTA);

  const vincularMotorista = async (CarroId: string, motoristaId: number | null) => {
    return await atualizar({
      variables: {
        updateCarroId: CarroId,
        data: {
          motoristaId: motoristaId === null ? null : Number(motoristaId),
        },
      },
    });
  };

  return {
    vincularMotorista,
    data,
    loading,
    error,
  };
}
