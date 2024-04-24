import Footer from "../../components/Footer";
import Header from "../../components/Header";
import FileUploadForm from "../../components/FileUploadForm";
import { UserContext } from "../../context/UserContext";
// import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";

const Home = () => {
  const { setToken } = useContext(UserContext);
  // const navigate = useNavigate();

  // verificando token
  useEffect(() => {
    const sessionData = sessionStorage.getItem("userToken");
    if (sessionData) {
      setToken(JSON.parse(sessionData));
    } else {
      // navigate("/");
    }
  }, []);

  return (
    <>
      <Header />
      <FileUploadForm />
      <Footer />
    </>
  );
};
export default Home;
