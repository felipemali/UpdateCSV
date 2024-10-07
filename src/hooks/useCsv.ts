import { ChangeEvent, useRef, useState } from "react";
import { AnimalData } from "../models/CSVData";
import Papa from "papaparse";

export type CSVData = {
  VID: string;
  Weight: string;
  Nome?: string;
  RFID: string;
};

export const useCsv = () => {
  const [fileName, setFileName] = useState("");
  const [data, setData] = useState<AnimalData[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [sending, setSending] = useState(false);

  const processFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event?.target.files ? event.target.files[0] : null;

    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result: { data: CSVData[] }) => {
          const parsedData: CSVData[] = result.data.filter(
            (row): row is CSVData =>
              row.RFID !== undefined &&
              row.RFID !== "" &&
              row.Weight !== undefined &&
              row.Weight !== "0" &&
              row.Weight !== "0.0"
          );

          setData(
            parsedData.map((item) => ({
              bottom: item.RFID,
              weight: parseInt(item.Weight),
            }))
          );
          clearFileInput();
        },
      });

      setFileName(file.name);
    }
  };
  const clearFileInput = () => {
    // Limpa o valor do input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const handleSubmit = () => {
    console.log("caiu");

    if (sending) {
      return;
    }
    setSending(true);
    setSending(false);
    setFileName("");
    setData([]);
  };

  return {
    data,
    hasRows: data.length > 0,
    fileName,
    sending,
    fileInputRef,
    setSending,
    setFileName,
    processFile,
    handleSubmit,
    setData,
  };
};
