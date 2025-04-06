import { Divider } from "@mui/material";
import shiny from "../../../images/shine1.svg";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CloseIcon from "@mui/icons-material/Close";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useState, useEffect, useRef } from "react";
import { useMenu } from "../../../contexts/menuConttext";

export default function Menu() {
  const menuRef = useRef(null);

  const menuState = useState(false);
  const { isOpen, dispatch } = useMenu();
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        dispatch({ type: "CLOSE_MENU" });
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  return (
    <div ref={menuRef} className="overflow-y-scroll">
      <div
        className={`bg-black text-white w-screen sm:w-[400px] left-0 h-screen flex flex-col justify-start text-left gap-4 fixed top-0 ${
          isOpen ? "translate-x-0" : "translate-x-[-2000px]"
        } z-50 transition duration-200 overflow-y-auto`}
      >
        <div className="flex items-center justify-between px-4">
          <div className="flex items-center">
            <h3 className="logo font-[archivo] font-extrabold text-white py-[20px] text-[40px]">
              SHOP.CO
            </h3>
            <AutoAwesomeIcon />
          </div>
          <span
            className="bg-gray-500 rounded-full cursor-pointer p-4"
            onClick={() => {
              dispatch({ type: "CLOSE_MENU" });
            }}
          >
            <CloseIcon className="items-end" />
          </span>
        </div>
        <div className="flex flex-col justify-start text-left gap-4 text-[35px]">
          <h3 className="p-4">Shop</h3>
          <Divider className="w-full h-[2px] bg-white" />
          <h3 className="p-4">On Sale</h3>
          <Divider className="w-full h-[2px] bg-white" />
          <h3 className="p-4">New Arivals</h3>
          <Divider className="w-full h-[2px] bg-white" />
          <h3 className="p-4">Brands</h3>
        </div>
        <Divider className="w-full h-[2px] bg-white" />
        <h3 className="p-4 text-[30px]">Socails : </h3>
        <div className="icons flex gap-x-[20px] px-4">
          <FacebookIcon className="text-white" />
          <InstagramIcon className="text-white" />
          <XIcon className="text-white" />
          <GitHubIcon className="text-white" />
        </div>
      </div>
    </div>
  );
}
