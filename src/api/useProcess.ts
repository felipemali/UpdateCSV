import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext, dataUser } from "../context/UserContext";
import { message } from "../components/Form/Inputs";
import { AnimalData } from "../models/CSVData";

export const useProcess = () => {
  const { token, setSubmit, setToken } = useContext(UserContext);

  const navigate = useNavigate();
  const [messageResponse, setMessageResponse] = useState({
    status: false,
    message: "",
  });
  const [messageInput, setMessageInput] = useState<message>({
    status: false,
    text: "",
  });
  const [isSend, setIsSend] = useState(false);

  const dataa = [
    {
      bottom: "30",
      weight: 207,
    },
  ];

  //verificando login e buscando token
  const getToken = async (login: dataUser) => {
    try {
      //http://localhost:8080/sessoes
      //https://api-ebov.fly.dev/sessoes
      const search = await fetch("https://api-ebov.fly.dev/sessoes", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: login.email,
          senha: login.password,
        }),
      });

      if (search.status === 200) {
        const content = await search.json();
        navigate("/home");
        saveToken(content.token);
      } else if (search.status === 401) {
        console.log("Erro 401: Não autorizado");
        setMessageInput({ status: false, text: "email ou senha inválidos" });
      } else {
        console.log(`Erro ${search.status}: ${search.statusText}`);
        setMessageInput({ status: false, text: "email ou senha inválidos" });
      }
    } catch (error) {
      //erro durante solicitação
      console.error("Erro ao processar a solicitação:", error);
      setMessageInput({
        status: false,
        text: `Erro ao processar a solicitação`,
      });
    }

    setSubmit(false);
  };

  //salvar token na session
  const saveToken = (token: string) => {
    sessionStorage.setItem("userToken", JSON.stringify(token));
    setToken(token);
  };

  //Envio dos dados
  const postData = async (data: AnimalData[]) => {
    setMessageResponse({ status: false, message: "" });
    console.log("aaaaaa", data);
    console.log(token);
    console.log("caiu");

    try {
      //http://localhost:8080/registros/many
      //https://api-ebov.fly.dev/registros/many
      const search = await fetch("https://api-ebov.fly.dev/registros/many", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataa),
      });

      if (search.status === 201) {
        console.log("sucesso");

        setMessageResponse({ status: true, message: "Dados atualizados" });
      } else if (search.status === 401) {
        console.log("Erro 401: Não autorizado");
        setMessageResponse({ status: false, message: "Não autorizado" });
      } else {
        console.log(`Erro ${search.status}: ${search.statusText}`);
        setMessageResponse({ status: false, message: "Não autorizado" });
      }
    } catch (error) {
      console.error("Erro ao processar a solicitação:", error);
      setMessageResponse({
        status: false,
        message: "Erro ao processar a solicitação",
      });
    }

    setIsSend(false);
  };

  return {
    getToken,
    postData,
    isSend,
    setIsSend,
    messageResponse,
    messageInput,
    setMessageResponse,
    setMessageInput,
  };
};
