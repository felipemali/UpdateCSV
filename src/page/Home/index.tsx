import Footer from "../../components/Footer";
import Header from "../../components/Header";
import FileUploadForm from "../../components/FileUploadForm";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import Modal from "../../components/Modal";
import { useCsv } from "../../hooks";

const Home = () => {
  const {
    setToken,
    setIsOpen,
    isSend,
    messageResponse,
    setMessageResponse,
    setIsSend,
  } = useContext(UserContext);

  const {
    data,
    hasRows,
    fileName,
    processFile,
    sending,
    fileInputRef,
    handleSubmit,
    setFileName,
  } = useCsv();

  const navigate = useNavigate();

  const clearData = () => {
    // console.log("caiu no clearData");
    setFileName("");
    handleSubmit();
    hasRows ? setIsSend(true) : setIsSend(isSend);
  };

  // verificando token
  useEffect(() => {
    const sessionData = sessionStorage.getItem("userToken");
    if (sessionData) {
      setToken(JSON.parse(sessionData));
    } else {
      navigate("/");
    }
  }, []);

  return (
    <>
      <Header setMessageResponse={setMessageResponse} />
      <FileUploadForm
        data={data}
        hasRows={hasRows}
        fileName={fileName}
        processFile={processFile}
        sending={sending}
        fileInputRef={fileInputRef}
        isSend={isSend}
        messageResponse={messageResponse}
        setMessageResponse={setMessageResponse}
        setIsOpen={setIsOpen}
      />
      <Modal data={data} clearData={clearData} />
      <Footer />
    </>
  );
};
export default Home;
