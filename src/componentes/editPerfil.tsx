import { useState } from "react";
import { useTema } from "../hooks/temaContext";
import { useNavigate } from "react-router-dom";
import { useAdminLogado } from "../hooks/AdminLogado";

function EditPerfil() {
  const adminLogado = useAdminLogado();
  const { Cor, tema, alternarTema } = useTema();
  const [aberto, setAberto] = useState<boolean>(false);
  const Navigator = useNavigate();

  //   useEffect(() => {
  //     document.title = `NeoFrota | ${adminLogado?.operadora.nome}`;
  //   }, [adminLogado]);
  return (
    <>
      <div
        style={{
          width: "200px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-end",
          position: "fixed",
          top: "10px",
          right: "20px",
          zIndex: 10,
        }}
      >
        <div
          style={{
            backgroundColor: Cor.base2 + "AA",
            width: "200px",
            height: "50px",
            borderRadius: "100px",
            border: "1.5px solid" + Cor.texto2 + 20,
            overflow: "hidden",
            display: "flex",
            flexDirection: "row",
            padding: "5px",
            justifyContent: "space-between",
            alignItems: "center",
            backdropFilter: "blur(8px)",
            gap: "10px",
            zIndex: 10,
            boxShadow: Cor.sombra,
          }}
        >
          <div
            style={{
              flexDirection: "row",
              display: "flex",
              gap: "10px",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <img
              src={
                adminLogado?.fotoAdminOperadora ||
                "https://iyqleanlhzcnndzuugkg.supabase.co/storage/v1/object/public/neofrotabkt/img_perfis/default.png"
              }
              alt="Logo"
              style={{
                width: 40,
                aspectRatio: 1,
                objectFit: "cover",
                borderRadius: 100,
                transition: "ease-in-out all 0.3s",
              }}
            />
            <p
              style={{
                color: Cor.secundaria,
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              {adminLogado?.nome || "Carregando..."}
            </p>
          </div>
          <p
            style={{
              color: Cor.primaria,
              fontSize: "24px",
              fontFamily: "Icone",
              fontWeight: "bold",
              marginRight: "10px",
              cursor: "pointer",
              userSelect: "none",
            }}
            onClick={() => setAberto(!aberto)}
          >
            {aberto ? "close" : "menu"}
          </p>
        </div>
        <div
          style={{
            backgroundColor: Cor.base2 + "AA",
            width: "50px",
            height: aberto ? "150px" : "0px",
            borderRadius: aberto ? "0 100px 100px 100px" : 0,
            border: "1.5px solid" + Cor.texto2 + 20,
            opacity: aberto ? 1 : 0,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "center",
            backdropFilter: "blur(3px)",
            position: "absolute",
            transition: "0.3s ease-in-out",
            gap: "10px",
            padding: "5px",
            boxShadow: Cor.sombra,
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              backgroundColor: Cor.base2,
              border: "1px solid" + Cor.texto2 + 50,
              borderRadius: "100px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              userSelect: "none",
            }}
            onClick={() => {
              alternarTema();
              setAberto(!aberto);
            }}
          >
            <p
              style={{
                fontFamily: "Icone",
                fontWeight: "bold",
                fontSize: "24px",
                color: Cor.primaria,
              }}
            >
              {tema === "light" ? "moon_stars" : "clear_day"}
            </p>
          </div>
          <div
            style={{
              width: 40,
              height: 40,
              backgroundColor: Cor.base2,
              border: "1px solid" + Cor.texto2 + 50,
              borderRadius: "100px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              userSelect: "none",
            }}
            onClick={() => {
              localStorage.clear();
              Navigator("/login");
            }}
          >
            <p
              style={{
                fontFamily: "Icone",
                fontWeight: "bold",
                fontSize: "24px",
                color: Cor.primaria,
              }}
            >
              logout
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditPerfil;
