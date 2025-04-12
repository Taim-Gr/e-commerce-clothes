import React, { useEffect } from "react";
import CartCard from "./CartCard";
import { Container, Divider } from "@mui/material";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartData } from "../../featuers/api/cartSlice";

export default function MyCart() {
  let storage = localStorage.getItem("CartProducts");
  const dispatch = useDispatch();

  const { cartItems, subTotalPrice, status, error } = useSelector(
    (state) => state.cart
  );

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    const cartIdAndQuantity = cartItems.map((item) => ({
      id: item.id,
      quantity: item.quantity,
    }));
    localStorage.setItem("CartProducts", JSON.stringify(cartIdAndQuantity));
  }, [cartItems]);

  const discountPrice = +(subTotalPrice * 0.2).toFixed(2);
  const deliveryFee = subTotalPrice !== 0 ? 15 : 0;
  const TotalCost = +(subTotalPrice - discountPrice + deliveryFee).toFixed(2);

  return (
    <Container maxWidth="lg">
      <div className="text-left">
        <h3 className="text-[40px] font-bold">YOUR CART</h3>

        {status === "loading" && <p>Loading cart data...</p>}
        {error && <p>Error: {error}</p>}

        <div className="card-content flex text-left gap-x-[20px] flex-col lg:flex-row">
          <div className="card-cards px-[24px] py-[20px] border-[1px] border-black border-opacity-10 rounded-[20px] flex flex-col gap-y-[15px] flex-1 max-h-[550px] overflow-y-scroll">
            {cartItems.length > 0
              ? cartItems.map((item) => (
                  <CartCard
                    key={item.id}
                    itemId={item.id}
                    imageUrl={item.imageUrl}
                    productName={item.productName}
                    Price={item.price}
                    quantity={item.quantity}
                    brand={item.brand || "Shop.Co"}
                  />
                ))
              : ""}
          </div>

          <div className="order-summary border border-black border-opacity-10 rounded-[20px] px-[24px] py-[20px] flex flex-col gap-[24px]">
            <h3 className="text-[24px] font-bold">Order Summary</h3>
            <div className="flex flex-col gap-y-[20px]">
              <div className="subtotal flex justify-between">
                <span className="text-black text-opacity-60">Subtotal</span>
                <span className="text-[20px] font-bold">
                  ${subTotalPrice.toFixed(2)}
                </span>
              </div>
              <div className="discount flex justify-between">
                <span className="text-black text-opacity-60">
                  Discount (-20%)
                </span>
                <span className="text-[#FF3333] text-[20px] font-bold">
                  -${discountPrice}
                </span>
              </div>
              <div className="delivery-fee flex justify-between">
                <span className="text-black text-opacity-60">Delivery Fee</span>
                <span className="text-[#FF3333] text-[20px] font-bold">
                  ${deliveryFee}
                </span>
              </div>
            </div>
            <Divider />
            <div className="total flex justify-between">
              <span>Total</span>
              <span className="text-[24px] font-bold">${TotalCost}</span>
            </div>

            <div className="flex items-center justify-center gap-x-[20px]">
              <div className="flex items-center gap-x-2 relative">
                <input
                  className="bg-white rounded-[64px] pl-[35px] max-w-[300px] py-[10px] outline-none"
                  placeholder="Promo Code"
                  type="text"
                />
                <span className="block absolute left-1">
                  <LocalOfferOutlinedIcon className="text-black text-opacity-60" />
                </span>
              </div>
              <button className="bg-black text-white px-[16px] py-[12px] rounded-[62px]">
                Apply
              </button>
            </div>

            <button className="bg-black text-white py-[16px] rounded-[62px]">
              Go To Checkout
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}
