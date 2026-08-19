import { useState } from "react";
import styled from "styled-components";
import { useTema } from "../hooks/temaContext";
import { useCentroCustoByEmpresa } from "../hooks/useCentrosDeCusto";
import { useCreatePassageiro, usePassageiros } from "../hooks/usePassageiros";
import { supabase } from "../hooks/supabaseClient";

interface BtnCadastrarPassageiroStyledProps {
  $color: string;
  $backgroundColor: string;
}

const BtnCadastrarPassageiroStyled = styled.button<BtnCadastrarPassageiroStyledProps>`
  color: ${({ $color }) => $color};
  background-color: ${({ $backgroundColor }) => $backgroundColor + 10};
  border: 1px solid ${({ $backgroundColor }) => $backgroundColor + 70};
  font-weight: bold;
  padding: 5px 35px;
  border-radius: 22px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  transition: ease-in-out all 0.1s;

  &:hover {
    background-color: ${({ $backgroundColor }) => $backgroundColor + 25};
    border: 1px solid ${({ $backgroundColor }) => $backgroundColor + 90};
    scale: 1.02;
  }

  &:active {
    background-color: ${({ $backgroundColor }) => $backgroundColor + 40};
    border: 1px solid ${({ $backgroundColor }) => $backgroundColor + 90};
    scale: 0.95;
  }
`;

function BtnCriarPassageiro({ clienteId }: { clienteId: string }) {
  const Cor = useTema().Cor;
  const [CxCriarPassageiro, setCxCriarPassageiro] = useState(false);

  return (
    <>
      <BtnCadastrarPassageiroStyled
        $color={Cor.primaria}
        $backgroundColor={Cor.primaria}
        onClick={() => setCxCriarPassageiro(true)}
      >
        <p style={{ fontFamily: "Icone", fontSize: 24 }}>person_add</p>
        <p>Cadastrar</p>
      </BtnCadastrarPassageiroStyled>
      <ModalCriarPassageiro
        CxCriarPassageiro={CxCriarPassageiro}
        setCxCriarPassageiro={setCxCriarPassageiro}
        clienteId={clienteId}
      />
    </>
  );
}

function ModalCriarPassageiro({
  CxCriarPassageiro,
  setCxCriarPassageiro,
  clienteId,
}: {
  clienteId: string;
  CxCriarPassageiro: any;
  setCxCriarPassageiro: any;
}) {
  const Cor = useTema().Cor;
  const rs = CxCriarPassageiro;
  const ts = setCxCriarPassageiro;

  const [centroCusto, setCentroCusto] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [endBairro, setEndBairro] = useState<string>("");
  const [endCidade, setEndCidade] = useState<string>("");
  const [endNumero, setEndNumero] = useState<string>("");
  const [endRua, setEndRua] = useState<string>("");
  const [fotoPerfilPassageiro, setFotoPerfilPassageiro] = useState<any>();
  const [horarioEmbarque, setHorarioEmbarque] = useState<string>("");
  const [matricula, setMatricula] = useState<string>("");
  const [nome, setNome] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");
  const [pontoApanha, setPontoApanha] = useState<string>("");

  const [statusCarregamento, setStatusCarregamento] = useState("");

  const [imgPreview, setImgPreview] = useState<string>("");

  const { listaCentrosCustos } = useCentroCustoByEmpresa(clienteId);

  const carregarImagem = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImgPreview(URL.createObjectURL(file));
      setFotoPerfilPassageiro(file);
    }
  };

  const limparFormulario = () => {
    setNome("");
    setMatricula("");
    setEmail("");
    setTelefone("");
    setCentroCusto("");
    setHorarioEmbarque("");
    setPontoApanha("");
    setEndBairro("");
    setEndCidade("");
    setEndNumero("");
    setEndRua("");

    // Limpar os estados da imagem também é crucial!
    setFotoPerfilPassageiro(null);
    setImgPreview("");
    setStatusCarregamento("");
  };

  const { criarPassageiro } = useCreatePassageiro();

  const { refetch } = usePassageiros(String(clienteId));

  async function criarP() {
    try {
      let fotoUrlFinal = null;
      if (fotoPerfilPassageiro) {
        setStatusCarregamento("Fazendo upload da imagem...");

        const nomeImg = `foto_perfil_passageiros/${nome}_${matricula.replace(
          /\D/g,
          "",
        )}-${Date.now()}.png`;
        const bucket = "neofrotabkt";

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from(bucket)
          .upload(nomeImg, fotoPerfilPassageiro);

        if (uploadError) {
          console.log(uploadError);
          throw uploadError;
        }

        const { data: urlData } = supabase.storage
          .from(bucket)
          .getPublicUrl(uploadData.path);

        fotoUrlFinal = urlData.publicUrl;
      } else {
        setStatusCarregamento("Registo sem foto...");
      }
      setStatusCarregamento("Enviando dados para o servidor...");

      const passageiro = {
        centroCustoClienteId: Number(centroCusto),
        email: email,
        empresaClienteId: Number(clienteId),
        endBairro: endBairro,
        endCidade: endCidade,
        endNumero: endNumero,
        endRua: endRua,
        fotoPerfilPassageiro: fotoUrlFinal || "",
        horarioEmbarque: horarioEmbarque,
        matricula: matricula,
        nome: nome,
        pontoApanha: pontoApanha,
        telefone: telefone,
        ativo: true,
      };

      await criarPassageiro(passageiro);

      setCxCriarPassageiro(false);
      limparFormulario();
      await refetch();
    } catch (err: any) {
      console.log("graphQLErrors:", err?.graphQLErrors);
      console.log("networkError:", err?.networkError);
      console.log("message:", err?.message);
    }
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: Cor.base + 60,
        backdropFilter: "blur(2px)",
        position: "fixed",
        opacity: rs ? 1 : 0,
        transition: "all 0.3s ease-in-out",
        top: 0,
        left: 0,
        pointerEvents: rs ? "all" : "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        zIndex: 10,
      }}
      onClick={() => ts(false)}
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
          scale: rs ? 1 : 0.8,
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
                Criar Passageiro {statusCarregamento}
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
              onClick={() => setCxCriarPassageiro(false)}
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
              <label
                htmlFor="fotoUpload"
                style={{
                  backgroundColor: Cor.primaria,
                  color: Cor.base,
                  borderRadius: 22,
                  padding: "10px 20px",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                  justifyContent: "center",
                }}
              >
                <p style={{ fontFamily: "Icone", fontWeight: "bold" }}>add</p>
                <p style={{ fontSize: 15 }}>Foto perfil</p>
              </label>

              <input
                id="fotoUpload"
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
                type="text"
                largura="100%"
                onChange={(e) => setNome(e.target.value)}
                value={nome}
              />
              <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
                <TextoEntrada
                  placeholder="E-mail"
                  type="text"
                  largura="60%"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
                />
                <TextoEntrada
                  placeholder="Telefone"
                  type="text"
                  largura="40%"
                  onChange={(e) => {
                    setTelefone(e.target.value);
                  }}
                  value={telefone}
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
                  type="text"
                  largura="50%"
                  onChange={(e: { target: { value: any } }) => {
                    setMatricula(e.target.value);
                  }}
                  value={matricula}
                />
                <select
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "50%",
                    height: 40,
                    border: "none",
                    outline: "nome",
                    backgroundColor: Cor.texto2 + 20,
                    padding: 10,
                    borderRadius: 22,
                    color: Cor.texto2,
                  }}
                  onChange={(e: { target: { value: any } }) => {
                    setCentroCusto(e.target.value);
                  }}
                  value={centroCusto}
                >
                  <option value="" style={{ backgroundColor: Cor.base }}>
                    Selecione o Centro de Custo
                  </option>
                  {listaCentrosCustos.map((cc: any) => {
                    return (
                      <option
                        key={cc.id}
                        value={cc.id}
                        style={{ backgroundColor: Cor.base }}
                      >
                        {cc.nome} - {cc.codigo}
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
                  type="text"
                  largura="75%"
                  onChange={(e) => setEndRua(e.target.value)}
                  value={endRua}
                />
                <TextoEntrada
                  placeholder="Número"
                  type="text"
                  largura="25%"
                  onChange={(e) => setEndNumero(e.target.value)}
                  value={endNumero}
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
              type="text"
              largura="33%"
              onChange={(e) => setEndBairro(e.target.value)}
              value={endBairro}
            />
            <TextoEntrada
              placeholder="Cidade"
              type="text"
              largura="34%"
              onChange={(e) => setEndCidade(e.target.value)}
              value={endCidade}
            />
            <TextoEntrada
              placeholder="Horário de Embarque"
              type="time"
              largura="33%"
              onChange={(e) => setHorarioEmbarque(e.target.value)}
              value={horarioEmbarque}
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
              type="text"
              largura="100%"
              onChange={(e) => setPontoApanha(e.target.value)}
              value={pontoApanha}
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
              criarP();
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
  onChange,
  value,
  type,
  largura,
}: {
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  type: string;
  largura: string;
}) {
  const Cor = useTema().Cor;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: largura,
        height: 40,
        backgroundColor: Cor.texto2 + 20,
        padding: 10,
        borderRadius: 22,
      }}
    >
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        style={{
          backgroundColor: "transparent",
          color: Cor.texto1,
          border: "none",
          outline: "none",
          width: "100%",
        }}
      />
    </div>
  );
}

export default BtnCriarPassageiro;
