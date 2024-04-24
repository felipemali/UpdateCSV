import "./index.css";
import iconError from "../../../assets/img/icon-error2.png";

const CardError = () => {
  return (
    <div className="card">
      <div className="container-img">
        <img src={iconError} alt="" />
      </div>
      <div className="menssage-error">
        <span>Erro na autenticação</span>
        <span className="email-invalid">Email ou senha inválidos</span>
      </div>
    </div>
  );
};
export default CardError;
