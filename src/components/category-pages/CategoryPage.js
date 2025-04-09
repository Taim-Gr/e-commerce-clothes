import TuneIcon from "@mui/icons-material/Tune";
import { Container, Divider } from "@mui/material";
import RangeSlider from "./RangeSlider";
import RadioButtonsGroup from "./RadioFilter";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Switch from "@mui/material/Switch";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFilteredProjects } from "../../featuers/api/categorySlice";
import {
  genderHandler,
  dressTypeHandler,
} from "../../featuers/api/categorySlice";
import FilteredCards from "./filteredCards";
import { useParams } from "react-router-dom";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
export default function CategoryPage({ category }) {
  const { categoryName } = useParams();
  const dispatch = useDispatch();
  const flteredResult = useSelector((state) => {
    return state.categorySlice;
  });

  const [filterResult, setFilterResult] = useState({
    gender: "male",
    dressType: "shirt",
    priceRangeStatus: false,
    priceRange: {
      min: 0,
      max: 100,
    },
  });

  const menLabels = ["shirts", "shoes", "watches"];
  const womenLabels = ["dresses", "shoes", "bags"];

  const isLoading = useSelector((state) => {
    return state.categorySlice.isLoading;
  });
  const [openMenu, setOpenMenu] = useState(false);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
    handleFilterClicking();
  }, []);

  console.log(isLoading);
  function handleFilterClicking() {
    flteredResult.gender === "male"
      ? dispatch(
          fetchFilteredProjects({
            gender: "mens",
            type: flteredResult.dressType,
          })
        )
      : dispatch(
          fetchFilteredProjects({
            gender: "womens",
            type: flteredResult.dressType,
          })
        );
    if (isLoading === false) {
      setTimeout(() => {
        setOpenMenu(false);
      }, 1000);
    }
  }
  return (
    <Container
      sx={{ gap: "40px" }}
      maxWidth="lg"
      className="flex flex-col sm:flex-row justify-between"
    >
      <div className="category text-left sm:max-w-[250px] ">
        <div className="flex justify-between items-center  mb-2">
          <span className="text-[25px] font-bold">
            {categoryName} <AutoAwesomeIcon sx={{ fontSize: "18px" }} />
          </span>
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="flex items-center gap-1 sm:hidden text-black px-2 py-1 rounded-md border border-gray-300 hover:bg-gray-100 transition-all duration-200"
          >
            <TuneIcon fontSize="small" />
            <span className="text-sm">Filters</span>
          </button>
        </div>
        <div
          className={`filter flex-col gap-y-[20px] transition-all duration-300 ${
            openMenu ? "flex" : "hidden"
          } sm:flex`}
        >
          <div className="filter-title flex justify-between items-center">
            <h3>Filters</h3>
            <TuneIcon />
          </div>
          <Divider />
          <div className="flex justify-start gap-x-[20px]">
            <button
              onClick={() => {
                dispatch(genderHandler({ gender: "male" }));
              }}
              className={`rounded-[62px] px-[20px] py-[10px] transition-all duration-300 ${
                flteredResult.gender === "male"
                  ? "bg-black text-white"
                  : "bg-[#F0F0F0] text-black text-opacity-60"
              }`}
            >
              Men
            </button>
            <button
              onClick={() => {
                dispatch(genderHandler({ gender: "female" }));
              }}
              className={`rounded-[62px] px-[20px] py-[10px] transition-all duration-300 ${
                flteredResult.gender === "female"
                  ? "bg-black text-white"
                  : "bg-[#F0F0F0] text-black text-opacity-60"
              }`}
            >
              Women
            </button>
          </div>
          <div className="gender-filters transition-all duration-300">
            {flteredResult.gender === "male" ? (
              <div className="mens-filter">
                <RadioButtonsGroup
                  title={"Dress Type :"}
                  label1={menLabels[0]}
                  label2={menLabels[1]}
                  label3={menLabels[2]}
                />
              </div>
            ) : (
              <div className="womens-filter">
                <RadioButtonsGroup
                  title={"Dress Type :"}
                  label1={womenLabels[0]}
                  label2={womenLabels[1]}
                  label3={womenLabels[2]}
                />
              </div>
            )}
          </div>
          <div className="dress-style">
            <RadioButtonsGroup
              title={"Dress Style :"}
              label1={"Casual"}
              label2={"Formal"}
              label3={"Party"}
              label4={"Creative"}
            />
          </div>
          <Button
            onClick={() => {
              handleFilterClicking();
            }}
            sx={{
              backgroundColor: "black",
              color: "white",
              position: "relative",
            }}
          >
            Aplly Filters
            <span
              className={`absolute left-2 top-[55%] translate-y-[-50%] ${
                isLoading ? "opacity-1" : "opacity-0"
              }`}
            >
              <CircularProgress size="20px" color="white" />
            </span>
          </Button>
        </div>
      </div>
      <FilteredCards />
    </Container>
  );
}
