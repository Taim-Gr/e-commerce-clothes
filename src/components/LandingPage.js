import { Divider } from "@mui/material";
import calvin from "../images/brands/calvin.svg";
import gucci from "../images/brands/gucci.svg";
import verscase from "../images/brands/versace.svg";
import prada from "../images/brands/prada.svg";
import zara from "../images/brands/zara.svg";
import Alert from "@mui/material/Alert";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
function BrandsLine() {
  return (
    <div className="bg-black w-full py-4 flex justify-evenly flex-wrap gap-y-2">
      <img src={verscase} className="w-[100px] lg:w-auto" />
      <img src={zara} className="w-[80px] lg:w-auto" />
      <img src={gucci} className="w-[100px] lg:w-auto" />
      <img src={prada} className="w-[100px] lg:w-auto" />
      <img src={calvin} className="w-[100px] lg:w-auto" />
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="relative">
      <div className="land-page h-auto flex-col items-center relative flex  -z-1 sm:flex-row sm:h-[calc(100vh_-_76px)] sm:justify-start">
        <div className="text-content items-center pl-0 pt-[64px] lg:px-[64px]  gap-[25px] relative flex flex-col justify-evenly h-full text-center sm:text-left z-10 sm:gap-0 sm:pl-[15px] sm:pb-[64px]">
          <h1
            className="text-[40px] text-center lg:text-[64px]   font-extrabold sm:text-left"
            style={{ letterSpacing: "4px", lineHeight: "0.9" }}
          >
            <span className="block">FIND CLOTHES</span>
            <span className="block">THAT MATCH</span>
            <span className="block">YOUR STYLE</span>
          </h1>
          <p className="w-fit max-w-[400px]  lg:max-w-[560px]  text-slate-600 pl-0 sm:pl-[22px]">
            Browse through our diverse range of meticulously crafted garments ,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>
          <button className="w-[210px] h-[52px] bg-black text-white rounded-[62px] mx-3">
            Shop Now
          </button>
          <div className="parent flex flex-col xl:flex-row items-center text-center xl:text-left">
            <div className="flex items-center">
              <div className="flex items-center">
                <div>
                  <h3 className="text-[40px] font-bold">200+</h3>
                  <span className=" text-[12px] lg:text-[16px] text-slate-600 ">
                    international Brands
                  </span>
                </div>
                <span className="h-[74px] w-[2px] bg-black bg-opacity-10 block mx-[32px]"></span>
              </div>
              <div className="flex items-center">
                <div>
                  <h3 className="text-[40px] font-bold">2,000+</h3>
                  <span className=" text-[12px] lg:text-[16px] text-slate-600 ">
                    High-Quality Products
                  </span>
                </div>
                <span className="h-[74px] w-[2px] bg-black bg-opacity-10 hidden mx-[32px] xl:block"></span>
              </div>
            </div>
            <Divider className="border-slate-400 w-full h-[2px] p-[2px] my-[5px] block xl:hidden" />
            <div className="flex items-center">
              <div>
                <h3 className="text-[40px] font-bold">30,000+</h3>
                <span className=" text-[12px] lg:text-[16px] text-slate-600 ">
                  Happy customers
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="land-image  sm:absolute h-full w-[70%] lg:w-[100%] right-0 top-0 z-1">
          <span className="shine-1 hidden absolute left-[800px] top-[431px] w-[56px] h-[56px] bg-no-repeat sm:block"></span>
          <span className="shine-2 hidden  absolute right-[20px] top-[100px] w-[104px] h-[104px] bg-no-repeat sm:block"></span>
        </div>
      </div>
      <BrandsLine />
    </div>
  );
}
