import styled from "styled-components";
import { useTema } from "../hooks/temaContext";
import { usePassageiros, useUpdatePassageiro } from "../hooks/usePassageiros";
import { useParams } from "react-router-dom";
import { useEmpresaCliente } from "../hooks/useEmpresaCliente";
import { useEffect, useState } from "react";
import { useCentroCustoByEmpresa } from "../hooks/useCentrosDeCusto";
import LinhaTabelaPassageiro from "./verPassageiro";
import { supabase } from "../hooks/supabaseClient";
import { useSolicitanteLogado } from "../hooks/solicitanteLogado";

function ListaPassageiros({
  bNome,
  bCentro,
}: {
  bNome: string;
  bCentro: string;
}) {
  const { Cor } = useTema();

  const { clienteId } = useParams();

  const { empresaCliente } = useEmpresaCliente(clienteId!);

  const logo = empresaCliente?.fotoLogoCliente;
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: Cor.base2,
        borderRadius: 22,
        boxShadow: Cor.sombra,
        padding: 15,
      }}
    >
      <div
        style={{
          width: "100%",
          borderBottom: "1px solid" + Cor.texto2 + 50,
          paddingBottom: 10,
          marginBottom: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            gap: 10,
          }}
        >
          <img
            src={logo}
            alt="Logo Empresa"
            style={{
              width: 50,
              height: 50,
              borderRadius: 10,
              objectFit: "cover",
              boxShadow: Cor.sombra,
            }}
          />
          <div>
            <p style={{ fontWeight: "500", color: Cor.primaria }}>
              Lista de Passageiros
            </p>
            <p style={{ fontSize: 12, color: Cor.secundaria }}>
              Lista de passageiros cadastrados na empresa{" "}
              <strong style={{ fontSize: 16 }}>{empresaCliente?.nome}</strong>.
            </p>
          </div>
        </div>
      </div>
      <TabelaPassageiros bNome={bNome} bCentro={bCentro} />
    </div>
  );
}

export default ListaPassageiros;

interface TabelaPassageirosProps {
  $texto1: string;
  $texto2: string;
  $base: string;
}

const TabelaPassageirosStyled = styled.div<TabelaPassageirosProps>`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;

  th {
    text-align: left;
    padding: 5px;
    color: ${({ $texto1 }) => $texto1};
    font-size: 12px;
    background-color: ${({ $texto2 }) => $texto2 + 80};
  }
  td {
    text-align: left;
    padding: 5px;
    color: ${({ $texto1 }) => $texto1};
  }
  tr:nth-child(even) {
    background-color: ${({ $base }) => $base};
  }
  tr:hover {
    background-color: ${({ $texto1 }) => $texto1 + 15};
  }
`;

function TabelaPassageiros({
  bNome,
  bCentro,
}: {
  bNome: string;
  bCentro: string;
}) {
  const Cor = useTema().Cor;
  const clienteId = useSolicitanteLogado()?.empresaClienteId.id
  const { listaPassageiro: listaTotal } = usePassageiros(clienteId!);

  const [passageiro, setPassageiro] = useState();

  const [cxVerPassageiro, setCxVerPassageiro] = useState(false);

  const listaPassageiro = listaTotal?.filter((p: any) => {
    const nomeBusca = bNome.toLowerCase();
    const centroBusca = bCentro.toLowerCase();
    const coincideNome = p.nome.toLowerCase().includes(nomeBusca);
    const coincideCentro = p.centroCustoClienteId?.nome
      .toLowerCase()
      .includes(centroBusca);
    return coincideNome && coincideCentro;
  });

  return (
    <TabelaPassageirosStyled
      $texto1={Cor.texto1}
      $texto2={Cor.texto2}
      $base={Cor.base}
    >
      <div
        style={{
          width: "100%",
          textAlign: "center",
          display: "flex",
          flexDirection: "row",
          padding: 5,
          backgroundColor: "#55555555",
          color: Cor.texto1,
          fontWeight: 500,
        }}
      >
        <p style={{ width: "5%", textAlign: "center" }}>Foto</p>
        <p style={{ width: "10%", textAlign: "center" }}>Matrícula</p>
        <p style={{ width: "25%", textAlign: "center" }}>Nome</p>
        <p style={{ width: "5%", textAlign: "center" }}>Horário</p>
        <p style={{ width: "30%", textAlign: "center" }}>Endereço</p>
        <p style={{ width: "10%", textAlign: "center" }}>Centro Custo</p>
        <p style={{ width: "10%", textAlign: "center" }}>Telefone</p>
        <p style={{ width: "5%", textAlign: "center" }}>Status</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        {listaPassageiro?.map((passageiro: any, index) => (
          <LinhaTabelaPassageiro
            par={index % 2 === 0}
            passageiro={passageiro}
            setPassageiro={setPassageiro}
            cxVerPassageiro={cxVerPassageiro}
            setCxVerPassageiro={setCxVerPassageiro}
            key={passageiro.id}
          />
        ))}
      </div>

      <ModalVerPassageiro
        passageiro={passageiro}
        cxVerPassageiro={cxVerPassageiro}
        setCxVerPassageiro={setCxVerPassageiro}
      />
    </TabelaPassageirosStyled>
  );
}

function ModalVerPassageiro({
  passageiro,
  setCxVerPassageiro,
  cxVerPassageiro,
}: {
  passageiro: any;
  setCxVerPassageiro: any;
  cxVerPassageiro: boolean;
}) {
  const { Cor } = useTema();

  const clienteId = useSolicitanteLogado()?.empresaClienteId.id;

  const { listaCentrosCustos } = useCentroCustoByEmpresa(String(clienteId));
  const { refetch } = usePassageiros(clienteId!);

  const [nome, setNome] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [telefone, setTelefone] = useState<string>();
  const [matricula, setMatricula] = useState<string>();
  const [centroCusto, setCentroCusto] = useState<string>();
  const [endRua, setEndRua] = useState<string>();
  const [endNumero, setEndNumero] = useState<string>();
  const [endBairro, setEndBairro] = useState<string>();
  const [endCidade, setEndCidade] = useState<string>();
  const [horarioEmbarque, setHorarioEmbarque] = useState<string>();
  const [pontoApanha, setPontoApanha] = useState<string>();
  const [fotoPerfilPassageiro, setFotoPerfilPassageiro] = useState<File>();

  const [imgPreview, setImgPreview] = useState<string>();

  useEffect(() => {
      

    if (passageiro) {
      setFotoPerfilPassageiro(passageiro?.fotoPerfilPassageiro ?? "");
      setImgPreview(passageiro.fotoPerfilPassageiro ?? "");
      setNome(passageiro.nome ?? "");
      setEmail(passageiro.email ?? "");
      setTelefone(passageiro.telefone ?? "");
      setMatricula(passageiro.matricula ?? "");
      setCentroCusto(
        passageiro.centroCustoClienteId.id
          ? String(passageiro.centroCustoClienteId.id)
          : "",
      );
      setEndRua(passageiro.endRua ?? "");
      setEndNumero(passageiro.endNumero ?? "");
      setEndBairro(passageiro.endBairro ?? "");
      setEndCidade(passageiro.endCidade ?? "");
      setHorarioEmbarque(passageiro.horarioEmbarque ?? "");
      setPontoApanha(passageiro.pontoApanha ?? "");
    } else {
      setNome("");
      setEmail("");
      setTelefone("");
      setMatricula("");
      setCentroCusto("");
      setEndRua("");
      setEndNumero("");
      setEndBairro("");
      setEndCidade("");
      setHorarioEmbarque("");
      setPontoApanha("");
    }
  }, [cxVerPassageiro, passageiro?.id]);

  const carregarImagem = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImgPreview(URL.createObjectURL(file));
      setFotoPerfilPassageiro(file);
    }
  };

  const { atualizarPassageiro } = useUpdatePassageiro();

  function removerFoto() {
    setImgPreview("");
    setFotoPerfilPassageiro(undefined);
  }

  async function AtualizarPassageiroFunc() {
    try {
      let fotoUrlFinal = "";

      if (fotoPerfilPassageiro instanceof File) {
        console.log("A enviar nova foto...");

        const nomeImg = `foto_perfil_passageiros/${nome}_${matricula}-${Date.now()}.png`;
        const bucket = "neofrotabkt";

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from(bucket)
          .upload(nomeImg, fotoPerfilPassageiro);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from(bucket)
          .getPublicUrl(uploadData.path);

        fotoUrlFinal = urlData.publicUrl;
      } else if (typeof fotoPerfilPassageiro === "string") {
        fotoUrlFinal = fotoPerfilPassageiro;
      }
      const passageiroAlterar = {
        centroCustoClienteId: Number(centroCusto) || 0,
        email: email || "",
        empresaClienteId: Number(clienteId),
        endBairro: endBairro || "",
        endCidade: endCidade || "",
        endNumero: endNumero || "",
        endRua: endRua || "",

        fotoPerfilPassageiro: fotoUrlFinal,

        horarioEmbarque: horarioEmbarque || "",
        matricula: matricula || "",
        nome: nome || "",
        pontoApanha: pontoApanha || "",
        telefone: telefone || "",
      };

      console.log("Enviando para o servidor:", passageiroAlterar);

      await atualizarPassageiro(String(passageiro.id), passageiroAlterar);
      refetch();
      setCxVerPassageiro(false);
    } catch (error) {
      console.error("Erro ao atualizar o passageiro:", error);
    }
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: Cor.texto1 + 60,
        backdropFilter: "blur(3px)",
        position: "fixed",
        opacity: cxVerPassageiro ? 1 : 0,
        transition: "all 0.3s ease-in-out",
        top: 0,
        left: 0,
        pointerEvents: cxVerPassageiro ? "all" : "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        zIndex: 10,
        cursor: "default",
      }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) setCxVerPassageiro(false);
      }}
    >
      <div
        style={{
          width: "60%",
          backgroundColor: Cor.base,
          boxShadow: Cor.sombra,
          borderRadius: 22,
          display: "flex",
          flexDirection: "column",
          border: "1px solid " + Cor.texto2 + 50,
          scale: cxVerPassageiro ? 1 : 0.8,
          transition: "all 0.3s ease-in-out",
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div style={{ width: "100%", padding: "15px 15px 0px 15px" }}>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <p
                style={{
                  fontSize: 14,
                  color: Cor.primariaTxt,
                  fontWeight: "bold",
                }}
              >
                Criar Passageiro
              </p>
              <p style={{ fontSize: 12, color: Cor.texto2, marginBottom: 5 }}>
                Passageiros são os usuários do transporte. Informe os dados
                corretamente para garantir identificação, comunicação e
                organização das viagens.
              </p>
            </div>
            <p
              style={{
                cursor: "pointer",
                fontFamily: "Icone",
                fontSize: 24,
                color: Cor.primaria,
              }}
              onClick={() => setCxVerPassageiro(false)}
            >
              close
            </p>
          </div>
          <div
            style={{
              width: "100%",
              height: 1,
              backgroundColor: Cor.primaria,
            }}
          />
        </div>
        <div
          style={{
            width: "100%",
            padding: 15,
            display: "flex",
            flexDirection: "column",
            gap: 10,
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 10,
              width: "100%",
            }}
          >
            {/* Adicionar Foto */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div
                style={{
                  width: 150,
                  height: 150,
                  backgroundColor: Cor.base2,
                  borderRadius: 22,
                  border: "1px solid",
                  borderColor: Cor.texto2,
                  boxShadow: Cor.sombra,
                  backgroundImage: `url(${imgPreview})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-between",
                  gap: 10,
                }}
              >
                <label
                  htmlFor="fotoPassageiroUpload"
                  style={{
                    width: "50%",
                    backgroundColor: Cor.primaria,
                    color: Cor.base,
                    borderRadius: 22,
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                    justifyContent: "center",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "Icone",
                      fontWeight: "bold",
                      fontSize: 22,
                    }}
                  >
                    autorenew
                  </p>
                </label>
                <button
                  style={{
                    width: "50%",
                    backgroundColor: Cor.primaria,
                    color: Cor.base,
                    borderRadius: 22,
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                    justifyContent: "center",
                    border: "none",
                  }}
                  onClick={() => removerFoto()}
                >
                  <p
                    style={{
                      fontFamily: "Icone",
                      fontWeight: "bold",
                      fontSize: 22,
                    }}
                  >
                    delete
                  </p>
                </button>
              </div>

              <input
                id="fotoPassageiroUpload"
                type="file"
                title=""
                accept="image/*"
                style={{ display: "none" }}
                onChange={carregarImagem}
              />
            </div>

            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 10,
                justifyContent: "space-between",
              }}
            >
              <TextoEntrada
                placeholder="Nome do Passageiro"
                lPlace="22%"
                type="text"
                largura="100%"
                onChange={(e) => setNome(e.target.value)}
                value={nome || ""}
              />
              <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
                <TextoEntrada
                  placeholder="E-mail"
                  lPlace="11%"
                  type="text"
                  largura="60%"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={email || ""}
                />
                <TextoEntrada
                  placeholder="Telefone"
                  lPlace="25%"
                  type="text"
                  largura="40%"
                  onChange={(e) => {
                    setTelefone(e.target.value);
                  }}
                  value={telefone || ""}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 10,
                  justifyContent: "space-between",
                }}
              >
                <TextoEntrada
                  placeholder="Matrícula"
                  lPlace="22%"
                  type="text"
                  largura="50%"
                  onChange={(e: { target: { value: any } }) => {
                    setMatricula(e.target.value);
                  }}
                  value={matricula || ""}
                />
                <select
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    width: "50%",
                    backgroundColor: Cor.texto2 + 20,
                    padding: 10,
                    gap: 5,
                    borderRadius: 22,
                    color: Cor.texto1,
                    outline: "none",
                    border: "none",
                  }}
                  onChange={(e) => setCentroCusto(e.target.value)}
                  value={centroCusto}
                >
                  <option
                    style={{ backgroundColor: Cor.base, color: Cor.texto1 }}
                    value={""}
                  >
                    Selecione o Centro de Custo
                  </option>
                  {listaCentrosCustos.map((cc: any) => {
                    return (
                      <option
                        style={{ backgroundColor: Cor.base, color: Cor.texto1 }}
                        value={cc.id}
                        key={cc.id}
                      >
                        {cc.nome}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  gap: 10,
                  flexDirection: "row",
                }}
              >
                <TextoEntrada
                  placeholder="Rua"
                  lPlace="5%"
                  type="text"
                  largura="75%"
                  onChange={(e) => setEndRua(e.target.value)}
                  value={endRua || ""}
                />
                <TextoEntrada
                  placeholder="Número"
                  lPlace="50%"
                  type="text"
                  largura="25%"
                  onChange={(e) => setEndNumero(e.target.value)}
                  value={endNumero || ""}
                />
              </div>
            </div>
          </div>

          <div
            style={{
              width: "100%",
              display: "flex",
              gap: 10,
              flexDirection: "row",
            }}
          >
            <TextoEntrada
              placeholder="Bairro"
              lPlace="17%"
              type="text"
              largura="33%"
              onChange={(e) => setEndBairro(e.target.value)}
              value={endBairro || ""}
            />
            <TextoEntrada
              placeholder="Cidade"
              lPlace="22%"
              type="text"
              largura="34%"
              onChange={(e) => setEndCidade(e.target.value)}
              value={endCidade || ""}
            />
            <TextoEntrada
              placeholder="Horário de Embarque"
              lPlace="100%"
              type="time"
              largura="33%"
              onChange={(e) => setHorarioEmbarque(e.target.value)}
              value={horarioEmbarque || ""}
            />
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              gap: 10,
              flexDirection: "row",
            }}
          >
            <TextoEntrada
              placeholder="Ponto de Apanha"
              lPlace="13%"
              type="text"
              largura="100%"
              onChange={(e) => setPontoApanha(e.target.value)}
              value={pontoApanha || ""}
            />
          </div>
        </div>
        <div
          style={{
            width: "100%",
            height: 1,
            backgroundColor: Cor.texto2 + 50,
          }}
        />
        <div
          style={{
            width: "100%",
            padding: "10px 15px 15px 15px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            gap: 10,
          }}
        >
          <div
            style={{
              cursor: "pointer",
              backgroundColor: Cor.primaria,
              padding: "10px 50px",
              borderRadius: 22,
            }}
            onClick={() => {
              AtualizarPassageiroFunc();
            }}
          >
            <p
              style={{
                fontSize: 14,
                color: Cor.primariaTxt,
                fontWeight: "bold",
              }}
            >
              Salvar
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TextoEntrada({
  placeholder,
  lPlace,
  onChange,
  value,
  type,
  largura,
}: {
  placeholder: string;
  lPlace: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  type: string;
  largura: string;
}) {
  const { Cor } = useTema();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: largura,
        backgroundColor: Cor.texto2 + 20,
        padding: 10,
        gap: 5,
        borderRadius: 22,
      }}
    >
      <span
        style={{
          width: lPlace,
          maxLines: 1,
          overflow: "hidden",
          textWrap: "nowrap",
          fontSize: 11,
          color: Cor.texto2,
        }}
      >
        {placeholder}:
      </span>
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        style={{
          backgroundColor: "transparent",
          color: Cor.texto1,
          fontWeight: 500,
          border: "none",
          outline: "none",
          width: "100%",
        }}
      />
    </div>
  );
}
