import { useState } from "react";
import { AnimalData } from "../../models/CSVData";
import "./index.css";

type TableProps = {
  data: AnimalData[];
};

const Table = ({ data }: TableProps) => {
  const [searchVID, setSearchVID] = useState("");
  const [searchWeight, setSearchWeight] = useState("");

  const filteredData = data.filter((row) => {
    if (searchVID) {
      return row.bottom.toLowerCase().includes(searchVID.toLowerCase());
      //tirei o ? da propriedade bottom da tipagem AnimalData
    }
    if (searchWeight) {
      return row.weight.toString().startsWith(searchWeight);
    }
    return true;
  });

  return (
    <div className="container-table">
      <div className="container-inputs-table">
        <input
          className="input-vid"
          type="number"
          placeholder="Filtre VID..."
          value={searchVID}
          onChange={(e) => setSearchVID(e.target.value)}
        />
        <input
          className="input-weight"
          type="number"
          placeholder="Filtre Peso..."
          value={searchWeight}
          onChange={(e) => setSearchWeight(e.target.value)}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>Nº</th>
            <th>RFID</th>
            <th>Peso</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, index) => (
            <tr key={index}>
              <td className="number-td">{index + 1}</td>
              <td>{row.bottom}</td>
              <td>{row.weight}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
