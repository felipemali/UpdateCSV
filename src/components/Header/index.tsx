import { Link } from "react-router-dom";
import Logo from "../../assets/img/logoo.svg";
import Logoo from "../../assets/img/logo-login.png";
import arrow from "../../assets/img/arrow.png";
import "./index.css";
const Header = () => {
  return (
    <header className="header">
      <div>
        <Link to="/" className="link-no-underline">
          <button>
            <img src={arrow} alt="icone seta" />
            Sair
          </button>
        </Link>

        <img src={window.innerWidth >= 600 ? Logo : Logoo} alt="Logo" />
      </div>
    </header>
  );
};
export default Header;
