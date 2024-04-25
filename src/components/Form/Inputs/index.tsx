import { useContext, useEffect } from "react";
import { UserContext } from "../../../context/UserContext";
import "./index.css";
import eyeClose from "../../../assets/img/hide.png";
import eyeOpen from "../../../assets/img/view.png";

import { DataProps } from "..";
import Message from "../Message";
import EffectLoading from "../../EffectLoading";
import { useForm } from "react-hook-form";

export type message = {
  status: boolean;
  text: string;
};
const Inputs = ({
  email,
  setEmail,
  password,
  setPassword,
  message,
  setMessage,
  isShowPassowrd,
  emailValidation,
  handlePassword,
  setMessageInput,
}: DataProps) => {
  const { submit, setSubmit } = useContext(UserContext);

  const { register, handleSubmit } = useForm();

  const handleSubmitData = (data: unknown) => {
    console.log(data);
  };

  useEffect(() => {
    if (submit && email === "") {
      setMessage({ status: false, text: "* Campo email vazio" });
    }
    if (message?.status && password === "") {
      setMessage({ status: false, text: "* Campo senha vazio" });
    }
    if (submit && email === "" && password === "") {
      setMessage({ status: false, text: "* Preencha os campos acima" });
    }

    setSubmit(false);
  }, [submit]);

  const changeMessages = () => {
    setMessageInput({ status: false, text: "" });
    setMessage({ status: false, text: "" });
  };

  return (
    <div className="container-login">
      <form onSubmit={handleSubmit(handleSubmitData)}>
        <label className="label-login">Email</label>
        <input
          {...register("email")}
          placeholder="Digite seu email..."
          className="input-text"
          onChange={(e) => setEmail(e.target.value.toLowerCase())}
          onClick={changeMessages}
          type="text"
          value={email}
        />

        <label className="label-login">Senha</label>
        <div className="container-input-password">
          <input
            {...register("password")}
            placeholder="Digite sua senha..."
            // className="input-text"
            onChange={(e) => setPassword(e.target.value)}
            onClick={changeMessages}
            type={!isShowPassowrd ? "password" : "text"}
            value={password}
          />
          <button onClick={handlePassword} type="button">
            <img
              src={!isShowPassowrd ? eyeClose : eyeOpen}
              alt="ocultar senha"
            />
          </button>
        </div>

        {/* mensagem input */}
        <Message message={message} />
        {/* /////mensagem input */}

        {/* lógica loading */}
        {submit && <EffectLoading />}
        {/* ///////////lógica loading */}
        <input
          onClick={() => {
            emailValidation();
            setSubmit(!submit);
          }}
          className="button-submit"
          type="button"
          value="Entrar"
        />
      </form>
    </div>
  );
};
export default Inputs;
