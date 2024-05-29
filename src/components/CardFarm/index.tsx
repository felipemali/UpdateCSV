import { Properties } from "../../context/UserContext";
import "./index.css";

type CardFarmProps = {
  farm: Properties;
  isSelected: boolean;
  onSelect: (farmId: string) => void;
};
const CardFarm = ({ farm, isSelected, onSelect }: CardFarmProps) => {
  const handleCheckboxChange = () => {
    onSelect(farm.id);
  };
  return (
    <div className="card-farm">
      <div className="container-checkbox">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={handleCheckboxChange}
        />
      </div>
      <div className="name-farm">
        <span>{farm.name}</span>
      </div>
    </div>
  );
};
export default CardFarm;
