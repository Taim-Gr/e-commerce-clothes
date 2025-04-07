import StarIcon from "@mui/icons-material/Star";
import * as React from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
export default function ProductCard({
  imageUrl,
  title,
  rating,
  price,
  description,
  warranty,
  productId,
}) {
  const skeletonRef = useRef(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setIsFlipped(false);
    if (skeletonRef.current) {
      skeletonRef.current.style.opacity = "1";
    }
  }, [imageUrl]);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
  };

  const handleMouseEnter = () => {
    if (!isLoading) {
      setIsFlipped(true);
    }
  };

  const handleMouseLeave = () => {
    setIsFlipped(false);
  };

  return (
    <div
      className="card-container w-[300px] min-h-[300px] [perspective:1000px]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`card-inner relative w-full transition-transform duration-700 [transform-style:preserve-3d] ${
          isFlipped ? "[transform:rotateY(180deg)]" : ""
        } mb-[10px]`}
        style={{ minHeight: "inherit" }}
      >
        <div className="card-front w-full [backface-visibility:hidden]">
          <div className="card w-[300px] min-h-[300px] text-left image-container relative overflow-hidden bg-white rounded-[20px]">
            <div
              ref={skeletonRef}
              className="skeleton h-[300px] absolute w-full bg-[#f0f0f0] top-0 left-0 z-10 rounded-t-[20px] transition-opacity duration-300 ease-in-out"
              style={{ opacity: isLoading ? 1 : 0 }}
            ></div>
            <img
              onLoad={handleImageLoad}
              onError={handleImageError}
              src={imageUrl}
              alt={title || "Product Image"}
              className="block w-full h-[300px] object-cover bg-[#F0EEED] rounded-t-[20px]"
              style={{ opacity: isLoading ? 0 : 1 }}
            />

            <div className="p-4">
              <p className="mb-1">{title}</p>
              <div className="flex items-center mb-1">
                <Rating
                  name="half-rating-read"
                  defaultValue={rating}
                  precision={0.5}
                  readOnly
                  className="mr-4"
                  size="small"
                />
                <span className="text-sm">{rating}/5</span>
              </div>
              <span className="font-semibold">{price}</span>
            </div>
          </div>
        </div>

        <div className="card-back absolute top-0 left-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-black text-white rounded-[20px] p-4 overflow-auto flex flex-col justify-evenly items-center text-center">
          <h3 className="text-lg text-white font-semibold mb-2">
            Product Details :
          </h3>
          <p className="text-sm mb-4">{description}</p>

          <h3 className="text-lg text-white font-semibold mb-2">{warranty}</h3>
          <Link to={`/productInfo/${productId}`}>
            <button className="bg-white px-[40px] py-[8px] rounded-[60px] text-black">
              View
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
