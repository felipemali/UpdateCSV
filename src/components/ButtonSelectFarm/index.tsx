import { useNavigate } from "react-router-dom";
import "./index.css";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { selectedFarm } from "../../page/Farm";

const ButtonSelectFarm = ({
  selectedFarm,
}: {
  selectedFarm: null | selectedFarm;
}) => {
  const navigate = useNavigate();
  const { setProperties } = useContext(UserContext);

  const handleButtonContinue = () => {
    if (selectedFarm) {
      sessionStorage.setItem("idProperties", selectedFarm.id);
      navigate("/home");
      setProperties([]);
    }
  };

  return (
    <button
      onClick={handleButtonContinue}
      style={{ backgroundColor: selectedFarm !== null ? "green" : "#CCCCCC" }}
      className="select-farmm"
    >
      Continuar
    </button>
  );
};

export default ButtonSelectFarm;
