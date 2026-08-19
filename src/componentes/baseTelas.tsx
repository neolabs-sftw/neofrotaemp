import { useState, useEffect } from "react";
import { useTema } from "../hooks/temaContext";
import NavMenu from "./navMenu";
import SolicitanteLogadoProvider from "../hooks/solicitanteLogado";
import { gql, useQuery } from "@apollo/client";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/animations/novologo.json";
import iconLogo from "../assets/image/icon.png";
import { jwtDecode } from "jwt-decode";
// import { jwtDecode } from "jwt-decode";

const GET_SOLICITANTE = gql`
  query SolicitanteId($solicitanteId: ID!) {
    solicitanteId(id: $solicitanteId) {
      id
      nome
      email
      senha
      funcao
      telefone
      operadoraId {
        logoOperadora
        id
        rSocial
        cnpj
        nome
      }
      statusSolicitante
      empresaClienteId {
        id
        fotoLogoCliente
        nome
        rSocial
        cnpj
      }
      fotoUrlSolicitante
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

  interface JwtPayload {
    solicitanteId?: string;
    operadoraId?: string;
    empresaClienteId?: string;
  }

  const token = localStorage.getItem("token");
  const decoded = token ? jwtDecode<JwtPayload>(token) : null;
  const solicitanteId = decoded ? decoded.solicitanteId : null;

  const { loading, error, data } = useQuery(GET_SOLICITANTE, {
    variables: { solicitanteId },
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

  const logado = data.solicitanteId;

  return (
    <>
      <SolicitanteLogadoProvider value={logado}>
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
                height: aberto === false ? "10vh" : "20vh",
                borderBottom: "1px solid" + Cor.texto1 + 30,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                paddingLeft: aberto === false ? "5px" : "0px",
                gap: "15px",
                transition: "width 0.3s ease-in-out",
              }}
            >
              {!aberto ? (
                <img
                  src={logado.empresaClienteId?.fotoLogoCliente || iconLogo}
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
              ) : null}

              {aberto ? (
                <div
                  style={{
                    flexDirection: "column",
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <div
                    style={{
                      flexDirection: "row",
                      display: "flex",
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={logado.empresaClienteId?.fotoLogoCliente || iconLogo}
                      alt="Logo"
                      style={{
                        width: "70px",
                        height: "70px",
                        objectFit: "cover",
                        borderRadius: "10px",
                        transition: "width 0.3s ease-in-out",
                        border: "2px solid" + Cor.base2,
                        boxShadow: "1px 0px 5px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <div
                      style={{
                        position: "relative",
                        width: "36px",
                        height: "36px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: "0 -15px",
                        zIndex: 10,
                        transform: "skewX(-10deg)",
                        filter: "drop-shadow(3px 3px 3px rgba(0, 0, 0, 0.4))",
                      }}
                    >
                      {/* Barra Horizontal */}
                      <div
                        style={{
                          position: "absolute",
                          width: "30px",
                          height: "14px",
                          backgroundColor: Cor.primaria,
                          border: "2px solid white",
                          borderRadius: "4px",
                          boxSizing: "border-box",
                        }}
                      />

                      {/* Barra Vertical */}
                      <div
                        style={{
                          position: "absolute",
                          width: "14px",
                          height: "30px",
                          backgroundColor: Cor.primaria,
                          border: "2px solid white",
                          borderRadius: "4px",
                          boxSizing: "border-box",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          width: "14px",
                          height: "10px",
                          backgroundColor: Cor.primaria,
                          zIndex: 2,
                        }}
                      />
                    </div>
                    {/* Fim do "+" */}
                    <img
                      src={logado.operadoraId?.logoOperadora || iconLogo}
                      alt="Logo"
                      style={{
                        width: "70px",
                        height: "70px",
                        objectFit: "cover",
                        borderRadius: "10px",
                        transition: "width 0.3s ease-in-out",
                        border: "2px solid" + Cor.base2,
                        boxShadow: "1px 0px 5px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                  </div>
                  <p
                    style={{
                      color: Cor.primaria,
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    {logado.operadoraId?.nome}
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
      </SolicitanteLogadoProvider>
    </>
  );
}

export default BaseTelas;
