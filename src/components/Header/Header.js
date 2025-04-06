import SearchProductsBar from "./SearchProductsBar";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { useMenu } from "../../contexts/menuConttext";
import MenuIcon from "@mui/icons-material/Menu";
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
          <h3 className="logo text-[40px] font-[archivo] font-extrabold">
            SHOP.CO
          </h3>
        </div>
        <ul className="font-[satoshi] hidden  gap-[24px] text-[16px] md:flex">
          <li>
            <span>Shop</span>
            <span>
              <KeyboardArrowDownOutlinedIcon />
            </span>
          </li>
          <li>On Sale</li>
          <li>New Arivals</li>
          <li>Brands</li>
        </ul>
        <div className=" hidden lg:block flex-1">
          <SearchProductsBar />
        </div>
        <div className="header-icons flex gap-[14px]">
          <button className="block lg:hidden">
            <SearchIcon />
          </button>
          <button>
            <ShoppingCartOutlinedIcon />
          </button>
          <button>
            <AccountCircleOutlinedIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
