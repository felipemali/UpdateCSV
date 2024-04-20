import { useState, ChangeEvent } from "react";

import Papa from "papaparse";
import "./index.css";
import IconSum from "../../assets/icon-sum.png";
import IconUpload from "../../assets/icon-upload.png";
import { CSVData } from "../../models/CSVData";
import Table from "../../components/Table";
// import { FileChangeHandler } from "../../components/FileInputComponent";
// import Table from "../../components/Table";

export const UploadCSV = () => {
  const [fileName, setFileName] = useState("");
  const [csvData, setCsvData] = useState<CSVData[]>([]);
  const lengthCSV = csvData.length > 0;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;

    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result: { data: CSVData[] }) => {
          const parsedData: CSVData[] = result.data.filter(
            (row): row is CSVData =>
              row.VID !== undefined &&
              row.VID !== "" &&
              row.Weight !== undefined &&
              row.Weight !== "0" &&
              row.Weight !== "0.0"
          );
          setCsvData(parsedData);
        },
      });
      setFileName(file.name);
    }
  };

  return (
    <main className="container">
      <div className="container-input-file">
        <label htmlFor="file-upload" className="custom-file-upload">
          <img src={IconSum} alt="Adicionar Arquivo" />
          Arquivo
        </label>
        <input
          id="file-upload"
          type="file"
          accept=".csv"
          onChange={handleChange}
        />
        <button
          disabled={lengthCSV ? false : true}
          style={{ backgroundColor: lengthCSV ? "#36d436" : "#CCCCCC" }}
        >
          <img src={IconUpload} alt="enviar" />
          Enviar
        </button>
      </div>
      <span>{fileName}</span>
      <Table csvData={csvData} />
    </main>
  );
};
