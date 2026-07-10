import { gql, useMutation, useQuery } from "@apollo/client";

const GET_MODELOS_FIXOS = gql`
  query ModelosVoucherFixo($operadoraId: ID!) {
    modelosVoucherFixo(operadoraId: $operadoraId) {
      id
      nomeModelo
      ativo
      empresaCliente {
        nome
        id
        fotoLogoCliente
        statusCliente
      }
      unidadeCliente {
        id
        nome
        statusUnidadeCliente
        endUf
        endRua
        endNumero
        endComplemento
        endCidade
        endCep
        endBairro
      }
      pedagio {
        id
        valor
        nome
      }
      valorDeslocamento
      valorDeslocamentoRepasse
      valorHoraParada
      valorHoraParadaRepasse
      valorPedagio
      valorViagem
      valorViagemRepasse
      configuracoes {
        id
        tipo
        destino
        origem
        horario
        domingo
        segunda
        terca
        quarta
        quinta
        sexta
        sabado
        motorista {
          id
          nome
          fotoMotorista
        }
        carro {
          cor
          marca
          modelo
          placa
        }
      }
    }
  }
`;

export function useModelosFixos(operadoraId: string) {
  const { data, loading, error, refetch } = useQuery(GET_MODELOS_FIXOS, {
    variables: { operadoraId: operadoraId },
    fetchPolicy: "cache-and-network",
    skip: !operadoraId,
    notifyOnNetworkStatusChange: true,
  });

  return {
    listaModelos: data?.modelosVoucherFixo ?? [],
    loading,
    error,
    refetch,
  };
}

const GET_MODELO_FIXO_ID = gql`
  query ModeloVoucherFixo($modeloVoucherFixoId: Int!) {
    modeloVoucherFixo(id: $modeloVoucherFixoId) {
      id
      nomeModelo
      configuracoes {
        id
        tipo
        horario
        domingo
        segunda
        terca
        quarta
        quinta
        sexta
        sabado
        origem
        destino
        motorista {
          id
        }
        carro {
          id
        }
      }
      passageirosFixos {
        id
        passageiro {
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
            codigo
            nome
          }
        }
      }
      empresaCliente {
        id
        nome
        statusCliente
      }
      pedagio {
        id
        valor
        nome
      }
      unidadeCliente {
        id
        nome
        statusUnidadeCliente
      }
      ativo
      valorDeslocamento
      valorDeslocamentoRepasse
      valorHoraParada
      valorHoraParadaRepasse
      valorPedagio
      valorViagem
      valorViagemRepasse
    }
  }
`;

export function useModeloFixoId(modeloVoucherFixoId: string) {
  const { data, loading, error, refetch } = useQuery(GET_MODELO_FIXO_ID, {
    variables: { modeloVoucherFixoId: Number(modeloVoucherFixoId) },
    fetchPolicy: "cache-and-network",
    skip: !modeloVoucherFixoId,
    notifyOnNetworkStatusChange: true,
  });

  return {
    modeloFixo: data?.modeloVoucherFixo ?? [],
    loading,
    error,
    refetch,
  };
}

const CREATE_MODELO_FIXO = gql`
  mutation CreateModeloVoucherFixo($input: CreateModeloVoucherFixoInput!) {
    createModeloVoucherFixo(input: $input) {
      id
    }
  }
`;

export function useCriarModeloFixo(operadoraId: string) {
  const [criar, { data, loading, error }] = useMutation(CREATE_MODELO_FIXO, {
    refetchQueries: [{ query: GET_MODELOS_FIXOS, variables: { operadoraId } }],
  });

  const criarModeloFixo = (input: any) => {
    return criar({
      variables: {
        input,
      },
    });
  };

  return {
    criarModeloFixo,
    data,
    loading,
    error,
  };
}

const UPDATE_MODELO_FIXO = gql`
  mutation UpdateModeloVoucherFixo(
    $updateModeloVoucherFixoId: Int!
    $input: UpdateModeloVoucherFixoInput!
  ) {
    updateModeloVoucherFixo(id: $updateModeloVoucherFixoId, input: $input) {
      id
    }
  }
`;

export function useEditarModeloVoucherFixo(operadoraId: string) {
  const [editar, { data, loading, error }] = useMutation(UPDATE_MODELO_FIXO, {
    refetchQueries: [{ query: GET_MODELOS_FIXOS, variables: { operadoraId } }],
  });

  const editarModeloVoucherFixo = (
    updateModeloVoucherFixoId: string,
    input: Partial<any>,
  ) => {
    return editar({
      variables: {
        updateModeloVoucherFixoId: Number(updateModeloVoucherFixoId),
        input,
      },
    });
  };

  return {
    editarModeloVoucherFixo,
    data,
    loading,
    error,
  };
}
