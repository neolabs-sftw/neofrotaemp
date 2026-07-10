import { gql, useMutation, useQuery } from "@apollo/client";

const CREATE_MODELO_TURNO = gql`
  mutation CriarModeloVoucherTurno($dados: CriarModeloVoucherTurnoInput!) {
    criarModeloVoucherTurno(dados: $dados) {
      id
    }
  }
`;

export function useCriarModeloTurno() {
  const [criar, { data, loading, error }] = useMutation(CREATE_MODELO_TURNO);

  const criarModeloTurno = (dados: any) => {
    return criar({
      variables: {
        dados,
      },
    });
  };

  return {
    criarModeloTurno,
    data,
    loading,
    error,
  };
}

const GET_LIST_MODELO_PREV = gql`
  query ListarModelosVoucherTurno($filtro: FiltroModeloVoucherTurnoInput) {
    listarModelosVoucherTurno(filtro: $filtro) {
      id
      nomeModelo
      ativo
      empresaCliente {
        id
        nome
      }
      origem
      destino
      unidadeCliente {
        id
        nome
      }
    }
  }
`;

export function useListaModelosTurnoPrev(filtro: any) {
  const { data, loading, error } = useQuery(GET_LIST_MODELO_PREV, {
    variables: {
      filtro,
    },
    fetchPolicy: "cache-and-network",
  });

  return {
    listaModelosTurno: data?.listarModelosVoucherTurno || [],
    loading,
    error,
  };
}

const GET_MODELO_TURNO = gql`
  query Passageiro($obterModeloVoucherTurnoId: Int!) {
    obterModeloVoucherTurno(id: $obterModeloVoucherTurnoId) {
      id
      nomeModelo
      ativo
      origem
      destino
      valorViagem
      valorViagemRepasse
      valorHoraParada
      valorHoraParadaRepasse
      valorDeslocamento
      valorDeslocamentoRepasse
      valorPedagio
      passageirosTurno {
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
            nome
            codigo
          }
        }
      }
      empresaCliente {
        nome
        id
      }
      unidadeCliente {
        id
        nome
      }
      pedagio {
        id
        nome
        valor
      }
    }
  }
`;

export function useModeloTurno(turnoId: any) {
  const { data, loading, error } = useQuery(GET_MODELO_TURNO, {
    variables: {
      obterModeloVoucherTurnoId: parseInt(turnoId),
    },
    fetchPolicy: "cache-and-network",
  });

  return {
    mTurno: data?.obterModeloVoucherTurno || {},
    loading,
    error,
  };
}

const UPDATE_MODELO_TURNO = gql`
  mutation AtualizarModeloVoucherTurno(
    $atualizarModeloVoucherTurnoId: Int!
    $dados: AtualizarModeloVoucherTurnoInput!
  ) {
    atualizarModeloVoucherTurno(
      id: $atualizarModeloVoucherTurnoId
      dados: $dados
    ) {
      id
    }
  }
`;

export function useEditarTurno(filtro: any) {
  const [editar, { data, loading, error }] = useMutation(UPDATE_MODELO_TURNO, {
    refetchQueries: [{ query: GET_LIST_MODELO_PREV, variables: { filtro } }],
  });

  const editarTurno = (id: any, dados: any) => {
    return editar({
      variables: {
        atualizarModeloVoucherTurnoId: Number(id),
        dados,
      },
    });
  };

  return {
    editarTurno,
    data,
    loading,
    error,
  };
}
