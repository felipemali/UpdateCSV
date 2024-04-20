import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { UploadCSV } from "../../services/UploadCSV";

const Home = () => {
  return (
    <>
      <Header />
      <UploadCSV />
      <Footer />
    </>
  );
};
export default Home;
