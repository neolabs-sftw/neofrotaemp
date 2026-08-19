import * as XLSX from "xlsx-js-style";
import { saveAs } from "file-saver";

export function exportarPlanilhaFunc(
  data: any[],
  fileName: string,
  format: "xlsx" | "csv" = "xlsx",
) {
  // 1. Cria a planilha com os dados
  const ws = XLSX.utils.json_to_sheet(data);

  // 2. Se for XLSX, vamos aplicar o estilo no cabeçalho
  if (format === "xlsx" && ws["!ref"]) {
    // Pega o intervalo (range) da planilha para saber quantas colunas existem
    const range = XLSX.utils.decode_range(ws["!ref"]);

    // Define o estilo do cabeçalho (Fundo azul, texto branco em negrito, borda preta)
    const estiloCabecalho = {
      font: { bold: true, color: { rgb: "FFFFFF" } }, // Texto branco
      fill: { fgColor: { rgb: "FF8E00" } },
      border: {
        // Bordas finas em todos os lados
        bottom: { style: "thin", color: { rgb: "053058" } },
      },
    };

    // Percorre todas as colunas da linha 0 (cabeçalho) e aplica o estilo
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const enderecoCelula = XLSX.utils.encode_cell({ r: 0, c: C });
      if (ws[enderecoCelula]) {
        ws[enderecoCelula].s = estiloCabecalho;
      }
    }
  }

  // 3. Cria o arquivo (Workbook) e anexa a planilha
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Dados");

  // 4. Configurações de exportação
  const fileType =
    format === "xlsx"
      ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      : "text/csv";
  const fileExtension = format === "xlsx" ? ".xlsx" : ".csv";

  // 5. Gera o buffer e salva o arquivo
  const buffer = XLSX.write(wb, { bookType: format, type: "array" });
  const blob = new Blob([buffer], { type: fileType });

  saveAs(blob, fileName + fileExtension);
}
