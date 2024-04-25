import "./index.css";
import { TailSpin } from "react-loader-spinner";

const EffectLoading = () => {
  return (
    <div className="overlay">
      <div className="container-icon">
        <TailSpin radius={"8px"} color="gray" height={80} width={80} />
      </div>
    </div>
  );
};
export default EffectLoading;
