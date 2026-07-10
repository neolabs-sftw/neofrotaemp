import { gql, useMutation, useQuery } from "@apollo/client";

const GET_ROTAS_EMPRESA_ID = gql`
 query RotaEmpresaClienteId($rotaEmpresaClienteId: ID!) {
  rotaEmpresaClienteId(id: $rotaEmpresaClienteId) {
    id
    destino
    empresaClienteId {
      id
      nome
    }
    operadoraId {
      id
      nome
    }
    origem
    tributacao
    rotaValor {
      id
      rotaId {
        id
      }
      categoria
      valorViagem
      valorViagemRepasse
      valorHoraParada
      valorHoraParadaRepasse
      valorDeslocamento
      valorDeslocamentoRepasse
      valorPedagio {
        id
        nome
        valor
      }
    }
  }
}
`;

export function useRotasExtas(rotaEmpresaClienteId: any) {
  const { data, loading, error, refetch } = useQuery(GET_ROTAS_EMPRESA_ID, {
    variables: { rotaEmpresaClienteId },
    fetchPolicy: "cache-and-network",
  });
  return {
    listaRotasExtras: data?.rotaEmpresaClienteId,
    loading,
    error,
    refetch: refetch || Promise.resolve(),
  };
}

const GET_ROTA_ID = gql`
  query Rota($rotaId: ID!) {
    rota(id: $rotaId) {
      id
      origem
      destino
      tributacao
      rotaValor {
        id
        categoria
        valorViagem
        valorViagemRepasse
        valorHoraParada
        valorHoraParadaRepasse
        valorDeslocamento
        valorDeslocamentoRepasse
        valorPedagio {
          id
          nome
          valor
        }
      }
    }
  }
`;

export function useRotaId(rotaId: any) {
  const { data, loading, error, refetch } = useQuery(GET_ROTA_ID, {
    variables: { rotaId },
    fetchPolicy: "cache-and-network",
  });
  return {
    rota: data?.rota,
    loading,
    error,
    refetch: refetch || Promise.resolve(),
  };
}

const UPDATE_ROTA_VALORES = gql`
  mutation UpdateRotaComValores($input: UpdateRotaComValoresInput!) {
    updateRotaComValores(input: $input) {
      id
    }
  }
`;

export function useUpdateRotaComValores() {
  const [updateRotaComValores, { data, loading, error }] =
    useMutation(UPDATE_ROTA_VALORES);

  const atualizarRotaComValores = (input: any) => {
    return updateRotaComValores({
      variables: { input },
    });
  };

  return {
    atualizarRotaComValores,
    data,
    loading,
    error,
  };
}
