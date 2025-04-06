import "./App.css";
import Header from "./components/Header/Header";
import LandingPage from "./components/LandingPage";
import Menu from "./components/Header/Menu";
import LatestProjects from "./components/LastestProjects";
import TopSelling from "./components/TopSelling";
import DressStyle from "./components/DressStyles";
import { Container } from "@mui/material";
import HappyCustomers from "./components/HappyCustomers";
import Footer from "./components/Footer";

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
