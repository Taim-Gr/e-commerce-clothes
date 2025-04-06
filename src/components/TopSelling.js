import axios from "axios";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import { Divider } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { fetchTopSellingProducts } from "../featuers/api/apiSlice";
export default function TopSelling() {
  // const [topSelling, setTopSelling] = useState([]);
  const topSelling = useSelector((state) => {
    return state.fetchSlice.topSellingProducsts;
  });
  const topSellingProducts = topSelling.map((el) => {
    return (
      <ProductCard
        key={el.id}
        desecription={el.title}
        rating={el.rating}
        imageUrl={el.images[0]}
        price={`$ ${el.price}`}
      />
    );
  });
  const baseUrl = "https://dummyjson.com";

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTopSellingProducts());
  }, []);
  return (
    <div>
      <div className="w-full py-[30px]">
        <h3 className="text-[48px] font-bold ">Top Selling</h3>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] justify-items-center mx-auto py-[30px]">
          {topSellingProducts}
        </div>
        <button className="px-[64px] py-[16px] rounded-[62px] border border-[rgba(0 ,0 ,0 , 10%)]">
          View All
        </button>
      </div>
      <Divider />
    </div>
  );
}
