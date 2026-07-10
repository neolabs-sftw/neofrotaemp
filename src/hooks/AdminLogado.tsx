import { createContext, useContext } from "react";

interface adminLogadoType {
      id: string,
      nome: string,
      email: string,
      senha: string,
      fotoAdminOperadora: string,
      funcao: string,
      statusAdminOperadora: string,
      dataCriacao : string,
      operadora: {
        id: string,
        nome: string,
        slug: string, 
        logoOperadora: string,
        cnpj: string,
        rSocial: string,
        endRua: string,
        endNumero: string,
        endBairro: string,
        endCep: string,
        endCidade: string,
        endUf: string,
        statusOperadora: string,
        dataCriacao: string,
      }
    };

const AdminLogadoContext = createContext<adminLogadoType | null>(null);

export function useAdminLogado() {
  return useContext(AdminLogadoContext);
}

export default AdminLogadoContext.Provider;
