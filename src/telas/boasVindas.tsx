import { useNavigate } from "react-router-dom";
import { useTema } from "../hooks/temaContext";

export function BoasVindas() {
  const { Cor } = useTema();
  const navigate = useNavigate();
  return (
    <>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "100vw",
            height: "90vh",
            backgroundColor: Cor.base,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
          }}
        >
          <img src={Cor.logo} style={{ width: 400 }} />
          <h1 style={{ fontWeight: "bold", color: Cor.texto1, fontSize: 38 }}>
            Empresas
          </h1>
          <p
            style={{
              backgroundColor: Cor.primaria + 50,
              padding: "10px 30px",
              borderRadius: 14,
              border: `1px solid ${Cor.primaria + 99}`,
              cursor: "pointer",
              color: Cor.primariaTxt,
            }}
            onClick={() => navigate("/home")}
          >
            Seja Bem-vindo
          </p>
        </div>
        <div
          style={{
            width: "100vw",
            height: "10vh",
            backgroundColor: Cor.base2,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
            boxShadow: "-4px -4px 20px rgba(0, 0, 0, 0.07)",
          }}
        >
          <p>Visite</p> <a href="https://www.neofrota.com">NeoFrota</a>
        </div>
      </div>
    </>
  );
}
