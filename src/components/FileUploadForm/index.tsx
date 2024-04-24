import "./index.css";
import IconSum from "../../assets/img/icon-sum.png";
import IconUpload from "../../assets/img/icon-upload.png";
import Table from "../../components/Table";
import { useCsv } from "../../hooks";
import { TailSpin } from "react-loader-spinner";
import { useProcess } from "../../api";
import iconSucess from "../../assets/img/icon-success.svg";
import iconError from "../../assets/img/icon-error.svg";
import { useEffect } from "react";

const FileUploadForm = () => {
  const {
    data,
    hasRows,
    fileName,
    processFile,
    setFileName,
    sending,
    fileInputRef,
    handleSubmit,
    spin,
    setSpin,
  } = useCsv();

  const { postData, isSend, messageResponse, setMessageResponse, setSend } =
    useProcess();

  useEffect(() => {
    setSpin(false);
  }, [hasRows]);

  return (
    <main className="container">
      <div className="container-input-file">
        <label
          htmlFor="file-upload"
          className="custom-file-upload"
          onClick={() => setMessageResponse({ status: false, message: "" })}
        >
          <img src={IconSum} alt="Adicionar Arquivo" />
          Arquivo
        </label>
        <input
          ref={fileInputRef}
          id="file-upload"
          type="file"
          accept=".csv"
          onChange={processFile}
        />
        <button
          disabled={!hasRows || sending}
          style={{ backgroundColor: hasRows ? "#36d436" : "#CCCCCC" }}
          onClick={() => {
            setFileName(""),
              handleSubmit(),
              hasRows ? setSend(true) : setSend(isSend);
            postData(data);
          }}
        >
          <img src={IconUpload} alt="enviar" />
          Enviar
        </button>
      </div>

      {isSend && (
        <div className="loading">
          <TailSpin radius={"8px"} color="gray" height={80} width={80} />
        </div>
      )}
      {!isSend && messageResponse.message !== "" && (
        <div className="container-message-response">
          <span
            style={{ color: messageResponse.status ? "green" : "red" }}
            className="message-response"
          >
            {messageResponse.message}
          </span>
          <img
            src={messageResponse.status ? iconSucess : iconError}
            alt="sucess"
          />
        </div>
      )}

      {spin && (
        <div className="overlay">
          <div className="icon-container">
            <TailSpin radius={"8px"} color="gray" height={80} width={80} />
          </div>
        </div>
      )}

      <span>{fileName}</span>
      {hasRows && <Table data={data} />}
    </main>
  );
};
export default FileUploadForm;
