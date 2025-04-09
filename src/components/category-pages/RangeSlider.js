import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useSelector, useDispatch } from "react-redux";
import { priceChangeHandler } from "../../featuers/api/categorySlice";
function valuetext(value) {
  return `$${value}`;
}

const minDistance = 10;

export default function RangeSlider({ status }) {
  const dispatch = useDispatch();
  const mypriceRange = useSelector((state) => {
    return state.categorySlice.priceRange;
  });

  const handleChange1 = (event, newValue, activeThumb) => {
    if (activeThumb === 0) {
      dispatch(
        priceChangeHandler({
          priceRange: [
            Math.min(newValue[0], mypriceRange[1] - minDistance),
            mypriceRange[1],
          ],
        })
      );
    } else {
      dispatch(
        priceChangeHandler({
          priceRange: [
            mypriceRange[0],
            Math.max(newValue[1], mypriceRange[0] + minDistance),
          ],
        })
      );
    }
  };

  return (
    <Box sx={{ width: 200 }}>
      <Slider
        sx={{
          color: status ? "black" : "gray",
          opacity: status ? "1" : "0.3",
          pointerEvents: status ? "auto" : "none",
        }}
        getAriaLabel={() => "Minimum distance"}
        value={mypriceRange}
        onChange={handleChange1}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        disableSwap
      />
    </Box>
  );
}
