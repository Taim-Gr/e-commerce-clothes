import { Container, Divider } from "@mui/material";
import cartImage from "../../images/T-shirts/image 7.svg";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useSelector, useDispatch } from "react-redux";
import {
  addToQuantity,
  removeFromQuantity,
  deleteFromCart,
  setCurrItemId,
} from "../../featuers/api/cartSlice";
import { useDialogAlert } from "../../contexts/dialogContext";
export default function CartCard({
  imageUrl,
  productName,
  Price,
  quantity,
  brand,
  itemId,
}) {
  // let SelectedItemId = useSelector((state) => {
  //   return state.cart.currItemId;
  // });
  const { openDialog, closeDialog } = useDialogAlert();
  const dispatch = useDispatch();
  function handleAddQuantity() {
    dispatch(addToQuantity(itemId));
  }
  function handelReduceQuantity() {
    if (quantity > 1) {
      dispatch(removeFromQuantity(itemId));
    } else {
      dispatch(setCurrItemId(itemId));
      openDialog();
    }
  }
  function handleDelete() {
    dispatch(setCurrItemId(itemId));
    openDialog();
  }
  return (
    <div>
      <div className="flex gap-x-[15px] text-left flex-col sm:flex-row justify-between lg:justify-between">
        <div className="flex gap-x-[15px] flex-1">
          <img className="w-[99px] md:w-[124px]" src={imageUrl} />
          <div className="text flex-col">
            <p className="text-[16px] font-bold">{productName}</p>
            <div className="flex gap-x-[3px]">
              <span className="text-[12px]">Size : </span>
              <span className="text-black text-opacity-60 text-[12px]">
                Large
              </span>
            </div>
            <div className="flex gap-x-[3px]">
              <span className="text-[12px]">Brand</span>
              <span className="text-black text-opacity-60 text-[12px]">
                {brand}
              </span>
            </div>
            <span className="text-[20px] font-bold">{Price}</span>
          </div>
        </div>
        <div className="flex flex-row sm:flex-col justify-between items-end">
          <span onClick={handleDelete}>
            <DeleteIcon sx={{ color: "#FF3333", cursor: "pointer" }} />
          </span>
          <div className="ad-cart flex items-center px-[20px] py-[10px] bg-[#F0F0F0] rounded-[62px]  gap-x-[20px]">
            <span
              className="text-[30px] flex items-center cursor-pointer"
              onClick={handelReduceQuantity}
            >
              <RemoveIcon />
            </span>
            <span className="text-[16px]">{quantity}</span>
            <span
              className="text-[30px] flex items-center cursor-pointer"
              onClick={handleAddQuantity}
            >
              <AddIcon className="text-[30px]" />
            </span>
          </div>
        </div>
      </div>
      <Divider sx={{ margin: "15px 0" }} />
    </div>
  );
}
