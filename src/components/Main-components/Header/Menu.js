import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { Divider } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useMenu } from "../../../contexts/menuConttext";

export default function Menu() {
  const menuRef = useRef(null);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const { isOpen, dispatch } = useMenu();
  const closeMenu = () => {
    dispatch({ type: "CLOSE_MENU" });
    setIsShopOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        dispatch({ type: "CLOSE_MENU" });
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dispatch]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div ref={menuRef} className="overflow-y-scroll">
      <div
        className={`bg-black text-white w-screen sm:w-[400px] fixed top-0 left-0 h-screen flex flex-col justify-between gap-6 z-50 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-[-150%]"
        }`}
      >
        <div>
          <div className="flex items-center justify-between px-6 pt-6">
            <div className="flex items-center gap-3">
              <Link to="/" onClick={closeMenu}>
                <h3 className="font-[archivo] font-extrabold text-white text-4xl">
                  SHOP.CO
                </h3>
              </Link>
              <AutoAwesomeIcon fontSize="large" />
            </div>
            <span
              className="bg-gray-700 rounded-full cursor-pointer p-3"
              onClick={() => dispatch({ type: "CLOSE_MENU" })}
            >
              <CloseIcon />
            </span>
          </div>
          <div className="flex flex-col gap-6 text-3xl px-6 mt-8">
            <div className="flex flex-col">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setIsShopOpen((prev) => !prev)}
              >
                <h3>Shop</h3>
                {isShopOpen ? (
                  <KeyboardArrowUpOutlinedIcon fontSize="large" />
                ) : (
                  <KeyboardArrowDownOutlinedIcon fontSize="large" />
                )}
              </div>
              {isShopOpen && (
                <ul className="pl-4 mt-3 flex flex-col gap-3 text-2xl">
                  <li onClick={closeMenu}>
                    <Link to="/shop/men">Men</Link>
                  </li>
                  <Divider className="bg-gray-700" />
                  <li onClick={closeMenu}>
                    <Link to="/shop/women">Womens</Link>
                  </li>
                </ul>
              )}
            </div>
            <Divider className="bg-gray-700" />
            <div className="flex flex-col gap-3">
              <h3 onClick={closeMenu}>
                <HashLink smooth to="/#onSale">
                  On Sale
                </HashLink>
              </h3>
              <Divider className="bg-gray-700" />
              <h3 onClick={closeMenu}>
                <HashLink smooth to="/#New-Arrivals">
                  New Arrivals
                </HashLink>
              </h3>
              <Divider className="bg-gray-700" />
              <h3 onClick={closeMenu}>
                <HashLink smooth to="/#Styles">
                  Styles
                </HashLink>
              </h3>
            </div>
          </div>
        </div>
        <div className="px-6 pb-8">
          <Divider className="bg-gray-700 mb-4" />
          <h3 className="text-2xl mb-3">Socials:</h3>
          <div className="flex gap-x-6 text-3xl">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
            >
              <FacebookIcon />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
            >
              <InstagramIcon />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
            >
              <GitHubIcon />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
