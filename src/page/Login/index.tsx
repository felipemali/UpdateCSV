import { useContext, useState } from "react";
import Form from "../../components/Form";
import CardError from "../../components/CardError";
import HeaderLogin from "../../components/HeaderLogin";
import { UserContext } from "../../context/UserContext";

export type messageData = {
  status: boolean;
  text: string;
};
export type message = {
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
  handlePassword: () => void;
};
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<message>({ status: false, text: "" });
  const [isShowPassowrd, setIsShowPassowrd] = useState(false);
  const { isvalidated } = useContext(UserContext);

  const handlePassword = () => setIsShowPassowrd(!isShowPassowrd);

  return (
    <>
      <HeaderLogin />
      <Form
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        message={message}
        setMessage={setMessage}
        isShowPassowrd={isShowPassowrd}
        setIsShowPassowrd={setIsShowPassowrd}
        handlePassword={handlePassword}
      />
      {isvalidated && <CardError />}
    </>
  );
};
export default Login;
