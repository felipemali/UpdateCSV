import { useContext, useEffect, useState } from "react";
import { UserContext, dataUser } from "../../context/UserContext";
import "./index.css";
import eyeClose from "../../assets/img/hide.png";
import eyeOpen from "../../assets/img/view.png";

import Message from "../Message";
import EffectLoading from "../EffectLoading";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { useProcess } from "../../api";
import { schema } from "./schemaYup";

const Form = () => {
  const { getToken } = useProcess();
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [login, setLogin] = useState({ email: "", password: "" });
  const [isShowPassowrd, setIsShowPassowrd] = useState(false);
  const { setProperties } = useContext(UserContext);

  const { register, handleSubmit, formState } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });
  const { errors } = formState;

  // console.log("errors", errors);

  useEffect(() => {
    if (isFormSubmitting && Object.keys(errors).length === 0) {
      getToken(login);
      setIsFormSubmitting(false);
    }
  }, [isFormSubmitting, errors]);
  const handlePassword = () => setIsShowPassowrd(!isShowPassowrd);

  const handleSubmitData = async (data: dataUser) => {
    try {
      await schema.validate(data);
      setLogin(data);
      setIsFormSubmitting(true);
      setProperties([]);

      // console.log("Email válido");
    } catch (error) {
      // console.error(error);
    }
  };

  return (
    <div className="container-login">
      <form onSubmit={handleSubmit(handleSubmitData)}>
        <label className="label-login">Email</label>
        <input
          {...register("email")}
          placeholder="Digite seu email..."
          className="input-text"
          type="text"
        />
        <Message error={errors.email?.message} />

        <label className="label-login">Senha</label>
        <div className="container-input-password">
          <input
            {...register("password")}
            placeholder="Digite sua senha..."
            // className="input-text"

            type={!isShowPassowrd ? "password" : "text"}
          />
          <button onClick={handlePassword} type="button">
            <img
              src={!isShowPassowrd ? eyeClose : eyeOpen}
              alt="ocultar senha"
            />
          </button>
        </div>
        <Message error={errors.password?.message} />

        {/* lógica loading */}
        {isFormSubmitting && <EffectLoading />}
        {/* ///////////lógica loading */}

        <input className="button-submit" type="submit" value="Entrar" />
        <div className="container-msg-create-account">
          <span> É necessário uma conta e-Bov, não tem?</span>
          <a href="https://beta-e-bov.web.app/cadastro">Cadastra-se aqui</a>
        </div>
      </form>
    </div>
  );
};
export default Form;
