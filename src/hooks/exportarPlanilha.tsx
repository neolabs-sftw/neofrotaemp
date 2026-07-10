import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export function exportarPlanilhaFunc(
  data: any[],
  fileName: string,
  format: "xlsx" | "csv" = "xlsx",
) {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Dados");

  const fileType =
    format === "xlsx"
      ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      : "text/csv";
  const fileExtension = format === "xlsx" ? ".xlsx" : ".csv";

  const buffer = XLSX.write(wb, { bookType: format, type: "array" });
  const blob = new Blob([buffer], { type: fileType });

  saveAs(blob, fileName + fileExtension);
}
