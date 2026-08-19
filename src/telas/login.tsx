import { useNavigate } from "react-router-dom";
import { useTema } from "../hooks/temaContext";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useLoginSolicitante } from "../hooks/useSolicitante";

function Login() {
  const { Cor } = useTema();

  const token = localStorage.getItem("token");

  if (token) window.location.href = "/";

  const navigator = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { loginSolicitante, loading, error } = useLoginSolicitante();

  const [verSenha, setVerSenha] = useState("password");

  const fazerLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log(email, senha);
      
      const res = await loginSolicitante(email, senha);

      console.log(res);
      navigator("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: Cor.base,
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          backgroundColor: Cor.primaria,
          width: "60vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <img
          src="https://iyqleanlhzcnndzuugkg.supabase.co/storage/v1/object/public/neofrotabkt/bg.jpg"
          alt="S"
          style={{
            width: "95vw",
            objectFit: "contain",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
        <div
          style={{
            width: "60%",
            height: "100px",
            backgroundColor: Cor.primaria + "cc",
            position: "absolute",
            bottom: "5%",
            left: "0",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            padding: "30px",
            gap: "20px",
          }}
        >
          <div
            style={{
              width: "150px",
              height: "50px",
              border: "2px solid" + "#F4F4F4",
              borderRadius: "22px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "10px",
              justifyContent: "center",
            }}
          >
            <p
              style={{
                color: "#F4F4F4",
                fontFamily: "Icone",
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              adb
            </p>
            <p style={{ color: "#F4F4F4" }}>Android</p>
          </div>
          <div
            style={{
              width: "150px",
              height: "50px",
              border: "2px solid" + "#F4F4F4",
              borderRadius: "22px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "10px",
              justifyContent: "center",
            }}
          >
            <p
              style={{
                color: "#F4F4F4",
                fontFamily: "Icone",
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              ios
            </p>
            <p style={{ color: "#F4F4F4" }}>IOS</p>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p style={{ color: "#F4F4F4" }}>
              Baixe o app NeoFrota Gestor<br></br>e opere na palma da mão.
            </p>
          </div>
        </div>
      </div>
      <div
        style={{
          backgroundColor: Cor.base,
          width: "40vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <img
          src={Cor.logo}
          alt="Logo"
          style={{
            width: "auto",
            height: "70px",
            marginBottom: "10px",
            marginTop: "10px",
          }}
        />

        <h3
          style={{
            color: Cor.primariaTxt,
            marginBottom: "15px",
            marginTop: "15px",
          }}
        >
          Login
        </h3>
        <div
          style={{
            backgroundColor: Cor.base2,
            width: "70%",
            height: "50px",
            borderRadius: "22px",
            display: "flex",
            alignItems: "center",
            padding: "10px 20px",
          }}
        >
          <input
            placeholder="Seu e-mail aqui"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            style={{
              width: "100%",
              border: "none",
              outline: "none",
              backgroundColor: "transparent",
              color: Cor.texto1,
            }}
          />
        </div>
        <div
          style={{
            backgroundColor: Cor.base2,
            width: "70%",
            height: "50px",
            borderRadius: "22px",
            display: "flex",
            alignItems: "center",
            padding: "10px 20px",
          }}
        >
          <input
            placeholder="Sua senha aqui"
            type={verSenha}
            onChange={(e) => setSenha(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                fazerLogin(e);
              }
            }}
            value={senha}
            style={{
              width: "100%",
              border: "none",
              outline: "none",
              backgroundColor: "transparent",
              color: Cor.texto1,
            }}
          />
          <p
            style={{
              color: Cor.texto1 + 50,
              fontFamily: "Icone",
              fontSize: "24px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
            onClick={() => {
              if (verSenha === "Senha") {
                setVerSenha("text");
              } else {
                setVerSenha("Senha");
              }
            }}
          >
            {verSenha === "Senha" ? "visibility" : "visibility_off"}
          </p>
        </div>
        <div
          style={{
            cursor: "pointer",
            width: "50%",
            height: "50px",
            padding: "10px 20px",
            backgroundColor: loading ? Cor.texto1 + 30 : Cor.primaria,
            borderRadius: "22px",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
          onClick={fazerLogin}
        >
          <p style={{ color: Cor.primariaTxt, fontWeight: "500" }}>
            {loading ? (
              <CircularProgress size={25} thickness={3} color="inherit" />
            ) : (
              "Login"
            )}
          </p>
        </div>
        {error && (
          <div
            style={{
              width: "100vw",
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: Cor.base + "50",
              backdropFilter: "blur(5px)",
              position: "absolute",
              top: 0,
              left: 0,
            }}
            onClick={() => window.location.reload()}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 10,
                width: "30%",
                height: "100px",
                alignItems: "center",
                justifyContent: "flex-start",
                backgroundColor: Cor.base,
                padding: "20px",
                borderRadius: "22px",
                boxShadow: Cor.sombra,
                border: "1px solid" + Cor.texto2 + 50,
                cursor: "pointer",
              }}
              onClick={() => window.location.reload()}
            >
              <img src={Cor.logo} width="100px" alt="" />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <p
                  style={{ color: "red", fontSize: "16px", fontWeight: "500" }}
                >
                  {error.message}
                </p>
                <p style={{ color: Cor.texto1, fontSize: "12px" }}>
                  Verifique suas credenciais, e tente novamente.
                </p>
              </div>
            </div>
          </div>
        )}
        <p style={{ color: Cor.primaria, fontWeight: "500" }}>
          Esqueci minha senha
        </p>
      </div>
    </div>
  );
}

export default Login;
