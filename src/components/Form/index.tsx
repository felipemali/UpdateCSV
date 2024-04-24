import { useContext, useEffect, useState } from "react";
import Inputs, { message } from "./Inputs";
import { useProcess } from "../../api";
import CardError from "./CardError";
import { UserContext } from "../../context/UserContext";
import HeaderLogin from "./HeaderLogin";

export type messageData = {
  status: boolean;
  text: string;
};
export type DataProps = {
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  message: messageData;
  setMessage: (value: message) => void;
  isShowPassowrd: boolean;
  setIsShowPassowrd: (value: boolean) => void;
  emailValidation: () => void;
  handlePassword: () => void;
  setMessageInput: (value: message) => void;
};
const Form = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<message>({ status: false, text: "" });
  const [isShowPassowrd, setIsShowPassowrd] = useState(false);
  const { getToken, messageInput, setMessageInput } = useProcess();
  const { submit, setSubmit } = useContext(UserContext);

  useEffect(() => {
    if (message.status && password !== "") {
      getToken({ email, password });
    }
    setSubmit(false);
  }, [submit]);

  const emailValidation = () => {
    const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    if (regEx.test(email)) {
      setMessage({ status: true, text: "" });
    } else if (!regEx.test(email) && email !== "") {
      setMessage({ status: false, text: "* Estrutura de email inválida" });
    }
  };
  const handlePassword = () => setIsShowPassowrd(!isShowPassowrd);

  return (
    <>
      <HeaderLogin />
      <Inputs
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        message={message}
        setMessage={setMessage}
        isShowPassowrd={isShowPassowrd}
        setIsShowPassowrd={setIsShowPassowrd}
        emailValidation={emailValidation}
        handlePassword={handlePassword}
        setMessageInput={setMessageInput}
      />
      {!messageInput.status && messageInput.text !== "" && <CardError />}
    </>
  );
};
export default Form;
