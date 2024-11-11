import { useState } from "react";
import CardFarm from "../../components/CardFarm";
import ButtonSelectFarm from "../../components/ButtonSelectFarm";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { useProcess } from "../../api";
import HeaderFarm from "./HeaderFarm";

export type selectedFarm = {
  id: string;
  name: string;
};

const Farm = () => {
  const [selectedFarm, setSelectedFarm] = useState<null | selectedFarm>(null);
  const { setToken, properties } = useContext(UserContext);
  const { getProperties } = useProcess();
  const navigate = useNavigate();

  useEffect(() => {
    const sessionData = sessionStorage.getItem("userToken");
    if (sessionData) {
      setToken(JSON.parse(sessionData));
      getProperties();
    } else {
      navigate("/");
    }
  }, []);
  // console.log(properties);

  const handleFarmSelect = (farmId: selectedFarm | null) => {
    setSelectedFarm(farmId);
  };
  return (
    <>
      <HeaderFarm />
      <h2 style={{ textAlign: "center", color: "#5a5858" }}>Propriedades</h2>
      {properties.map((farm) => (
        <CardFarm
          key={farm.id}
          farm={farm}
          isSelected={selectedFarm?.id === farm.id}
          onSelect={handleFarmSelect}
        />
      ))}
      <ButtonSelectFarm selectedFarm={selectedFarm} />
    </>
  );
};
export default Farm;
