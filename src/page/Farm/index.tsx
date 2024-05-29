import { useState } from "react";
import CardFarm from "../../components/CardFarm";
import ButtonSelectFarm from "../../components/ButtonSelectFarm";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { useProcess } from "../../api";
import Header from "../../components/Header";

const Farm = () => {
  const [selectedFarm, setSelectedFarm] = useState<null | string>(null);
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

  const handleFarmSelect = (farmId: string | null) => {
    setSelectedFarm(farmId);
  };
  return (
    <>
      <Header />
      <h2 style={{ textAlign: "center" }}>Propriedades</h2>
      {properties.map((farm) => (
        <CardFarm
          key={farm.id}
          farm={farm}
          isSelected={selectedFarm === farm.id}
          onSelect={handleFarmSelect}
        />
      ))}
      <ButtonSelectFarm selectedFarm={selectedFarm} />
    </>
  );
};
export default Farm;
