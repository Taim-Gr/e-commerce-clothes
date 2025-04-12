import axios from "axios";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import { Divider } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { fetchMostPupolarProducts } from "../../featuers/api/apiSlice";
import { useSnackbar } from "../../contexts/snackbarContext";
export default function LatestProjects() {
  const { showSnackbar } = useSnackbar();
  const lastProducts = useSelector((state) => {
    return state.fetchSlice.mostPupolarProducsts;
  });
  // const [lastProducts, setLastProducts] = useState([]);
  const lastProductsList = lastProducts.map((el) => {
    return (
      <ProductCard
        key={el.id}
        title={el.title}
        rating={el.rating}
        imageUrl={el.images[0]}
        price={`$ ${el.price}`}
        description={el.description}
        warranty={el.warrantyInformation}
        productId={el.id}
      />
    );
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMostPupolarProducts());
  }, []);
  return (
    <div id="New-Arrivals">
      <div className="w-full py-[30px]">
        <h3 className="text-[48px] font-bold">NEW ARRIVALS</h3>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] justify-items-center mx-auto py-[30px]">
          {lastProductsList}
        </div>
        <button
          className="px-[64px] py-[16px] rounded-[62px] border border-[rgba(0 ,0 ,0 , 10%)]"
          onClick={() =>
            showSnackbar("Sorry the dummy api doesnt have more =(", "error")
          }
        >
          View All
        </button>
      </div>
      <Divider />
    </div>
  );
}
