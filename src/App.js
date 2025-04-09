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
import ProductInfo from "./components/product-details/ProductInfo";
import { Route, Routes } from "react-router-dom";
import CategoryPage from "./components/category-pages/CategoryPage";
function Home() {
  return (
    <div className="relative">
      <LandingPage />
      <Container maxWidth="xl">
        <LatestProjects />
        <TopSelling />
        <DressStyle />
        <HappyCustomers />
      </Container>
    </div>
  );
}
function App() {
  return (
    <div className="App relative">
      <Menu />
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/productInfo/:productId" element={<ProductInfo />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
