import logo from "../../../assets/img/logo-login.png";
import "./index.css";
const HeaderLogin = () => {
  return (
    <header className="container-logo">
      <div>
        <img src={logo} alt="logo" />
      </div>
      <div>
        <span>UpdateCSV</span>
      </div>
    </header>
  );
};
export default HeaderLogin;
