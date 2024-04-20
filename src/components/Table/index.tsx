import { CSVData } from "../../models/CSVData";
import "./index.css";

type TableProps = {
  csvData: CSVData[];
};

const Table = ({ csvData }: TableProps) => {
  return (
    <>
      {csvData.length > 0 && (
        <div className="container-table">
          <table>
            <thead>
              <tr>
                <th>Nº</th>
                <th>VID</th>
                <th>Weight</th>
              </tr>
            </thead>
            <tbody>
              {csvData.map((row, index) => (
                <tr key={index}>
                  <td className="number-td">{index + 1}</td>
                  <td>{row.VID}</td>
                  <td>{row.Weight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Table;
