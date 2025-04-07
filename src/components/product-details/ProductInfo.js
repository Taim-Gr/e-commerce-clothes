import tshirt from "../../images/T-shirts/image 7.svg";
import Rating from "@mui/material/Rating";
import { Container, Divider } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductInfo } from "../../featuers/api/apiSlice";
import { cleanProductInfo } from "../../featuers/api/apiSlice";
import ProductRating from "./ProductRating";
import ReleatedProjects from "./ReleatedProjects";

export default function ProductInfo() {
  const { productId } = useParams();
  useEffect(() => {
    window.scrollTo({
      top: "0",
      behavior: "auto",
    });
  }, [productId]);
  const dispatch = useDispatch();
  const productInfo = useSelector((state) => state.fetchSlice.productInfo);

  const [loading, setLoading] = useState(true);

  const [isImageLoading, setIsImageLoading] = useState({
    image0: true,
    image1: true,
    image2: true,
    image3: true,
  });

  useEffect(() => {
    setIsImageLoading({
      image0: true,
      image1: true,
      image2: true,
      image3: true,
    });
    dispatch(fetchProductInfo(productId)).then(() => setLoading(false));
    return () => {
      dispatch(cleanProductInfo());
      setLoading(true);
      setIsImageLoading({
        image0: true,
        image1: true,
        image2: true,
        image3: true,
      });
    };
  }, [productId, dispatch]);

  function handleImageLoad(id) {
    setIsImageLoading((prev) => ({ ...prev, [id]: false }));
  }

  return (
    <Container maxWidth="lg">
      <div className="info-container overflow-hidden items-center flex flex-col md:flex-row gap-x-[40px] ">
        <div className="product-images flex-col-reverse sm:flex-row flex gap-[10px] items-center justify-center md:justify-normal relative overflow-hidden">
          <div className="flex flex-row sm:flex-col gap-0 sm:gap-[10px] justify-center">
            {[1, 2, 3].map((i, index) => (
              <div
                key={index}
                className="relative overflow-hidden"
                style={{ width: "150px", height: "140px" }}
              >
                <img
                  onLoad={() => handleImageLoad(`image${i}`)}
                  src={!loading ? productInfo.images[i] : null}
                  alt="thumbnail"
                  className="w-[150px] h-[140px] rounded-[20px] object-cover"
                />
                <div
                  className="skeleton absolute top-0 left-0 w-full h-full bg-[#f0f0f0] z-10 transition-opacity duration-300 ease-in-out"
                  style={{ opacity: isImageLoading[`image${i}`] ? 1 : 0 }}
                ></div>
              </div>
            ))}
          </div>
          <div className="relative overflow-hidden" style={{ height: "350px" }}>
            <img
              onLoad={() => handleImageLoad("image0")}
              src={!loading ? productInfo.images[0] : null}
              alt="main"
              className="h-[350px] w-auto rounded-[20px] object-cover"
            />
            <div
              className="skeleton absolute top-0 left-0 w-full h-full bg-[#f0f0f0] z-10 transition-opacity duration-300 ease-in-out"
              style={{ opacity: isImageLoading["image0"] ? 1 : 0 }}
            ></div>
          </div>
        </div>

        <div className="product-text-info text-center md:text-left flex-1 flex flex-col justify-evenly gap-[25px]">
          <div className="flex flex-col gap-y-[5px] items-center md:items-start">
            <h2 className="text-black text-[40px] font-bold font-archivo">
              {loading ? (
                <div className="bg-[#f0f0f0] animate-pulse h-10 w-[300px]"></div>
              ) : (
                productInfo.title
              )}
            </h2>
            <div className="flex items-center">
              {loading ? (
                <div className="bg-[#f0f0f0] animate-pulse h-8 w-[150px]"></div>
              ) : (
                <>
                  <Rating
                    name="half-rating-read"
                    precision={0.5}
                    value={productInfo.rating}
                    readOnly
                    className="mr-4"
                    size="large"
                  />
                  <span className="font-extralight">
                    {productInfo.rating}/5
                  </span>
                </>
              )}
            </div>
            <div className="flex gap-x-[10px] prices items-center">
              {loading ? (
                <div className="bg-[#f0f0f0] animate-pulse h-8 w-[200px]"></div>
              ) : (
                <>
                  <span className="price text-[32px] font-bold">
                    $
                    {(
                      productInfo.price -
                      (productInfo.price * productInfo.discountPercentage) / 100
                    ).toFixed(1)}
                  </span>
                  <span className="discount line-through text-[32px] font-bold">
                    ${productInfo.price}
                  </span>
                  <span className="discount-percent text-red-500 text-[14px] px-[14px] py-[6px] h-fit bg-[#FF3333] bg-opacity-10 rounded-[64px] flex items-center">
                    {productInfo.discountPercentage}%
                  </span>
                </>
              )}
            </div>
            <div className="text-[16px] text-black text-opacity-60">
              {loading ? (
                <div className="bg-[#f0f0f0] animate-pulse h-16 w-full"></div>
              ) : (
                productInfo.description
              )}
            </div>
          </div>
          <Divider />
          <div className="flex justify-center xl:justify-between flex-wrap gap-[20px]">
            {loading ? (
              <>
                <div className="bg-[#f0f0f0] animate-pulse h-8 w-[100px]"></div>
                <div className="bg-[#f0f0f0] animate-pulse h-8 w-[100px]"></div>
                <div className="bg-[#f0f0f0] animate-pulse h-8 w-[100px]"></div>
              </>
            ) : (
              <>
                <div className="flex flex-col text-center">
                  <span className="font-bold text-[18px]">WARRANTY INFO</span>
                  <span className="text-center text-black text-opacity-80">
                    {productInfo.warrantyInformation || "N/A"}
                  </span>
                </div>
                <div className="flex flex-col text-center">
                  <span className="font-bold text-[18px]">SHIPPING INFO</span>
                  <span className="text-center text-black text-opacity-80">
                    {productInfo.shippingInformation || "N/A"}
                  </span>
                </div>
                <div className="flex flex-col text-center">
                  <span className="font-bold text-[18px]">
                    AVAILABILITY STATUS
                  </span>
                  <span className="text-center text-black text-opacity-80">
                    {productInfo.availabilityStatus || "N/A"}
                  </span>
                </div>
              </>
            )}
          </div>
          <Divider />
          <div className="brand-name">
            <h1 className="text-[26px] font-archivo font-bold text-left">
              {loading ? (
                <div className="bg-[#f0f0f0] animate-pulse h-8 w-[150px]"></div>
              ) : (
                <>
                  Made By {productInfo.brand || "Shop.co"}
                  <span className="ml-2">
                    <AutoAwesomeIcon />
                  </span>
                </>
              )}
            </h1>
          </div>
          <div className="flex w-full gap-x-[20px]">
            {loading ? (
              <div className="bg-[#f0f0f0] animate-pulse h-12 w-full"></div>
            ) : (
              <>
                <div className="ad-cart flex items-center px-[20px] py-[16px] bg-[#F0F0F0] rounded-[62px] w-[30%] justify-evenly">
                  <span className="text-[30px] flex items-center">
                    <RemoveIcon />
                  </span>
                  <span className="text-[16px]">1</span>
                  <span className="text-[30px] flex items-center">
                    <AddIcon className="text-[30px]" />
                  </span>
                </div>
                <button className="bg-black text-white rounded-[62px] px-[54px] py-[16px] flex-1">
                  Add To Cart
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <ProductRating />
      {productInfo.category !== "" ? <ReleatedProjects /> : ""}
    </Container>
  );
}
