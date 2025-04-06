import StarIcon from "@mui/icons-material/Star";
import * as React from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { useRef } from "react";
export default function ProductCard({ imageUrl, desecription, rating, price }) {
  const skeletonRef = useRef(null);
  return (
    <div>
      <div className="card w-[300px] min-h-[300px] text-left image-container relative overflow-hidden ">
        <div
          ref={skeletonRef}
          className="skeleton h-[300px] absolute w-full bg-[#f0f0f0] top-0 left-0 z-50"
        ></div>
        <img
          onLoad={() => {
            skeletonRef.current.classList.add("loaded");
          }}
          src={imageUrl}
          className="bg-[#F0EEED] rounded-[20px]"
        />
        <p>{desecription}</p>
        <div className="flex ">
          <Rating
            name="half-rating-read"
            defaultValue={rating}
            precision={0.5}
            readOnly
            className="mr-4"
          />

          <span>{rating}/5</span>
        </div>
        <span>{price}</span>
      </div>
    </div>
  );
}
