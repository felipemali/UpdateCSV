import { Link } from "react-router-dom";
// import Logo from "../../assets/img/logoo.svg";
// import Logoo from "../../assets/img/logo-login.png";
import arrow from "../../assets/img/arrow.png";
import "./index.css";
import { message } from "../../context/UserContext";
const Header = ({
  setMessageResponse,
}: {
  setMessageResponse: (value: message) => void;
}) => {
  return (
    <header className="header">
      <div>
        <Link to="/fazenda" className="link-no-underline">
          <button
            onClick={() => setMessageResponse({ status: false, message: "" })}
          >
            <img src={arrow} alt="icone seta" />
            Voltar
          </button>
        </Link>

        {/* <img src={window.innerWidth >= 600 ? Logo : Logoo} alt="Logo" /> */}

        {/* <img src={Logoo} alt="Logo" /> */}
        <span className="header-home-span">UpdateCSV</span>
      </div>
    </header>
  );
};
export default Header;
