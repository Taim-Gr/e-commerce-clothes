import "./App.css";
import Header from "./components/Main-components/Header/Header";
import LandingPage from "./components/Home-page/LandingPage";
import Menu from "./components/Main-components/Header/Menu";
import LatestProjects from "./components/Home-page/LastestProjects";
import TopSelling from "./components/Home-page/TopSelling";
import DressStyle from "./components/Home-page/DressStyles";
import { Container } from "@mui/material";
import HappyCustomers from "./components/Home-page/HappyCustomers";
import Footer from "./components/Main-components/Footer";

function App() {
  return (
    <div className="App relative">
      <Menu />
      <Header />
      <LandingPage />
      <Container maxWidth="xl">
        <LatestProjects />
        <TopSelling />
        <DressStyle />
        <HappyCustomers />
      </Container>
      <Footer />
    </div>
  );
}

export default App;
