import { useEffect, useRef } from "react";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import CustomerRevivew from "./CustomerRevivew";
import jsonRevivews from "../../json/customerRevivews.json";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function HappyCustomers() {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({ left: -340, behavior: "smooth" });
  };
  useEffect(() => {
    scrollContainerRef.current.scrollBy({ left: 1000 });
  }, []);
  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({ left: 340, behavior: "smooth" });
  };

  const ratingList = jsonRevivews.map((review) => (
    <CustomerRevivew
      key={review.id}
      ratingValue={review.ratingValue}
      name={review.name}
      customerOpinion={review.customerOpinion}
    />
  ));

  return (
    <>
      <div className="w-full mb-[100px]">
        {/* Header with arrows */}
        <div className="flex py-[50px] justify-center items-center">
          <button onClick={scrollLeft}>
            <ArrowLeftIcon sx={{ fontSize: "30px" }} />
          </button>
          <h3 className="text-[32px] sm:text-[48px] font-bold mx-4">
            OUR HAPPY CUSTOMERS
          </h3>
          <button onClick={scrollRight}>
            <ArrowRightIcon sx={{ fontSize: "30px" }} />
          </button>
        </div>

        {/* Scrollable reviews */}
        <div className="relative">
          {/* Gradient overlays on both sides */}
          <div className="pointer-events-none absolute top-0 left-0 h-full w-[60px] bg-gradient-to-r from-white to-transparent z-10" />
          <div className="pointer-events-none absolute top-0 right-0 h-full w-[60px] bg-gradient-to-l from-white to-transparent z-10" />

          {/* Review container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto px-8 scroll-smooth snap-x snap-mandatory scrollbar-hide hide-scrollbar"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {ratingList}
          </div>
        </div>
      </div>
    </>
  );
}
