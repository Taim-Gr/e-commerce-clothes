import SearchProductsBar from "./SearchProductsBar";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { useMenu } from "../../../contexts/menuConttext";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
export default function Header() {
  const { dispatch } = useMenu();
  return (
    <div className="w-screen ">
      <div className="header flex items-center justify-between  gap-x-[40px] max-w-[1240px]  mx-auto p-2 md:justify-center">
        <div className="flex gap-x-[40px]">
          <button
            className="block md:hidden"
            onClick={() => {
              console.log(dispatch);
              dispatch({ type: "OPEN_MENU" });
            }}
          >
            <MenuIcon />
          </button>
          <Link to="/">
            <h3 className="logo text-[40px] max-sm:text-[28px] font-[archivo] font-extrabold">
              SHOP.CO
            </h3>
          </Link>
        </div>
        <ul className="font-[satoshi] hidden  gap-[24px] text-[16px] md:flex relative">
          <span className="absolute"></span>

          <li>
            <span className="relative shop-btn">
              <span className="absolute right-[-20px]">
                <KeyboardArrowDownOutlinedIcon />
              </span>
              Shop
              <ul className="absolute genders-type text-left top-[25px] z-[100] bg-black p-2 text-white">
                <Link to="/shop/men">
                  <li className="shop-option transition duration-300 hover:pl-1">
                    Men
                  </li>
                </Link>
                <hr />
                <Link to="shop/women">
                  <li className="shop-option transition duration-300 hover:pl-1">
                    Womens
                  </li>
                </Link>
              </ul>
            </span>
          </li>
          <HashLink smooth to="/#onSale">
            <li className="ml-1">On Sale</li>
          </HashLink>
          <HashLink smooth to="/#New-Arrivals">
            <li>New Arivals</li>
          </HashLink>
          <HashLink smooth to="/#Styles">
            <li>Styles</li>
          </HashLink>
        </ul>
        <div className=" hidden lg:block flex-1">
          <SearchProductsBar />
        </div>
        <div className="header-icons flex gap-[14px]">
          <button className="block lg:hidden">
            <SearchIcon />
          </button>
          <Link to="/cart">
            <button>
              <ShoppingCartOutlinedIcon />
            </button>
          </Link>
          <button>
            <AccountCircleOutlinedIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
