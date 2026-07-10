import { useState, useEffect } from "react";
import { useTema } from "../hooks/temaContext";
import NavMenu from "./navMenu";
import AdminLogadoProvider from "../hooks/AdminLogado";
import { gql, useQuery } from "@apollo/client";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/animations/novologo.json";
import iconLogo from "../assets/image/icon.png";
// import { jwtDecode } from "jwt-decode";

const GET_USUARIO = gql`
  query Query($adminUsuarioId: ID!) {
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
        slug
        logoOperadora
        cnpj
        rSocial
        endRua
        endNumero
        endBairro
        endCep
        endCidade
        endUf
        statusOperadora
        dataCriacao
      }
    }
  }
`;

function BaseTelas({ conteudo }: { conteudo: any }) {
  const { Cor } = useTema();
  const [aberto, setAberto] = useState(() => {
    const salvo = localStorage.getItem("menuAberto");
    return salvo === "true";
  });

  useEffect(() => {
    localStorage.setItem("menuAberto", String(aberto));
  }, [aberto]);

  //   interface JwtPayload {
  //     adminUsuarioId?: string;
  //     operadoraId?: string;
  //   }

  //   const token = localStorage.getItem("token");
  //   const decoded = token ? jwtDecode<JwtPayload>(token) : null;
  //   const adminUsuarioId = decoded ? decoded.adminUsuarioId : null;
  const { loading, error, data } = useQuery(GET_USUARIO, {
    variables: { adminUsuarioId: 1 },
  });

  if (loading)
    return (
      <div
        style={{
          height: "100vh",
          width: "100hw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Cor.base,
        }}
      >
        <Lottie
          animationData={loadingAnimation}
          loop={true}
          autoPlay
          style={{ width: 150, height: 150 }}
        />
      </div>
    );
  if (error)
    return (
      <>
        <div
          style={{
            height: "100vh",
            width: "100hw",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: Cor.base,
          }}
        >
          <Lottie
            animationData={loadingAnimation}
            loop={false}
            autoPlay
            style={{ width: 200, height: 200 }}
          />
          <div
            style={{
              width: "50%",
              backgroundColor: Cor.atencao + 20,
              padding: 20,
              borderRadius: 22,
              border: `1px solid ${Cor.atencao + 40}`,
            }}
          >
            <p style={{ color: Cor.atencao }}>
              Erro de conexão: {error.message}
            </p>
          </div>
        </div>
      </>
    );

  const logado = data.adminUsuario;

  return (
    <>
      <AdminLogadoProvider value={logado}>
        <div
          style={{
            backgroundColor: Cor.base,
            width: "100vw",
            height: "100vh",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <nav
            style={{
              backgroundColor: Cor.base2,
              width: aberto ? 200 : 60,
              height: "100vh",
              flexDirection: "column",
              position: "fixed",
              left: 0,
              transition: "all 0.3s ease-in-out",
              boxShadow: "1px 0px 5px rgba(0, 0, 0, 0.1)",
              zIndex: 10,
            }}
          >
            <div
              style={{
                backgroundColor: Cor.base,
                height: "10vh",
                borderBottom: "1px solid" + Cor.texto1 + 30,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                paddingLeft: "10px",
                gap: "15px",
                transition: "width 0.3s ease-in-out",
              }}
            >
              <img
                src={logado.operadora?.logoOperadora || iconLogo}
                alt="Logo"
                style={{
                  width: "45px",
                  height: "45px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  transition: "width 0.3s ease-in-out",
                  border: "2px solid" + Cor.base2,
                  boxShadow: "1px 0px 5px rgba(0, 0, 0, 0.1)",
                }}
              />
              {aberto ? (
                <div style={{ flexDirection: "column", display: "flex" }}>
                  <p
                    style={{
                      color: Cor.primaria,
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    {logado.operadora.nome}
                  </p>
                </div>
              ) : null}
            </div>
            <div
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "100px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: Cor.texto1 + 10,
                border: "2px solid" + Cor.texto1 + 30,
                cursor: "pointer",
                position: "absolute",
                top: "calc(10vh - 15px)",
                transition: "left 0.4s ease-in-out",
                backdropFilter: "blur(3px)",
                left: aberto ? "calc(200px - 15px)" : "calc(60px - 15px)",
                zIndex: 999,
              }}
              onClick={() => setAberto(!aberto)}
            >
              <p
                style={{
                  fontFamily: "Icone",
                  fontWeight: "bold",
                  fontSize: "20px",
                  color: Cor.primaria,
                  transform: `rotate(${aberto ? "180deg" : "0deg"})`,
                  transition: "all 0.6s ease-in-out",
                }}
              >
                chevron_right
              </p>
            </div>
            {<NavMenu sidebar={aberto} logado={logado} />}
          </nav>
          <main
            className="scrollbox"
            style={{
              backgroundColor: Cor.base,
              width: aberto ? "calc(100vw - 200px)" : "calc(100vw - 60px)",
              height: "100vh",
              transition: "width 0.3s ease-in-out",
              overflowY: "auto",
            }}
          >
            <style>{`
          .scrollbox::-webkit-scrollbar {
            width: 5px;
          }
          .scrollbox::-webkit-scrollbar-track {
            background: ${Cor.texto2 + 30};
          }
          .scrollbox::-webkit-scrollbar-thumb {
            background-color: ${Cor.primaria};
            border-radius: 100px;
          }
        `}</style>
            {conteudo}
          </main>
        </div>
      </AdminLogadoProvider>
    </>
  );
}

export default BaseTelas;
