// import axios from "axios";
// import ProductCard from "./ProductCard";
// import { useEffect, useState } from "react";
// import { Divider } from "@mui/material";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchMostPupolarProducts } from "../../featuers/api/apiSlice";
// import { useSnackbar } from "../../contexts/snackbarContext";
// export default function LatestProjects() {
//   const { showSnackbar } = useSnackbar();
//   const lastProducts = useSelector((state) => {
//     return state.fetchSlice.mostPupolarProducsts;
//   });
//   const error = useSelector((state) => {
//     return state.fetchSlice.error;
//   });
//   // const [lastProducts, setLastProducts] = useState([]);
//   const lastProductsList = lastProducts.map((el) => {
//     return (
//       <ProductCard
//         key={el.id}
//         title={el.title}
//         rating={el.rating}
//         imageUrl={el.images[0]}
//         price={`$ ${el.price}`}
//         description={el.description}
//         warranty={el.warrantyInformation}
//         productId={el.id}
//       />
//     );
//   });
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchMostPupolarProducts());
//   }, []);
//   if (error) {
//     return (
//       <div className="w-fit text-[30px] text-red-800 font-bold m-auto p-3">
//         {error}, pleae Try Again ...
//       </div>
//     );
//   }
//   return (
//     <div id="New-Arrivals">
//       <div className="w-full py-[30px]">
//         <h3 className="text-[48px] font-bold">NEW ARRIVALS</h3>
//         <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] justify-items-center mx-auto py-[30px]">
//           {lastProductsList}
//         </div>
//         <button
//           className="px-[64px] py-[16px] rounded-[62px] border border-[rgba(0 ,0 ,0 , 10%)]"
//           onClick={() =>
//             showSnackbar("Sorry the dummy api doesnt have more =(", "error")
//           }
//         >
//           View All
//         </button>
//       </div>
//       <Divider />
//     </div>
//   );
// }
import axios from "axios";
import ProductCard from "./ProductCard";
import { useEffect } from "react";
import { Divider } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchMostPupolarProducts,
  clearError,
} from "../../featuers/api/apiSlice";
import { useSnackbar } from "../../contexts/snackbarContext";
import CircularProgress from "@mui/material/CircularProgress";

export default function LatestProjects() {
  const { showSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const {
    mostPupolarProducsts: lastProducts,
    error,
    loading,
  } = useSelector((state) => ({
    mostPupolarProducsts: state.fetchSlice.mostPupolarProducsts,
    error: state.fetchSlice.error,
    loading: state.fetchSlice.loading,
  }));

  useEffect(() => {
    dispatch(fetchMostPupolarProducts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      showSnackbar(`Error loading products: ${error}`, "error");
      // Clear error after showing
      dispatch(clearError());
    }
  }, [error, showSnackbar, dispatch]);

  if (loading) {
    return (
      <div className="w-full py-[30px] text-center">
        <CircularProgress size={60} />
        <p className="mt-4 text-gray-600">Loading latest products...</p>
      </div>
    );
  }
  if (!loading && lastProducts.length === 0) {
    return (
      <div className="w-full py-[30px] text-center">
        <h3 className="text-[48px] font-bold">NEW ARRIVALS</h3>
        <div className="mt-8 text-gray-500">
          No products available at the moment
        </div>
      </div>
    );
  }

  const lastProductsList = lastProducts.map((el) => (
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
  ));

  return (
    <div id="New-Arrivals">
      <div className="w-full py-[30px]">
        <h3 className="text-[48px] font-bold">NEW ARRIVALS</h3>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] justify-items-center mx-auto py-[30px]">
          {lastProductsList}
        </div>

        <div className="text-center">
          <button
            className="px-[64px] py-[16px] rounded-[62px] border border-[rgba(0 ,0 ,0 , 10%)] hover:bg-gray-100 transition-colors"
            onClick={() => {
              showSnackbar("Sorry the dummy api doesn't have more =(", "error");
            }}
          >
            View All
          </button>
        </div>
      </div>
      <Divider />
    </div>
  );
}
