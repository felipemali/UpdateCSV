import "./index.css";
import IconSum from "../../assets/img/icon-sum.png";
import ArrowDown from "../../assets/img/arrow-down.png";
import IconUpload from "../../assets/img/icon-upload.png";

import Table from "../../components/Table";
import MessageResponse from "../MessageResponse";
import EffectLoading from "../EffectLoading";

import { useCsv } from "../../hooks";
import { useProcess } from "../../api";
import FileName from "../FileName";

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
  } = useCsv();

  const { postData, isSend, messageResponse, setMessageResponse, setIsSend } =
    useProcess();

  return (
    <main className="container-file-updade">
      <div className="container-title-home">
        <h4>Atualize seus registros e-Bov aqui</h4>
        <img src={ArrowDown} alt="seta para baixo" />
      </div>
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
              hasRows ? setIsSend(true) : setIsSend(isSend);
            postData(data);
          }}
        >
          <img src={IconUpload} alt="enviar" />
          Enviar
        </button>
      </div>

      {isSend && <EffectLoading />}

      {!isSend && messageResponse.message !== "" && (
        <MessageResponse messageResponse={messageResponse} />
      )}

      <FileName fileName={fileName} />

      {hasRows && <Table data={data} />}
    </main>
  );
};
export default FileUploadForm;
