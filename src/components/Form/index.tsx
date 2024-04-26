import { useEffect, useState } from "react";
import { dataUser } from "../../context/UserContext";
import "./index.css";
import eyeClose from "../../assets/img/hide.png";
import eyeOpen from "../../assets/img/view.png";

import { DataProps } from "../../page/Login";
import Message from "../Message";
import EffectLoading from "../EffectLoading";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { useProcess } from "../../api";
import { schema } from "./schemaYup";

const Form = ({
  email,
  setEmail,
  password,
  setPassword,
  isShowPassowrd,
  handlePassword,
}: DataProps) => {
  const { getToken } = useProcess();
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const { register, handleSubmit, formState } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });
  const { errors } = formState;

  console.log("errors", errors);

  useEffect(() => {
    if (isFormSubmitting && Object.keys(errors).length === 0) {
      getToken({ email, password });
      setIsFormSubmitting(false);
    }
  }, [isFormSubmitting, errors]);

  const handleSubmitData = async (data: dataUser) => {
    // console.log("email, senha", data);
    try {
      await schema.validate(data);
      setIsFormSubmitting(true);
      console.log("Email válido");
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
          onChange={(e) => setEmail(e.target.value.toLowerCase())}
          type="text"
          value={email}
        />
        <Message error={errors.email?.message} />

        <label className="label-login">Senha</label>
        <div className="container-input-password">
          <input
            {...register("password")}
            placeholder="Digite sua senha..."
            // className="input-text"
            onChange={(e) => setPassword(e.target.value)}
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
