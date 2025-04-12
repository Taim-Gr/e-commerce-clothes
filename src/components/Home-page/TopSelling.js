import axios from "axios";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import { Divider } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTopSellingProducts,
  clearError,
} from "../../featuers/api/apiSlice";
import { useSnackbar } from "../../contexts/snackbarContext";
import CircularProgress from "@mui/material/CircularProgress";
export default function TopSelling() {
  const dispatch = useDispatch();
  const { showSnackbar } = useSnackbar();
  // const [topSelling, setTopSelling] = useState([]);
  const topSelling = useSelector((state) => {
    return state.fetchSlice.topSellingProducsts;
  });
  const error = useSelector((state) => {
    return state.fetchSlice.error;
  });
  const loading = useSelector((state) => {
    return state.fetchSlice.loading;
  });
  const topSellingProducts = topSelling.map((el) => {
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
  const baseUrl = "https://dummyjson.com";
  useEffect(() => {
    if (error) {
      showSnackbar(`Error loading products: ${error}`, "error");
      // Clear error after showing
      dispatch(clearError());
    }
  }, [error, showSnackbar, dispatch]);

  useEffect(() => {
    dispatch(fetchTopSellingProducts());
  }, []);
  if (loading) {
    return (
      <div className="w-full py-[30px] text-center">
        <CircularProgress size={60} />
        <p className="mt-4 text-gray-600">Loading Top Selling products...</p>
      </div>
    );
  }
  return (
    <div id="onSale">
      <div className="w-full py-[30px]">
        <h3 className="text-[48px] font-bold ">Top Selling</h3>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] justify-items-center mx-auto py-[30px]">
          {topSellingProducts}
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
