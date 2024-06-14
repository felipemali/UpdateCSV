import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Properties, UserContext, dataUser } from "../context/UserContext";
import { AnimalData } from "../models/CSVData";
import { extractMessageError } from "../hooks/extractMessageError";

export const useProcess = () => {
  const {
    token,
    setToken,
    setIsvalidated,
    setProperties,
    messageResponse,
    setMessageResponse,
    isSend,
    setIsSend,
  } = useContext(UserContext);

  const navigate = useNavigate();

  const dataa = [
    {
      bottom: "57",
      weight: 500,
      label: "rotulo dia 05/06",
    },
    // {
    //   name: "animal1",
    //   weight: 500,
    //   label: "rotulo dia 05/06",
    // },
  ];

  //verificando login e buscando token
  const getToken = async (login: dataUser) => {
    console.log(login);

    try {
      //http://localhost:8080/sessoes
      //https://api-ebov.fly.dev/sessoes
      const search = await fetch("http://localhost:8080/sessoes", {
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
        navigate("/fazenda");
        saveToken(content.token);
      } else if (search.status === 401) {
        console.log("erro 401");
        setIsvalidated(true);

        setTimeout(() => {
          setIsvalidated(false);
        }, 4000);
      } else {
        console.log(`Erro ${search.status}: ${search.statusText}`);
        setIsvalidated(true);
        setTimeout(() => {
          setIsvalidated(false);
        }, 4000);
      }
    } catch (error) {
      //erro durante solicitação
      console.error("Erro ao processar a solicitação:", error);
    }
  };

  //salvar token na session
  const saveToken = (token: string) => {
    sessionStorage.setItem("userToken", JSON.stringify(token));
    setToken(token);
  };

  //propriedades
  const getProperties = async () => {
    console.log("token:", token);
    // const tokken =
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNvbnRhdG9AZmVsaXBlbGltYS5jb20iLCJpYXQiOjE3MTM2MzcwNTksImV4cCI6MTcxNjIyOTA1OSwic3ViIjoiMDA3MTliYzEtMTU3ZS00ZDVkLThlMzUtODQwZTc1ZTJjYTI0In0.gqrkQnom8ZCjgLWCLc70U4z5Rc6l4FVl7VpksLp0Y_o";

    try {
      const search = await fetch("http://localhost:8080/propriedades/minhas", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!search.ok) {
        throw new Error("Network response was not ok");
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = await search.json();
      setProperties((prevProperties) => [
        ...prevProperties,
        ...data.minhasPropriedades.map((e: Properties) => ({
          name: e.nome,
          id: e.id,
        })),
      ]);
      console.log(data);
    } catch (error) {
      console.error("Erro ao recuperar propriedades:", error);
    }
  };

  //tratar retorno do id da propriedade da session
  const getSessionData = (key: string): string | undefined => {
    const data = sessionStorage.getItem(key);
    return data === null ? undefined : data;
  };

  //Envio dos dados
  const postCSV = async (data: AnimalData[]) => {
    setMessageResponse({ status: false, message: "" });
    const sessionData = getSessionData("idProperties");
    // console.log("dados:", data);
    // console.log("token:", token);
    // console.log("id Propriedade::", sessionData);
    try {
      const headers: { [key: string]: string } = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      if (sessionData !== undefined) {
        headers["propriedade_id"] = sessionData;
      }

      //http://localhost:8080/registros/many
      //https://api-ebov.fly.dev/registros/many
      const search = await fetch(
        "http://localhost:8080/registros/create/many",
        {
          method: "POST",
          headers,
          body: JSON.stringify(dataa),
        }
      );

      if (search.status === 201) {
        console.log("sucesso", search);
        setMessageResponse({ status: true, message: "Registros Adicionados" });
      } else if (search.status === 401) {
        setMessageResponse({
          status: false,
          message:
            "Erro 401: Envio de registros não autorizado. Verifique suas credenciais e tente novamente.",
        });
      } else {
        const errorData = await search.json();
        const errorMessage = errorData.message || "Erro ao enviar registros";
        const extractedDetails = extractMessageError(errorMessage);
        setMessageResponse({
          status: false,
          message: `Registro não encontrado! ${extractedDetails}`,
        });
      }
    } catch (error) {
      console.error("Erro ao processar a solicitação:", error);
      setMessageResponse({
        status: false,
        message: `Erro ao processar a solicitação: ${error}`,
      });
    }
    setIsSend(false);
  };

  return {
    getToken,
    postCSV,
    isSend,
    setIsvalidated,
    setIsSend,
    messageResponse,
    getProperties,
    setMessageResponse,
  };
};
