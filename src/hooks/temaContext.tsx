import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { CorClara, CorEscura } from "../assets/cores";

type Tema = "light" | "dark";

interface TemaContextProps {
  tema: Tema;
  Cor: typeof CorClara;
  alternarTema: () => void;
}

const TemaContext = createContext<TemaContextProps | undefined>(undefined);
export function TemaProvider({ children }: { children: ReactNode }) {
  const [tema, setTema] = useState<Tema | null>(null);

  useEffect(() => {
    const temaSalvo = localStorage.getItem("tema") as Tema | null;

    if (temaSalvo === "light" || temaSalvo === "dark") {
      setTema(temaSalvo);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTema(prefersDark ? "dark" : "light");
    }
  }, []);

  const alternarTema = () => {
    const novoTema = tema === "light" ? "dark" : "light";
    setTema(novoTema);
    localStorage.setItem("tema", novoTema);
  };

  if (!tema) return null;

  const Cor = tema === "dark" ? CorEscura : CorClara;

  return (
    <TemaContext.Provider value={{ tema, Cor, alternarTema }}>
      {children}
    </TemaContext.Provider>
  );
}
export function useTema() {
  const context = useContext(TemaContext);
  if (!context) {
    throw new Error("useTema deve ser usado dentro do TemaProvider");
  }
  return context;
}
