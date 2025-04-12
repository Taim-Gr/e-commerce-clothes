import { useSelector, useDispatch } from "react-redux";
import { fetchReleatedProducts } from "../../featuers/api/apiSlice";
import ProductCard from "../Home-page/ProductCard";
import { useEffect } from "react";
import { Divider } from "@mui/material";
import { cleanProductInfo } from "../../featuers/api/apiSlice";
export default function ReleatedProjects() {
  const category = useSelector((state) => {
    return state.fetchSlice.productInfo.category;
  });
  const title = useSelector((state) => {
    return state.fetchSlice.productInfo.title;
  });
  const releatedProducts = useSelector((state) => {
    return state.fetchSlice.releatedProducts;
  });

  const releatedProductsList = releatedProducts.map((el) => {
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

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchReleatedProducts({ category, title }));
  }, []);
  return (
    <div>
      <div className="w-full py-[30px]">
        <h3 className="text-[48px] font-bold ">YOU MIGHT ALSO LIKE</h3>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] justify-items-center mx-auto py-[30px]">
          {releatedProductsList}
        </div>
      </div>
      <Divider />
    </div>
  );
}
