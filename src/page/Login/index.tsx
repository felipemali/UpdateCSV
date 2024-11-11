import { useContext } from "react";
import Form from "../../components/Form";
import CardError from "../../components/CardError";
import HeaderLogin from "./HeaderLogin";
import { UserContext } from "../../context/UserContext";

export type messageData = {
  status: boolean;
  text: string;
};
export type message = {
  status: boolean;
  text: string;
};

const Login = () => {
  const { isvalidated } = useContext(UserContext);

  return (
    <>
      <HeaderLogin />
      <Form />
      {isvalidated && <CardError />}
    </>
  );
};
export default Login;
