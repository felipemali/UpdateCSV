import { useNavigate } from "react-router-dom";
import "./index.css";

const ButtonSelectFarm = ({
  selectedFarm,
}: {
  selectedFarm: null | string;
}) => {
  console.log(selectedFarm);
  const navigate = useNavigate();

  const handleButtonContinue = () => {
    if (selectedFarm) {
      sessionStorage.setItem("idProperties", selectedFarm);
      navigate("/home");
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
