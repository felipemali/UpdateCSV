import { useContext, useEffect } from "react";
import { UserContext } from "../../../context/UserContext";
// import { useProcess } from "../../../api";
import "./index.css";
import eyeClose from "../../../assets/img/hide.png";
import eyeOpen from "../../../assets/img/view.png";

import { TailSpin } from "react-loader-spinner";
import { DataProps } from "..";

export type message = {
  status: boolean;
  text: string;
};
const p = {
  color: "red",
  width: "80%",
  marginTop: "1rem",
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
  // const { getToken } = useProcess();

  useEffect(() => {
    // if (message?.status) {
    //   getToken({ email, password });
    // }
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

  const chanceMessages = () => {
    setMessageInput({ status: false, text: "" });
    setMessage({ status: false, text: "" });
  };

  return (
    <div className="container-login">
      <form>
        <label className="label-login">Email</label>
        <input
          placeholder="Digite seu email..."
          className="input-text"
          onChange={(e) => setEmail(e.target.value.toLowerCase())}
          onClick={chanceMessages}
          type="text"
          value={email}
        />

        <label className="label-login">Senha</label>
        <div className="container-input-password">
          <input
            placeholder="Digite sua senha..."
            // className="input-text"
            onChange={(e) => setPassword(e.target.value)}
            onClick={chanceMessages}
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
        <p style={p}>{!message?.status && message?.text}</p>
        {/* /////mensagem input */}

        {/* lógica loading */}
        {submit && (
          <div className="overlay">
            <div className="icon-container">
              <TailSpin radius={"8px"} color="gray" height={80} width={80} />
            </div>
          </div>
        )}
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
